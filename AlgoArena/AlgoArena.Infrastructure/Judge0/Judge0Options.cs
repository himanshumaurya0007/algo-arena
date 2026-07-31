namespace AlgoArena.Infrastructure.Judge0
{
    /// <summary>
    /// Configuration settings required to communicate with Judge0.
    /// </summary>
    public sealed class Judge0Options
    {
        public const string SectionName = "Judge0";

        /// <summary>
        /// Judge0 API base URL.
        /// Example: https://ce.judge0.com
        /// </summary>
        public string BaseUrl { get; set; } = string.Empty;

        /// <summary>
        /// Optional API key for hosted Judge0 providers.
        /// </summary>
        public string? ApiKey { get; set; }

        /// <summary>
        /// Optional API host header used by providers such as RapidAPI.
        /// </summary>
        public string? ApiHost { get; set; }
    }
}