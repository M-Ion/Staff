using EntityFrameworkCore.Triggered;
using Microsoft.EntityFrameworkCore;
using Staff.Domain.Dishes;

namespace Staff.DAL.Triggers
{
    public class BeforeDeleteCategoryTigger : IBeforeSaveTrigger<Category>
    {
        readonly StaffDbContext _context;

        public BeforeDeleteCategoryTigger(StaffDbContext context)
        {
            _context = context;
        }

        public async Task BeforeSave(ITriggerContext<Category> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Deleted)
            {
                List<Dish> dishes = await _context.Set<Dish>().Where(d => d.Category.Id == context.Entity.Id).ToListAsync();
                Category implicitCategory = await _context.Set<Category>().FirstOrDefaultAsync(c => c.DishType == context.Entity.DishType && c.Implicit == true);

                dishes.ForEach(d => d.Category = implicitCategory);

                await _context.SaveChangesAsync();
            }

            await Task.CompletedTask;
        }
    }
}
