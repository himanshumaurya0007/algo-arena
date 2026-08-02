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
                                        : string.Empty))
                .ForMember(
                    destination => destination.TagIds,
                    option => option.MapFrom(source => source.ProblemTags.Select(problemTag => problemTag.TagId)))
                .ForMember(
                    destination => destination.Examples,
                    option => option.MapFrom(source => source.ProblemExamples
                    .OrderBy(example => example.DisplayOrder)))

                .ForMember(
                    destination => destination.TestCases,
                    option => option.MapFrom(source => source.ProblemTestCases
                    .OrderBy(testCase => testCase.DisplayOrder)))

                .ForMember(
                    destination => destination.Boilerplates,
                    option => option.MapFrom(source => source.ProblemBoilerplates
                    .OrderBy(boilerplate => boilerplate.ProgrammingLanguage.DisplayOrder)));

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

            CreateMap<ProblemExample, ProblemExampleDto>();

            CreateMap<ProblemTestCase, ProblemTestCaseDto>();

            CreateMap<ProblemBoilerplate, ProblemBoilerplateEditDto>()
                .ForMember(
                    destination => destination.ProgrammingLanguageName,
                    option => option.MapFrom(source =>
                        source.ProgrammingLanguage != null
                            ? source.ProgrammingLanguage.Name
                            : string.Empty));
        }
    }
}