import languages from "../constants/languages";

const LanguageSelector = ({
  language,
  onLanguageChange,
}) => {
  return (
    <select
      value={language}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="border rounded-md px-3 py-2 bg-gray-900 text-white"
    >
      {languages.map((item) => (
        <option
          key={item.id}
          value={item.value}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;