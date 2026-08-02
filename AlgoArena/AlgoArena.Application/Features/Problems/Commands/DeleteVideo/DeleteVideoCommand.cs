using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteVideo
{
    public sealed record DeleteVideoCommand(Guid Id) : IRequest<bool>;
}