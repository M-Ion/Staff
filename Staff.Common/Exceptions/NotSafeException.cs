namespace Staff.Common.Exceptions
{
    public class NotSafeException : Exception
    {
        public NotSafeException(string message) : base(message)
        {
        }
    }
}
