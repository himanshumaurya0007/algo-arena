using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Application.Features.Problems.Interfaces;
using AutoMapper;
using MediatR;

namespace AlgoArena.Application.Features.Problems.Queries.GetProblemById
{
    /// <summary>
    /// Handles retrieval of a programming problem by its unique identifier.
    /// </summary>
    public sealed class GetProblemByIdQueryHandler
        : IRequestHandler<GetProblemByIdQuery, ProblemDto?>
    {
        private readonly IProblemRepository _problemRepository;
        private readonly IMapper _mapper;

        public GetProblemByIdQueryHandler(
            IProblemRepository problemRepository,
            IMapper mapper)
        {
            _problemRepository = problemRepository;
            _mapper = mapper;
        }

        public async Task<ProblemDto?> Handle(
            GetProblemByIdQuery request,
            CancellationToken cancellationToken)
        {
            var problem = await _problemRepository.GetByIdAsync(
                request.Id,
                cancellationToken);

            if (problem is null)
            {
                return null;
            }

            return _mapper.Map<ProblemDto>(problem);
        }
    }
}