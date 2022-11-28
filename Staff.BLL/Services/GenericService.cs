using AutoMapper;
using Staff.BLL.Contracts;
using Staff.Common.Dtos;
using Staff.DAL.Contracts;
using Staff.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.BLL.Services
{
    public class GenericService<TEntity, T, TGet, TCreate, TUpdate> : IGenericService<TEntity, T, TGet, TCreate, TUpdate> where TEntity : BaseEntity
    {
        readonly IMapper _mapper;

        readonly IGenericRepository<TEntity> _repo;
        readonly IHttpContextCurrentUser _user;

        public GenericService(IMapper mapper, IGenericRepository<TEntity> repo, IHttpContextCurrentUser user)
        {
            _mapper = mapper;
            _repo = repo;
            _user = user;
        }

        public virtual async Task<BaseDto> Add(TCreate createDto)
        {
            var entity = _mapper.Map<TEntity>(createDto);
            Guid id = (await _repo.Add(entity)).Id;

            return new BaseDto() { Id = id };
        }

        public virtual async Task Delete(string id)
        {
            Guid identity = new(id);

            if (await _repo.Exists(identity, _user.CompanyId))
            {
                await _repo.Remove(identity, _user.CompanyId);
            }
            else
            {
                throw new Exception();
            }
        }

        public virtual async Task<T> Get(string id)
        {
            Guid identity = new(id);

            if (await _repo.Exists(identity, _user.CompanyId))
            {
                var entity = _repo.Get(identity, _user.CompanyId);
                return _mapper.Map<T>(entity);
            }
            else
            {
                throw new Exception();
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

            if (await _repo.Exists(identity, _user.CompanyId))
            {
                TEntity entity = await _repo.Get(identity, _user.CompanyId);
                _mapper.Map(updateDto, entity);

                await _repo.Update(entity);
            }
            else
            {
                throw new Exception();
            }
        }
    }
}
