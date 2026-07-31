using AlgoArena.Application.Features.Problems.DTOs.Articles;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetArticleById
{
    public sealed record GetArticleByIdQuery(Guid Id)
        : IRequest<AdminArticleDto?>;
}