import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import FontSizeSelector from './FontSizeSelector';
import ActionButtons from './ActionButtons';

const EditorToolbar = ({
  language,
  programmingLanguageId,
  code,
  problemId,
  changeLanguage,
  theme,
  changeTheme,
  fontSize,
  changeFontSize,
  onRunResult,
}) => {
  return (
    <div className="flex items-center justify-between border border-gray-600 rounded-md p-3 mb-3">

      {/* Run / Submit */}
      <div className="flex gap-3">
        <ActionButtons
          problemId={problemId}
          programmingLanguageId={programmingLanguageId}
          sourceCode={code}
          onRunResult={onRunResult}
        />
      </div>

      {/* Editor Settings */}
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