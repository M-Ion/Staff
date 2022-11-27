using Staff.Common.Dtos.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.Common.Dtos.Note
{
    public class GetNoteDto : BaseDto
    {
        public virtual IList<GetOrderDto> Orders { get; set; }

        public bool IsCompleted { get; set; }
    }
}
