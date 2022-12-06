namespace Staff.Common.Filtering
{
    public class FilteredResult<T> where T : class
    {
        public int Total { get; set; }

        public IList<T> Items { get; set; }
    }
}
