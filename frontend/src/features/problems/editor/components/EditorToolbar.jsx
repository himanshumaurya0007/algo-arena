import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import FontSizeSelector from "./FontSizeSelector";
import ActionButtons from "./ActionButtons";

const EditorToolbar = ({
  language,
  changeLanguage,
  theme,
  changeTheme,
  fontSize,
  changeFontSize,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">

      {/* Center */}
      <div className="flex gap-3">
        <ActionButtons />
      </div>

      {/* Right */}
      <div className="flex gap-3">
        <LanguageSelector
          language={language}
          onLanguageChange={changeLanguage}
        />

        <ThemeSelector
          theme={theme}
          onThemeChange={changeTheme}
        />

        <FontSizeSelector
          fontSize={fontSize}
          onFontSizeChange={changeFontSize}
        />
      </div>

    </div>
  );
};

export default EditorToolbar;