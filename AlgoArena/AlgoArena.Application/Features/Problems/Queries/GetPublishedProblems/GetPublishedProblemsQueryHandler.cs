using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Interfaces;
using AutoMapper;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetPublishedProblems
{
    public sealed class GetPublishedProblemsQueryHandler
        : IRequestHandler<GetPublishedProblemsQuery, IReadOnlyList<ProblemListItemDto>>
    {
        private readonly IProblemRepository _problemRepository;
        private readonly IMapper _mapper;

        public GetPublishedProblemsQueryHandler(
            IProblemRepository problemRepository,
            IMapper mapper)
        {
            _problemRepository = problemRepository;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ProblemListItemDto>> Handle(
            GetPublishedProblemsQuery request,
            CancellationToken cancellationToken)
        {
            var problems = await _problemRepository.GetPublishedAsync(
                cancellationToken);

            return _mapper.Map<IReadOnlyList<ProblemListItemDto>>(problems);
        }
    }
}