using TableApp.Models;
using TableApp.Repositories;

namespace TableApp.Services;

public class CommentService
{
    private readonly ICommentRepository _respository;

    public CommentService(ICommentRepository repository)
    {
        _respository = repository; 
    }

    public IEnumerable<Comment> GetAll() => _respository.GetAll();
    public Comment? GetById(int id) => _respository.GetById(id);
    public void Add(Comment comment) => _respository.Add(comment); 
    public void Update(int id, Comment comment) => _respository.Update(id, comment);
    public void Delete(int id) => _respository.Delete(id);
}