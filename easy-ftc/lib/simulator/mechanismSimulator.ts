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
  armEncoderTicks: number;
  motorRunMode: "RUN_WITHOUT_ENCODER" | "RUN_TO_POSITION" | "STOP_AND_RESET_ENCODER";
  motorTargetTicks: number;
  motorPower: number;
}

export type SimulatorAction =
  | { type: "RUN" }
  | { type: "RESET" }
  | { type: "OPEN_CLAW" }
  | { type: "CLOSE_CLAW" }
  | { type: "ARM_DELTA"; deltaDeg: number }
  | { type: "ARM_TARGET"; targetDeg: number }
  | { type: "SET_ARM_TARGET_TICKS"; targetTicks: number }
  | {
      type: "SET_MOTOR_MODE";
      mode: "RUN_WITHOUT_ENCODER" | "RUN_TO_POSITION" | "STOP_AND_RESET_ENCODER";
    }
  | { type: "SET_MOTOR_POWER"; power: number }
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
    armEncoderTicks: 133,
    motorRunMode: "RUN_WITHOUT_ENCODER",
    motorTargetTicks: 133,
    motorPower: 0,
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
    { label: "Arm Encoder", value: `${Math.round(state.armEncoderTicks)} ticks` },
    { label: "Motor Mode", value: state.motorRunMode },
    { label: "Motor Target", value: `${Math.round(state.motorTargetTicks)} ticks` },
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
      nextState.motorTargetTicks = Math.round(nextState.armTargetDeg * 11.08);
      nextState.lastAction = "Set arm target";
      break;
    case "SET_ARM_TARGET_TICKS":
      nextState.motorTargetTicks = action.targetTicks;
      nextState.armTargetDeg = clamp(
        action.targetTicks / 11.08,
        nextState.armMinDeg,
        nextState.armMaxDeg
      );
      nextState.lastAction = "Set motor target position";
      break;
    case "SET_MOTOR_MODE":
      nextState.motorRunMode = action.mode;
      if (action.mode === "STOP_AND_RESET_ENCODER") {
        nextState.armEncoderTicks = 0;
        nextState.armAngleDeg = 0;
        nextState.armTargetDeg = 0;
        nextState.motorTargetTicks = 0;
        nextState.motorPower = 0;
      }
      nextState.lastAction = `Motor mode: ${action.mode}`;
      break;
    case "SET_MOTOR_POWER":
      nextState.motorPower = clamp(action.power, -1, 1);
      nextState.lastAction = `Motor power: ${nextState.motorPower.toFixed(2)}`;
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

      if (state.motorRunMode === "RUN_TO_POSITION" && Math.abs(state.motorPower) > 0.001) {
        nextState.armTargetDeg = clamp(
          state.motorTargetTicks / 11.08,
          state.armMinDeg,
          state.armMaxDeg
        );
      } else if (
        state.motorRunMode === "RUN_WITHOUT_ENCODER" &&
        Math.abs(state.motorPower) > 0.001
      ) {
        nextState.armTargetDeg = clamp(
          state.armAngleDeg + state.motorPower * state.armSpeedDegPerSecond * 0.35,
          state.armMinDeg,
          state.armMaxDeg
        );
      }

      nextState.armAngleDeg = moveToward(
        state.armAngleDeg,
        nextState.armTargetDeg,
        Math.max(0.01, Math.abs(state.motorPower)) *
          state.armSpeedDegPerSecond *
          deltaSeconds
      );
      nextState.armEncoderTicks = nextState.armAngleDeg * 11.08;

      if (
        state.motorRunMode === "RUN_TO_POSITION" &&
        Math.abs(nextState.armEncoderTicks - state.motorTargetTicks) < 6
      ) {
        nextState.motorPower = 0;
      }
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
  getMotorMode: (
    deviceName: string
  ) => "RUN_WITHOUT_ENCODER" | "RUN_TO_POSITION" | "STOP_AND_RESET_ENCODER";
  openClaw: () => void;
  reset: () => void;
  run: () => void;
  setMotorPower: (deviceName: string, power: number) => void;
  getMotorCurrentPosition: (deviceName: string) => number;
  isMotorBusy: (deviceName: string) => boolean;
  setMotorMode: (
    deviceName: string,
    mode: "RUN_WITHOUT_ENCODER" | "RUN_TO_POSITION" | "STOP_AND_RESET_ENCODER"
  ) => void;
  setMotorTargetPosition: (deviceName: string, targetTicks: number) => void;
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
    getMotorMode(deviceName) {
      const currentState = store.getState();
      if (deviceName === "armMotor") {
        return currentState.motorRunMode;
      }
      return "RUN_WITHOUT_ENCODER";
    },
    setMotorPower(deviceName, power) {
      const normalizedPower = clamp(power, -1, 1);

      // TODO: Future CheerpJ FTC bridge should route motor.setPower() calls here.
      // Map named motors to mechanism targets instead of touching Three.js meshes directly.
      if (deviceName === "armMotor") {
        store.dispatch({ type: "SET_MOTOR_POWER", power: normalizedPower });
        store.dispatch({
          type: "SET_LAST_ACTION",
          label: `motor.setPower(${deviceName}, ${normalizedPower.toFixed(2)})`,
        });
        logBridgeMessage(
          `motor.setPower("${deviceName}", ${normalizedPower.toFixed(2)})`
        );
      }
    },
    getMotorCurrentPosition(deviceName) {
      const currentState = store.getState();

      // TODO: Future CheerpJ FTC bridge should route motor.getCurrentPosition() calls here.
      if (deviceName === "armMotor") {
        return Math.round(currentState.armEncoderTicks);
      }

      return 0;
    },
    isMotorBusy(deviceName) {
      const currentState = store.getState();
      if (deviceName === "armMotor") {
        return (
          currentState.motorRunMode === "RUN_TO_POSITION" &&
          Math.abs(currentState.armEncoderTicks - currentState.motorTargetTicks) >= 6
        );
      }

      return false;
    },
    setMotorMode(deviceName, mode) {
      if (deviceName === "armMotor") {
        store.dispatch({ type: "SET_MOTOR_MODE", mode });
        logBridgeMessage(`motor.setMode("${deviceName}", ${mode})`);
      }
    },
    setMotorTargetPosition(deviceName, targetTicks) {
      if (deviceName === "armMotor") {
        store.dispatch({ type: "SET_ARM_TARGET_TICKS", targetTicks });
        logBridgeMessage(`motor.setTargetPosition("${deviceName}", ${targetTicks})`);
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
