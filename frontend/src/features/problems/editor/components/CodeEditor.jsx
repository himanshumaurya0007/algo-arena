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
    <div className="h-full border border-gray-600 rounded-md overflow-hidden">
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

          padding: {
            top: 16,
      },
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};

export default CodeEditor;