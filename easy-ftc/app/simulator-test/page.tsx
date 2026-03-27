import type { Metadata } from "next";

import SimulatorTestClient from "@/components/simulator/SimulatorTestClient";

export const metadata: Metadata = {
  title: "Simulator Test | Code-A-Robot",
  description:
    "Development-focused FTC simulator testbed using Three.js and a state-driven architecture.",
};

export default function SimulatorTestPage() {
  return <SimulatorTestClient />;
}
