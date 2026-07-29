// import LanguageSelector from "./LanguageSelector";
// import ThemeSelector from "./ThemeSelector";
// import FontSizeSelector from "./FontSizeSelector";
// import ActionButtons from "./ActionButtons";

// const EditorHeader = ({ editor }) => {

//   const {
//   language,
//   theme,
//   fontSize,
//   changeLanguage,
//   setTheme,
//   setFontSize,
// } = editor;

//   return (
//     <div className="flex items-center justify-between border rounded-lg p-4">

//       <h2 className="text-2xl font-bold text-orange-500">
//         AlgoArena
//       </h2>

//       <div className="flex items-center gap-3">
//         <LanguageSelector 
//     language={language}
//     onLanguageChange={changeLanguage}
// />
        
//        <ThemeSelector
//   theme={theme}
//   onThemeChange={setTheme}
// />
//         <FontSizeSelector
//   fontSize={fontSize}
//   onFontSizeChange={(value) => setFontSize(Number(value))}
// />
//       </div>

//       <ActionButtons />

//     </div>
//   );
// };

// export default EditorHeader;

// const EditorHeader = () => {
//   return (
//     <div className="border rounded-lg p-4">
//       <h2 className="text-2xl font-bold text-orange-500">
//         AlgoArena
//       </h2>
//     </div>
//   );
// };

// export default EditorHeader;


const EditorHeader = () => {
  return (
    <div className="border rounded-lg p-4 mb-5">
      <h1 className="text-3xl font-bold text-orange-500">
        AlgoArena
      </h1>
    </div>
  );
};

export default EditorHeader;