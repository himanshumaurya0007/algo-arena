using AlgoArena.Application.Features.CodeExecution.DTOs;
using MediatR;

namespace AlgoArena.Application.Features.CodeExecution.Commands.RunCode
{
    public sealed record RunCodeCommand(
        Guid UserId,
        RunCodeRequest Request
    ) : IRequest<RunCodeResponse>;
}