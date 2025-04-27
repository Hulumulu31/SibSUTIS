using Microsoft.AspNetCore.Mvc;
using TableApp.Models;
using TableApp.Services;

namespace TableApp.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentsController : ControllerBase
{
    private readonly CommentService _service;
    public CommentsController(CommentService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_service.GetAll());  //200

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var comment = _service.GetById(id);
        return comment == null ? NotFound() : Ok(comment);  
    }

    [HttpPost]
    public IActionResult Add([FromBody] Comment comment)
    {
        _service.Add(comment);
        return CreatedAtAction(nameof(GetById), new {id = comment.Id}, comment); //201
    }

    [HttpPatch("{id}")]
    public IActionResult Update(int id, [FromBody] Comment comment)
    {
        if (_service.GetById(id) == null) {
            return NotFound();  //404
        }

        _service.Update(id, comment);
        return NoContent(); //204 
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (_service.GetById(id) == null) 
            return NotFound();

        _service.Delete(id);
        return NoContent();  //204
    }
}
