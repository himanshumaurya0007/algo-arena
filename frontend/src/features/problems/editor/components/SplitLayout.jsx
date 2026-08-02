// import { useState } from 'react';
// import CodeEditor from './CodeEditor';
// import EditorToolbar from './EditorToolbar';
// import ProblemPanel from './ProblemPanel';
// import TestCases from './TestCases';
// import TestResults from './TestResults';
// import useEditor from '../hooks/useEditor';

// const SplitLayout = ({ problem }) => {
//   const editor = useEditor(problem?.boilerplates);

//   const [runResult, setRunResult] = useState(null);

//   return (
//     <div className="space-y-5 p-6">

//       <div className="grid grid-cols-2 gap-5">

//         <ProblemPanel problem={problem} />

//         <div className="flex flex-col">

//           <EditorToolbar
//             language={editor.language}
//             programmingLanguageId={editor.programmingLanguageId}
//             code={editor.code}
//             problemId={problem?.id}
//             changeLanguage={editor.changeLanguage}
//             theme={editor.theme}
//             changeTheme={editor.changeTheme}
//             fontSize={editor.fontSize}
//             changeFontSize={editor.changeFontSize}
//             onRunResult={setRunResult}
//           />

//           <div className="h-[620px]">
//             <CodeEditor editor={editor} />
//           </div>

//         </div>
//       </div>

//       <div className="mt-5 grid grid-cols-2 gap-5">

//         <TestCases
//           testCases={problem?.testCases}
//         />

//         <TestResults
//           result={runResult}
//         />

//       </div>

//     </div>
//   );
// };

// export default SplitLayout;


import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';
import ProblemPanel from './ProblemPanel';
import TestCases from './TestCases';
import TestResults from './TestResults';
import useEditor from '../hooks/useEditor';

const SplitLayout = ({ problem }) => {
  const editor = useEditor(problem?.boilerplates);

  console.log("========== SPLIT LAYOUT ==========");
  console.log("Problem object:", problem);
  console.log("Problem ID:", problem?.id);
  console.log("Problem ID type:", typeof problem?.id);
  console.log("==================================");

  return (
    <div className="space-y-5 p-6">

      <div className="grid grid-cols-2 gap-5">

        <ProblemPanel problem={problem} />

        <div className="flex flex-col">

          <EditorToolbar
            language={editor.language}
            programmingLanguageId={editor.programmingLanguageId}
            code={editor.code}
            problemId={problem?.id}
            changeLanguage={editor.changeLanguage}
            theme={editor.theme}
            changeTheme={editor.changeTheme}
            fontSize={editor.fontSize}
            changeFontSize={editor.changeFontSize}
          />

          <div className="h-[620px]">
            <CodeEditor editor={editor} />
          </div>

        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">

        <TestCases
          testCases={problem?.testCases}
        />

        <TestResults />

      </div>

    </div>
  );
};

export default SplitLayout;