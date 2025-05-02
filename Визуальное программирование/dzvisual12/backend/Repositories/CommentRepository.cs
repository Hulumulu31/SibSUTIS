using Microsoft.EntityFrameworkCore;
using TableApp.Models;

namespace TableApp.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Comment> GetAll() => _context.Comments.ToList();

        public Comment? GetById(int id) => _context.Comments.Find(id);

        public void Add(Comment comment)
        {
            _context.Comments.Add(comment);
            _context.SaveChanges();
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

        public void Update(int id, Comment comment)
        {
            var existingComment = _context.Comments.Find(id);
            if (existingComment != null)
            {
                existingComment.Name = comment.Name;
                existingComment.Email = comment.Email;
                existingComment.Body = comment.Body;
                existingComment.PostId = comment.PostId;

                _context.SaveChanges();
            }
        }
    }
}
