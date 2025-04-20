"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Function to detect and format code blocks in text
function formatTextWithCode(text) {
  if (!text) return null;
  
  // If text doesn't contain code markers, return it as is
  if (!text.includes("```")) {
    return <span>{text}</span>;
  }
  
  // Parse text to separate code blocks from regular text
  const segments = [];
  let currentPosition = 0;
  let codeBlockRegex = /```(java|javascript|python)?\n([\s\S]*?)```/g;
  let match;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before code block if any
    if (match.index > currentPosition) {
      segments.push({
        type: 'text',
        content: text.slice(currentPosition, match.index)
      });
    }
    
    // Add code block
    segments.push({
      type: 'code',
      language: match[1] || 'java',
      content: match[2]
    });
    
    currentPosition = match.index + match[0].length;
  }
  
  // Add remaining text after last code block if any
  if (currentPosition < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(currentPosition)
    });
  }
  
  // Render segments
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        } else {
          return (
            <SyntaxHighlighter
              key={index}
              language={segment.language}
              style={vscDarkPlus}
              className="rounded-md my-2"
              wrapLines={true}
              customStyle={{ margin: '0.5rem 0' }}
            >
              {segment.content}
            </SyntaxHighlighter>
          );
        }
      })}
    </>
  );
}

export default function Quiz({ questions, title = "Quiz" }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const total = questions.length;
  const optionLetters = ["A", "B", "C", "D", "E", "F"];

  const handleClick = (option) => {
    const isCorrect = option === questions[current].answer;
    if (isCorrect) setScore(score + 1);

    setAnswers([
      ...answers,
      {
        question: questions[current].question,
        selected: option,
        correct: questions[current].answer,
        isCorrect,
      },
    ]);

    const next = current + 1;
    if (next < total) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const progress = ((current + (finished ? 1 : 0)) / total) * 100;

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-background shadow-xl rounded-3xl border border-border">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">{title}</h1>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-4 mb-8 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quiz Content */}
      {!finished ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Box */}
            <div className="p-6 bg-muted border border-border rounded-xl mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">
                Question {current + 1}: {formatTextWithCode(questions[current].question)}
              </h2>
            </div>

            {/* Options */}
            <div className="grid gap-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClick(option)}
                  className="flex items-start gap-4 px-4 py-3 border border-primary bg-background rounded-xl hover:bg-primary hover:text-primary-foreground transition text-left shadow-sm text-foreground"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 mt-1 rounded-full border-2 border-primary font-bold">
                    {optionLetters[idx]}
                  </div>
                  <div className="font-medium w-full">{formatTextWithCode(option)}</div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Question {current + 1} of {total}
            </p>
          </motion.div>
        </AnimatePresence>
      ) : (
        // Results
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">
            You scored {score} / {total}
          </h2>

          {/* Review Section */}
          <div className="mt-6 space-y-6">
            {answers.map((a, i) => (
              <div
                key={i}
                className={`p-5 border-2 rounded-xl ${
                  a.isCorrect
                    ? "border-green-500 bg-green-500/10"
                    : "border-red-500 bg-red-500/10"
                }`}
              >
                <p className="font-semibold mb-2 text-foreground">
                  Q{i + 1}: {formatTextWithCode(a.question)}
                </p>
                <div className="text-foreground">
                  <span>Your answer: </span>
                  <span
                    className={`font-medium ${
                      a.isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatTextWithCode(a.selected)}
                  </span>{" "}
                  {a.isCorrect ? "✅" : "❌"}
                </div>
                {!a.isCorrect && (
                  <div className="text-foreground mt-2">
                    <span>Correct answer: </span>
                    <span className="font-medium text-green-500">
                      {formatTextWithCode(a.correct)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={restart}
              className="mt-10 px-6 py-3 bg-primary text-primary-foreground text-lg rounded-xl hover:bg-primary/90 transition"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
