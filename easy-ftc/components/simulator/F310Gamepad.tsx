"use client";

import { useMemo, useRef, type ReactNode } from "react";

type GamepadButtonKey =
  | "a"
  | "b"
  | "x"
  | "y"
  | "dpad_up"
  | "dpad_down"
  | "dpad_left"
  | "dpad_right"
  | "left_bumper"
  | "right_bumper"
  | "left_stick_button"
  | "right_stick_button"
  | "back"
  | "start"
  | "guide";

type GamepadAxisKey =
  | "left_stick_x"
  | "left_stick_y"
  | "right_stick_x"
  | "right_stick_y"
  | "left_trigger"
  | "right_trigger";

export interface F310State {
  buttons: Record<GamepadButtonKey, boolean>;
  axes: Record<GamepadAxisKey, number>;
}

interface F310GamepadProps {
  onAxisChange: (axis: GamepadAxisKey, value: number) => void;
  onButtonChange: (button: GamepadButtonKey, value: boolean) => void;
  state: F310State;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function Trigger({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (nextValue: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-5 w-20 rounded-t-[18px] border border-slate-600 bg-gradient-to-b from-slate-400 to-slate-700 shadow-inner" />
      <label className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-24 accent-amber-400"
      />
    </div>
  );
}

function PressableButton({
  active,
  children,
  className,
  onChange,
}: {
  active: boolean;
  children: ReactNode;
  className: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={() => onChange(true)}
      onMouseUp={() => onChange(false)}
      onMouseLeave={() => onChange(false)}
      onTouchStart={() => onChange(true)}
      onTouchEnd={() => onChange(false)}
      onTouchCancel={() => onChange(false)}
      className={`${className} ${active ? "scale-95 brightness-125" : ""}`}
    >
      {children}
    </button>
  );
}

function AnalogStick({
  buttonActive,
  label,
  onAxisChange,
  onPressChange,
  xValue,
  yValue,
}: {
  buttonActive: boolean;
  label: string;
  onAxisChange: (x: number, y: number) => void;
  onPressChange: (value: boolean) => void;
  xValue: number;
  yValue: number;
}) {
  const dragRef = useRef<{ pointerId: number } | null>(null);

  const knobStyle = useMemo(() => {
    const x = clamp(xValue, -1, 1) * 16;
    const y = clamp(yValue, -1, 1) * 16;
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  }, [xValue, yValue]);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2 - 12;
    const rawX = (event.clientX - centerX) / radius;
    const rawY = (event.clientY - centerY) / radius;
    const magnitude = Math.hypot(rawX, rawY);
    const normalizedMagnitude = magnitude > 1 ? 1 / magnitude : 1;
    onAxisChange(
      clamp(rawX * normalizedMagnitude, -1, 1),
      clamp(rawY * normalizedMagnitude, -1, 1)
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative h-28 w-28 touch-none rounded-full border border-slate-500 bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.12),rgba(15,23,42,0.95)_58%)] shadow-[inset_0_8px_18px_rgba(255,255,255,0.08),inset_0_-10px_18px_rgba(0,0,0,0.55)]"
        onPointerDown={(event) => {
          dragRef.current = { pointerId: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) {
            return;
          }
          updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) {
            return;
          }
          dragRef.current = null;
          onAxisChange(0, 0);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) {
            return;
          }
          dragRef.current = null;
          onAxisChange(0, 0);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <div className="absolute inset-4 rounded-full border border-slate-700/80" />
        <button
          type="button"
          onMouseDown={() => onPressChange(true)}
          onMouseUp={() => onPressChange(false)}
          onMouseLeave={() => onPressChange(false)}
          onTouchStart={() => onPressChange(true)}
          onTouchEnd={() => onPressChange(false)}
          onTouchCancel={() => onPressChange(false)}
          className={`absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-500 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.2),rgba(15,23,42,0.98)_62%)] shadow-[0_10px_24px_rgba(0,0,0,0.55)] transition ${
            buttonActive ? "ring-2 ring-sky-400/80" : ""
          }`}
          style={knobStyle}
        />
      </div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</div>
    </div>
  );
}

function Dpad({
  onButtonChange,
  state,
}: {
  onButtonChange: (button: GamepadButtonKey, value: boolean) => void;
  state: F310State["buttons"];
}) {
  const dpadButtonClass =
    "flex h-12 w-12 items-center justify-center border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 text-xs font-semibold text-slate-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06)] transition";

  return (
    <div className="grid grid-cols-3 gap-1">
      <div />
      <PressableButton
        active={state.dpad_up}
        className={`${dpadButtonClass} rounded-t-xl`}
        onChange={(value) => onButtonChange("dpad_up", value)}
      >
        Up
      </PressableButton>
      <div />
      <PressableButton
        active={state.dpad_left}
        className={`${dpadButtonClass} rounded-l-xl`}
        onChange={(value) => onButtonChange("dpad_left", value)}
      >
        Left
      </PressableButton>
      <div className="h-12 w-12 rounded-lg border border-slate-700 bg-slate-950" />
      <PressableButton
        active={state.dpad_right}
        className={`${dpadButtonClass} rounded-r-xl`}
        onChange={(value) => onButtonChange("dpad_right", value)}
      >
        Right
      </PressableButton>
      <div />
      <PressableButton
        active={state.dpad_down}
        className={`${dpadButtonClass} rounded-b-xl`}
        onChange={(value) => onButtonChange("dpad_down", value)}
      >
        Down
      </PressableButton>
      <div />
    </div>
  );
}

