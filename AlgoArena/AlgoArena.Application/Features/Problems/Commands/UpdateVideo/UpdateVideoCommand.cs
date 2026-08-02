using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateVideo
{
    public sealed record UpdateVideoCommand(
        Guid Id,
        Guid ProblemId,
        string Title,
        string VideoUrl,
        byte DisplayOrder,
        bool IsPrimary) : IRequest<bool>;
}