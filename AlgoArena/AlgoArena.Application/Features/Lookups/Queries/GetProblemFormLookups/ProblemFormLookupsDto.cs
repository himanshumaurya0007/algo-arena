using AlgoArena.Application.Features.Lookups.DTOs;

namespace AlgoArena.Application.Features.Lookups.Queries.GetProblemFormLookups
{
    public sealed class ProblemFormLookupsDto
    {
        public IReadOnlyList<LookupDto> DifficultyLevels { get; set; } =
            [];

        public IReadOnlyList<LookupDto> ProgrammingDomains { get; set; } =
            [];

        public IReadOnlyList<LookupDto> ProgrammingLanguages { get; set; } =
            [];

        public IReadOnlyList<LookupDto> Tags { get; set; } =
            [];
    }
}