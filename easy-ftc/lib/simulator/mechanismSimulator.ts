export type SimulatorStatus = "idle" | "running";

export interface SimulatorTelemetryEntry {
  label: string;
  value: string;
}

export interface SimulatorLogEntry {
  id: number;
  message: string;
  timestampLabel: string;
}

export interface SimulatorState {
  armAngleDeg: number;
  armTargetDeg: number;
  armMinDeg: number;
  armMaxDeg: number;
  clawOpenAmount: number;
  clawTargetAmount: number;
  clawMinAmount: number;
  clawMaxAmount: number;
  armSpeedDegPerSecond: number;
  clawSpeedPerSecond: number;
  status: SimulatorStatus;
  elapsedSeconds: number;
  loopCount: number;
  lastAction: string;
  demoPhase: "raising" | "lowering";
  telemetry: SimulatorTelemetryEntry[];
  telemetryLog: SimulatorLogEntry[];
  nextLogId: number;
}

export type SimulatorAction =
  | { type: "RUN" }
  | { type: "RESET" }
  | { type: "OPEN_CLAW" }
  | { type: "CLOSE_CLAW" }
  | { type: "ARM_DELTA"; deltaDeg: number }
  | { type: "ARM_TARGET"; targetDeg: number }
  | { type: "SET_CLAW"; amount: number }
  | { type: "SET_STATUS"; status: SimulatorStatus }
  | { type: "SET_LAST_ACTION"; label: string }
  | { type: "APPEND_LOG"; message: string };

type SimulatorListener = () => void;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const moveToward = (current: number, target: number, maxDelta: number) => {
  if (Math.abs(target - current) <= maxDelta) {
    return target;
  }

  return current + Math.sign(target - current) * maxDelta;
};

export function createDefaultSimulatorState(): SimulatorState {
  const initialLog: SimulatorLogEntry = {
    id: 1,
    message: "Simulator initialized",
    timestampLabel: "t+0.00s",
  };

  const state: SimulatorState = {
    armAngleDeg: 12,
    armTargetDeg: 12,
    armMinDeg: -15,
    armMaxDeg: 85,
    clawOpenAmount: 0.6,
    clawTargetAmount: 0.6,
    clawMinAmount: 0.1,
    clawMaxAmount: 1,
    armSpeedDegPerSecond: 55,
    clawSpeedPerSecond: 1.8,
    status: "idle",
    elapsedSeconds: 0,
    loopCount: 0,
    lastAction: "Initialized simulator",
    demoPhase: "raising",
    telemetry: [],
    telemetryLog: [initialLog],
    nextLogId: 2,
  };

  state.telemetry = buildTelemetry(state);
  return state;
}

function buildTelemetry(state: SimulatorState): SimulatorTelemetryEntry[] {
  return [
    { label: "Status", value: state.status },
    { label: "Arm Angle", value: `${state.armAngleDeg.toFixed(1)} deg` },
    { label: "Arm Target", value: `${state.armTargetDeg.toFixed(1)} deg` },
    { label: "Claw Open", value: state.clawOpenAmount.toFixed(2) },
    { label: "Claw Target", value: state.clawTargetAmount.toFixed(2) },
    { label: "Elapsed", value: `${state.elapsedSeconds.toFixed(2)} s` },
    { label: "Demo Loops", value: String(state.loopCount) },
    { label: "Last Action", value: state.lastAction },
  ];
}

function reduceSimulatorState(
  previousState: SimulatorState,
  action: SimulatorAction
): SimulatorState {
  if (action.type === "RESET") {
    return createDefaultSimulatorState();
  }

  const nextState: SimulatorState = {
    ...previousState,
    telemetry: previousState.telemetry,
    telemetryLog: previousState.telemetryLog,
  };

  switch (action.type) {
    case "RUN":
      nextState.status = "running";
      nextState.lastAction = "Started demo loop";
      break;
    case "OPEN_CLAW":
      nextState.clawTargetAmount = nextState.clawMaxAmount;
      nextState.lastAction = "Open claw";
      break;
    case "CLOSE_CLAW":
      nextState.clawTargetAmount = nextState.clawMinAmount;
      nextState.lastAction = "Close claw";
      break;
    case "ARM_DELTA":
      nextState.armTargetDeg = clamp(
        nextState.armTargetDeg + action.deltaDeg,
        nextState.armMinDeg,
        nextState.armMaxDeg
      );
      nextState.status = "idle";
      nextState.lastAction = action.deltaDeg > 0 ? "Arm up" : "Arm down";
      break;
    case "ARM_TARGET":
      nextState.armTargetDeg = clamp(
        action.targetDeg,
        nextState.armMinDeg,
        nextState.armMaxDeg
      );
      nextState.lastAction = "Set arm target";
      break;
    case "SET_CLAW":
      nextState.clawTargetAmount = clamp(
        action.amount,
        nextState.clawMinAmount,
        nextState.clawMaxAmount
      );
      nextState.lastAction = "Set claw target";
      break;
    case "SET_STATUS":
      nextState.status = action.status;
      nextState.lastAction = `Status set to ${action.status}`;
      break;
    case "SET_LAST_ACTION":
      nextState.lastAction = action.label;
      break;
    case "APPEND_LOG":
      nextState.telemetryLog = [
        ...previousState.telemetryLog,
        {
          id: previousState.nextLogId,
          message: action.message,
          timestampLabel: `t+${previousState.elapsedSeconds.toFixed(2)}s`,
        },
      ].slice(-12);
      nextState.nextLogId = previousState.nextLogId + 1;
      break;
  }

  nextState.telemetry = buildTelemetry(nextState);
  return nextState;
}

