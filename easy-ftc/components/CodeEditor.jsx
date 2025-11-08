'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function CodeEditor({
  files = [],
  onFileChange,
  onFileSelect,
  stdin = '',
  onStdinChange,
}) {
  const editorRef = useRef(null);
  const consoleRef = useRef(null);
  const outputRef = useRef(null);
  
  const [activeFile, setActiveFile] = useState(files[0]?.id || null);
  const [isDirty, setIsDirty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cheerpjReady, setCheerpjReady] = useState(false);
  const [editorWidth, setEditorWidth] = useState(500);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  // Define helper functions first
  const clearConsole = useCallback(() => {
    if (consoleRef.current) {
      consoleRef.current.textContent = '';
    }
  }, []);

  const clearOutput = useCallback(() => {
    if (outputRef.current) {
      const cheerpjDisplay = document.getElementById('cheerpjDisplay');
      if (cheerpjDisplay) {
        cheerpjDisplay.innerHTML = '';
      }
    }
  }, []);

  const extractMainClass = useCallback((code) => {
    const packageMatch = code.match(/package\s+([^;]+);/);
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    
    if (!classMatch) {
      return 'Main';
    }
    
    const className = classMatch[1];
    
    if (packageMatch) {
      const packageName = packageMatch[1].trim();
      return `${packageName}.${className}`;
    }
    
    return className;
  }, []);

  // Initialize CheerpJ
  useEffect(() => {
    const initializeCheerpJ = async () => {
      try {
        // Load CheerpJ script if not already loaded
        if (!window.cheerpjInit) {
          const script = document.createElement('script');
          script.src = 'https://cjrtnc.leaningtech.com/3.0/cj3loader.js';
          script.onload = async () => {
            await window.cheerpjInit({ status: 'none' });
            if (outputRef.current) {
              window.cheerpjCreateDisplay(-1, -1, outputRef.current);
            }
            setCheerpjReady(true);
          };
          document.head.appendChild(script);
        } else {
          await window.cheerpjInit({ status: 'none' });
          if (outputRef.current) {
            window.cheerpjCreateDisplay(-1, -1, outputRef.current);
          }
          setCheerpjReady(true);
        }
      } catch (error) {
        console.error('Failed to initialize CheerpJ:', error);
        setError('Failed to initialize CheerpJ');
      }
    };

    initializeCheerpJ();
  }, []);

  // Configure editor when it's ready
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        showGutter: true,
        fontSize: 14,
        tabSize: 2,
        highlightActiveLine: true,
        highlightGutterLine: true,
        showPrintMargin: false,
        scrollPastEnd: 0.5,
        useSoftTabs: true,
        useWorker: true,
        wrap: true,
        wrapMethod: 'text',
        indentedSoftWrap: true,
      });
    }
  }, []);

  const handleChange = (newValue) => {
    setIsDirty(prev => ({ ...prev, [activeFile]: true }));
    if (onFileChange) {
      onFileChange(activeFile, newValue);
    }
  };

  const handleFileSelect = (fileId) => {
    setActiveFile(fileId);
    if (onFileSelect) {
      onFileSelect(fileId);
    }
  };

  const handleRun = useCallback(async () => {
    if (!cheerpjReady || loading) return;

    const activeFileData = files.find(f => f.id === activeFile);
    if (!activeFileData) return;

    setLoading(true);
    setError('');
    clearConsole();
    clearOutput();

    try {
      // Save all files to CheerpJ's virtual filesystem
      const encoder = new TextEncoder();
      
      // Find the main class file (file containing main method)
      let mainClassFile = files.find(file => 
        file.content.includes('public static void main')
      );
      
      if (!mainClassFile) {
        if (consoleRef.current) {
          consoleRef.current.textContent += 'Error: No main method found in any file.\n';
        }
        setLoading(false);
        return;
      }

      // Save all files to the virtual filesystem
      for (const file of files) {
        window.cheerpjAddStringFile(`/str/${file.name}`, encoder.encode(file.content));
      }

      // Compile all Java files
      const classPath = '/app/tools.jar:/files/';
      const javaFiles = files.map(f => `/str/${f.name}`);
      
      const compileResult = await window.cheerpjRunMain(
        'com.sun.tools.javac.Main',
        classPath,
        ...javaFiles,
        '-d',
        '/files/',
        '-Xlint'
      );

      // If compilation successful, run the program
      if (compileResult === 0) {
        const mainClass = extractMainClass(mainClassFile.content);
        await window.cheerpjRunMain(mainClass, classPath);
      } else {
        if (consoleRef.current) {
          consoleRef.current.textContent += 'Compilation failed. Check the console for details.\n';
        }
      }
    } catch (error) {
      console.error('Error running Java code:', error);
      if (consoleRef.current) {
        consoleRef.current.textContent += `Error: ${error}\n`;
      }
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [cheerpjReady, loading, files, activeFile, extractMainClass, clearConsole, clearOutput]);

  const activeFileData = files.find(f => f.id === activeFile);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = editorWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const newWidth = dragStartWidth.current + deltaX;
    if (newWidth > 300 && newWidth < window.innerWidth - 400) {
      setEditorWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#1E1E1E] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1f1c] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">JAVA</div>
          {isDirty[activeFile] && (
            <div className="text-sm text-yellow-400">• Modified</div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRun}
            disabled={!cheerpjReady || loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>
          {!cheerpjReady && (
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              title="Refresh the editor"
            >
              Refresh editor
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Editor */}
        <div className="flex flex-col" style={{ width: `${editorWidth}px` }}>
          {/* File Tabs */}
          <div className="flex bg-[#1e1f1c] border-b border-gray-700">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => handleFileSelect(file.id)}
                className={`px-4 py-2 text-sm border-r border-gray-700 flex items-center space-x-2 ${
                  activeFile === file.id
                    ? 'bg-[#272822] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#2d2e28]'
                }`}
              >
                <span>{file.name}</span>
                {isDirty[file.id] && (
                  <span className="text-yellow-400">•</span>
                )}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 relative">
            {activeFileData && (
              <AceEditor
                ref={editorRef}
                mode="java"
                theme="monokai"
                name="code-editor"
                value={activeFileData.content}
                onChange={handleChange}
                width="100%"
                height="100%"
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  showGutter: true,
                  fontSize: 14,
                  tabSize: 2,
                  highlightActiveLine: true,
                  highlightGutterLine: true,
                  showPrintMargin: false,
                  scrollPastEnd: 0.5,
                  useSoftTabs: true,
                  useWorker: true,
                  wrap: true,
                  wrapMethod: 'text',
                  indentedSoftWrap: true,
                }}
              />
            )}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-1 bg-[#1e1f1c] border-t border-gray-700 text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <div>UTF-8</div>
              <div>JAVA</div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div 
          className="w-1 bg-gray-700 cursor-col-resize hover:bg-blue-500 transition-colors"
          onMouseDown={handleMouseDown}
        />

        {/* Terminal Panel */}
        <div className="flex-1 border-l border-gray-700 flex flex-col">
          {/* Console */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1e1f1c] border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-300">Console</div>
              </div>
              <div className="flex items-center space-x-2">
                {loading && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span className="text-sm text-gray-400">Running...</span>
                  </div>
                )}
                <button
                  onClick={clearConsole}
                  className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <pre
              ref={consoleRef}
              id="console"
              className="flex-1 p-4 font-mono text-sm overflow-auto bg-[#272822] text-green-400 whitespace-pre-wrap"
            />
          </div>

          {/* Hidden Result - CheerpJ needs this for output */}
          <div
            ref={outputRef}
            id="output"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
} 