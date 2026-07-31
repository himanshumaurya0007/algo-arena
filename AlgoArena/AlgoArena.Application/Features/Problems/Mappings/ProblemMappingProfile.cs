using AlgoArena.Application.Features.Problems.DTOs;
using AlgoArena.Domain.Entities.Problems;
using AutoMapper;

namespace AlgoArena.Application.Features.Problems.Mappings
{
    /// <summary>
    /// AutoMapper profile for Problem mappings.
    /// </summary>
    public sealed class ProblemMappingProfile : Profile
    {
        public ProblemMappingProfile()
        {
            CreateMap<Problem, ProblemDto>()
                .ForMember(
                    destination => destination.ProgrammingDomainName,
                    option => option.MapFrom(source => source.ProgrammingDomain != null
                                        ? source.ProgrammingDomain.Name
                                        : string.Empty))
                .ForMember(
                    destination => destination.DifficultyLevelName,
                    option => option.MapFrom(source => source.DifficultyLevel != null
                                        ? source.DifficultyLevel.Name
                                        : string.Empty));

            CreateMap<Problem, ProblemListItemDto>()
                .ForMember(
                    destination => destination.ProgrammingDomainName,
                    option => option.MapFrom(source => source.ProgrammingDomain != null
                            ? source.ProgrammingDomain.Name
                            : string.Empty))
                .ForMember(
                    destination => destination.DifficultyLevelName,
                    option => option.MapFrom(source => source.DifficultyLevel != null
                            ? source.DifficultyLevel.Name
                            : string.Empty));
        }
    }
}