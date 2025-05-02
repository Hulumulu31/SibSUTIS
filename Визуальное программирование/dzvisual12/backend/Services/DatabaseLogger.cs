using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TableApp.Repositories;
using TableApp.Models;

namespace TableApp.Services
{
    public class DatabaseLogger : ILogger
    {
        private readonly ApplicationDbContext _context;

        public DatabaseLogger(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            var logEntry = new Log
            {
                Message = formatter(state, exception),
                LogLevel = logLevel.ToString(),
                Timestamp = DateTime.UtcNow,
                HttpMethod = "UNKNOWN"  //здесь можно уточнить метод, если нужно
            };

            _context.Logs.Add(logEntry);
            _context.SaveChanges();
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }
    }
}