export interface SimulatorStore {
  dispatch: (action: SimulatorAction) => void;
  getState: () => SimulatorState;
  reset: () => void;
  step: (deltaSeconds: number) => void;
  subscribe: (listener: SimulatorListener) => () => void;
}

export function createSimulatorStore(): SimulatorStore {
  let state = createDefaultSimulatorState();
  const listeners = new Set<SimulatorListener>();

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const setState = (nextState: SimulatorState) => {
    state = {
      ...nextState,
      telemetry: buildTelemetry(nextState),
    };
    emit();
  };

  return {
    dispatch(action) {
      setState(reduceSimulatorState(state, action));
    },
    getState() {
      return state;
    },
    reset() {
      setState(createDefaultSimulatorState());
    },
    step(deltaSeconds) {
      if (deltaSeconds <= 0) {
        return;
      }

      const nextState: SimulatorState = {
        ...state,
        elapsedSeconds: state.elapsedSeconds + deltaSeconds,
      };

      if (state.status === "running") {
        if (state.demoPhase === "raising" && state.armTargetDeg >= state.armMaxDeg - 0.5) {
          nextState.demoPhase = "lowering";
          nextState.armTargetDeg = state.armMinDeg + 20;
          nextState.clawTargetAmount = state.clawMinAmount;
          nextState.loopCount = state.loopCount + 1;
          nextState.lastAction = "Demo cycle: lowering arm";
        } else if (
          state.demoPhase === "lowering" &&
          state.armTargetDeg <= state.armMinDeg + 20.5
        ) {
          nextState.demoPhase = "raising";
          nextState.armTargetDeg = state.armMaxDeg;
          nextState.clawTargetAmount = state.clawMaxAmount;
          nextState.lastAction = "Demo cycle: raising arm";
        } else if (Math.abs(state.armTargetDeg - state.armAngleDeg) < 0.5) {
          nextState.armTargetDeg =
            state.demoPhase === "raising" ? state.armMaxDeg : state.armMinDeg + 20;
        }
      }

      nextState.armAngleDeg = moveToward(
        state.armAngleDeg,
        nextState.armTargetDeg,
        state.armSpeedDegPerSecond * deltaSeconds
      );
      nextState.clawOpenAmount = moveToward(
        state.clawOpenAmount,
        nextState.clawTargetAmount,
        state.clawSpeedPerSecond * deltaSeconds
      );

      setState(nextState);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export interface SimulatorBridge {
  armDown: () => void;
  armUp: () => void;
  closeClaw: () => void;
  dispatchAction: (action: SimulatorAction) => void;
  getSnapshot: () => SimulatorState;
  openClaw: () => void;
  reset: () => void;
  run: () => void;
  setMotorPower: (deviceName: string, power: number) => void;
  setServoPosition: (deviceName: string, position: number) => void;
  addTelemetry: (caption: string, value: string | number) => void;
}

export function createSimulatorBridge(store: SimulatorStore): SimulatorBridge {
  const logBridgeMessage = (message: string) => {
    store.dispatch({ type: "APPEND_LOG", message });
  };

  return {
    run() {
      store.dispatch({ type: "RUN" });
      logBridgeMessage("Bridge call: run()");
    },
    reset() {
      store.reset();
    },
    openClaw() {
      store.dispatch({ type: "OPEN_CLAW" });
      logBridgeMessage("Bridge call: openClaw()");
    },
    closeClaw() {
      store.dispatch({ type: "CLOSE_CLAW" });
      logBridgeMessage("Bridge call: closeClaw()");
    },
    armUp() {
      store.dispatch({ type: "ARM_DELTA", deltaDeg: 12 });
      logBridgeMessage("Bridge call: armUp()");
    },
    armDown() {
      store.dispatch({ type: "ARM_DELTA", deltaDeg: -12 });
      logBridgeMessage("Bridge call: armDown()");
    },
    dispatchAction(action) {
      store.dispatch(action);
      logBridgeMessage(`Bridge action: ${action.type}`);
    },
    getSnapshot() {
      return store.getState();
    },
    setMotorPower(deviceName, power) {
      const normalizedPower = clamp(power, -1, 1);

      // TODO: Future CheerpJ FTC bridge should route motor.setPower() calls here.
      // Map named motors to mechanism targets instead of touching Three.js meshes directly.
      if (deviceName === "armMotor") {
        const currentState = store.getState();
        const targetDeg =
          currentState.armAngleDeg +
          normalizedPower * currentState.armSpeedDegPerSecond * 0.35;

        store.dispatch({ type: "ARM_TARGET", targetDeg });
        store.dispatch({
          type: "SET_LAST_ACTION",
          label: `motor.setPower(${deviceName}, ${normalizedPower.toFixed(2)})`,
        });
        logBridgeMessage(
          `motor.setPower("${deviceName}", ${normalizedPower.toFixed(2)})`
        );
      }
    },
    setServoPosition(deviceName, position) {
      const normalizedPosition = clamp(position, 0, 1);

      // TODO: Future CheerpJ FTC bridge should route servo.setPosition() calls here.
      if (deviceName === "clawServo") {
        store.dispatch({ type: "SET_CLAW", amount: normalizedPosition });
        store.dispatch({
          type: "SET_LAST_ACTION",
          label: `servo.setPosition(${deviceName}, ${normalizedPosition.toFixed(2)})`,
        });
        logBridgeMessage(
          `servo.setPosition("${deviceName}", ${normalizedPosition.toFixed(2)})`
        );
      }
    },
    addTelemetry(caption, value) {
      // TODO: Future CheerpJ FTC bridge should route telemetry.addData() calls here.
      store.dispatch({
        type: "SET_LAST_ACTION",
        label: `telemetry.addData(${caption}, ${String(value)})`,
      });
      logBridgeMessage(`telemetry.addData("${caption}", ${String(value)})`);
    },
  };
}
