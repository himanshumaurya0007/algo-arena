using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using AlgoArena.Persistence.Seeds;

namespace AlgoArena.Persistence.Configurations.Problems
{
    public sealed class ProblemBoilerplateConfiguration : AuditableEntityConfiguration<ProblemBoilerplate>
    {
        public override void Configure(EntityTypeBuilder<ProblemBoilerplate> builder)
        {
            base.Configure(builder);

            builder.ToTable("ProblemBoilerplates");

            builder.HasData(ProblemBoilerplateSeed.Data);

            builder.Property(x => x.TemplateCode)
                .IsRequired();

            builder.HasOne(x => x.Problem)
                .WithMany(x => x.ProblemBoilerplates)
                .HasForeignKey(x => x.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.ProgrammingLanguage)
                .WithMany(x => x.ProblemBoilerplates)
                .HasForeignKey(x => x.ProgrammingLanguageId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}