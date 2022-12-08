using EntityFrameworkCore.Triggered;
using Staff.Domain;

namespace Staff.DAL.Triggers
{
    public class DeleteNoteTrigger : IBeforeSaveTrigger<Note>
    {
        readonly StaffDbContext _context;

        public DeleteNoteTrigger(StaffDbContext context)
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
