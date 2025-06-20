import useMotionSensor from "./useMotionSensor";

const MotionSensorApp = () => {
  const {
    acceleration,
    rotation,
    steps,
    error,
    isSupported,
    requestPermission,
    resetSteps,
  } = useMotionSensor();

  return (
    <div>
      <h1>Motion Sensor Demo</h1>

      {!isSupported ? (
        <div className="text-black">
          <p>{error || "Motion sensors are not supported"}</p>
          <button onClick={requestPermission}>Request Permission</button>
        </div>
      ) : (
        <>
          <div className="text-black">
            <h2>Steps: {steps}</h2>
            <button onClick={resetSteps}>Reset Steps</button>
          </div>

          <div>
            <h3>Acceleration</h3>
            <p>X: {acceleration.x?.toFixed(2) ?? "N/A"}</p>
            <p>Y: {acceleration.y?.toFixed(2) ?? "N/A"}</p>
            <p>Z: {acceleration.z?.toFixed(2) ?? "N/A"}</p>
          </div>

          <div>
            <h3>Rotation</h3>
            <p>Alpha: {rotation.alpha?.toFixed(2) ?? "N/A"}</p>
            <p>Beta: {rotation.beta?.toFixed(2) ?? "N/A"}</p>
            <p>Gamma: {rotation.gamma?.toFixed(2) ?? "N/A"}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MotionSensorApp;
