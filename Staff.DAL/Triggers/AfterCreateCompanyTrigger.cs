using EntityFrameworkCore.Triggered;
using Staff.Domain;
using Staff.Domain.Dishes;

namespace Staff.DAL.Triggers
{
    public class AfterCreateCompanyTrigger : IAfterSaveTrigger<Company>
    {
        readonly StaffDbContext _context;

        public AfterCreateCompanyTrigger(StaffDbContext context)
        {
            _context = context;
        }

        public async Task AfterSave(ITriggerContext<Company> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                List<Category> categories = new()
                {
                    new Category()
                    {
                        Company = context.Entity,
                        DishType = DishTypes.Dish,
                        Name = "Other",
                        Implicit = true
                    },

                    new Category()
                    {
                        Company = context.Entity,
                        DishType = DishTypes.Beverage,
                        Name = "Other",
                        Implicit = true
                    }
                };

                await _context.Set<Category>().AddRangeAsync(categories);
                await _context.SaveChangesAsync();
            }

            await Task.CompletedTask;
        }
    }
}
