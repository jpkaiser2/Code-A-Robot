"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  DndContext, 
  useSensor, 
  useSensors, 
  PointerSensor,
  DragOverlay 
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// Draggable word component
function DraggableWord({ id, word, isUsed }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isUsed
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : isUsed ? 0.4 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 border border-primary bg-background rounded-lg transition ${
        isUsed 
          ? "opacity-40 cursor-not-allowed" 
          : "hover:bg-primary/10 cursor-grab active:cursor-grabbing"
      } text-foreground shadow-sm font-medium`}
      disabled={isUsed}
    >
      {word}
    </button>
  );
}

// Droppable blank component
function DroppableBlank({ id, index, value, isOver }) {
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({
    id,
  });
  
  // Use passed isOver if available, otherwise use internal one
  const isActiveOver = isOver !== undefined ? isOver : droppableIsOver;

  return (
    <div
      ref={setNodeRef}
      className={`inline-flex items-center justify-center w-28 h-10 mx-1 border-b-2 ${
        isActiveOver ? "border-green-500 bg-green-100/10" : value ? "border-primary" : "border-muted-foreground"
      } align-bottom ${value ? "bg-primary/10" : ""}`}
    >
      {value && (
        <div className="w-full h-full flex items-center justify-center text-foreground font-medium">
          {value}
        </div>
      )}
      {!value && isActiveOver && (
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-green-500/50 rounded">
          <span className="text-muted-foreground text-sm">Drop here</span>
        </div>
      )}
    </div>
  );
}

// Dragging overlay component 
function DragOverlayContent({ word }) {
  return (
    <div className="px-3 py-2 border-2 border-primary bg-primary/20 rounded-lg text-primary font-medium shadow-md">
      {word}
    </div>
  );
}

export default function FillInTheBlank({ sentences, title = "Fill in the Blanks" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [blanks, setBlanks] = useState(
    sentences.map(sentence => Array(sentence.blanks.length).fill(""))
  );
  const [usedWords, setUsedWords] = useState(
    sentences.map(() => ({}))
  );
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeOverId, setActiveOverId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Make dragging less sensitive to small movements
      activationConstraint: {
        distance: 5, // Reduced from 8
        tolerance: 5, // Added tolerance
        delay: 0 // No delay for immediate response
      }
    })
  );
  
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };
  
  const handleDragOver = (event) => {
    const { over } = event;
    setActiveOverId(over ? over.id : null);
  };
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveOverId(null);
    
    if (over) {
      const wordId = active.id;
      const blankId = over.id;
      const word = wordId.replace('word-', '');
      const blankIndex = parseInt(blankId.split("-")[1]);
      
      // Update the blanks with the new word
      const newBlanks = [...blanks];
      newBlanks[currentStep][blankIndex] = word;
      setBlanks(newBlanks);
      
      // Mark the word as used
      const newUsedWords = [...usedWords];
      newUsedWords[currentStep] = {
        ...newUsedWords[currentStep],
        [word]: true
      };
      setUsedWords(newUsedWords);
    }
  };
  
  const clearBlank = (blankIndex) => {
    // Remove the word from a blank and make it available again
    const currentBlanks = [...blanks];
    const word = currentBlanks[currentStep][blankIndex];
    
    if (word) {
      const newUsedWords = [...usedWords];
      delete newUsedWords[currentStep][word];
      setUsedWords(newUsedWords);
      
      currentBlanks[currentStep][blankIndex] = "";
      setBlanks(currentBlanks);
    }
  };
  
  const checkAnswers = () => {
    const currentBlanks = blanks[currentStep];
    const correctAnswers = sentences[currentStep].answers;
    
    // Check if all blanks are correct
    let isCorrect = true;
    for (let i = 0; i < currentBlanks.length; i++) {
      if (currentBlanks[i] !== correctAnswers[i]) {
        isCorrect = false;
        break;
      }
    }
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Save the results for this sentence
    setResults([
      ...results,
      {
        text: sentences[currentStep].text,
        selected: [...currentBlanks],
        correct: correctAnswers,
        isCorrect
      }
    ]);
    
    const next = currentStep + 1;
    if (next < sentences.length) {
      setCurrentStep(next);
    } else {
      setFinished(true);
    }
  };
  
  const restart = () => {
    setCurrentStep(0);
    setBlanks(sentences.map(sentence => Array(sentence.blanks.length).fill("")));
    setUsedWords(sentences.map(() => ({})));
    setFinished(false);
    setScore(0);
    setResults([]);
  };
  
  const progress = ((currentStep + (finished ? 1 : 0)) / sentences.length) * 100;
  
  // Helper function to render the sentence with blanks
  const renderSentence = (text, blankValues) => {
    // Create a regex to match all placeholders
    const regex = /____/g;
    let parts = [];
    let match;
    let lastIndex = 0;
    let blankIndex = 0;
    
    // Split the text by placeholders and keep track of the positions
    while ((match = regex.exec(text)) !== null) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
      
      parts.push({
        type: 'blank',
        index: blankIndex
      });
      
      lastIndex = match.index + match[0].length;
      blankIndex++;
    }
    
    // Add the remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }
    
    return (
      <div className="text-lg font-medium">
        {parts.map((part, index) => {
          if (part.type === 'text') {
            return <span key={index}>{part.content}</span>;
          } else {
            const blankId = `blank-${part.index}`;
            return (
              <span key={index} onClick={() => clearBlank(part.index)}>
                <DroppableBlank 
                  id={blankId} 
                  index={part.index} 
                  value={blankValues[part.index]}
                  isOver={blankId === activeOverId}
                />
              </span>
            );
          }
        })}
        {blankValues.some(b => b) && (
          <div className="mt-2 text-xs text-muted-foreground">
            (Click on a filled blank to remove its word)
          </div>
        )}
      </div>
    );
  };
  
  // Helper function to render the sentence with answers for the results view
  const renderResultSentence = (result, index) => {
    // Create a regex to match all placeholders
    const regex = /____/g;
    let parts = [];
    let match;
    let lastIndex = 0;
    let blankIndex = 0;
    
    // Split the text by placeholders and keep track of the positions
    while ((match = regex.exec(result.text)) !== null) {
      parts.push({
        type: 'text',
        content: result.text.slice(lastIndex, match.index)
      });
      
      parts.push({
        type: 'blank',
        index: blankIndex
      });
      
      lastIndex = match.index + match[0].length;
      blankIndex++;
    }
    
    // Add the remaining text
    if (lastIndex < result.text.length) {
      parts.push({
        type: 'text',
        content: result.text.slice(lastIndex)
      });
    }
    
    return (
      <div 
        key={index}
        className={`p-5 border-2 rounded-xl mb-4 ${
          result.isCorrect 
            ? "border-green-500 bg-green-500/10" 
            : "border-red-500 bg-red-500/10"
        }`}
      >
        <p className="font-semibold mb-3 text-foreground">
          Sentence {index + 1}:
        </p>
        
        <div className="text-foreground mb-3">
          {parts.map((part, pIndex) => {
            if (part.type === 'text') {
              return <span key={pIndex}>{part.content}</span>;
            } else {
              return (
                <span 
                  key={pIndex} 
                  className={`inline-block px-3 py-1 mx-1 rounded-md font-medium ${
                    result.selected[part.index] === result.correct[part.index]
                      ? "bg-green-500/20 text-green-700"
                      : "bg-red-500/20 text-red-700"
                  }`}
                >
                  {result.selected[part.index]}
                </span>
              );
            }
          })}
          {result.isCorrect ? " ✅" : " ❌"}
        </div>
        
        {!result.isCorrect && (
          <div className="text-foreground">
            <p className="text-sm font-medium text-muted-foreground mb-1">Correct answer:</p>
            {parts.map((part, pIndex) => {
              if (part.type === 'text') {
                return <span key={pIndex}>{part.content}</span>;
              } else {
                return (
                  <span 
                    key={pIndex} 
                    className="inline-block px-3 py-1 mx-1 rounded-md bg-green-500/20 text-green-700 font-medium"
                  >
                    {result.correct[part.index]}
                  </span>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };
  
  const allBlanksFilled = () => {
    return blanks[currentStep].every(blank => blank !== "");
  };

  // Get the currently active word being dragged
  const getActiveWord = () => {
    if (!activeId || !activeId.startsWith('word-')) return null;
    return activeId.replace('word-', '');
  };

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

      {/* Content */}
      {!finished ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sentence Box */}
            <div className="p-6 bg-muted border border-border rounded-xl mb-6 shadow-sm">
              <DndContext 
                sensors={sensors} 
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToWindowEdges]}
              >
                {renderSentence(sentences[currentStep].text, blanks[currentStep])}
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {sentences[currentStep].options.map((word) => (
                    <DraggableWord 
                      key={word} 
                      id={`word-${word}`} 
                      word={word}
                      isUsed={usedWords[currentStep][word]}
                    />
                  ))}
                </div>
                
                {/* Drag Overlay */}
                <DragOverlay>
                  {activeId ? <DragOverlayContent word={getActiveWord()} /> : null}
                </DragOverlay>
              </DndContext>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={checkAnswers}
                disabled={!allBlanksFilled()}
                className={`px-6 py-3 bg-primary text-primary-foreground text-lg rounded-xl transition ${
                  allBlanksFilled() ? "hover:bg-primary/90" : "opacity-50 cursor-not-allowed"
                }`}
              >
                {currentStep < sentences.length - 1 ? "Next" : "Finish"}
              </button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground text-center">
              Sentence {currentStep + 1} of {sentences.length}
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
            You scored {score} / {sentences.length}
          </h2>

          {/* Review Section */}
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Review Your Answers:</h3>
            {results.map((result, i) => renderResultSentence(result, i))}
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