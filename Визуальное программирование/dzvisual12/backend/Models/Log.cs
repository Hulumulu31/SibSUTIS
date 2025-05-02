namespace TableApp.Models
{
    public class Log
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public string LogLevel { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string HttpMethod { get; set; } = string.Empty;
    }
}
