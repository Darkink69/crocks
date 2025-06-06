import { useState, useEffect, useRef, useCallback } from "react";

interface MotionSensorResult {
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  rotation: {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  };
  steps: number;
  error: string | null;
  isSupported: boolean;
  isActive: boolean;
  requestPermission: () => Promise<void>;
  resetSteps: () => void;
  startTracking: () => void;
  stopTracking: () => void;
}

const useMotionSensor = (): MotionSensorResult => {
  const [data, setData] = useState<
    Omit<
      MotionSensorResult,
      | "requestPermission"
      | "resetSteps"
      | "isSupported"
      | "isActive"
      | "startTracking"
      | "stopTracking"
    >
  >({
    acceleration: { x: null, y: null, z: null },
    rotation: { alpha: null, beta: null, gamma: null },
    steps: 0,
    error: null,
  });

  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const lastAcceleration = useRef<number>(0);
  const stepThreshold = useRef<number>(12);

  const handleDeviceMotion = useCallback(
    (event: DeviceMotionEvent) => {
      if (!isActive) return;

      setData((prev) => ({
        ...prev,
        acceleration: {
          x: event.acceleration?.x ?? null,
          y: event.acceleration?.y ?? null,
          z: event.acceleration?.z ?? null,
        },
        rotation: {
          alpha: event.rotationRate?.alpha ?? null,
          beta: event.rotationRate?.beta ?? null,
          gamma: event.rotationRate?.gamma ?? null,
        },
      }));

      // Подсчет шагов
      if (event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;
        const currentAcceleration = Math.sqrt(
          (x ?? 0) ** 2 + (y ?? 0) ** 2 + (z ?? 0) ** 2
        );

        if (
          Math.abs(currentAcceleration - lastAcceleration.current) >
          stepThreshold.current
        ) {
          setData((prev) => ({ ...prev, steps: prev.steps + 1 }));
        }

        lastAcceleration.current = currentAcceleration;
      }
    },
    [isActive]
  );

  const requestPermission = useCallback(async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        if (permission === "granted") {
          startTracking();
        } else {
          setData((prev) => ({ ...prev, error: "Permission denied" }));
        }
      } catch (err) {
        setData((prev) => ({
          ...prev,
          error: `Permission error: ${
            err instanceof Error ? err.message : String(err)
          }`,
        }));
      }
    } else {
      startTracking();
    }
  }, []);

  const startTracking = useCallback(() => {
    if (window.DeviceMotionEvent) {
      window.addEventListener(
        "devicemotion",
        handleDeviceMotion as EventListener
      );
      setIsSupported(true);
      setIsActive(true);
    } else {
      setData((prev) => ({ ...prev, error: "DeviceMotion not supported" }));
      setIsSupported(false);
    }
  }, [handleDeviceMotion]);

  const stopTracking = useCallback(() => {
    window.removeEventListener(
      "devicemotion",
      handleDeviceMotion as EventListener
    );
    setIsActive(false);
  }, [handleDeviceMotion]);

  const resetSteps = useCallback(() => {
    setData((prev) => ({ ...prev, steps: 0 }));
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    ...data,
    isSupported,
    isActive,
    requestPermission,
    resetSteps,
    startTracking,
    stopTracking,
  };
};

export default useMotionSensor;
