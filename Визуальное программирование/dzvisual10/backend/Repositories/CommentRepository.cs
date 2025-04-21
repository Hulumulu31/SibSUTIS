using TableApp.Models;

namespace TableApp.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly Dictionary<int, Comment> _comments = new();

    public IEnumerable<Comment> GetAll() => _comments.Values;

    public Comment? GetById(int id) => _comments.GetValueOrDefault(id);

    public void Add(Comment comment)
    {
        _comments[comment.Id] = comment;    
    }

    public void Delete(int id)
    {
        _comments.Remove(id);
    }


    public void Update(int id, Comment comment)
    {
        if (_comments.ContainsKey(id)) 
        {
            _comments[id] = comment;
        }
    }
}
