using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Queries.GetPrimaryArticleByProblemSlug;
using AlgoArena.Application.Features.Problems.Queries.GetProblemBySlug;
using AlgoArena.Application.Features.Problems.Queries.GetPublishedProblems;
using AlgoArena.Application.Features.Problems.Queries.GetVideosByProblemSlug;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using AlgoArena.Application.Features.Problems.Queries.GetPublishedVideos;

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

        [HttpGet("videos")]
        public async Task<ActionResult<IReadOnlyList<ProblemVideoDto>>> GetPublishedVideos(
            CancellationToken cancellationToken)
        {
            var videos = await _mediator.Send(
                new GetPublishedVideosQuery(),
                cancellationToken);

            return Ok(videos);
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


        [HttpGet("{slug}/article")]
        public async Task<ActionResult<ProblemArticleDto>> GetPrimaryArticle(
            string slug,
            CancellationToken cancellationToken)
        {
            var article = await _mediator.Send(
                new GetPrimaryArticleByProblemSlugQuery(slug),
                cancellationToken);

            if (article is null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        [HttpGet("{slug}/videos")]
        public async Task<ActionResult<IReadOnlyList<ProblemVideoDto>>> GetVideosByProblemSlug(
            string slug,
            CancellationToken cancellationToken)
        {
            var videos = await _mediator.Send(
                new GetVideosByProblemSlugQuery(slug),
                cancellationToken);

            return Ok(videos);
        }
    }
}