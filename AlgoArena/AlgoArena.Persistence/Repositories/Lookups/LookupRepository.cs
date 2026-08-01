using AlgoArena.Application.Features.Lookups.DTOs;
using AlgoArena.Application.Features.Lookups.Interfaces;
using AlgoArena.Persistence.Data;
using Microsoft.EntityFrameworkCore;

namespace AlgoArena.Persistence.Repositories.Lookups
{
    public sealed class LookupRepository : ILookupRepository
    {
        private readonly AlgoArenaDbContext _dbContext;

        public LookupRepository(AlgoArenaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IReadOnlyList<LookupDto>> GetDifficultyLevelsAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.DifficultyLevels
                .AsNoTracking()
                .Where(level => level.IsActive && !level.IsDeleted)
                .OrderBy(level => level.DisplayOrder)
                .Select(level => new LookupDto
                {
                    Id = level.Id,
                    Name = level.Name,
                    DisplayOrder = level.DisplayOrder
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<LookupDto>> GetProgrammingDomainsAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProgrammingDomains
                .AsNoTracking()
                .Where(domain => domain.IsActive && !domain.IsDeleted)
                .OrderBy(domain => domain.DisplayOrder)
                .Select(domain => new LookupDto
                {
                    Id = domain.Id,
                    Name = domain.Name,
                    DisplayOrder = domain.DisplayOrder
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<LookupDto>> GetProgrammingLanguagesAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.ProgrammingLanguages
                .AsNoTracking()
                .Where(language => language.IsActive && !language.IsDeleted)
                .OrderBy(language => language.DisplayOrder)
                .Select(language => new LookupDto
                {
                    Id = language.Id,
                    Name = language.Name,
                    DisplayOrder = language.DisplayOrder
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyList<LookupDto>> GetTagsAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.Tags
                .AsNoTracking()
                .Where(tag => tag.IsActive && !tag.IsDeleted)
                .OrderBy(tag => tag.DisplayOrder)
                .Select(tag => new LookupDto
                {
                    Id = tag.Id,
                    Name = tag.Name,
                    DisplayOrder = tag.DisplayOrder
                })
                .ToListAsync(cancellationToken);
        }
    }
}