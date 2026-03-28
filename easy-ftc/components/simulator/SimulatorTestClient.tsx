"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createSimulatorBridge,
  createSimulatorStore,
  type SimulatorBridge,
  type SimulatorState,
} from "@/lib/simulator/mechanismSimulator";

const SimulatorJavaHarness = dynamic(
  () => import("@/components/simulator/SimulatorJavaHarness"),
  {
    ssr: false,
    loading: () => (
      <Card className="h-full border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-white">Java Workbench</CardTitle>
          <CardDescription className="text-slate-400">
            Loading the editor and simulator runtime...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[680px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 text-sm text-slate-400">
            Preparing code editor
          </div>
        </CardContent>
      </Card>
    ),
  }
);

declare global {
  interface Window {
    codeARobotSimulator?: SimulatorBridge;
  }
}

function useSimulatorSnapshot() {
  const storeRef = useRef(createSimulatorStore());
  const bridgeRef = useRef(createSimulatorBridge(storeRef.current));
  const [snapshot, setSnapshot] = useState<SimulatorState>(storeRef.current.getState());

  useEffect(() => {
    return storeRef.current.subscribe(() => {
      setSnapshot(storeRef.current.getState());
    });
  }, []);

  return {
    bridge: bridgeRef.current,
    snapshot,
    store: storeRef.current,
  };
}

export default function SimulatorTestClient() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { bridge, snapshot, store } = useSimulatorSnapshot();

  const statusTone = useMemo(() => {
    return snapshot.status === "running" ? "text-emerald-300" : "text-amber-300";
  }, [snapshot.status]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#09111f");
    scene.fog = new THREE.Fog("#09111f", 10, 40);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(5.5, 4.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1.2, 0);
    controls.minDistance = 3;
    controls.maxDistance = 16;
    controls.maxPolarAngle = Math.PI * 0.48;

    const hemiLight = new THREE.HemisphereLight("#dbeafe", "#102033", 1.5);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight("#ffffff", 1.6);
    sunLight.position.set(6, 10, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    scene.add(sunLight);

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 5.6, 0.3, 48),
      new THREE.MeshStandardMaterial({
        color: "#162235",
        metalness: 0.15,
        roughness: 0.88,
      })
    );
    floor.receiveShadow = true;
    floor.position.y = -0.15;
    scene.add(floor);

    const grid = new THREE.GridHelper(12, 18, "#4f8cff", "#20324d");
    grid.position.y = 0.01;
    scene.add(grid);

    const pedestal = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.8, 1.6),
      new THREE.MeshStandardMaterial({
        color: "#334155",
        metalness: 0.25,
        roughness: 0.72,
      })
    );
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    pedestal.position.y = 0.4;
    scene.add(pedestal);

    const shoulderPivot = new THREE.Group();
    shoulderPivot.position.set(0, 0.8, 0);
    scene.add(shoulderPivot);

    const shoulderJoint = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 1.1, 20),
      new THREE.MeshStandardMaterial({ color: "#93c5fd", metalness: 0.4, roughness: 0.4 })
    );
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulderJoint.castShadow = true;
    shoulderPivot.add(shoulderJoint);

    const armRoot = new THREE.Group();
    shoulderPivot.add(armRoot);

    const upperArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 2.4, 0.45),
      new THREE.MeshStandardMaterial({ color: "#e2e8f0", metalness: 0.22, roughness: 0.45 })
    );
    upperArm.position.y = 1.2;
    upperArm.castShadow = true;
    armRoot.add(upperArm);

    const wristMount = new THREE.Group();
    wristMount.position.y = 2.38;
    armRoot.add(wristMount);

    const wristBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.32, 0.55),
      new THREE.MeshStandardMaterial({ color: "#38bdf8", metalness: 0.25, roughness: 0.35 })
    );
    wristBlock.castShadow = true;
    wristMount.add(wristBlock);

    const leftFinger = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.62, 0.18),
      new THREE.MeshStandardMaterial({ color: "#fb7185", metalness: 0.1, roughness: 0.4 })
    );
    leftFinger.position.set(-0.16, 0.48, 0);
    leftFinger.castShadow = true;
    wristMount.add(leftFinger);

    const rightFinger = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.62, 0.18),
      new THREE.MeshStandardMaterial({ color: "#fb7185", metalness: 0.1, roughness: 0.4 })
    );
    rightFinger.position.set(0.16, 0.48, 0);
    rightFinger.castShadow = true;
    wristMount.add(rightFinger);

    const axes = new THREE.AxesHelper(1.8);
    axes.position.set(-2.2, 0.12, -2.2);
    scene.add(axes);

    let frameId = 0;
    let previousTime = performance.now();

    const applyStateToMeshes = (state: SimulatorState) => {
      armRoot.rotation.z = THREE.MathUtils.degToRad(state.armAngleDeg);
      const clawSpread = 0.12 + state.clawOpenAmount * 0.28;
      leftFinger.position.x = -clawSpread;
      rightFinger.position.x = clawSpread;
    };

    const handleResize = () => {
      if (!mountRef.current) {
        return;
      }

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    const tick = (time: number) => {
      const deltaSeconds = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      store.step(deltaSeconds);
      applyStateToMeshes(store.getState());
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(tick);
    };

    applyStateToMeshes(store.getState());
    window.addEventListener("resize", handleResize);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [store]);

  useEffect(() => {
    window.codeARobotSimulator = bridge;
    window.dispatchEvent(
      new CustomEvent("codearobot:simulator-ready", {
        detail: { bridge },
      })
    );

    const unsubscribe = store.subscribe(() => {
      window.dispatchEvent(
        new CustomEvent("codearobot:simulator-state-changed", {
          detail: { state: store.getState() },
        })
      );
    });

    return () => {
      unsubscribe();
      if (window.codeARobotSimulator === bridge) {
        delete window.codeARobotSimulator;
      }
    };
  }, [bridge, store]);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-sky-950/20">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300/80">
                Simulator Test
              </p>
              <h1 className="mb-0 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                FTC mechanism MVP for future CheerpJ control
              </h1>
              <p className="mb-0 max-w-2xl text-base text-slate-300 sm:text-lg">
                This prototype keeps simulator state, user actions, and mesh updates separate so
                future Java bridge calls can drive the same system without rewriting the renderer.
              </p>
            </div>
            <div className="rounded-2xl border border-sky-400/20 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              <div className="font-medium text-slate-100">Architecture status</div>
              <div className={statusTone}>Simulation loop: {snapshot.status}</div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)]">
            <Card className="overflow-hidden border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
              <CardHeader className="border-b border-slate-800/80 pb-4">
                <CardTitle className="text-xl text-white">Mechanism View</CardTitle>
                <CardDescription className="text-slate-400">
                  Orbit around the testbed while the render loop applies transforms from simulator
                  state.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  ref={mountRef}
                  className="h-[420px] w-full sm:h-[560px] xl:h-[680px]"
                />
              </CardContent>
            </Card>

            <div className="min-h-0">
              <SimulatorJavaHarness bridge={bridge} />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-4">
              <Card className="border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Controls</CardTitle>
                  <CardDescription className="text-slate-400">
                    Buttons dispatch simulator actions. The renderer only reads the updated state.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button className="col-span-1" onClick={() => bridge.run()}>
                    Run
                  </Button>
                  <Button variant="secondary" className="col-span-1" onClick={() => bridge.reset()}>
                    Reset
                  </Button>
                  <Button variant="outline" className="bg-slate-900 text-slate-100" onClick={() => bridge.openClaw()}>
                    Open Claw
                  </Button>
                  <Button variant="outline" className="bg-slate-900 text-slate-100" onClick={() => bridge.closeClaw()}>
                    Close Claw
                  </Button>
                  <Button variant="outline" className="bg-slate-900 text-slate-100" onClick={() => bridge.armUp()}>
                    Arm Up
                  </Button>
                  <Button variant="outline" className="bg-slate-900 text-slate-100" onClick={() => bridge.armDown()}>
                    Arm Down
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Bridge Notes</CardTitle>
                  <CardDescription className="text-slate-400">
                    Current extension points for future browser and CheerpJ FTC bridge work.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p className="mb-0">
                    `motor.setPower()` and target-position calls update simulator state, not mesh
                    objects.
                  </p>
                  <p className="mb-0">
                    `servo.setPosition()` maps to claw state and renders through the animation
                    loop.
                  </p>
                  <p className="mb-0">
                    `window.codeARobotSimulator` is exposed for future browser-side bridge code and
                    debug testing.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-white">Telemetry / Debug</CardTitle>
                <CardDescription className="text-slate-400">
                  Live simulator snapshot for encoder, run mode, targets, and motion state.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 font-mono text-sm">
                  {snapshot.telemetry.map((entry) => (
                    <div
                      key={entry.label}
                      className="flex items-center justify-between gap-4 border-b border-slate-800/70 pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="text-slate-400">{entry.label}</span>
                      <span className="text-right text-slate-100">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/80 text-slate-100 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl text-white">Bridge Event Log</CardTitle>
                <CardDescription className="text-slate-400">
                  Recent bridge calls from UI controls and Java runtime code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 font-mono text-xs sm:text-sm">
                  {snapshot.telemetryLog.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between gap-4 border-b border-slate-800/70 pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="text-slate-400">{entry.timestampLabel}</span>
                      <span className="text-right text-slate-100">{entry.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
