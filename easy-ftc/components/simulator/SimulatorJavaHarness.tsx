"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SimulatorBridge } from "@/lib/simulator/mechanismSimulator";

interface SimulatorJavaHarnessProps {
  bridge: SimulatorBridge;
}

type HarnessStatus = "loading" | "ready" | "running" | "error";

interface HarnessLogEntry {
  id: number;
  tone: "default" | "error" | "success";
  message: string;
}

interface HarnessFile {
  id: string;
  name: string;
  content: string;
}

type UserOpModeType = "teleop" | "autonomous";

function createSupportFiles(): Array<{ name: string; content: string }> {
  return [
    {
      name: "SimulatorNative.java",
      content: `package simulator.bridge;

public class SimulatorNative {
  public static native void setMotorPower(String deviceName, double power);
  public static native int getMotorCurrentPosition(String deviceName);
  public static native void setMotorTargetPosition(String deviceName, int targetTicks);
  public static native void setMotorMode(String deviceName, String mode);
  public static native boolean isMotorBusy(String deviceName);
  public static native boolean getGamepadBoolean(int gamepadId, String controlName);
  public static native boolean isOpModeActive();
  public static native void setServoPosition(String deviceName, double position);
  public static native void addTelemetry(String caption, String value);
  public static native void waitForStart();
}
`,
    },
    {
      name: "DcMotor.java",
      content: `package com.qualcomm.robotcore.hardware;

import simulator.bridge.SimulatorNative;

public class DcMotor {
  public enum RunMode {
    RUN_WITHOUT_ENCODER,
    RUN_TO_POSITION,
    STOP_AND_RESET_ENCODER
  }

  private final String deviceName;
  private RunMode runMode = RunMode.RUN_WITHOUT_ENCODER;

  public DcMotor(String deviceName) {
    this.deviceName = deviceName;
  }

  public void setPower(double power) {
    SimulatorNative.setMotorPower(deviceName, power);
  }

  public int getCurrentPosition() {
    return SimulatorNative.getMotorCurrentPosition(deviceName);
  }

  public void setTargetPosition(int targetTicks) {
    SimulatorNative.setMotorTargetPosition(deviceName, targetTicks);
  }

  public void setMode(RunMode runMode) {
    this.runMode = runMode;
    SimulatorNative.setMotorMode(deviceName, runMode.name());
  }

  public RunMode getMode() {
    return runMode;
  }

  public boolean isBusy() {
    return SimulatorNative.isMotorBusy(deviceName);
  }
}
`,
    },
    {
      name: "Gamepad.java",
      content: `package com.qualcomm.robotcore.hardware;

import simulator.bridge.SimulatorNative;

public class Gamepad {
  public boolean a;
  public boolean b;
  public boolean x;
  public boolean y;
  public boolean dpad_up;
  public boolean dpad_down;
  public boolean dpad_left;
  public boolean dpad_right;
  public boolean left_bumper;
  public boolean right_bumper;

  private final int gamepadId;

  public Gamepad(int gamepadId) {
    this.gamepadId = gamepadId;
  }

  public void __syncFromSimulator() {
    a = SimulatorNative.getGamepadBoolean(gamepadId, "a");
    b = SimulatorNative.getGamepadBoolean(gamepadId, "b");
    x = SimulatorNative.getGamepadBoolean(gamepadId, "x");
    y = SimulatorNative.getGamepadBoolean(gamepadId, "y");
    dpad_up = SimulatorNative.getGamepadBoolean(gamepadId, "dpad_up");
    dpad_down = SimulatorNative.getGamepadBoolean(gamepadId, "dpad_down");
    dpad_left = SimulatorNative.getGamepadBoolean(gamepadId, "dpad_left");
    dpad_right = SimulatorNative.getGamepadBoolean(gamepadId, "dpad_right");
    left_bumper = SimulatorNative.getGamepadBoolean(gamepadId, "left_bumper");
    right_bumper = SimulatorNative.getGamepadBoolean(gamepadId, "right_bumper");
  }
}
`,
    },
    {
      name: "ElapsedTime.java",
      content: `package com.qualcomm.robotcore.util;

public class ElapsedTime {
  private long startTimeNanos;

  public ElapsedTime() {
    reset();
  }

  public void reset() {
    startTimeNanos = System.nanoTime();
  }

  public double seconds() {
    return (System.nanoTime() - startTimeNanos) / 1_000_000_000.0;
  }
}
`,
    },
    {
      name: "Servo.java",
      content: `package com.qualcomm.robotcore.hardware;

import simulator.bridge.SimulatorNative;

public class Servo {
  private final String deviceName;

  public Servo(String deviceName) {
    this.deviceName = deviceName;
  }

  public void setPosition(double position) {
    SimulatorNative.setServoPosition(deviceName, position);
  }
}
`,
    },
    {
      name: "Autonomous.java",
      content: `package com.qualcomm.robotcore.eventloop.opmode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Autonomous {
  String name() default "";
}
`,
    },
    {
      name: "TeleOp.java",
      content: `package com.qualcomm.robotcore.eventloop.opmode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TeleOp {
  String name() default "";
}
`,
    },
    {
      name: "Telemetry.java",
      content: `package com.qualcomm.robotcore.eventloop.opmode;

import simulator.bridge.SimulatorNative;

public class Telemetry {
  public void addData(String caption, Object value) {
    SimulatorNative.addTelemetry(caption, String.valueOf(value));
  }
}
`,
    },
    {
      name: "HardwareMap.java",
      content: `package com.qualcomm.robotcore.hardware;

public class HardwareMap {
  public <T> T get(Class<T> deviceClass, String deviceName) {
    if (deviceClass == DcMotor.class) {
      return deviceClass.cast(new DcMotor(deviceName));
    }

    if (deviceClass == Servo.class) {
      return deviceClass.cast(new Servo(deviceName));
    }

    throw new IllegalArgumentException(
      "Unsupported mock hardware device: " + deviceClass.getSimpleName() + " named " + deviceName
    );
  }
}
`,
    },
    {
      name: "OpMode.java",
      content: `package com.qualcomm.robotcore.eventloop.opmode;

import com.qualcomm.robotcore.hardware.Gamepad;
import com.qualcomm.robotcore.hardware.HardwareMap;

public abstract class OpMode {
  public final HardwareMap hardwareMap = new HardwareMap();
  public final Telemetry telemetry = new Telemetry();
  public final Gamepad gamepad1 = new Gamepad(1);
  public final Gamepad gamepad2 = new Gamepad(2);

  public void init() {}

  public void start() {}

  public abstract void loop();

  public void stop() {}
}
`,
    },
    {
      name: "LinearOpMode.java",
      content: `package com.qualcomm.robotcore.eventloop.opmode;

import simulator.bridge.SimulatorNative;

public abstract class LinearOpMode extends OpMode {
  private boolean started = false;

  public abstract void runOpMode() throws Exception;

  public void sleep(long milliseconds) throws InterruptedException {
    Thread.sleep(milliseconds);
  }

  public void waitForStart() {
    telemetry.addData("opMode", "waiting for start");
    SimulatorNative.waitForStart();
    started = true;
    gamepad1.__syncFromSimulator();
    gamepad2.__syncFromSimulator();
    telemetry.addData("opMode", "started");
  }

  public boolean opModeIsActive() {
    gamepad1.__syncFromSimulator();
    gamepad2.__syncFromSimulator();
    return started && SimulatorNative.isOpModeActive();
  }

  @Override
  public final void loop() {}
}
`,
    },
    {
      name: "Main.java",
      content: `package simulator.launcher;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.OpMode;

public class Main {
  public static void main(String[] args) throws Exception {
    String opModeClassName = args.length > 0
      ? args[0]
      : "org.firstinspires.ftc.teamcode.MechanismTestOpMode";
    Class<?> opModeClass = Class.forName(opModeClassName);
    Object instance = opModeClass.getDeclaredConstructor().newInstance();

    if (instance instanceof LinearOpMode) {
      ((LinearOpMode) instance).runOpMode();
      return;
    }

    if (instance instanceof OpMode) {
      OpMode opMode = (OpMode) instance;
      opMode.init();
      simulator.bridge.SimulatorNative.addTelemetry("opMode", "waiting for start");
      simulator.bridge.SimulatorNative.waitForStart();
      opMode.start();

      while (simulator.bridge.SimulatorNative.isOpModeActive()) {
        opMode.gamepad1.__syncFromSimulator();
        opMode.gamepad2.__syncFromSimulator();
        opMode.loop();
        Thread.sleep(50);
      }

      opMode.stop();
      return;
    }

    throw new IllegalArgumentException("Unsupported op mode class: " + opModeClassName);
  }
}
`,
    },
  ];
}

