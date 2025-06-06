import useMotionSensor from "./useMotionSensor";

const MotionSensorApp = () => {
  const {
    acceleration,
    rotation,
    steps,
    error,
    isSupported,
    isActive,
    requestPermission,
    resetSteps,
    startTracking,
    stopTracking,
  } = useMotionSensor();

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Motion Sensor Demo</h1>

      {!isSupported ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <p style={{ color: "#c62828" }}>
            {error || "Motion sensors are not supported in your browser"}
          </p>
          <button
            onClick={requestPermission}
            style={{
              padding: "10px 15px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Request Permission
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0 }}>Steps: {steps}</h2>
            <div>
              <button
                onClick={resetSteps}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Reset Steps
              </button>

              {isActive ? (
                <button
                  onClick={stopTracking}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Stop Tracking
                </button>
              ) : (
                <button
                  onClick={startTracking}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#4caf50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Start Tracking
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                padding: "15px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Acceleration (m/s²)</h3>
              <p>X: {acceleration.x?.toFixed(2) ?? "N/A"}</p>
              <p>Y: {acceleration.y?.toFixed(2) ?? "N/A"}</p>
              <p>Z: {acceleration.z?.toFixed(2) ?? "N/A"}</p>
            </div>

            <div
              style={{
                padding: "15px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Rotation (°/s)</h3>
              <p>Alpha: {rotation.alpha?.toFixed(2) ?? "N/A"}</p>
              <p>Beta: {rotation.beta?.toFixed(2) ?? "N/A"}</p>
              <p>Gamma: {rotation.gamma?.toFixed(2) ?? "N/A"}</p>
            </div>
          </div>

          <div
            style={{
              padding: "10px",
              backgroundColor: isActive ? "#e8f5e9" : "#ffebee",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>
              Status: <strong>{isActive ? "ACTIVE" : "INACTIVE"}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MotionSensorApp;
