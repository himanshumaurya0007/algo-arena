using AlgoArena.Domain.Entities.Analytics;
using AlgoArena.Domain.Entities.Audit;
using AlgoArena.Domain.Entities.Identity;
using AlgoArena.Domain.Entities.Lookups;
using AlgoArena.Domain.Entities.Problems;
using AlgoArena.Domain.Entities.Profiles;
using AlgoArena.Domain.Entities.Submissions;
using Microsoft.EntityFrameworkCore;

namespace AlgoArena.Persistence.Data
{
    public sealed class AlgoArenaDbContext : DbContext
    {
        public AlgoArenaDbContext(DbContextOptions<AlgoArenaDbContext> options) : base(options)
        {
        }

        #region Identity

        public DbSet<User> Users => Set<User>();

        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

        #endregion

        #region Profiles

        public DbSet<UserProfile> UserProfiles => Set<UserProfile>();

        public DbSet<EducationDetail> EducationDetails => Set<EducationDetail>();

        public DbSet<ProfessionalDetail> ProfessionalDetails => Set<ProfessionalDetail>();

        public DbSet<SocialMediaLink> SocialMediaLinks => Set<SocialMediaLink>();

        #endregion

        #region Lookups

        public DbSet<Role> Roles => Set<Role>();

        public DbSet<AccountStatus> AccountStatuses => Set<AccountStatus>();

        public DbSet<Gender> Genders => Set<Gender>();

        public DbSet<EducationLevel> EducationLevels => Set<EducationLevel>();

        public DbSet<ExperienceLevel> ExperienceLevels => Set<ExperienceLevel>();

        public DbSet<DifficultyLevel> DifficultyLevels => Set<DifficultyLevel>();

        public DbSet<ProgrammingDomain> ProgrammingDomains => Set<ProgrammingDomain>();

        public DbSet<ProgrammingLanguage> ProgrammingLanguages => Set<ProgrammingLanguage>();

        public DbSet<Tag> Tags => Set<Tag>();

        public DbSet<SubmissionStatus> SubmissionStatuses => Set<SubmissionStatus>();

        #endregion

        #region Problems

        public DbSet<Problem> Problems => Set<Problem>();

        public DbSet<ProblemArticle> ProblemArticles => Set<ProblemArticle>();

        public DbSet<ProblemBoilerplate> ProblemBoilerplates => Set<ProblemBoilerplate>();

        public DbSet<ProblemExample> ProblemExamples => Set<ProblemExample>();

        public DbSet<ProblemHint> ProblemHints => Set<ProblemHint>();

        public DbSet<ProblemTag> ProblemTags => Set<ProblemTag>();

        public DbSet<ProblemTestCase> ProblemTestCases => Set<ProblemTestCase>();

        public DbSet<ProblemVideo> ProblemVideos => Set<ProblemVideo>();

        #endregion

        #region Analytics

        public DbSet<UserProblem> UserProblems => Set<UserProblem>();

        #endregion

        #region Submissions

        public DbSet<Submission> Submissions => Set<Submission>();

        public DbSet<SubmissionTestCaseResult> SubmissionTestCaseResults => Set<SubmissionTestCaseResult>();

        #endregion

        #region Audit

        public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AlgoArenaDbContext).Assembly);
        }
    }
}