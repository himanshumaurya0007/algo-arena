using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Interfaces;
using AutoMapper;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetAllProblems
{
    /// <summary>
    /// Handles retrieval of all programming problems.
    /// </summary>
    public sealed class GetAllProblemsQueryHandler
        : IRequestHandler<GetAllProblemsQuery, IReadOnlyList<ProblemDto>>
    {
        private readonly IProblemRepository _problemRepository;
        private readonly IMapper _mapper;

        public GetAllProblemsQueryHandler(
            IProblemRepository problemRepository,
            IMapper mapper)
        {
            _problemRepository = problemRepository;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ProblemDto>> Handle(
            GetAllProblemsQuery request,
            CancellationToken cancellationToken)
        {
            var problems = await _problemRepository.GetAllAsync(
                cancellationToken);

            return _mapper.Map<IReadOnlyList<ProblemDto>>(problems);
        }
    }
}