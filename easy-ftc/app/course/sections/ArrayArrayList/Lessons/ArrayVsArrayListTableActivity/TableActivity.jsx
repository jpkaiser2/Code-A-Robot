"use client";
import { useState } from "react";
import { DndContext, useSensor, useSensors, PointerSensor, DragOverlay } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const CHARACTERISTICS = [
  { id: "fixed-size", label: "Fixed size" },
  { id: "can-grow", label: "Can grow/shrink" },
  { id: "holds-primitives", label: "Holds primitives (int, double, etc.)" },
  { id: "holds-objects", label: "Holds only objects" },
  { id: "faster", label: "Faster for fixed-size data" },
  { id: "slower", label: "Slightly slower due to resizing" },
  { id: "core", label: "Part of Java's core language" },
  { id: "util", label: "In java.util package (must import)" },
  { id: "syntax-simple", label: "Simpler syntax" },
  { id: "flexible", label: "Very flexible" },
  { id: "not-flexible", label: "Not very flexible" },
];

const CODE_SNIPPETS = [
  { id: "array-init", label: <code>double[] nums = {'{'}1.0, 2.0, 3.0{'}'};</code> },
  { id: "arraylist-init", label: <code>ArrayList&lt;Double&gt; nums = new ArrayList&lt;&gt;();</code> },
  { id: "arraylist-add", label: <code>nums.add(4.2);</code> },
  { id: "array-access", label: <code>nums[0]</code> },
  { id: "arraylist-access", label: <code>nums.get(0)</code> },
];

const CATEGORIES = [
  { id: "array", label: "Array" },
  { id: "arraylist", label: "ArrayList" },
];

// Correct answers for auto-checking
const CORRECT = {
  array: [
    "fixed-size", "holds-primitives", "faster", "core", "syntax-simple", "not-flexible", "array-init", "array-access"
  ],
  arraylist: [
    "can-grow", "holds-objects", "slower", "util", "flexible", "arraylist-init", "arraylist-add", "arraylist-access"
  ]
};

