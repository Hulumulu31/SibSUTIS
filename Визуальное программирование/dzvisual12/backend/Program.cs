using TableApp.Repositories;  // Для ApplicationDbContext
using TableApp.Services;      // Для CommentService и DatabaseLogger
using Microsoft.EntityFrameworkCore;  // Для UseNpgsql
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddSingleton<ILogger>(provider =>
{
    var context = provider.GetRequiredService<ApplicationDbContext>();
    return new DatabaseLogger(context); // Передаем контекст в DatabaseLogger
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<RequestLoggingMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();
app.MapControllers();

app.Run();
