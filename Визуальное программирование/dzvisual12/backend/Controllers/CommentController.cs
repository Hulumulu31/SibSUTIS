using Microsoft.AspNetCore.Mvc;
using TableApp.Models;
using TableApp.Services;
using Microsoft.Extensions.Logging;
using TableApp.Repositories;

namespace TableApp.Controllers
{
    [ApiController]
    [Route("comments")]
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _service;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _context;

        public CommentsController(CommentService service, ILogger<CommentsController> logger, ApplicationDbContext context)
        {
            _service = service;
            _logger = logger;
            _context = context;
        }

        // GET all comments
        [HttpGet]
        public IActionResult GetAll()
        {
            _logger.LogInformation("GET запрос: Получение всех комментариев");

            var comments = _service.GetAll();

            var logEntry = new Log
            {
                Message = "Получение всех комментариев",
                LogLevel = "Information",
                Timestamp = DateTime.UtcNow,
                HttpMethod = "GET"
            };

            _service.AddLog(logEntry);

            return Ok(comments);
        }

        // GET comment by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            _logger.LogInformation("GET запрос: Получение комментария с ID {Id}", id);

            var comment = _service.GetById(id);
            if (comment == null)
            {
                _logger.LogWarning("Комментарий с ID {Id} не найден", id);
                return NotFound();
            }

            return Ok(comment);
        }

        // POST create new comment
        [HttpPost]
        public IActionResult CreateComment([FromBody] Comment newComment)
        {
            if (newComment == null)
            {
                _logger.LogWarning("Получен пустой комментарий для добавления");
                return BadRequest("Комментарий не может быть пустым");
            }

            try
            {
                _context.Comments.Add(newComment);
                _context.SaveChanges();

                var logEntry = new Log
                {
                    Message = $"Добавлен новый комментарий с ID {newComment.Id}",
                    LogLevel = "Information",
                    Timestamp = DateTime.UtcNow,
                    HttpMethod = "POST"
                };

                _context.Logs.Add(logEntry);
                _context.SaveChanges();

                return CreatedAtAction(nameof(GetById), new { id = newComment.Id }, newComment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при добавлении нового комментария");
                return StatusCode(500, "Ошибка сервера.");
            }
        }

        // PUT update comment
        [HttpPut("{id}")]
        public IActionResult UpdateComment(int id, [FromBody] Comment updatedComment)
        {
            if (updatedComment == null)
            {
                _logger.LogWarning("Получен пустой комментарий для обновления");
                return BadRequest("Комментарий не может быть пустым");
            }

            var existingComment = _context.Comments.FirstOrDefault(c => c.Id == id);

            if (existingComment == null)
            {
                _logger.LogWarning("Комментарий с ID {Id} не найден", id);
                return NotFound();
            }

            existingComment.Name = updatedComment.Name;
            existingComment.Email = updatedComment.Email;
            existingComment.Body = updatedComment.Body;

            try
            {
                _context.Comments.Update(existingComment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении комментария с ID {Id}", id);
                return StatusCode(500, "Ошибка сервера.");
            }

            var logEntry = new Log
            {
                Message = $"Комментарий с ID {id} обновлен",
                LogLevel = "Information",
                Timestamp = DateTime.UtcNow,
                HttpMethod = "PUT"
            };

            _context.Logs.Add(logEntry);
            _context.SaveChanges();

            return Ok(existingComment);
        }

        // DELETE comment by id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logger.LogInformation("DELETE запрос: Удаление комментария с ID {Id}", id);

            var comment = _service.GetById(id);
            if (comment == null)
            {
                _logger.LogWarning("Комментарий с ID {Id} не найден для удаления", id);
                return NotFound();
            }

            _service.Delete(id);

            var logEntry = new Log
            {
                Message = $"Удален комментарий с ID {id}",
                LogLevel = "Information",
                Timestamp = DateTime.UtcNow,
                HttpMethod = "DELETE"
            };

            _service.AddLog(logEntry);

            return NoContent();
        }
    }
}
