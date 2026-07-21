"use client";

import Layer from "../Layer";
import { ENV } from "./environment";

export default function EnvironmentEngine() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <Layer {...ENV.sky} />

      <Layer {...ENV.sun} />

      <Layer {...ENV.far} />

      <Layer {...ENV.middle} />

      <Layer {...ENV.temple} />

      <Layer {...ENV.front} />

      <Layer {...ENV.mist} />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 z-10 bg-black/15" />

      {/* Sunrise glow */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,205,90,.32), transparent 58%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-30"
        style={{
          background:
            "radial-gradient(circle, transparent 58%, rgba(0,0,0,.75) 100%)",
        }}
      />
    </div>
  );
}