using MediatR;

namespace AlgoArena.Application.Features.Problems.Commands.DeleteArticle
{
    public sealed record DeleteArticleCommand(Guid Id) : IRequest;
}