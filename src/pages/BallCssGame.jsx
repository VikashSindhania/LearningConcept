import React, { useState, useRef, forwardRef } from "react";

// Child Component: The Ball itself
const Ball = forwardRef(({ position, isDragging, onMouseDown }, ref) => {
  return (
    <div
      ref={ref}
      className="ball"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "50px",
        height: "50px",
        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
        borderRadius: "50%",
        animation: "rotate 1s linear infinite",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={onMouseDown}
    />
  );
});

// Child Component: CSS Code Display Panel
const CssCodePanel = ({ cssCode }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white p-4 shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Current CSS Code:</h3>
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
        {cssCode}
      </pre>
    </div>
  );
};

// Parent Component: Main Game Container
const BallCssGame = () => {
  // State to track the ball's position (x, y coordinates)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State to track if the ball is being dragged
  const [isDragging, setIsDragging] = useState(false);

  // State to store and display the CSS code
  const [cssCode, setCssCode] = useState("");

  // Reference to the ball element for DOM manipulation
  const ballRef = useRef(null);

  // Handle mouse down event - starts dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  // Handle mouse move event - updates ball position while dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !ballRef.current) return;

    // Calculate new position by subtracting half the ball's width/height
    // to center the ball on the cursor
    const newX = e.clientX - ballRef.current.offsetWidth / 2;
    const newY = e.clientY - ballRef.current.offsetHeight / 2;

    setPosition({ x: newX, y: newY });

    // Generate and update the CSS code with current position
    const newCssCode = `.ball {
  position: absolute;
  left: ${newX}px;
  top: ${newY}px;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  animation: rotate 1s linear infinite;
  cursor: grab;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;

    setCssCode(newCssCode);
  };

  // Handle mouse up event - stops dragging and clears CSS code
  const handleMouseUp = () => {
    setIsDragging(false);
    setCssCode(""); // Clear CSS code when not dragging
  };

  return (
    // Main container with full screen dimensions
    <div
      className="relative w-full h-screen bg-gray-100 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Child Component: Ball */}
      <Ball
        position={position}
        isDragging={isDragging}
        onMouseDown={handleMouseDown}
        ref={ballRef}
      />

      {/* Child Component: CSS Code Panel - only shown when dragging */}
      {isDragging && <CssCodePanel cssCode={cssCode} />}
    </div>
  );
};

export default BallCssGame;
