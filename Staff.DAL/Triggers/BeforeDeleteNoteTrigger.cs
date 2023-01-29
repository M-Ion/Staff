using EntityFrameworkCore.Triggered;
using Staff.Domain;

namespace Staff.DAL.Triggers
{
    public class BeforeDeleteNoteTrigger : IBeforeSaveTrigger<Note>
    {
        readonly StaffDbContext _context;

        public BeforeDeleteNoteTrigger(StaffDbContext context)
        {
            _context = context;
        }

        public async Task BeforeSave(ITriggerContext<Note> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Deleted)
            {
                IList<Order> orders = context.Entity.Orders;
                if (orders != null) _context.RemoveRange(orders);
            }

            await Task.CompletedTask;
        }
    }
}
