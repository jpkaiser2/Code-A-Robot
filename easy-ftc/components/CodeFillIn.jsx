"use client";

import { useState } from "react";
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function DraggableSnippet({ id, label, isUsed }) {
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
        isUsed ? "opacity-40 cursor-not-allowed" : "hover:bg-primary/10 cursor-grab active:cursor-grabbing"
      } text-foreground shadow-sm font-mono text-sm`}
      disabled={isUsed}
    >
      {label}
    </button>
  );
}

function DroppableBlank({ id, value, isOver }) {
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({ id });
  const isActiveOver = isOver !== undefined ? isOver : droppableIsOver;
  return (
    <span
      ref={setNodeRef}
      className={`inline-flex items-center justify-center min-w-[60px] h-7 mx-1 border-b-2 ${
        isActiveOver ? "border-green-500 bg-green-100/10" : value ? "border-primary" : "border-muted-foreground"
      } align-bottom ${value ? "bg-primary/10" : ""}`}
      style={{ verticalAlign: "middle" }}
    >
      {value && (
        <span className="w-full h-full flex items-center justify-center text-foreground font-mono text-sm">{value}</span>
      )}
      {!value && isActiveOver && (
        <span className="w-full h-full flex items-center justify-center border-2 border-dashed border-green-500/50 rounded text-xs text-muted-foreground">Drop here</span>
      )}
    </span>
  );
}

function DragOverlayContent({ label }) {
  return (
    <div className="px-3 py-2 border-2 border-primary bg-primary/20 rounded-lg text-primary font-mono text-sm shadow-md">
      {label}
    </div>
  );
}

export default function CodeFillIn({ codeTemplate, options, answers, title = "Fill in the Code" }) {
  // options: [{ id, label }], answers: [id, id, ...]
  const blankRegex = /____/g;
  const blankCount = (codeTemplate.match(blankRegex) || []).length;
  const [blanks, setBlanks] = useState(Array(blankCount).fill(null)); // store option id or null
  const [usedIds, setUsedIds] = useState({}); // { id: true }
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeOverId, setActiveOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragOver = (event) => {
    setActiveOverId(event.over ? event.over.id : null);
  };
  const handleDragEnd = (event) => {
    setActiveId(null);
    setActiveOverId(null);
    const { active, over } = event;
    if (over) {
      const optionId = active.id;
      const blankIndex = parseInt(over.id.split("-")[1]);
      // Place optionId in blank
      const newBlanks = [...blanks];
      newBlanks[blankIndex] = optionId;
      setBlanks(newBlanks);
      // Mark optionId as used
      setUsedIds({ ...usedIds, [optionId]: true });
    }
  };
  const clearBlank = (blankIndex) => {
    const currentBlanks = [...blanks];
    const optionId = currentBlanks[blankIndex];
    if (optionId) {
      const newUsed = { ...usedIds };
      delete newUsed[optionId];
      setUsedIds(newUsed);
      currentBlanks[blankIndex] = null;
      setBlanks(currentBlanks);
    }
  };
  const checkAnswers = () => {
    const correct = blanks.every((id, i) => {
      const selected = options.find(o => o.id === id);
      const correctOption = options.find(o => o.id === answers[i]);
      return selected && correctOption && selected.label === correctOption.label;
    });
    setIsCorrect(correct);
    setFinished(true);
  };
  const restart = () => {
    setBlanks(Array(blankCount).fill(null));
    setUsedIds({});
    setFinished(false);
    setIsCorrect(false);
  };
  const allBlanksFilled = blanks.every((id) => id !== null);

  // Render code with blanks as spans in a highlighted code block
  const renderCodeAndDraggables = () => {
    let parts = [];
    let lastIndex = 0;
    let match;
    let blankIndex = 0;
    blankRegex.lastIndex = 0;
    while ((match = blankRegex.exec(codeTemplate)) !== null) {
      parts.push({ type: "code", content: codeTemplate.slice(lastIndex, match.index) });
      parts.push({ type: "blank", index: blankIndex });
      lastIndex = match.index + match[0].length;
      blankIndex++;
    }
    if (lastIndex < codeTemplate.length) {
      parts.push({ type: "code", content: codeTemplate.slice(lastIndex) });
    }
    return (
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="bg-[#23272e] p-4 rounded-lg overflow-x-auto border border-border shadow-inner relative font-mono text-sm whitespace-pre-wrap">
          {parts.map((part, i) => {
            if (part.type === "code") {
              return (
                <SyntaxHighlighter
                  key={i}
                  language="java"
                  style={vscDarkPlus}
                  PreTag="span"
                  CodeTag="span"
                  customStyle={{ background: "transparent", margin: 0, padding: 0, display: "inline" }}
                  wrapLines={false}
                >
                  {part.content}
                </SyntaxHighlighter>
              );
            } else {
              const blankId = `blank-${part.index}`;
              const optionId = blanks[part.index];
              const option = options.find(o => o.id === optionId);
              return (
                <span
                  key={i}
                  onClick={() => clearBlank(part.index)}
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <DroppableBlank
                    id={blankId}
                    value={option ? option.label : null}
                    isOver={blankId === activeOverId}
                  />
                </span>
              );
            }
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {options.map((option) => (
            <DraggableSnippet
              key={option.id}
              id={option.id}
              label={option.label}
              isUsed={usedIds[option.id]}
            />
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <DragOverlayContent label={options.find(o => o.id === activeId)?.label || ""} />
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-background shadow-xl rounded-3xl border border-border">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">{title}</h1>
      {renderCodeAndDraggables()}
      {!finished ? (
        <div className="text-center mt-8">
          <button
            onClick={checkAnswers}
            disabled={!allBlanksFilled}
            className={`px-6 py-3 bg-primary text-primary-foreground text-lg rounded-xl transition ${
              allBlanksFilled ? "hover:bg-primary/90" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Check Answer
          </button>
        </div>
      ) : (
        <div className="text-center mt-8">
          {isCorrect ? (
            <div className="text-green-600 font-semibold text-lg mb-4">Correct! 🎉</div>
          ) : (
            <div className="text-red-600 font-semibold text-lg mb-4">Not quite. The correct answers are shown below.</div>
          )}
          <div className="flex flex-col items-center w-full">
            <div className="bg-[#23272e] border border-green-200 rounded-md p-4 mt-4 text-sm font-mono leading-6 w-full max-w-2xl text-left whitespace-pre-wrap">
              {(() => {
                // Show correct code with correct answers filled in, with syntax highlighting
                let parts = [];
                let lastIndex = 0;
                let match;
                let blankIndex = 0;
                blankRegex.lastIndex = 0;
                while ((match = blankRegex.exec(codeTemplate)) !== null) {
                  parts.push({ type: "code", content: codeTemplate.slice(lastIndex, match.index) });
                  parts.push({ type: "blank", index: blankIndex });
                  lastIndex = match.index + match[0].length;
                  blankIndex++;
                }
                if (lastIndex < codeTemplate.length) {
                  parts.push({ type: "code", content: codeTemplate.slice(lastIndex) });
                }
                return parts.map((part, i) => {
                  if (part.type === "code") {
                    return (
                      <SyntaxHighlighter
                        key={i}
                        language="java"
                        style={vscDarkPlus}
                        PreTag="span"
                        CodeTag="span"
                        customStyle={{ background: "transparent", margin: 0, padding: 0, display: "inline" }}
                        wrapLines={false}
                      >
                        {part.content}
                      </SyntaxHighlighter>
                    );
                  } else {
                    const answerId = answers[part.index];
                    const answerOption = options.find(o => o.id === answerId);
                    return (
                      <span key={i} className="bg-green-900 text-green-200 px-2 py-1 rounded font-bold">
                        {answerOption ? answerOption.label : ""}
                      </span>
                    );
                  }
                });
              })()}
            </div>
            <button
              onClick={restart}
              className="mt-6 px-6 py-3 bg-primary text-primary-foreground text-lg rounded-xl hover:bg-primary/90 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 