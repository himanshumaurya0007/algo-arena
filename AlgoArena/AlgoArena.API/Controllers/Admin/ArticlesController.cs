using AlgoArena.Application.Features.Problems.Commands.CreateArticle;
using AlgoArena.Application.Features.Problems.Commands.DeleteArticle;
using AlgoArena.Application.Features.Problems.Commands.UpdateArticle;
using AlgoArena.Application.Features.Problems.DTOs.Articles;
using AlgoArena.Application.Features.Problems.Queries.GetAllArticles;
using AlgoArena.Application.Features.Problems.Queries.GetArticleById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/articles")]
    public sealed class ArticlesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ArticlesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AdminArticleDto>>> GetAll(
            CancellationToken cancellationToken)
        {
            var articles = await _mediator.Send(
                new GetAllArticlesQuery(),
                cancellationToken);

            return Ok(articles);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AdminArticleDto>> GetById(
            Guid id,
            CancellationToken cancellationToken)
        {
            var article = await _mediator.Send(
                new GetArticleByIdQuery(id),
                cancellationToken);

            if (article is null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(
            CreateArticleCommand command,
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
            UpdateArticleCommand command,
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
                new DeleteArticleCommand(id),
                cancellationToken);

            return NoContent();
        }
    }
}