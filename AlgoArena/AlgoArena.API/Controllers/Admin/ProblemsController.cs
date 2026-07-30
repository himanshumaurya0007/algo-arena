using AlgoArena.Application.Features.Problems.Commands.CreateProblem;
using AlgoArena.Application.Features.Problems.Commands.DeleteProblem;
using AlgoArena.Application.Features.Problems.Commands.PublishProblem;
using AlgoArena.Application.Features.Problems.Commands.UnpublishProblem;
using AlgoArena.Application.Features.Problems.Commands.UpdateProblem;
using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Queries.GetAllProblems;
using AlgoArena.Application.Features.Problems.Queries.GetProblemById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/problems")]
    public sealed class ProblemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProblemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProblemDto>>> GetAll(
            CancellationToken cancellationToken)
        {
            var problems = await _mediator.Send(
                new GetAllProblemsQuery(),
                cancellationToken);

            return Ok(problems);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProblemDto>> GetById(
            Guid id,
            CancellationToken cancellationToken)
        {
            var problem = await _mediator.Send(
                new GetProblemByIdQuery(id),
                cancellationToken);

            if (problem is null)
            {
                return NotFound();
            }

            return Ok(problem);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(
            CreateProblemCommand command,
            CancellationToken cancellationToken)
        {
            var id = await _mediator.Send(
                command,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetById),
                new { id },
                id);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<Guid>> Update(
            Guid id,
            UpdateProblemCommand command,
            CancellationToken cancellationToken)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            var result = await _mediator.Send(
                command,
                cancellationToken);

            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(
            Guid id,
            CancellationToken cancellationToken)
        {
            await _mediator.Send(
                new DeleteProblemCommand(id),
                cancellationToken);

            return NoContent();
        }

        [HttpPatch("{id:guid}/publish")]
        public async Task<IActionResult> Publish(
            Guid id,
            CancellationToken cancellationToken)
        {
            await _mediator.Send(
                new PublishProblemCommand(id),
                cancellationToken);

            return NoContent();
        }

        [HttpPatch("{id:guid}/unpublish")]
        public async Task<IActionResult> Unpublish(
            Guid id,
            CancellationToken cancellationToken)
        {
            await _mediator.Send(
                new UnpublishProblemCommand(id),
                cancellationToken);

            return NoContent();
        }
    }
}