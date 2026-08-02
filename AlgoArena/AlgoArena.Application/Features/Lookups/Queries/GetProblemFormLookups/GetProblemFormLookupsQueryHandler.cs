using AlgoArena.Application.Features.Lookups.Interfaces;
using MediatR;

namespace AlgoArena.Application.Features.Lookups.Queries.GetProblemFormLookups
{
    public sealed class GetProblemFormLookupsQueryHandler
        : IRequestHandler<GetProblemFormLookupsQuery, ProblemFormLookupsDto>
    {
        private readonly ILookupRepository _lookupRepository;

        public GetProblemFormLookupsQueryHandler(
            ILookupRepository lookupRepository)
        {
            _lookupRepository = lookupRepository;
        }

        public async Task<ProblemFormLookupsDto> Handle(
            GetProblemFormLookupsQuery request,
            CancellationToken cancellationToken)
        {
            return new ProblemFormLookupsDto
            {
                DifficultyLevels =
                    await _lookupRepository.GetDifficultyLevelsAsync(
                        cancellationToken),

                ProgrammingDomains =
                    await _lookupRepository.GetProgrammingDomainsAsync(
                        cancellationToken),

                ProgrammingLanguages =
                    await _lookupRepository.GetProgrammingLanguagesAsync(
                        cancellationToken),

                Tags =
                    await _lookupRepository.GetTagsAsync(
                        cancellationToken)
            };
        }
    }
}