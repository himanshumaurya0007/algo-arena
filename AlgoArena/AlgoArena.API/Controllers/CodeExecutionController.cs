using AlgoArena.Application.Features.CodeExecution.Commands.RunCode;
using AlgoArena.Application.Features.CodeExecution.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers
{
    [ApiController]
    [Route("api/code-execution")]
    public sealed class CodeExecutionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CodeExecutionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("run")]
        public async Task<ActionResult<RunCodeResponse>> RunCode(
            [FromBody] RunCodeRequest request,
            CancellationToken cancellationToken)
        {
            // Temporary user ID until authentication is implemented.
            var userId = Guid.Empty;

            var command = new RunCodeCommand(
                userId,
                request);

            var result = await _mediator.Send(
                command,
                cancellationToken);

            return Ok(result);
        }
    }
}