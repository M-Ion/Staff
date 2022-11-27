using EntityFrameworkCore.Triggered;
using Staff.Domain;

namespace Staff.DAL.Triggers
{
    public class DeleteNoteTrigger : IAfterSaveTrigger<Note>
    {
        readonly StaffDbContext _context;

        public DeleteNoteTrigger(StaffDbContext context)
        {
            _context = context;
        }

        public async Task AfterSave(ITriggerContext<Note> context, CancellationToken cancellationToken)
        {
            if (context.ChangeType == ChangeType.Deleted)
            { 
                IList<Order> orders = context.Entity.Orders;
                _context.RemoveRange(orders);
            }

            await Task.CompletedTask;
        }
    }
}
