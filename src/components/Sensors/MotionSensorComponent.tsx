import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/store";

interface MotionData {
  acceleration: DeviceMotionEvent["acceleration"];
  accelerationIncludingGravity: DeviceMotionEvent["accelerationIncludingGravity"];
  rotationRate: DeviceMotionEvent["rotationRate"];
  interval: DeviceMotionEvent["interval"];
}

const MotionSensorComponent = observer(() => {
  const [motionData, setMotionData] = useState<MotionData | null>(null);
  const [stepCount, setStepCount] = useState<number>(store.steps);
  const [error, setError] = useState<string | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] =
    useState<boolean>(false);

  // Функция для запроса разрешения (особенно важно для iOS 13+)
  const requestPermission = async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      try {
        const permissionState = await (
          DeviceMotionEvent as any
        ).requestPermission();
        if (permissionState === "granted") {
          setIsPermissionGranted(true);
          startMotionTracking();
          // store.setStart(true);
        } else {
          setError("Permission to access motion sensors was denied");
        }
      } catch (err) {
        setError(
          `Error requesting permission: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    } else {
      // Для браузеров, которые не требуют явного разрешения
      setIsPermissionGranted(true);
      startMotionTracking();
      // store.setStart(true);
    }
  };

  // Обработчик данных с датчиков
  const handleDeviceMotion = (event: DeviceMotionEvent) => {
    
    setMotionData({
      acceleration: event.acceleration,
      accelerationIncludingGravity: event.accelerationIncludingGravity,
      rotationRate: event.rotationRate,
      interval: event.interval,
    });

    // Простейший алгоритм подсчета шагов
    if (event.accelerationIncludingGravity) {
      const { x, y, z } = event.accelerationIncludingGravity;
      const totalAcceleration = Math.sqrt(
        (x ?? 0) ** 2 + (y ?? 0) ** 2 + (z ?? 0) ** 2
      );

      // Логика определения шага (упрощенная)
      if (totalAcceleration > 20) {
        // Пороговое значение нужно настраивать
        setStepCount((prev) => prev + 1);
        store.setSteps(stepCount);
        store.setMo(totalAcceleration)
      }
    }
  };

  // Запуск отслеживания движения
  const startMotionTracking = () => {
    if (window.DeviceMotionEvent) {
      window.addEventListener(
        "devicemotion",
        handleDeviceMotion as EventListener
      );
    } else {
      setError("DeviceMotion API is not supported in this browser");
    }
  };

  // const setHeaderSteps = () => {
  //   // let current = store.steps;

  //   let timerId = setInterval(function () {
  //     store.setSteps(stepCount);
  //     if (store.start === false) {
  //       localStorage.setItem(
  //         "crocks",
  //         JSON.stringify({ steps: store.steps, data: 0 })
  //       );
  //       clearInterval(timerId);
  //     }
  //     // current++;
  //   }, 2000);
  // };
  

  // useEffect(() => {
  //   setHeaderSteps();
  // }, [stepCount]);

  useEffect(() => {
    if (store.start) {
      // setHeaderSteps();
      requestPermission();
      // startMotionTracking()
    } else {
      localStorage.setItem("crocks",JSON.stringify({ steps: store.steps, data: 0 }));
     
      window.removeEventListener(
        "devicemotion",
        handleDeviceMotion as EventListener
      );
    };
    
  }, [store.start]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      window.removeEventListener(
        "devicemotion",
        handleDeviceMotion as EventListener
      );
    };
  }, []);

  return (
    <div className="motion-sensor-container text-black">
      <h2>Motion Sensors Data</h2>

      {!isPermissionGranted ? (
        <button onClick={requestPermission}>Enable Motion Sensors</button>
      ) : (
        <>
          <div className="step-counter">
            <h3>Step Count: {stepCount}</h3>
            <button onClick={() => setStepCount(0)}>Reset</button>
          </div>

          <div className="sensor-data">
            <h3>Acceleration (without gravity):</h3>
            <p>X: {motionData?.acceleration?.x?.toFixed(2) ?? "N/A"}</p>
            <p>Y: {motionData?.acceleration?.y?.toFixed(2) ?? "N/A"}</p>
            <p>Z: {motionData?.acceleration?.z?.toFixed(2) ?? "N/A"}</p>

            <h3>Acceleration (with gravity):</h3>
            <p>
              X:{" "}
              {motionData?.accelerationIncludingGravity?.x?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              Y:{" "}
              {motionData?.accelerationIncludingGravity?.y?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              Z:{" "}
              {motionData?.accelerationIncludingGravity?.z?.toFixed(2) ?? "N/A"}
            </p>

            <h3>Rotation Rate:</h3>
            <p>Alpha: {motionData?.rotationRate?.alpha?.toFixed(2) ?? "N/A"}</p>
            <p>Beta: {motionData?.rotationRate?.beta?.toFixed(2) ?? "N/A"}</p>
            <p>Gamma: {motionData?.rotationRate?.gamma?.toFixed(2) ?? "N/A"}</p>
          </div>
        </>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
});

export default MotionSensorComponent;
