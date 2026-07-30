using FluentValidation;

namespace AlgoArena.Application.Features.Problems.Commands.UpdateProblem
{
    /// <summary>
    /// Validator for UpdateProblemCommand.
    /// </summary>
    public sealed class UpdateProblemCommandValidator : AbstractValidator<UpdateProblemCommand>
    {
        public UpdateProblemCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty();

            RuleFor(x => x.ProgrammingDomainId)
                .NotEmpty();

            RuleFor(x => x.DifficultyLevelId)
                .NotEmpty();

            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Slug)
                .NotEmpty()
                .MaximumLength(200);

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