function DraggableItem({ id, label, isUsed }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled: isUsed });
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : isUsed ? 0.4 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 border border-primary bg-background rounded-lg transition text-foreground shadow-sm font-medium mb-2 cursor-grab ${isUsed ? "opacity-40 cursor-not-allowed" : "hover:bg-primary/10 active:cursor-grabbing"}`}
    >
      {label}
    </div>
  );
}

function DroppableCategory({ id, label, items, onRemove, isOver, showResult, correctIds }) {
  const { setNodeRef, isOver: droppableIsOver } = useDroppable({ id });
  const activeOver = isOver !== undefined ? isOver : droppableIsOver;
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[120px] bg-muted border-2 rounded-xl p-4 flex flex-col gap-2 transition ${activeOver ? "border-green-500 bg-green-100/10" : "border-border"}`}
    >
      <div className="font-bold text-lg mb-2 text-primary">{label}</div>
      {items.length === 0 && <div className="text-muted-foreground text-sm">Drop items here</div>}
      {items.map((item) => {
        const isIncorrect = showResult && !correctIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`flex items-center group rounded-md px-1 ${isIncorrect ? "bg-red-100 text-red-700 border border-red-400" : ""}`}
          >
            <span>{item.label}</span>
            <button
              className="ml-2 text-xs text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              onClick={() => onRemove(item.id)}
              aria-label="Remove"
              type="button"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

function DragOverlayContent({ label }) {
  return (
    <div className="px-3 py-2 border-2 border-primary bg-primary/20 rounded-lg text-primary font-medium shadow-md">
      {label}
    </div>
  );
}

export function ArrayVsArrayListTableActivity() {
  const [categoryItems, setCategoryItems] = useState({ array: [], arraylist: [] });
  const [unassigned, setUnassigned] = useState([...CHARACTERISTICS, ...CODE_SNIPPETS]);
  const [activeId, setActiveId] = useState(null);
  const [activeOverId, setActiveOverId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(null);

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
    const { active, over } = event;
    setActiveId(null);
    setActiveOverId(null);
    if (!over) return;
    if (over.id === "unassigned") return;
    // Remove from unassigned or other category
    let item = unassigned.find((i) => i.id === active.id);
    let from = "unassigned";
    if (!item) {
      if (categoryItems.array.find((i) => i.id === active.id)) {
        item = categoryItems.array.find((i) => i.id === active.id);
        from = "array";
      } else if (categoryItems.arraylist.find((i) => i.id === active.id)) {
        item = categoryItems.arraylist.find((i) => i.id === active.id);
        from = "arraylist";
      }
    }
    if (!item) return;
    // Move to new category
    if (from !== over.id) {
      setCategoryItems((prev) => ({
        ...prev,
        [from]: prev[from]?.filter((i) => i.id !== item.id) || [],
        [over.id]: [...prev[over.id], item],
      }));
      if (from === "unassigned") {
        setUnassigned((prev) => prev.filter((i) => i.id !== item.id));
      } else {
        setUnassigned((prev) => prev);
      }
    }
  };
  const handleRemove = (cat, id) => {
    const item = categoryItems[cat].find((i) => i.id === id);
    setCategoryItems((prev) => ({
      ...prev,
      [cat]: prev[cat].filter((i) => i.id !== id),
    }));
    setUnassigned((prev) => [...prev, item]);
  };
  const handleCheck = () => {
    let correct = 0;
    for (const cat of ["array", "arraylist"]) {
      const correctIds = CORRECT[cat];
      const userIds = categoryItems[cat].map((i) => i.id);
      correct += correctIds.filter((id) => userIds.includes(id)).length;
    }
    setScore(correct);
    setShowResult(true);
  };
  const handleReset = () => {
    setCategoryItems({ array: [], arraylist: [] });
    setUnassigned([...CHARACTERISTICS, ...CODE_SNIPPETS]);
    setShowResult(false);
    setScore(null);
  };
  const getActiveItem = () => {
    if (!activeId) return null;
    return (
      CHARACTERISTICS.concat(CODE_SNIPPETS).find((i) => i.id === activeId) || null
    );
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-background shadow-xl rounded-3xl border border-border">
      <h1 className="text-2xl font-bold mb-6 text-primary text-center">Array vs. ArrayList Table Activity</h1>
      <p className="mb-4 text-center text-muted-foreground">Drag each characteristic or code snippet into the correct category.</p>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <DroppableCategory
              id="array"
              label="Array"
              items={categoryItems.array}
              onRemove={(id) => handleRemove("array", id)}
              isOver={activeOverId === "array"}
              showResult={showResult}
              correctIds={CORRECT.array}
            />
          </div>
          <div className="flex-1">
            <DroppableCategory
              id="arraylist"
              label="ArrayList"
              items={categoryItems.arraylist}
              onRemove={(id) => handleRemove("arraylist", id)}
              isOver={activeOverId === "arraylist"}
              showResult={showResult}
              correctIds={CORRECT.arraylist}
            />
          </div>
        </div>
        <div className="mb-8">
          <div className="font-semibold mb-2">Unassigned Items</div>
          <div className="flex flex-wrap gap-3 min-h-[48px]">
            {unassigned.length === 0 && <span className="text-muted-foreground">All items assigned!</span>}
            {unassigned.map((item) => (
              <DraggableItem key={item.id} id={item.id} label={item.label} isUsed={false} />
            ))}
          </div>
        </div>
        <DragOverlay>
          {activeId ? <DragOverlayContent label={getActiveItem()?.label} /> : null}
        </DragOverlay>
      </DndContext>
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
        <button
          className="px-6 py-3 bg-primary text-primary-foreground text-lg rounded-xl transition hover:bg-primary/90"
          onClick={handleCheck}
          disabled={showResult}
        >
          Check Answers
        </button>
        <button
          className="px-6 py-3 bg-muted text-foreground text-lg rounded-xl border border-border transition hover:bg-muted/80"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {showResult && (
        <div className="mt-8 text-center">
          <div className="text-xl font-bold mb-2">You got {score} out of 15 correct!</div>
          <div className="text-muted-foreground text-sm">Review the table above to see which items you placed correctly.</div>
        </div>
      )}
    </div>
  );
} 