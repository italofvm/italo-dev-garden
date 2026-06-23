import { useState, useCallback } from "react";

interface PhysicsItem {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function useLabPhysics(items: PhysicsItem[]) {
  const [positions, setPositions] = useState(items);

  const applyForce = useCallback((id: string, fx: number, fy: number) => {
    setPositions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, vx: item.vx + fx, vy: item.vy + fy } : item,
      ),
    );
  }, []);

  return { positions, applyForce };
}