function createAutonomousTemplate(): HarnessFile[] {
  return [
    {
      id: "1",
      name: "MechanismTestOpMode.java",
      content: `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Mechanism Test Auto")
public class MechanismTestOpMode extends LinearOpMode {
  @Override
  public void runOpMode() throws Exception {
    DcMotor armMotor = hardwareMap.get(DcMotor.class, "armMotor");
    Servo clawServo = hardwareMap.get(Servo.class, "clawServo");
    ElapsedTime timer = new ElapsedTime();

    telemetry.addData("status", "initialized");
    waitForStart();

    if (!opModeIsActive()) {
      return;
    }

    timer.reset();
    armMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    armMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    telemetry.addData("status", "starting mechanism test");
    clawServo.setPosition(1.0);
    sleep(500);

    armMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    armMotor.setTargetPosition(780);
    armMotor.setPower(1.0);
    while (opModeIsActive() && armMotor.isBusy()) {
      telemetry.addData("phase", "raising to target");
      telemetry.addData("armTicks", armMotor.getCurrentPosition());
      telemetry.addData("elapsed", String.format("%.2f", timer.seconds()));
      sleep(120);
    }

    clawServo.setPosition(0.1);
    telemetry.addData("claw", "closing");
    sleep(450);

    armMotor.setTargetPosition(220);
    armMotor.setPower(0.85);
    while (opModeIsActive() && armMotor.isBusy()) {
      telemetry.addData("phase", "lowering to target");
      telemetry.addData("armTicks", armMotor.getCurrentPosition());
      telemetry.addData("elapsed", String.format("%.2f", timer.seconds()));
      sleep(120);
    }

    telemetry.addData("finalTicks", armMotor.getCurrentPosition());
    telemetry.addData("totalTime", String.format("%.2f", timer.seconds()));
    telemetry.addData("status", "mechanism test complete");
  }
}
`,
    },
  ];
}