function FaceButton({
  active,
  colorClass,
  label,
  onChange,
  positionClass,
}: {
  active: boolean;
  colorClass: string;
  label: string;
  onChange: (value: boolean) => void;
  positionClass: string;
}) {
  return (
    <div className={`absolute ${positionClass}`}>
      <PressableButton
        active={active}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 ${colorClass} text-base font-bold text-white shadow-[0_6px_16px_rgba(0,0,0,0.4)]`}
        onChange={onChange}
      >
        {label}
      </PressableButton>
    </div>
  );
}

export default function F310Gamepad({
  onAxisChange,
  onButtonChange,
  state,
}: F310GamepadProps) {
  return (
    <div className="rounded-[2rem] border border-slate-700/80 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),rgba(90,108,137,0.96)_34%,rgba(50,63,87,0.98)_70%,rgba(15,23,42,1)_100%)] p-5 shadow-[0_20px_50px_rgba(2,6,23,0.5)]">
      <div className="mb-5 flex items-start justify-between px-6">
        <Trigger
          label="LT"
          value={state.axes.left_trigger}
          onChange={(value) => onAxisChange("left_trigger", value)}
        />
        <Trigger
          label="RT"
          value={state.axes.right_trigger}
          onChange={(value) => onAxisChange("right_trigger", value)}
        />
      </div>

      <div className="relative rounded-[2.5rem] border border-slate-500/50 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.14),rgba(91,108,137,0.95)_35%,rgba(50,64,89,0.98)_70%,rgba(22,31,47,1)_100%)] px-8 pb-8 pt-6">
        <div className="grid grid-cols-[1.1fr_0.9fr_1.1fr] gap-4">
          <div className="flex flex-col items-start gap-6">
            <Dpad onButtonChange={onButtonChange} state={state.buttons} />
            <AnalogStick
              buttonActive={state.buttons.left_stick_button}
              label="Left Stick"
              onAxisChange={(x, y) => {
                onAxisChange("left_stick_x", x);
                onAxisChange("left_stick_y", y);
              }}
              onPressChange={(value) => onButtonChange("left_stick_button", value)}
              xValue={state.axes.left_stick_x}
              yValue={state.axes.left_stick_y}
            />
          </div>

          <div className="flex flex-col items-center justify-between py-2">
            <div className="flex w-full items-center justify-between">
              <PressableButton
                active={state.buttons.back}
                className="rounded-full border border-slate-600 bg-gradient-to-b from-slate-200/25 to-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200"
                onChange={(value) => onButtonChange("back", value)}
              >
                Back
              </PressableButton>
              <PressableButton
                active={state.buttons.start}
                className="rounded-full border border-slate-600 bg-gradient-to-b from-slate-200/25 to-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200"
                onChange={(value) => onButtonChange("start", value)}
              >
                Start
              </PressableButton>
            </div>

            <PressableButton
              active={state.buttons.guide}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-400/40 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.26),rgba(15,23,42,0.96)_70%)] text-xs font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              onChange={(value) => onButtonChange("guide", value)}
            >
              Logitech
            </PressableButton>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Mode</div>
            </div>
          </div>

          <div className="relative flex flex-col items-end gap-6">
            <div className="relative h-32 w-32">
              <FaceButton
                active={state.buttons.y}
                colorClass="bg-[radial-gradient(circle_at_35%_30%,#fde68a,#f59e0b_65%,#92400e)]"
                label="Y"
                onChange={(value) => onButtonChange("y", value)}
                positionClass="left-1/2 top-0 -translate-x-1/2"
              />
              <FaceButton
                active={state.buttons.x}
                colorClass="bg-[radial-gradient(circle_at_35%_30%,#93c5fd,#2563eb_65%,#1e3a8a)]"
                label="X"
                onChange={(value) => onButtonChange("x", value)}
                positionClass="left-0 top-1/2 -translate-y-1/2"
              />
              <FaceButton
                active={state.buttons.b}
                colorClass="bg-[radial-gradient(circle_at_35%_30%,#fca5a5,#dc2626_65%,#7f1d1d)]"
                label="B"
                onChange={(value) => onButtonChange("b", value)}
                positionClass="right-0 top-1/2 -translate-y-1/2"
              />
              <FaceButton
                active={state.buttons.a}
                colorClass="bg-[radial-gradient(circle_at_35%_30%,#bbf7d0,#65a30d_65%,#365314)]"
                label="A"
                onChange={(value) => onButtonChange("a", value)}
                positionClass="left-1/2 bottom-0 -translate-x-1/2"
              />
            </div>
            <AnalogStick
              buttonActive={state.buttons.right_stick_button}
              label="Right Stick"
              onAxisChange={(x, y) => {
                onAxisChange("right_stick_x", x);
                onAxisChange("right_stick_y", y);
              }}
              onPressChange={(value) => onButtonChange("right_stick_button", value)}
              xValue={state.axes.right_stick_x}
              yValue={state.axes.right_stick_y}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between px-3">
          <PressableButton
            active={state.buttons.left_bumper}
            className="rounded-full border border-slate-600 bg-gradient-to-b from-slate-100/25 to-slate-900/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
            onChange={(value) => onButtonChange("left_bumper", value)}
          >
            LB
          </PressableButton>
          <PressableButton
            active={state.buttons.right_bumper}
            className="rounded-full border border-slate-600 bg-gradient-to-b from-slate-100/25 to-slate-900/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
            onChange={(value) => onButtonChange("right_bumper", value)}
          >
            RB
          </PressableButton>
        </div>
      </div>
    </div>
  );
}
