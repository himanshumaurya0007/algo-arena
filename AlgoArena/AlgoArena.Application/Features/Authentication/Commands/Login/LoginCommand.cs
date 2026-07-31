using AlgoArena.Application.Features.Authentication.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.Authentication.Commands.Login;

public sealed class LoginCommand : IRequest<LoginResponse>
{
    public string Email { get; init; } = string.Empty;

    public string Password { get; init; } = string.Empty;
}