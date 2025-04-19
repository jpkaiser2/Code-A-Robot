"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


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
                Question {current + 1}: {questions[current].question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid gap-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleClick(option)}
                  className="flex items-center gap-4 px-4 py-3 border border-primary bg-background rounded-xl hover:bg-primary hover:text-primary-foreground transition text-left shadow-sm text-foreground"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary font-bold">
                    {optionLetters[idx]}
                  </div>
                  <span className="font-medium">{option}</span>
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
                  Q{i + 1}: {a.question}
                </p>
                <p className="text-foreground">
                  Your answer:{" "}
                  <span
                    className={`font-medium ${
                      a.isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {a.selected}
                  </span>{" "}
                  {a.isCorrect ? "✅" : "❌"}
                </p>
                {!a.isCorrect && (
                  <p className="text-foreground">
                    Correct answer:{" "}
                    <span className="font-medium text-green-500">
                      {a.correct}
                    </span>
                  </p>
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
