using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Queries.GetProblemBySlug;
using AlgoArena.Application.Features.Problems.Queries.GetPublishedProblems;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers
{
    [ApiController]
    [Route("api/problems")]
    public sealed class ProblemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProblemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProblemListItemDto>>> GetPublished(
            CancellationToken cancellationToken)
        {
            var problems = await _mediator.Send(
                new GetPublishedProblemsQuery(),
                cancellationToken);

            return Ok(problems);
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<ProblemDetailDto>> GetBySlug(
            string slug,
            CancellationToken cancellationToken)
        {
            var problem = await _mediator.Send(
                new GetProblemBySlugQuery(slug),
                cancellationToken);

            if (problem is null)
            {
                return NotFound();
            }

            return Ok(problem);
        }
    }
}