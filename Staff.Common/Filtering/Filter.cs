namespace Staff.Common.Filtering
{
    public class Filter
    {
        public string Prop { get; set; }

        public Op Operation { get; set; }

        public object Value { get; set; }
    }
}
