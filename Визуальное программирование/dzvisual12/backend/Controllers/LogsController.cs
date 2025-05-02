using Microsoft.AspNetCore.Mvc;
using TableApp.Models;
using TableApp.Services;
using Microsoft.Extensions.Logging;
using TableApp.Repositories;
using Microsoft.EntityFrameworkCore; // Для ExecuteSqlRaw

namespace TableApp.Controllers
{
    [ApiController]
    [Route("logs")]
    public class LogsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;

        public LogsController(ApplicationDbContext context, ILogger<LogsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET all logs
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var logs = _context.Logs.ToList();
                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении всех логов");
                return StatusCode(500, "Ошибка сервера.");
            }
        }

        // GET log by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var log = _context.Logs.FirstOrDefault(l => l.Id == id);
                if (log == null)
                {
                    _logger.LogWarning("Лог с ID {Id} не найден", id);
                    return NotFound();
                }

                return Ok(log);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении лога с ID {Id}", id);
                return StatusCode(500, "Ошибка сервера.");
            }
        }

        // DELETE all logs
        [HttpDelete]
        public IActionResult DeleteAll()
        {
            try
            {
                _context.Logs.RemoveRange(_context.Logs);  // Удаление всех записей
                _context.SaveChanges();

                // Сброс последовательности для автоинкремента ID в таблице Logs
                _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Logs_Id_seq\" RESTART WITH 1");

                _logger.LogInformation("Все логи были успешно удалены и счётчик ID сброшен.");

                return NoContent(); // Успешный ответ
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении всех логов");
                return StatusCode(500, "Ошибка сервера.");
            }
        }

        [HttpGet("level/{logLevel}")]
        public IActionResult GetLogsByLevel(string logLevel)
        {
            try
            {
                _logger.LogInformation("Получение логов с уровнем: {LogLevel}", logLevel);

                // Получаем все логи из базы данных
                var logs = _context.Logs
                    .AsEnumerable() // Переводим запрос в клиентский режим (фильтрация будет выполняться на клиенте)
                    .Where(l => l.LogLevel.Equals(logLevel, StringComparison.OrdinalIgnoreCase)) // Фильтруем в памяти
                    .ToList();

                _logger.LogInformation("Найдено {Count} логов с уровнем: {LogLevel}", logs.Count, logLevel);

                if (logs.Count == 0)
                {
                    _logger.LogWarning("Нет логов с уровнем {LogLevel}", logLevel);
                    return NotFound();
                }

                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении логов с уровнем {LogLevel}", logLevel);
                return StatusCode(500, "Ошибка сервера.");
            }
        }

    }
}
