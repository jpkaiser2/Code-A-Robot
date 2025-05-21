'use client';

import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function CodeEditor({
  initialCode = '',
  language = 'java',
  height = '600px',
  width = '100%',
  onChange,
  readOnly = false,
  showLineNumbers = true,
  showGutter = true,
  fontSize = 14,
  tabSize = 2,
  className = '',
  stdin = '',
  onStdinChange,
  stdout = '',
  stderr = '',
  compileOutput = '',
  exitCode = null,
  executionTime = null,
  memory = null,
}) {
  const editorRef = useRef(null);
  const [code, setCode] = useState(initialCode);
  const [cursorPosition, setCursorPosition] = useState({ row: 1, column: 1 });
  const [selection, setSelection] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [activeTab, setActiveTab] = useState('output'); // 'output' or 'input'

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: showLineNumbers,
        showGutter: showGutter,
        fontSize: fontSize,
        tabSize: tabSize,
      });

      // Add event listeners for cursor position and selection
      editorRef.current.editor.on('changeCursor', () => {
        const cursor = editorRef.current.editor.getCursorPosition();
        setCursorPosition(cursor);
      });

      editorRef.current.editor.on('changeSelection', () => {
        const selectedText = editorRef.current.editor.getSelectedText();
        setSelection(selectedText);
      });
    }
  }, [showLineNumbers, showGutter, fontSize, tabSize]);

  const handleChange = (newValue) => {
    setCode(newValue);
    setIsDirty(true);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex rounded-lg overflow-hidden border border-gray-700 bg-[#272822] ${className}`}>
      {/* Main Editor */}
      <div className="flex flex-col flex-1 min-w-[600px]">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1f1c] border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {language.toUpperCase()}
            </div>
            {isDirty && (
              <div className="text-sm text-yellow-400">
                • Modified
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {showLineNumbers && `Ln ${cursorPosition.row}, Col ${cursorPosition.column}`}
            </div>
            {selection && (
              <div className="text-sm text-gray-400">
                {selection.length} chars selected
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <AceEditor
            ref={editorRef}
            mode={language}
            theme="monokai"
            value={code}
            onChange={handleChange}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: showLineNumbers,
              showGutter: showGutter,
              fontSize: fontSize,
              tabSize: tabSize,
              highlightActiveLine: true,
              highlightGutterLine: true,
              showPrintMargin: false,
              scrollPastEnd: 0.5,
              useSoftTabs: true,
              useWorker: true,
            }}
            width="100%"
            height={height}
            readOnly={readOnly}
            className="rounded-lg"
          />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#1e1f1c] border-t border-gray-700 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <div>UTF-8</div>
            <div>{language.toUpperCase()}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div>Spaces: {tabSize}</div>
            <div>Ln {cursorPosition.row}, Col {cursorPosition.column}</div>
          </div>
        </div>
      </div>

      {/* Terminal/Output Panel */}
      <div className="flex flex-col w-[400px] border-l border-gray-700">
        {/* Terminal Tabs */}
        <div className="flex bg-[#1e1f1c] border-b border-gray-700">
          <button
            className={`px-4 py-2 text-sm ${activeTab === 'output' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('output')}
          >
            Output
          </button>
          <button
            className={`px-4 py-2 text-sm ${activeTab === 'input' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('input')}
          >
            Input
          </button>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 bg-[#1e1f1c] p-4 font-mono text-sm">
          {activeTab === 'output' ? (
            <div className="space-y-4">
              {stdout && (
                <div className="text-gray-200">
                  <div className="text-gray-400 mb-1">Output:</div>
                  <pre className="whitespace-pre-wrap">{stdout}</pre>
                </div>
              )}
              {stderr && (
                <div className="text-red-400">
                  <div className="text-gray-400 mb-1">Error:</div>
                  <pre className="whitespace-pre-wrap">{stderr}</pre>
                </div>
              )}
              {compileOutput && (
                <div className="text-yellow-400">
                  <div className="text-gray-400 mb-1">Compilation:</div>
                  <pre className="whitespace-pre-wrap">{compileOutput}</pre>
                </div>
              )}
              {(exitCode !== null || executionTime !== null || memory !== null) && (
                <div className="text-gray-400 text-xs mt-4 pt-4 border-t border-gray-700">
                  {exitCode !== null && <div>Exit Code: {exitCode}</div>}
                  {executionTime !== null && <div>Time: {executionTime}ms</div>}
                  {memory !== null && <div>Memory: {memory}KB</div>}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-gray-400 mb-2">Standard Input:</div>
              <textarea
                value={stdin}
                onChange={(e) => onStdinChange?.(e.target.value)}
                className="w-full h-[200px] bg-[#272822] text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Enter input here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 