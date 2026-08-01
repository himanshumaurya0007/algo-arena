using MediatR;

namespace AlgoArena.Application.Features.Lookups.Queries.GetProblemFormLookups
{
    public sealed record GetProblemFormLookupsQuery
        : IRequest<ProblemFormLookupsDto>;
}