function createTeleOpTemplate(): HarnessFile[] {
  return [
    {
      id: "1",
      name: "MechanismTeleOp.java",
      content: `package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;

@TeleOp(name = "Mechanism TeleOp")
public class MechanismTeleOp extends LinearOpMode {
  @Override
  public void runOpMode() throws Exception {
    DcMotor armMotor = hardwareMap.get(DcMotor.class, "armMotor");
    Servo clawServo = hardwareMap.get(Servo.class, "clawServo");

    armMotor.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
    armMotor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
    telemetry.addData("status", "teleop ready");
    waitForStart();

    while (opModeIsActive()) {
      if (gamepad1.y) {
        armMotor.setPower(0.8);
      } else if (gamepad1.a) {
        armMotor.setPower(-0.55);
      } else {
        armMotor.setPower(0.0);
      }

      if (gamepad1.right_bumper) {
        clawServo.setPosition(1.0);
      } else if (gamepad1.left_bumper) {
        clawServo.setPosition(0.1);
      }

      telemetry.addData("mode", "teleop");
      telemetry.addData("armTicks", armMotor.getCurrentPosition());
      telemetry.addData("controls", "Y up, A down, RB open, LB close");
      sleep(50);
    }
  }
}
`,
    },
  ];
}

function detectUserOpModeType(files: HarnessFile[]): UserOpModeType {
  const source = files.map((file) => file.content).join("\n");
  if (source.includes("@TeleOp")) {
    return "teleop";
  }
  if (source.includes("@Autonomous")) {
    return "autonomous";
  }
  if (source.includes("extends OpMode")) {
    return "teleop";
  }
  return "autonomous";
}

function detectUserOpModeClassName(files: HarnessFile[]): string {
  const primaryFile = files[0];
  if (!primaryFile) {
    return "org.firstinspires.ftc.teamcode.MechanismTestOpMode";
  }

  const packageMatch = primaryFile.content.match(/package\s+([a-zA-Z0-9_.]+)\s*;/);
  const classMatch = primaryFile.content.match(/public\s+class\s+([A-Za-z0-9_]+)/);
  const packageName = packageMatch?.[1] ?? "org.firstinspires.ftc.teamcode";
  const className = classMatch?.[1] ?? "MechanismTestOpMode";

  return `${packageName}.${className}`;
}

