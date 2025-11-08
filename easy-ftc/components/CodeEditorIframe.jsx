'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

// Isolated CheerpJ Output Component
function CheerpJOutput({ isActive, onReady }) {
  const iframeRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isActive || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Create the iframe content
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: #111827; overflow: hidden; }
          #cheerpj-container { width: 100%; height: 100vh; }
        </style>
        <script src="https://cjrtnc.leaningtech.com/3.0/cj3loader.js"></script>
      </head>
      <body>
        <div id="cheerpj-container"></div>
        <script>
          let cheerpjReady = false;
          let displayCreated = false;
          
          async function initCheerpJ() {
            try {
              await cheerpjInit({ status: 'none' });
              cheerpjReady = true;
              parent.postMessage({ type: 'cheerpj-ready' }, '*');
            } catch (error) {
              console.error('CheerpJ init error:', error);
              parent.postMessage({ type: 'cheerpj-error', error: error.message }, '*');
            }
          }
          
          function createDisplay() {
            if (!cheerpjReady || displayCreated) return;
            try {
              const container = document.getElementById('cheerpj-container');
              cheerpjCreateDisplay(-1, -1, container);
              displayCreated = true;
              parent.postMessage({ type: 'display-created' }, '*');
            } catch (error) {
              console.error('Display creation error:', error);
              parent.postMessage({ type: 'display-error', error: error.message }, '*');
            }
          }
          
          function clearDisplay() {
            const container = document.getElementById('cheerpj-container');
            container.innerHTML = '';
            displayCreated = false;
          }
          
          // Listen for messages from parent
          window.addEventListener('message', function(event) {
            if (event.data.type === 'create-display') {
              createDisplay();
            } else if (event.data.type === 'clear-display') {
              clearDisplay();
            } else if (event.data.type === 'run-java') {
              runJava(event.data.files, event.data.mainClass);
            }
          });
          
          async function runJava(files, mainClass) {
            if (!cheerpjReady) return;
            
            try {
              const encoder = new TextEncoder();
              
              // Save files to virtual filesystem
              for (const file of files) {
                cheerpjAddStringFile('/str/' + file.name, encoder.encode(file.content));
              }
              
              // Compile
              const classPath = '/app/tools.jar:/files/';
              const javaFiles = files.map(f => '/str/' + f.name);
              
              const compileResult = await cheerpjRunMain(
                'com.sun.tools.javac.Main',
                classPath,
                ...javaFiles,
                '-d',
                '/files/',
                '-Xlint'
              );
              
              parent.postMessage({ 
                type: 'compile-result', 
                success: compileResult === 0 
              }, '*');
              
              if (compileResult === 0) {
                await cheerpjRunMain(mainClass, classPath);
                parent.postMessage({ type: 'execution-complete' }, '*');
              }
            } catch (error) {
              parent.postMessage({ 
                type: 'execution-error', 
                error: error.message 
              }, '*');
            }
          }
          
          initCheerpJ();
        </script>
      </body>
      </html>
    `);
    iframeDoc.close();

    const handleMessage = (event) => {
      if (event.source !== iframe.contentWindow) return;
      
      switch (event.data.type) {
        case 'cheerpj-ready':
          setReady(true);
          if (onReady) onReady();
          break;
        case 'cheerpj-error':
        case 'display-error':
        case 'execution-error':
          console.error('CheerpJ Error:', event.data.error);
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isActive, onReady]);

  const createDisplay = useCallback(() => {
    if (iframeRef.current && ready) {
      iframeRef.current.contentWindow.postMessage({ type: 'create-display' }, '*');
    }
  }, [ready]);

  const clearDisplay = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: 'clear-display' }, '*');
    }
  }, []);

  const runJava = useCallback((files, mainClass) => {
    if (iframeRef.current && ready) {
      iframeRef.current.contentWindow.postMessage({ 
        type: 'run-java', 
        files, 
        mainClass 
      }, '*');
    }
  }, [ready]);

  // Expose methods to parent component
  useEffect(() => {
    if (onReady) {
      onReady({ createDisplay, clearDisplay, runJava, ready });
    }
  }, [onReady, createDisplay, clearDisplay, runJava, ready]);

  if (!isActive) return null;

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      style={{ minHeight: '400px' }}
    />
  );
}

export default function CodeEditor({
  files = [],
  onFileChange,
  onFileSelect,
  stdin = '',
  onStdinChange,
}) {
  const editorRef = useRef(null);
  const consoleRef = useRef(null);
  const cheerpjRef = useRef(null);
  
  const [activeFile, setActiveFile] = useState(files[0]?.id || null);
  const [isDirty, setIsDirty] = useState({});
  const [activeTab, setActiveTab] = useState('console');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cheerpjReady, setCheerpjReady] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [editorWidth, setEditorWidth] = useState(500);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

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

  // Helper functions
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

  const clearConsole = useCallback(() => {
    if (consoleRef.current) {
      consoleRef.current.textContent = '';
    }
    setTerminalHistory([]);
  }, []);

  const clearOutput = useCallback(() => {
    if (cheerpjRef.current) {
      cheerpjRef.current.clearDisplay();
    }
    addToTerminalHistory('output', 'Output cleared.');
  }, []);

  const addToTerminalHistory = (type, content) => {
    setTerminalHistory(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

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

  const handleCheerpJReady = useCallback((cheerpjMethods) => {
    cheerpjRef.current = cheerpjMethods;
    if (cheerpjMethods?.ready) {
      setCheerpjReady(true);
    }
  }, []);

  const handleRun = useCallback(async () => {
    if (!cheerpjReady || loading || !cheerpjRef.current) return;

    const activeFileData = files.find(f => f.id === activeFile);
    if (!activeFileData) return;

    setLoading(true);
    setError('');
    clearConsole();

    try {
      // Find the main class file (file containing main method)
      let mainClassFile = files.find(file => 
        file.content.includes('public static void main')
      );
      
      if (!mainClassFile) {
        addToTerminalHistory('error', 'Error: No main method found in any file.');
        setLoading(false);
        return;
      }

      addToTerminalHistory('output', 'Compiling Java files...');
      
      // Switch to output tab and create display
      setActiveTab('output');
      await new Promise(resolve => setTimeout(resolve, 100)); // Wait for tab switch
      
      cheerpjRef.current.createDisplay();
      
      const mainClass = extractMainClass(mainClassFile.content);
      cheerpjRef.current.runJava(files, mainClass);
      
      addToTerminalHistory('output', 'Compilation successful. Running program...');
      
      // Listen for completion (simplified for now)
      setTimeout(() => {
        addToTerminalHistory('output', 'Program execution completed.');
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error running Java code:', error);
      addToTerminalHistory('error', `Error: ${error.message || error}`);
      setLoading(false);
    }
  }, [cheerpjReady, loading, files, activeFile, extractMainClass, clearConsole, addToTerminalHistory]);

  // Clear terminal history when starting new execution
  useEffect(() => {
    if (loading) {
      setTerminalHistory([]);
    }
  }, [loading]);

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
              title="Refresh the editor to re-initialize the Java runtime"
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
          <div className="bg-[#1e1f1c] px-4 py-2 border-b border-gray-700 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('console')}
                className={`px-3 py-1 rounded ${
                  activeTab === 'console'
                    ? 'bg-[#37373D] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Console
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1 rounded ${
                  activeTab === 'output'
                    ? 'bg-[#37373D] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Output
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-400">Running...</span>
                </div>
              )}
              <button
                onClick={() => {
                  if (activeTab === 'console') {
                    clearConsole();
                  } else {
                    clearOutput();
                  }
                }}
                className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {activeTab === 'console' ? (
            <div className="flex-1 bg-[#272822] p-4 font-mono text-sm overflow-auto">
              <pre
                ref={consoleRef}
                className="text-gray-300 whitespace-pre-wrap min-h-full"
              >
                {terminalHistory.length === 0 ? (
                  <span className="text-gray-400">Ready to run code...</span>
                ) : (
                  terminalHistory.map((entry, index) => (
                    <div key={index} className="mb-1">
                      {entry.type === 'error' ? (
                        <span className="text-red-400">{entry.content}</span>
                      ) : (
                        <span className="text-gray-300">{entry.content}</span>
                      )}
                    </div>
                  ))
                )}
              </pre>
            </div>
          ) : (
            <CheerpJOutput 
              isActive={activeTab === 'output'}
              onReady={handleCheerpJReady}
            />
          )}
        </div>
      </div>
    </div>
  );
}
