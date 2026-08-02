using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.CreateVideo
{
    public sealed record CreateVideoCommand(
        Guid ProblemId,
        string Title,
        string VideoUrl,
        byte DisplayOrder,
        bool IsPrimary) : IRequest<Guid>;
}