const HARNESS_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        background: #020617;
        color: #e2e8f0;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      #status {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 13px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #94a3b8;
      }
    </style>
    <script src="https://cjrtnc.leaningtech.com/4.2/loader.js"></script>
  </head>
  <body>
    <div id="status">Loading CheerpJ harness…</div>
    <script>
      const statusEl = document.getElementById("status");

      function setStatus(label) {
        statusEl.textContent = label;
      }

      function notifyParent(type, payload) {
        parent.postMessage({ type, ...payload }, "*");
      }

      async function Java_simulator_bridge_SimulatorNative_setMotorPower(lib, deviceName, power) {
        notifyParent("sim-java-motor-power", {
          deviceName: String(deviceName),
          power: Number(power),
        });
      }

      async function Java_simulator_bridge_SimulatorNative_getMotorCurrentPosition(lib, deviceName) {
        return await new Promise((resolve) => {
          const requestId = "motor-pos-" + Math.random().toString(36).slice(2);
          function handleMessage(event) {
            if (
              event.source !== parent ||
              !event.data ||
              event.data.type !== "sim-java-motor-position-response" ||
              event.data.requestId !== requestId
            ) {
              return;
            }

            window.removeEventListener("message", handleMessage);
            resolve(Number(event.data.position));
          }

          window.addEventListener("message", handleMessage);
          notifyParent("sim-java-motor-position-request", {
            requestId,
            deviceName: String(deviceName),
          });
        });
      }

      async function Java_simulator_bridge_SimulatorNative_setMotorTargetPosition(
        lib,
        deviceName,
        targetTicks
      ) {
        notifyParent("sim-java-set-motor-target-position", {
          deviceName: String(deviceName),
          targetTicks: Number(targetTicks),
        });
      }

      async function Java_simulator_bridge_SimulatorNative_setMotorMode(lib, deviceName, mode) {
        notifyParent("sim-java-set-motor-mode", {
          deviceName: String(deviceName),
          mode: String(mode),
        });
      }

      async function Java_simulator_bridge_SimulatorNative_isMotorBusy(lib, deviceName) {
        return await new Promise((resolve) => {
          const requestId = "motor-busy-" + Math.random().toString(36).slice(2);
          function handleMessage(event) {
            if (
              event.source !== parent ||
              !event.data ||
              event.data.type !== "sim-java-motor-busy-response" ||
              event.data.requestId !== requestId
            ) {
              return;
            }

            window.removeEventListener("message", handleMessage);
            resolve(Boolean(event.data.busy));
          }

          window.addEventListener("message", handleMessage);
          notifyParent("sim-java-motor-busy-request", {
            requestId,
            deviceName: String(deviceName),
          });
        });
      }

      async function Java_simulator_bridge_SimulatorNative_getGamepadBoolean(
        lib,
        gamepadId,
        controlName
      ) {
        return await new Promise((resolve) => {
          const requestId = "gamepad-" + Math.random().toString(36).slice(2);
          function handleMessage(event) {
            if (
              event.source !== parent ||
              !event.data ||
              event.data.type !== "sim-java-gamepad-response" ||
              event.data.requestId !== requestId
            ) {
              return;
            }

            window.removeEventListener("message", handleMessage);
            resolve(Boolean(event.data.value));
          }

          window.addEventListener("message", handleMessage);
          notifyParent("sim-java-gamepad-request", {
            requestId,
            gamepadId: Number(gamepadId),
            controlName: String(controlName),
          });
        });
      }

      let opModeActive = false;

      async function Java_simulator_bridge_SimulatorNative_isOpModeActive() {
        return opModeActive;
      }

      async function Java_simulator_bridge_SimulatorNative_setServoPosition(lib, deviceName, position) {
        notifyParent("sim-java-servo-position", {
          deviceName: String(deviceName),
          position: Number(position),
        });
      }

      async function Java_simulator_bridge_SimulatorNative_addTelemetry(lib, caption, value) {
        notifyParent("sim-java-telemetry", {
          caption: String(caption),
          value: String(value),
        });
      }

      let startResolver = null;
      let hasPendingStart = false;

      async function Java_simulator_bridge_SimulatorNative_waitForStart() {
        notifyParent("sim-java-waiting-for-start", {});
        setStatus("Waiting for start signal…");

        if (hasPendingStart) {
          hasPendingStart = false;
          opModeActive = true;
          notifyParent("sim-java-started", {});
          setStatus("Java demo running…");
          return;
        }

        await new Promise((resolve) => {
          startResolver = () => {
            startResolver = null;
            opModeActive = true;
            notifyParent("sim-java-started", {});
            setStatus("Java demo running…");
            resolve();
          };
        });
      }

      async function init() {
        try {
          await cheerpjInit({
            version: 8,
            natives: {
              Java_simulator_bridge_SimulatorNative_setMotorPower,
              Java_simulator_bridge_SimulatorNative_getMotorCurrentPosition,
              Java_simulator_bridge_SimulatorNative_setMotorTargetPosition,
              Java_simulator_bridge_SimulatorNative_setMotorMode,
              Java_simulator_bridge_SimulatorNative_isMotorBusy,
              Java_simulator_bridge_SimulatorNative_getGamepadBoolean,
              Java_simulator_bridge_SimulatorNative_isOpModeActive,
              Java_simulator_bridge_SimulatorNative_setServoPosition,
              Java_simulator_bridge_SimulatorNative_addTelemetry,
              Java_simulator_bridge_SimulatorNative_waitForStart,
            },
            status: "none",
          });
          setStatus("CheerpJ harness ready");
          notifyParent("sim-java-ready", {});
        } catch (error) {
          setStatus("CheerpJ harness failed");
          notifyParent("sim-java-error", {
            message: error && error.message ? error.message : String(error),
          });
        }
      }

      window.addEventListener("message", async (event) => {
        if (!event.data) {
          return;
        }

        if (event.data.type === "sim-java-start-opmode") {
          if (startResolver) {
            startResolver();
          } else {
            hasPendingStart = true;
          }
          return;
        }

        if (event.data.type === "sim-java-stop-opmode") {
          opModeActive = false;
          hasPendingStart = false;
          startResolver = null;
          setStatus("OpMode stopped");
          return;
        }

        if (
          event.data.type === "sim-java-motor-position-response" ||
          event.data.type === "sim-java-motor-busy-response" ||
          event.data.type === "sim-java-gamepad-response"
        ) {
          return;
        }

        if (event.data.type !== "sim-java-run-demo") {
          return;
        }

        const files = event.data.files || [];
        const mainClassName = event.data.mainClassName;
        opModeActive = false;
        hasPendingStart = false;
        startResolver = null;
        setStatus("Compiling Java demo…");
        notifyParent("sim-java-log", { message: "Compiling Java bridge demo..." });

        try {
          const encoder = new TextEncoder();
          for (const file of files) {
            cheerpOSAddStringFile("/str/" + file.name, encoder.encode(file.content));
          }

          const classPath = "/app/tools.jar:/files/";
          const javaFiles = files.map((file) => "/str/" + file.name);
          const compileResult = await cheerpjRunMain(
            "com.sun.tools.javac.Main",
            classPath,
            ...javaFiles,
            "-d",
            "/files/",
            "-Xlint"
          );

          if (compileResult !== 0) {
            setStatus("Compilation failed");
            notifyParent("sim-java-error", {
              message: "Java demo compilation failed inside CheerpJ.",
            });
            return;
          }

          setStatus("Running Java demo…");
          notifyParent("sim-java-log", { message: "Running Java bridge demo..." });
          await cheerpjRunMain("simulator.launcher.Main", classPath, mainClassName);
          opModeActive = false;
          setStatus("Java demo complete");
          notifyParent("sim-java-complete", {});
        } catch (error) {
          opModeActive = false;
          setStatus("Java demo failed");
          notifyParent("sim-java-error", {
            message: error && error.message ? error.message : String(error),
          });
        }
      });

      init();
    </script>
  </body>
