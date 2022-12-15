using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.Common.Exceptions;
using Staff.Common.Filtering;
using Staff.Common.Grouping;
using Staff.DAL.Contracts;
using Staff.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.BLL.Services
{
    public class GenericService<TEntity, T, TGet, TCreate, TUpdate> : StatsService<TGet>, IGenericService<TEntity, T, TGet, TCreate, TUpdate>
        where TEntity : BaseEntity
        where T : class
        where TGet : class
        where TCreate : class
        where TUpdate : class
    {
        protected readonly IMapper _mapper;

        readonly IGenericRepository<TEntity> _repo;
        readonly IOrderRepository _orderRepo;
        protected readonly IHttpContextCurrentUser _user;

        public GenericService(
            IMapper mapper,
            IGenericRepository<TEntity> repo,
            IHttpContextCurrentUser user,
            IOrderRepository orderRepo
            ) : base(user, orderRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _user = user;
            _orderRepo = orderRepo;
        }

        public virtual async Task<BaseDto> Add(TCreate createDto)
        {
            var entity = _mapper.Map<TEntity>(createDto);
            Guid id = (await _repo.Add(entity, _user.CompanyId)).Id;

            return new BaseDto() { Id = id };
        }

        public virtual async Task Delete(string id)
        {
            Guid identity = new(id);

            if (await Exists(id))
            {
                await _repo.Remove(identity, _user.CompanyId);
            }
            else
            {
                throw new NotFoundException($"Entity with id {id} not found.");
            }
        }

        public virtual async Task<T> Get(string id)
        {
            Guid identity = new(id);

            if (await Exists(id))
            {
                var entity = _repo.Get(identity, _user.CompanyId);
                return _mapper.Map<T>(entity);
            }
            else
            {
                throw new NotFoundException($"Not found with id {id}.");
            }
        }

        public virtual async Task<IList<TGet>> GetEvery()
        {
            IList<TEntity> entities = await _repo.GetEvery(_user.CompanyId);
            return _mapper.Map<IList<TGet>>(entities);
        }

        public virtual async Task Update(string id, TUpdate updateDto)
        {
            Guid identity = new(id);

            if (await Exists(id))
            {
                TEntity entity = await _repo.Get(identity, _user.CompanyId);
                _mapper.Map(updateDto, entity);

                await _repo.Update(entity);
            }
            else
            {
                throw new NotFoundException($"Not found with id {id}.");
            }
        }

        public virtual async Task<bool> Exists(string id)
        {
            Guid guid = new(id);
            return await _repo.Exists(guid, _user.CompanyId);
        }

        public async Task<FilteredResult<T>> Get(IList<Filter> filters)
        {
            FilteredRequest request = new() { Filters = filters };
            FilteredResult<T> result = await _repo.GetAllAsyncProcessed<T>(_user.CompanyId, request, _mapper);

            return result;
        }
    }
}
