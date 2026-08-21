"use client";

import { craftSteps } from "./craftData";
import CraftStep from "./CraftStep";

export default function CraftTimeline() {
  return (
    <div className="space-y-32">
      {craftSteps.map((step, index) => (
        <CraftStep
          key={step.id}
          {...step}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}