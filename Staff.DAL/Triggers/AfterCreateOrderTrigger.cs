using EntityFrameworkCore.Triggered;
using Staff.Domain;

namespace Staff.DAL.Triggers
{
    public class AfterCreateOrderTrigger : IBeforeSaveTrigger<Order>
    {
        readonly StaffDbContext _context;

        public AfterCreateOrderTrigger(StaffDbContext context)
        {
            _context = context;
        }

        public async Task BeforeSave(ITriggerContext<Order> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Added)
            {
                context.Entity.UserId = context.Entity.Note.UserId;
            }

            await Task.CompletedTask;
        }
    }
}
