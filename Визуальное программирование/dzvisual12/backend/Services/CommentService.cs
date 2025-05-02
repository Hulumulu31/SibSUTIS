using TableApp.Models;
using TableApp.Repositories;

namespace TableApp.Services
{
    public class CommentService
    {
        private readonly ApplicationDbContext _context;

        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddLog(Log log)
        {
            _context.Logs.Add(log);
            _context.SaveChanges();
        }

        public List<Comment> GetAll() => _context.Comments.ToList();

        public Comment GetById(int id) => _context.Comments.Find(id);

        public void Add(Comment comment)
        {
            try
            {
                if (string.IsNullOrEmpty(comment.Body))
                {
                    throw new Exception("Комментарий не может быть пустым.");
                }

                _context.Comments.Add(comment);
                _context.SaveChanges();

                AddLog(new Log
                {
                    Message = "Комментарий успешно добавлен",
                    LogLevel = "Information",
                    Timestamp = DateTime.UtcNow,
                    HttpMethod = "POST"
                });
            }
            catch (Exception ex)
            {
                AddLog(new Log
                {
                    Message = ex.Message,
                    LogLevel = "Error",
                    Timestamp = DateTime.UtcNow,
                    HttpMethod = "POST"
                });

                throw;
            }
        }

        public void Delete(int id)
        {
            var comment = _context.Comments.Find(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                _context.SaveChanges();
            }
        }
    }
}
