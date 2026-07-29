import Editor from "@monaco-editor/react";

const CodeEditor = ({ editor }) => {
  const {
    language,
    theme,
    fontSize,
    code,
    setCode,
  } = editor;

  return (
    <div className="border border-gray-600 rounded-md overflow-hidden flex-1">
      <Editor
        height="100%"
        language={language}
        theme={theme}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: fontSize,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;