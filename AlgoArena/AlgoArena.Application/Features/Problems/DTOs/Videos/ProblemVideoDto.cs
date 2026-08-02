namespace AlgoArena.Application.Features.Problems.DTOs.Videos
{
    public sealed class ProblemVideoDto
    {
        public Guid Id { get; set; }

        public string ProblemTitle { get; set; } = string.Empty;

        public string ProblemSlug { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string VideoUrl { get; set; } = string.Empty;

        public byte DisplayOrder { get; set; }

        public bool IsPrimary { get; set; }
    }
}