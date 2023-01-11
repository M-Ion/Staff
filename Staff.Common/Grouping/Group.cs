namespace Staff.Common.Grouping
{
    public class Group
    {
        public object Key;

        public UInt64 Count;

        public double Sum;
    }

    public class Group<T>
    {
        public T Key;

        public UInt64 Count;

        public double Sum;
    }
}
