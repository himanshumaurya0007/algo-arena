
import ProblemPanel from "./ProblemPanel";
import CodeEditor from "./CodeEditor";
import TestCases from "./TestCases";
import TestResults from "./TestResults";
import EditorToolbar from "./EditorToolbar";
import useEditor from "../hooks/useEditor";

const SplitLayout = () => {

  const editor = useEditor();

  return (
    <div className="p-6 space-y-5">

      {/* <EditorHeader /> */}

      <div className="grid grid-cols-2 gap-5 h-[700px]">

        <ProblemPanel />

        <div className="flex flex-col h-full">

          <EditorToolbar
            language={editor.language}
            changeLanguage={editor.changeLanguage}
            theme={editor.theme}
            changeTheme={editor.changeTheme}
            fontSize={editor.fontSize}
            changeFontSize={editor.changeFontSize}
          />

          <div className="flex-1 min-h-0">
    <CodeEditor editor={editor} />
</div>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-5 mt-5">

        <TestCases />

        <TestResults />

      </div>

    </div>
  );
};

export default SplitLayout;
