using TableApp.Models;

namespace TableApp.Repositories;

public interface ICommentRepository
{
    void Add(Comment comment);
    void Update(int id, Comment comment);
    void Delete(int id);
    Comment? GetById(int id);
    IEnumerable<Comment> GetAll();
}