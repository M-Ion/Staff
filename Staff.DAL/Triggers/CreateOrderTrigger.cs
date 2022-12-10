using EntityFrameworkCore.Triggered;
using Staff.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.DAL.Triggers
{
    public class CreateOrderTrigger : IBeforeSaveTrigger<Order>
    {
        readonly StaffDbContext _context;

        public CreateOrderTrigger(StaffDbContext context)
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
