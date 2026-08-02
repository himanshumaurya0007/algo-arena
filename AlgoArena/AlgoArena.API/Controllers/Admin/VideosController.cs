using AlgoArena.Application.Features.Problems.Commands.CreateVideo;
using AlgoArena.Application.Features.Problems.Commands.DeleteVideo;
using AlgoArena.Application.Features.Problems.Commands.UpdateVideo;
using AlgoArena.Application.Features.Problems.DTOs.Videos;
using AlgoArena.Application.Features.Problems.Queries.GetAllVideos;
using AlgoArena.Application.Features.Problems.Queries.GetVideoById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/videos")]
    public sealed class VideosController : ControllerBase
    {
        private readonly ISender _sender;

        public VideosController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AdminVideoDto>>> GetAll(
            CancellationToken cancellationToken)
        {
            var videos = await _sender.Send(
                new GetAllVideosQuery(),
                cancellationToken);

            return Ok(videos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AdminVideoDto>> GetById(
            Guid id,
            CancellationToken cancellationToken)
        {
            var video = await _sender.Send(
                new GetVideoByIdQuery(id),
                cancellationToken);

            if (video is null)
            {
                return NotFound();
            }

            return Ok(video);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(
            CreateVideoCommand command,
            CancellationToken cancellationToken)
        {
            var id = await _sender.Send(
                command,
                cancellationToken);

            return CreatedAtAction(
                nameof(GetById),
                new { id },
                id);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(
            Guid id,
            UpdateVideoCommand command,
            CancellationToken cancellationToken)
        {
            if (id != command.Id)
            {
                return BadRequest("Route id and request id do not match.");
            }

            var updated = await _sender.Send(
                command,
                cancellationToken);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(
            Guid id,
            CancellationToken cancellationToken)
        {
            var deleted = await _sender.Send(
                new DeleteVideoCommand(id),
                cancellationToken);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}