</html>`;

export default function SimulatorJavaHarness({
  bridge,
}: SimulatorJavaHarnessProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [status, setStatus] = useState<HarnessStatus>("loading");
  const [awaitingStart, setAwaitingStart] = useState(false);
  const [pendingRun, setPendingRun] = useState(false);
  const [files, setFiles] = useState<HarnessFile[]>(() => createAutonomousTemplate());
  const [activeFileId, setActiveFileId] = useState("1");
  const [gamepadState, setGamepadState] = useState<Record<string, boolean>>({
    a: false,
    b: false,
    x: false,
    y: false,
    dpad_up: false,
    dpad_down: false,
    dpad_left: false,
    dpad_right: false,
    left_bumper: false,
    right_bumper: false,
  });
  const [logEntries, setLogEntries] = useState<HarnessLogEntry[]>([
    { id: 1, tone: "default", message: "Preparing isolated CheerpJ harness..." },
  ]);

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeFileId) ?? files[0],
    [activeFileId, files]
  );
  const detectedOpModeType = useMemo(() => detectUserOpModeType(files), [files]);
  const detectedOpModeClassName = useMemo(() => detectUserOpModeClassName(files), [files]);

  const appendLog = useCallback((message: string, tone: HarnessLogEntry["tone"] = "default") => {
    setLogEntries((previousEntries) => [
      ...previousEntries,
      {
        id: previousEntries.length + 1,
        tone,
        message,
      },
    ].slice(-10));
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || !event.data?.type) {
        return;
      }

      switch (event.data.type) {
        case "sim-java-ready":
          setStatus("ready");
          appendLog("CheerpJ simulator runtime is ready.", "success");
          break;
        case "sim-java-log":
          appendLog(String(event.data.message));
          break;
        case "sim-java-waiting-for-start":
          setStatus("ready");
          setAwaitingStart(true);
          appendLog("OpMode initialized and waiting for start.", "success");
          break;
        case "sim-java-started":
          setStatus("running");
          setAwaitingStart(false);
          appendLog("Start signal delivered to Java opmode.", "success");
          break;
        case "sim-java-motor-power":
          bridge.setMotorPower(String(event.data.deviceName), Number(event.data.power));
          break;
        case "sim-java-motor-position-request":
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "sim-java-motor-position-response",
              requestId: String(event.data.requestId),
              position: bridge.getMotorCurrentPosition(String(event.data.deviceName)),
            },
            "*"
          );
          break;
        case "sim-java-set-motor-target-position":
          bridge.setMotorTargetPosition(
            String(event.data.deviceName),
            Number(event.data.targetTicks)
          );
          break;
        case "sim-java-set-motor-mode":
          bridge.setMotorMode(
            String(event.data.deviceName),
            String(event.data.mode) as
              | "RUN_WITHOUT_ENCODER"
              | "RUN_TO_POSITION"
              | "STOP_AND_RESET_ENCODER"
          );
          break;
        case "sim-java-motor-busy-request":
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "sim-java-motor-busy-response",
              requestId: String(event.data.requestId),
              busy: bridge.isMotorBusy(String(event.data.deviceName)),
            },
            "*"
          );
          break;
        case "sim-java-gamepad-request":
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "sim-java-gamepad-response",
              requestId: String(event.data.requestId),
              value: Boolean(gamepadState[String(event.data.controlName)]),
            },
            "*"
          );
          break;
        case "sim-java-servo-position":
          bridge.setServoPosition(String(event.data.deviceName), Number(event.data.position));
          break;
        case "sim-java-telemetry":
          bridge.addTelemetry(String(event.data.caption), String(event.data.value));
          break;
        case "sim-java-complete":
          setStatus("ready");
          setAwaitingStart(false);
          setPendingRun(false);
          appendLog("User code completed against the simulator runtime.", "success");
          break;
        case "sim-java-error":
          setStatus("error");
          setAwaitingStart(false);
          setPendingRun(false);
          appendLog(String(event.data.message), "error");
          break;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [appendLog, bridge, gamepadState]);

  const postRunDemo = useCallback(() => {
    if (!iframeRef.current?.contentWindow) {
      appendLog("Harness iframe is not ready yet.", "error");
      return;
    }

    setStatus("running");
    setAwaitingStart(false);
    setPendingRun(false);
    bridge.reset();
    appendLog("Compiling user code with the hidden simulator runtime...");
    iframeRef.current.contentWindow.postMessage(
      {
        type: "sim-java-run-demo",
        files: [
          ...createSupportFiles(),
          ...files.map(({ name, content }) => ({ name, content })),
        ],
        mainClassName: detectedOpModeClassName,
      },
      "*"
    );
  }, [appendLog, bridge, detectedOpModeClassName, files]);

  const runDemo = useCallback(() => {
    if (status === "loading") {
      setPendingRun(true);
      appendLog("Harness still loading. Demo will start automatically when ready.");
      return;
    }

    if (status === "running") {
      appendLog("Java demo is already running.");
      return;
    }

    postRunDemo();
  }, [appendLog, postRunDemo, status]);

  useEffect(() => {
    if (status === "ready" && pendingRun) {
      postRunDemo();
    }
  }, [pendingRun, postRunDemo, status]);

  const startOpMode = useCallback(() => {
    if (!iframeRef.current?.contentWindow) {
      appendLog("Harness iframe is not ready yet.", "error");
      return;
    }

    appendLog("Sending start signal to Java opmode...");
    iframeRef.current.contentWindow.postMessage(
      {
        type: "sim-java-start-opmode",
      },
      "*"
    );
  }, [appendLog]);

  const stopOpMode = useCallback(() => {
    if (!iframeRef.current?.contentWindow) {
      appendLog("Harness iframe is not ready yet.", "error");
      return;
    }

    setAwaitingStart(false);
    setPendingRun(false);
    appendLog("Sending stop signal to Java opmode...");
    iframeRef.current.contentWindow.postMessage(
      {
        type: "sim-java-stop-opmode",
      },
      "*"
    );
  }, [appendLog]);

  const resetFiles = useCallback(() => {
    setFiles(createAutonomousTemplate());
    setActiveFileId("1");
    appendLog("Editable user files reset to defaults.", "success");
  }, [appendLog]);

  const loadTeleOpTemplate = useCallback(() => {
    setFiles(createTeleOpTemplate());
    setActiveFileId("1");
    appendLog("Loaded FTC-style teleop template.", "success");
  }, [appendLog]);

  const loadAutonomousTemplate = useCallback(() => {
    setFiles(createAutonomousTemplate());
    setActiveFileId("1");
    appendLog("Loaded FTC-style autonomous template.", "success");
  }, [appendLog]);

  const handleFileChange = useCallback((nextContent: string) => {
    setFiles((previousFiles) =>
      previousFiles.map((file) =>
        file.id === activeFileId ? { ...file, content: nextContent } : file
      )
    );
  }, [activeFileId]);

  const statusLabel = useMemo(() => {
    switch (status) {
      case "loading":
        return "Loading harness";
      case "ready":
        return "Ready for Java demo";
      case "running":
        return "Running Java demo";
      case "error":
        return "Harness error";
    }
  }, [status]);

  const conflictingControls = useMemo<Record<string, string[]>>(
    () => ({
      a: ["y"],
      y: ["a"],
      left_bumper: ["right_bumper"],
      right_bumper: ["left_bumper"],
      dpad_up: ["dpad_down"],
      dpad_down: ["dpad_up"],
      dpad_left: ["dpad_right"],
      dpad_right: ["dpad_left"],
    }),
    []
  );

  const setGamepadButtonState = useCallback(
    (controlName: string, nextValue: boolean) => {
      setGamepadState((previousState) => {
        const nextState = {
          ...previousState,
          [controlName]: nextValue,
        };

        if (nextValue) {
          for (const conflictingControl of conflictingControls[controlName] ?? []) {
            nextState[conflictingControl] = false;
          }
        }

        return nextState;
      });
    },
    [conflictingControls]
  );

  const clearGamepad = useCallback(() => {
    setGamepadState({
      a: false,
      b: false,
      x: false,
      y: false,
      dpad_up: false,
      dpad_down: false,
      dpad_left: false,
      dpad_right: false,
      left_bumper: false,
      right_bumper: false,
    });
  }, []);

  const bindGamepadPress = useCallback(
    (controlName: string) => ({
      onMouseDown: () => setGamepadButtonState(controlName, true),
      onMouseUp: () => setGamepadButtonState(controlName, false),
      onMouseLeave: () => setGamepadButtonState(controlName, false),
      onTouchStart: () => setGamepadButtonState(controlName, true),
      onTouchEnd: () => setGamepadButtonState(controlName, false),
      onTouchCancel: () => setGamepadButtonState(controlName, false),
    }),
    [setGamepadButtonState]
  );

  return (
    <Card className="border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
      <CardHeader>
        <CardTitle className="text-xl text-white">Java Bridge Harness</CardTitle>
        <CardDescription className="text-slate-400">
          Isolated CheerpJ runtime with a tiny FTC-style mock package backed by native methods that
          forward Java calls into the simulator bridge.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="text-sm text-slate-300">{statusLabel}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Detected {detectedOpModeType === "teleop" ? "TeleOp" : "Autonomous"} opmode
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={runDemo} disabled={status === "running"}>
              Load Code
            </Button>
            <Button
              variant="secondary"
              onClick={startOpMode}
              disabled={!awaitingStart}
            >
              Start OpMode
            </Button>
            <Button
              variant="outline"
              onClick={stopOpMode}
              className="bg-slate-900 text-slate-100"
            >
              Stop OpMode
            </Button>
            <Button variant="outline" onClick={resetFiles} className="bg-slate-900 text-slate-100">
              Reset Files
            </Button>
          </div>
        </div>

        <iframe
          ref={iframeRef}
          srcDoc={HARNESS_HTML}
          title="Simulator Java Harness"
          className="h-24 w-full rounded-2xl border border-slate-800 bg-slate-950"
        />

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.22em] text-slate-400">
            User Java Workbench
          </div>
          <div className="flex flex-wrap gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
            <Button size="sm" variant="secondary" onClick={loadAutonomousTemplate}>
              Load Autonomous Template
            </Button>
            <Button size="sm" variant="secondary" onClick={loadTeleOpTemplate}>
              Load TeleOp Template
            </Button>
          </div>
          <div className="flex flex-wrap border-b border-slate-800 bg-slate-900/70">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`border-r border-slate-800 px-4 py-2 text-sm transition-colors ${
                  activeFile?.id === file.id
                    ? "bg-slate-950 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>
          <div className="h-[420px]">
            {activeFile ? (
              <AceEditor
                mode="java"
                theme="monokai"
                name="simulator-java-workbench"
                value={activeFile.content}
                onChange={handleFileChange}
                width="100%"
                height="100%"
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  fontSize: 14,
                  showPrintMargin: false,
                  useWorker: false,
                  wrap: true,
                }}
              />
            ) : null}
          </div>
        </div>

        {detectedOpModeType === "teleop" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-slate-100">Gamepad 1</p>
                <p className="mb-0 text-xs text-slate-400">
                  Toggle buttons to simulate live FTC teleop input.
                </p>
              </div>
              <Button size="sm" variant="outline" className="bg-slate-950 text-slate-100" onClick={clearGamepad}>
                Clear Buttons
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="grid grid-cols-3 gap-2">
                <div />
                {["dpad_up"].map((control) => (
                  <Button
                    key={control}
                    variant={gamepadState[control] ? "default" : "outline"}
                    className="bg-slate-950 text-slate-100"
                    {...bindGamepadPress(control)}
                  >
                    Up
                  </Button>
                ))}
                <div />
                {[
                  ["dpad_left", "Left"],
                  ["dpad_down", "Down"],
                  ["dpad_right", "Right"],
                ].map(([control, label]) => (
                  <Button
                    key={control}
                    variant={gamepadState[control] ? "default" : "outline"}
                    className="bg-slate-950 text-slate-100"
                    {...bindGamepadPress(control)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={gamepadState.left_bumper ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("left_bumper")}
                >
                  LB
                </Button>
                <div />
                <Button
                  variant={gamepadState.right_bumper ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("right_bumper")}
                >
                  RB
                </Button>
                <div />
                <Button
                  variant={gamepadState.y ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("y")}
                >
                  Y
                </Button>
                <div />
                <Button
                  variant={gamepadState.x ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("x")}
                >
                  X
                </Button>
                <Button
                  variant={gamepadState.b ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("b")}
                >
                  B
                </Button>
                <div />
                <Button
                  variant={gamepadState.a ? "default" : "outline"}
                  className="bg-slate-950 text-slate-100"
                  {...bindGamepadPress("a")}
                >
                  A
                </Button>
                <div />
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 font-mono text-xs sm:text-sm">
          {logEntries.map((entry) => (
            <div
              key={entry.id}
              className={
                entry.tone === "error"
                  ? "text-rose-300"
                  : entry.tone === "success"
                    ? "text-emerald-300"
                    : "text-slate-200"
              }
            >
              {entry.message}
            </div>
          ))}
        </div>

        <p className="mb-0 text-xs text-slate-500">
          Hidden runtime support provides FTC-style classes, opmode lifecycle handling, and gamepad
          mapping while keeping the visible editor focused on robot-ready code.
        </p>
      </CardContent>
    </Card>
  );
}
