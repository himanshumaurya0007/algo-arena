namespace AlgoArena.Application.Features.Lookups.DTOs
{
    public sealed class LookupDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }
    }
}