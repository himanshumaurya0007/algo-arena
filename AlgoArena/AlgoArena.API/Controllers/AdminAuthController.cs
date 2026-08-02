using AlgoArena.Application.Features.Authentication.Commands.AdminLogin;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AlgoArena.API.Controllers
{
    [ApiController]
    [Route("api/admin/auth")]
    public sealed class AdminAuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminAuthController(IMediator mediator)
        {
            _mediator = mediator;
        }


        /// <summary>
        /// Authenticates an admin user.
        /// </summary>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login(
            [FromBody] AdminLoginCommand command)
        {
            var response = await _mediator.Send(command);

            if (!response.Success)
            {
                return Unauthorized(response);
            }

            return Ok(response);
        }
    }
}