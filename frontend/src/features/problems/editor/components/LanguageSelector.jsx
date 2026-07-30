import languages from "../constants/languages";

const LanguageSelector = ({
  language,
  onLanguageChange,
}) => {
  return (
   <select
  value={language}
  onChange={(e) => onLanguageChange(e.target.value)}
  className="
    border border-gray-600
    rounded-md
    bg-gray-900
    text-white
    px-4
    h-10
    outline-none
    focus:border-orange-500
    transition-colors
  "
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