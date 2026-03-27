"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const DEMO_FILES = [
  {
    name: "SimulatorNative.java",
    content: `package sim.bridge;

public class SimulatorNative {
  public static native void setMotorPower(String deviceName, double power);
  public static native int getMotorCurrentPosition(String deviceName);
  public static native void setMotorTargetPosition(String deviceName, int targetTicks);
  public static native void setMotorMode(String deviceName, String mode);
  public static native boolean isMotorBusy(String deviceName);
  public static native void setServoPosition(String deviceName, double position);
  public static native void addTelemetry(String caption, String value);
  public static native void waitForStart();
}
`,
  },
  {
    name: "DcMotor.java",
    content: `package sim.ftc;

import sim.bridge.SimulatorNative;

public class DcMotor {
  public enum RunMode {
    RUN_WITHOUT_ENCODER,
    RUN_TO_POSITION
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
    name: "ElapsedTime.java",
    content: `package sim.ftc;

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
    content: `package sim.ftc;

import sim.bridge.SimulatorNative;

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
    name: "Telemetry.java",
    content: `package sim.ftc;

import sim.bridge.SimulatorNative;

public class Telemetry {
  public void addData(String caption, Object value) {
    SimulatorNative.addTelemetry(caption, String.valueOf(value));
  }
}
`,
  },
  {
    name: "HardwareMap.java",
    content: `package sim.ftc;

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
    name: "LinearOpMode.java",
    content: `package sim.ftc;

public abstract class LinearOpMode {
  public final HardwareMap hardwareMap = new HardwareMap();
  public final Telemetry telemetry = new Telemetry();
  private boolean started = false;

  public abstract void runOpMode() throws Exception;

  public void sleep(long milliseconds) throws InterruptedException {
    Thread.sleep(milliseconds);
  }

  public void waitForStart() {
    telemetry.addData("opMode", "waiting for start");
    sim.bridge.SimulatorNative.waitForStart();
    started = true;
    telemetry.addData("opMode", "started");
  }

  public boolean opModeIsActive() {
    return started;
  }
}
`,
  },
  {
    name: "MechanismTestOpMode.java",
    content: `package sim.demo;

import sim.ftc.DcMotor;
import sim.ftc.ElapsedTime;
import sim.ftc.LinearOpMode;
import sim.ftc.Servo;

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
  {
    name: "Main.java",
    content: `package sim.demo;

public class Main {
  public static void main(String[] args) throws Exception {
    new MechanismTestOpMode().runOpMode();
  }
}
`,
  },
];

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

      async function Java_sim_bridge_SimulatorNative_setMotorPower(lib, deviceName, power) {
        notifyParent("sim-java-motor-power", {
          deviceName: String(deviceName),
          power: Number(power),
        });
      }

      async function Java_sim_bridge_SimulatorNative_getMotorCurrentPosition(lib, deviceName) {
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

      async function Java_sim_bridge_SimulatorNative_setMotorTargetPosition(
        lib,
        deviceName,
        targetTicks
      ) {
        notifyParent("sim-java-set-motor-target-position", {
          deviceName: String(deviceName),
          targetTicks: Number(targetTicks),
        });
      }

      async function Java_sim_bridge_SimulatorNative_setMotorMode(lib, deviceName, mode) {
        notifyParent("sim-java-set-motor-mode", {
          deviceName: String(deviceName),
          mode: String(mode),
        });
      }

      async function Java_sim_bridge_SimulatorNative_isMotorBusy(lib, deviceName) {
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

      async function Java_sim_bridge_SimulatorNative_setServoPosition(lib, deviceName, position) {
        notifyParent("sim-java-servo-position", {
          deviceName: String(deviceName),
          position: Number(position),
        });
      }

      async function Java_sim_bridge_SimulatorNative_addTelemetry(lib, caption, value) {
        notifyParent("sim-java-telemetry", {
          caption: String(caption),
          value: String(value),
        });
      }

      let startResolver = null;
      let hasPendingStart = false;

      async function Java_sim_bridge_SimulatorNative_waitForStart() {
        notifyParent("sim-java-waiting-for-start", {});
        setStatus("Waiting for start signal…");

        if (hasPendingStart) {
          hasPendingStart = false;
          notifyParent("sim-java-started", {});
          setStatus("Java demo running…");
          return;
        }

        await new Promise((resolve) => {
          startResolver = () => {
            startResolver = null;
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
              Java_sim_bridge_SimulatorNative_setMotorPower,
              Java_sim_bridge_SimulatorNative_getMotorCurrentPosition,
              Java_sim_bridge_SimulatorNative_setMotorTargetPosition,
              Java_sim_bridge_SimulatorNative_setMotorMode,
              Java_sim_bridge_SimulatorNative_isMotorBusy,
              Java_sim_bridge_SimulatorNative_setServoPosition,
              Java_sim_bridge_SimulatorNative_addTelemetry,
              Java_sim_bridge_SimulatorNative_waitForStart,
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

        if (
          event.data.type === "sim-java-motor-position-response" ||
          event.data.type === "sim-java-motor-busy-response"
        ) {
          return;
        }

        if (event.data.type !== "sim-java-run-demo") {
          return;
        }

        const files = event.data.files || [];
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
          await cheerpjRunMain("sim.demo.Main", classPath);
          setStatus("Java demo complete");
          notifyParent("sim-java-complete", {});
        } catch (error) {
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
  const [logEntries, setLogEntries] = useState<HarnessLogEntry[]>([
    { id: 1, tone: "default", message: "Preparing isolated CheerpJ harness..." },
  ]);

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
          appendLog("CheerpJ native-method harness is ready.", "success");
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
            String(event.data.mode) as "RUN_WITHOUT_ENCODER" | "RUN_TO_POSITION"
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
          appendLog("Java bridge demo completed.", "success");
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
  }, [appendLog, bridge]);

  const postRunDemo = useCallback(() => {
    if (!iframeRef.current?.contentWindow) {
      appendLog("Harness iframe is not ready yet.", "error");
      return;
    }

    setStatus("running");
    setAwaitingStart(false);
    setPendingRun(false);
    bridge.reset();
    appendLog("Posting Java demo files into CheerpJ...");
    iframeRef.current.contentWindow.postMessage(
      {
        type: "sim-java-run-demo",
        files: DEMO_FILES,
      },
      "*"
    );
  }, [appendLog, bridge]);

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
          <div className="text-sm text-slate-300">{statusLabel}</div>
          <div className="flex gap-3">
            <Button onClick={runDemo} disabled={status === "running"}>
              Load Java Demo
            </Button>
            <Button
              variant="secondary"
              onClick={startOpMode}
              disabled={!awaitingStart}
            >
              Start OpMode
            </Button>
          </div>
        </div>

        <iframe
          ref={iframeRef}
          srcDoc={HARNESS_HTML}
          title="Simulator Java Harness"
          className="h-24 w-full rounded-2xl border border-slate-800 bg-slate-950"
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="mb-3 font-mono text-xs text-slate-400">
            Mock FTC demo files injected into CheerpJ:
          </p>
          <pre className="mb-0 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">
{DEMO_FILES.map((file) => `// ${file.name}\n${file.content}`).join("\n")}
          </pre>
        </div>

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
      </CardContent>
    </Card>
  );
}
