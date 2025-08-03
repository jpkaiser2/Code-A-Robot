'use client';

import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import JSZip from 'jszip';

export default function CodeEditor({
  files = [],
  onFileChange,
  onFileSelect,
  stdin = '',
  onStdinChange,
}) {
  const editorRef = useRef(null);
  const [activeFile, setActiveFile] = useState(files[0]?.id || null);
  const [isDirty, setIsDirty] = useState({});
  const [activeTab, setActiveTab] = useState('output');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [submissionToken, setSubmissionToken] = useState(null);
  const pollingInterval = useRef(null);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const inputRef = useRef(null);
  const [editorWidth, setEditorWidth] = useState(500);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

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

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
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

  const handleStop = async () => {
    if (submissionToken) {
      try {
        await fetch('/api/judge0', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: submissionToken,
            action: 'cancel'
          }),
        });
      } catch (err) {
        console.error('Error stopping code:', err);
      }
    }
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
    setLoading(false);
    setSubmissionToken(null);
  };

  const pollResults = async (token) => {
    try {
      const response = await fetch(`/api/judge0?token=${token}`);
      if (!response.ok) {
        throw new Error(`Judge0 error: ${response.status}`);
      }
      const data = await response.json();
      
      if (!data || !data.status) {
        throw new Error('Invalid response from Judge0');
      }

      if (data.status.id > 2) {
        setResult(data);
        setLoading(false);
        setSubmissionToken(null);
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
          pollingInterval.current = null;
        }
      }
    } catch (err) {
      console.error('Polling error:', err);
      setError(err.message);
      setLoading(false);
      setSubmissionToken(null);
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
    }
  };

  const handleRun = async () => {
    const activeFileData = files.find(f => f.id === activeFile);
    if (!activeFileData) return;

    setLoading(true);
    setError('');
    setResult(null);
    setSubmissionToken(null);

    try {
      // Create a zip file containing all Java files
      const zip = new JSZip();
      
      // Add each file to the zip with its proper name
      files.forEach(file => {
        zip.file(file.name, file.content);
      });

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'base64' });

      const response = await fetch('/api/judge0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: zipBlob,
          stdin: stdin,
          language_id: 62, // Java
          is_zip: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Judge0 error: ${response.status}`);
      }

      const data = await response.json();
      setSubmissionToken(data.token);
      
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
      pollingInterval.current = setInterval(() => pollResults(data.token), 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
        pollingInterval.current = null;
      }
    }
  };

  // Add new terminal history entry
  const addToTerminalHistory = (type, content) => {
    setTerminalHistory(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  // Handle terminal input submission
  const handleTerminalInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        addToTerminalHistory('input', currentInput);
        if (onStdinChange) {
          onStdinChange(currentInput);
        }
        setCurrentInput('');
      }
    }
  };

  // Update terminal when output changes
  useEffect(() => {
    if (result && result.stdout) {
      addToTerminalHistory('output', result.stdout);
      // Check if the program is waiting for input
      if (result.stdout.includes('Enter')) {
        setIsWaitingForInput(true);
      }
    }
    if (result && result.stderr) {
      addToTerminalHistory('error', result.stderr);
    }
    if (result && result.compile) {
      addToTerminalHistory('compile', result.compile);
    }
  }, [result]);

  // Focus input when waiting for input
  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput]);

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
          {loading ? (
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Run Code
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
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1 rounded ${
                  activeTab === 'output'
                    ? 'bg-[#37373D] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Terminal
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm text-gray-400">Running...</span>
                </div>
              )}
            </div>
          </div>

          <div className="h-[600px] bg-[#272822] p-4 font-mono text-sm overflow-auto">
            <div className="min-h-full flex flex-col">
              <div className="flex-1">
                {terminalHistory.length === 0 ? (
                  <div className="text-gray-500">
                    <span className="text-gray-500">$ </span>
                    <span className="text-gray-400">Ready to run code...</span>
                  </div>
                ) : (
                  terminalHistory.map((entry, index) => (
                    <div key={index} className="mb-1">
                      {entry.type === 'input' ? (
                        <div className="text-green-400">
                          <span className="text-gray-500">$ </span>
                          {entry.content}
                        </div>
                      ) : entry.type === 'error' ? (
                        <div className="text-red-400">{entry.content}</div>
                      ) : entry.type === 'compile' ? (
                        <div className="text-yellow-400">{entry.content}</div>
                      ) : (
                        <div className="text-gray-300 whitespace-pre-wrap">{entry.content}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {isWaitingForInput && (
                <div className="flex items-center mt-2">
                  <span className="text-gray-500 mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleTerminalInput}
                    className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
                    placeholder="Enter input..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 