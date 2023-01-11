using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Staff.Common.Grouping
{
    public class MonthlyGroupComparer : IComparer<Group<MonthlyGroup>>
    {
        public int Compare(Group<MonthlyGroup> x, Group<MonthlyGroup> y)
        {
            if (x.Key.Year == y.Key.Year)
            {
                if (x.Key.Month == y.Key.Month) return 0;

                if (x.Key.Month < y.Key.Month) return -1;

                return 1;
            }

            if (x.Key.Year < y.Key.Year) return -1;

            return 0;
        }
    }
}
