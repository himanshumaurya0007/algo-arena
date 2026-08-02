using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace AlgoArena.Application.Features.Authentication.Commands.AdminLogin
{
    public sealed class AdminLoginCommandValidator : AbstractValidator<AdminLoginCommand>
    {
        public AdminLoginCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .EmailAddress()
                .WithMessage("Enter a valid email address.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password is required.");
        }
    }
}
