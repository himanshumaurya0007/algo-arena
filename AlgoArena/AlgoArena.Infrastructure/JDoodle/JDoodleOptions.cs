namespace AlgoArena.Infrastructure.JDoodle
{
    /// <summary>
    /// Configuration required to communicate with JDoodle Compiler API.
    /// </summary>
    public sealed class JDoodleOptions
    {
        public const string SectionName = "JDoodle";

        public string BaseUrl { get; set; } =
            "https://api.jdoodle.com/v1/";

        public string ClientId { get; set; } = string.Empty;

        public string ClientSecret { get; set; } = string.Empty;
    }
}