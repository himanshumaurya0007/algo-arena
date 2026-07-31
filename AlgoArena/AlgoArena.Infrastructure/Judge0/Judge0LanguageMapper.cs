namespace AlgoArena.Infrastructure.Judge0
{
    public static class Judge0LanguageMapper
    {
        private static readonly Dictionary<string, int> LanguageMap =
            new(StringComparer.OrdinalIgnoreCase)
            {
                ["C"] = 50,
                ["C++"] = 54,
                ["Java"] = 62,
                ["Python"] = 71,
                ["C#"] = 51,
                ["JavaScript"] = 63
            };

        public static int GetJudge0LanguageId(string languageName)
        {
            if (!LanguageMap.TryGetValue(
                    languageName,
                    out var languageId))
            {
                throw new InvalidOperationException(
                    $"Programming language '{languageName}' is not supported by Judge0.");
            }

            return languageId;
        }
    }
}