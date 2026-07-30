using FluentValidation;

namespace AlgoArena.Application.Features.Problems.Commands.CreateProblem
{
    /// <summary>
    /// Validator for CreateProblemCommand.
    /// </summary>
    public sealed class CreateProblemCommandValidator
        : AbstractValidator<CreateProblemCommand>
    {
        public CreateProblemCommandValidator()
        {
            RuleFor(x => x.ProgrammingDomainId)
                .NotEmpty();

            RuleFor(x => x.DifficultyLevelId)
                .NotEmpty();

            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Slug)
                .NotEmpty()
                .MaximumLength(250);

            RuleFor(x => x.Description)
                .NotEmpty();

            RuleFor(x => x.Constraints)
                .NotEmpty();

            RuleFor(x => x.TimeLimitInMilliseconds)
                .GreaterThan(0);

            RuleFor(x => x.MemoryLimitInMegabytes)
                .GreaterThan(0);
        }
    }
}