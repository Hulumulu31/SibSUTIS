using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var watch = Stopwatch.StartNew();

        _logger.LogInformation("Handling request: {Method} {Url}", context.Request.Method, context.Request.Path);

        await _next(context); // Передаем запрос дальше по конвейеру

        watch.Stop();

        _logger.LogInformation("Handled request: {Method} {Url} - {StatusCode} in {ElapsedMilliseconds}ms", 
            context.Request.Method, context.Request.Path, context.Response.StatusCode, watch.ElapsedMilliseconds);
    }
}
