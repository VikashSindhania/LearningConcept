import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

// Example 1: DOM Measurement
const DomMeasurementExample = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">DOM Measurement Example</h3>
      <div className="space-y-4">
        <div ref={divRef} className="p-4 bg-blue-100 rounded">
          <p>This div's dimensions are measured using useLayoutEffect</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>Width: {width}px</p>
          <p>Height: {height}px</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Measures DOM elements before paint</li>
          <li>Prevents layout thrashing</li>
          <li>Useful for animations</li>
          <li>Blocks visual updates</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Synchronous State Updates
const SyncStateExample = () => {
  const [count, setCount] = useState(0);
  const [doubledCount, setDoubledCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);

  useLayoutEffect(() => {
    setDoubledCount(count * 2);
  }, [count]);

  useEffect(() => {
    setEffectCount(count * 2);
  }, [count]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Synchronous State Updates</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
          <span>Count: {count}</span>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>useLayoutEffect doubled: {doubledCount}</p>
          <p>useEffect doubled: {effectCount}</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Synchronous state updates</li>
          <li>No visual flicker</li>
          <li>Runs before browser paint</li>
          <li>Useful for derived state</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Animation Synchronization
const AnimationExample = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    if (isAnimating && boxRef.current) {
      // Reset position before animation
      boxRef.current.style.transform = "translateX(0)";
      // Force reflow by storing the value
      const height = boxRef.current.offsetHeight;
      // Start animation
      boxRef.current.style.transform = "translateX(200px)";
      // Log the height to show it's being used
      console.log("Element height:", height);
    }
  }, [isAnimating]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Animation Synchronization</h3>
      <div className="space-y-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isAnimating ? "Reset" : "Animate"}
        </button>
        <div className="h-20 relative">
          <div
            ref={boxRef}
            className="w-12 h-12 bg-blue-500 rounded absolute transition-transform duration-500"
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Smooth animations</li>
          <li>No layout thrashing</li>
          <li>Proper animation timing</li>
          <li>Visual consistency</li>
        </ul>
      </div>
    </div>
  );
};

// Example 4: Scroll Position Management
const ScrollPositionExample = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollTop);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Scroll Position Management</h3>
      <div className="space-y-4">
        <div ref={containerRef} className="h-40 overflow-y-auto border rounded">
          <div className="h-80 p-4">
            <p>Scroll position: {scrollPosition}px</p>
            <p>Scroll up and down to see the position update</p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Immediate scroll position updates</li>
          <li>No visual lag</li>
          <li>Proper cleanup</li>
          <li>Event listener management</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Virtual Scrolling with useLayoutEffect
const VirtualScrollExample = () => {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }))
  );
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const itemHeight = 50;
  const containerHeight = 400;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setScrollTop(scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 1;
    const endIndex = Math.min(startIndex + visibleCount, items.length);

    setVisibleItems(items.slice(startIndex, endIndex));
  }, [scrollTop, items]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Virtual Scrolling</h3>
      <div className="space-y-4">
        <div
          ref={containerRef}
          className="h-[400px] overflow-y-auto border rounded relative"
          style={{ height: containerHeight }}
        >
          <div style={{ height: items.length * itemHeight }}>
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border-b"
                style={{
                  position: "absolute",
                  top: item.id * itemHeight,
                  height: itemHeight,
                  width: "100%",
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Efficient rendering of large lists</li>
          <li>DOM node recycling</li>
          <li>Scroll position tracking</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Complex Animation with useLayoutEffect
const ComplexAnimationExample = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState(0);
  const boxRef = useRef(null);
  const animationRef = useRef(null);

  useLayoutEffect(() => {
    if (!isAnimating || !boxRef.current) return;

    const box = boxRef.current;
    const startTime = performance.now();
    const duration = 2000;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const angle = progress * Math.PI * 2;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        const scale = 1 + Math.sin(angle) * 0.5;
        const rotation = progress * 360;

        box.style.transform = `
          translate(${x}px, ${y}px)
          scale(${scale})
          rotate(${rotation}deg)
        `;

        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPhase((prev) => (prev + 1) % 3);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, phase]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex Animation</h3>
      <div className="space-y-4">
        <button
          onClick={() => setIsAnimating(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isAnimating}
        >
          {isAnimating ? "Animating..." : "Start Animation"}
        </button>
        <div className="h-40 relative">
          <div
            ref={boxRef}
            className="w-12 h-12 bg-blue-500 rounded absolute transition-transform duration-500"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex animation sequences</li>
          <li>Performance optimization</li>
          <li>Animation frame management</li>
          <li>Cleanup handling</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Advanced DOM Manipulation
const AdvancedDomExample = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const contentHeight = content.scrollHeight;

    if (isExpanded) {
      content.style.height = "0";
      const startHeight = content.scrollHeight;
      content.style.height = `${startHeight}px`;
      setHeight(startHeight);
    } else {
      content.style.height = `${contentHeight}px`;
      requestAnimationFrame(() => {
        content.style.height = "0";
      });
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced DOM Manipulation</h3>
      <div className="space-y-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300"
          style={{ height: isExpanded ? "auto" : "0" }}
        >
          <div className="p-4 bg-gray-50 rounded">
            <p>This content is dynamically expanded and collapsed.</p>
            <p>The height is calculated and set using useLayoutEffect.</p>
            <p>This ensures smooth animations without layout thrashing.</p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Dynamic height calculations</li>
          <li>Smooth transitions</li>
          <li>Layout thrashing prevention</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

const UseLayoutEffectHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Understanding useLayoutEffect
        </h1>
        <p className="text-center text-gray-600 mb-8">
          useLayoutEffect is similar to useEffect, but it runs synchronously
          after all DOM mutations. This makes it ideal for measurements and
          synchronous state updates that need to happen before the browser
          paints.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DomMeasurementExample />
          <SyncStateExample />
          <AnimationExample />
          <ScrollPositionExample />
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Advanced Examples</h2>
        <div className="grid grid-cols-1 gap-8">
          <VirtualScrollExample />
          <ComplexAnimationExample />
          <AdvancedDomExample />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            useLayoutEffect vs useEffect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">useLayoutEffect</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Runs synchronously after DOM mutations</li>
                <li>Blocks visual updates</li>
                <li>Ideal for measurements</li>
                <li>Useful for animations</li>
                <li>Prevents layout thrashing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">useEffect</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Runs asynchronously after paint</li>
                <li>Doesn't block visual updates</li>
                <li>Better for data fetching</li>
                <li>Good for side effects</li>
                <li>More performant for most cases</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">DOM Operations</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Element measurements</li>
                <li>Scroll position</li>
                <li>DOM mutations</li>
                <li>Layout calculations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Visual Effects</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Animations</li>
                <li>Transitions</li>
                <li>Position calculations</li>
                <li>Visual synchronization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseLayoutEffectHook;
