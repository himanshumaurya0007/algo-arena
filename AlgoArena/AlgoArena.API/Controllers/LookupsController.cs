using AlgoArena.Application.Features.Lookups.Queries.GetProblemFormLookups;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers
{
    [ApiController]
    [Route("api/lookups")]
    public sealed class LookupsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LookupsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("problem-form")]
        public async Task<ActionResult<ProblemFormLookupsDto>> GetProblemFormLookups(
            CancellationToken cancellationToken)
        {
            var lookups = await _mediator.Send(
                new GetProblemFormLookupsQuery(),
                cancellationToken);

            return Ok(lookups);
        }
    }
}