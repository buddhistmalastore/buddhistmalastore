"use client";

import { ReactNode } from "react";
import CameraMotion from "./CameraMotion";

interface SceneEngineProps {
  children: ReactNode;
}

export default function SceneEngine({
  children,
}: SceneEngineProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CameraMotion>
        <div className="absolute inset-0">
          {children}
        </div>
      </CameraMotion>
    </div>
  );
}