using AlgoArena.Application.Features.Problems.DTOs.Articles;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllArticles
{
    public sealed record GetAllArticlesQuery
        : IRequest<IReadOnlyList<AdminArticleDto>>;
}