import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

// Div item component
const DivItem = ({ className, children, onHover, id }) => {
  return (
    <div
      className={className}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  );
};

const VariousDivCases = () => {
  const [showCode, setShowCode] = useState(null);
  const [activeExample, setActiveExample] = useState("basic");
  const [codeProps, setCodeProps] = useState({});

  // Handle example selection
  const handleExampleSelect = (example) => {
    setActiveExample(example);
    console.log(`Selected example: ${example}`);
  };

  // Basic Div Example
  const BasicDivExample = () => {
    const [width, setWidth] = useState("200px");
    const [height, setHeight] = useState("100px");
    const [bgColor, setBgColor] = useState("bg-blue-500");

    const updateCodeProps = () => {
      setCodeProps({ width, height, bgColor });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              updateCodeProps();
              console.log("Width changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="100px">100px</option>
            <option value="200px">200px</option>
            <option value="300px">300px</option>
          </select>
          <select
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              updateCodeProps();
              console.log("Height changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="50px">50px</option>
            <option value="100px">100px</option>
            <option value="150px">150px</option>
          </select>
          <select
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              updateCodeProps();
              console.log("Background color changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="bg-blue-500">Blue</option>
            <option value="bg-red-500">Red</option>
            <option value="bg-green-500">Green</option>
          </select>
        </div>
        <div className="relative">
          <DivItem
            className={`${bgColor} text-white p-4 rounded-lg shadow-md`}
            style={{ width, height }}
            onHover={() => {
              setShowCode("basic");
              updateCodeProps();
            }}
            id="basic"
          >
            Basic Div
          </DivItem>
        </div>
      </div>
    );
  };

  // Positioned Div Example
  const PositionedDivExample = () => {
    const [position, setPosition] = useState("relative");
    const [top, setTop] = useState("0");
    const [left, setLeft] = useState("0");

    const updateCodeProps = () => {
      setCodeProps({ position, top, left });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              updateCodeProps();
              console.log("Position changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="static">Static</option>
            <option value="relative">Relative</option>
            <option value="absolute">Absolute</option>
            <option value="fixed">Fixed</option>
            <option value="sticky">Sticky</option>
          </select>
          <input
            type="text"
            value={top}
            onChange={(e) => {
              setTop(e.target.value);
              updateCodeProps();
              console.log("Top changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm w-20"
            placeholder="Top"
          />
          <input
            type="text"
            value={left}
            onChange={(e) => {
              setLeft(e.target.value);
              updateCodeProps();
              console.log("Left changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm w-20"
            placeholder="Left"
          />
        </div>
        <div className="relative h-64 border border-gray-300 rounded-lg p-4">
          <DivItem
            className="bg-purple-500 text-white p-4 rounded-lg shadow-md"
            style={{ position, top, left }}
            onHover={() => {
              setShowCode("positioned");
              updateCodeProps();
            }}
            id="positioned"
          >
            Positioned Div
          </DivItem>
        </div>
      </div>
    );
  };

  // Overflow Div Example
  const OverflowDivExample = () => {
    const [overflow, setOverflow] = useState("visible");
    const [content, setContent] = useState("short");

    const updateCodeProps = () => {
      setCodeProps({ overflow, content });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={overflow}
            onChange={(e) => {
              setOverflow(e.target.value);
              updateCodeProps();
              console.log("Overflow changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
            <option value="scroll">Scroll</option>
            <option value="auto">Auto</option>
          </select>
          <select
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              updateCodeProps();
              console.log("Content changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="short">Short Content</option>
            <option value="long">Long Content</option>
          </select>
        </div>
        <div className="relative">
          <DivItem
            className="bg-yellow-500 text-white p-4 rounded-lg shadow-md"
            style={{
              width: "200px",
              height: "100px",
              overflow,
            }}
            onHover={() => {
              setShowCode("overflow");
              updateCodeProps();
            }}
            id="overflow"
          >
            {content === "long"
              ? "This is a very long content that will demonstrate the overflow property. It should be long enough to cause overflow in the container."
              : "Short content"}
          </DivItem>
        </div>
      </div>
    );
  };

  // Border and Shadow Example
  const BorderShadowExample = () => {
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderWidth, setBorderWidth] = useState("1px");
    const [shadow, setShadow] = useState("shadow");

    const updateCodeProps = () => {
      setCodeProps({ borderStyle, borderWidth, shadow });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={borderStyle}
            onChange={(e) => {
              setBorderStyle(e.target.value);
              updateCodeProps();
              console.log("Border style changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
          <select
            value={borderWidth}
            onChange={(e) => {
              setBorderWidth(e.target.value);
              updateCodeProps();
              console.log("Border width changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="1px">1px</option>
            <option value="2px">2px</option>
            <option value="4px">4px</option>
          </select>
          <select
            value={shadow}
            onChange={(e) => {
              setShadow(e.target.value);
              updateCodeProps();
              console.log("Shadow changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="shadow">Default</option>
            <option value="shadow-md">Medium</option>
            <option value="shadow-lg">Large</option>
          </select>
        </div>
        <div className="relative">
          <DivItem
            className={`bg-pink-500 text-white p-4 rounded-lg ${shadow}`}
            style={{
              borderStyle,
              borderWidth,
              borderColor: "black",
            }}
            onHover={() => {
              setShowCode("border-shadow");
              updateCodeProps();
            }}
            id="border-shadow"
          >
            Border & Shadow Div
          </DivItem>
        </div>
      </div>
    );
  };

  // Responsive Div Example
  const ResponsiveDivExample = () => {
    const [breakpoint, setBreakpoint] = useState("mobile");

    const updateCodeProps = () => {
      setCodeProps({ breakpoint });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={breakpoint}
            onChange={(e) => {
              setBreakpoint(e.target.value);
              updateCodeProps();
              console.log("Breakpoint changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>
        <div className="relative">
          <DivItem
            className={`bg-indigo-500 text-white p-4 rounded-lg shadow-md ${
              breakpoint === "mobile"
                ? "w-full"
                : breakpoint === "tablet"
                ? "w-1/2"
                : "w-1/3"
            }`}
            onHover={() => {
              setShowCode("responsive");
              updateCodeProps();
            }}
            id="responsive"
          >
            Responsive Div
          </DivItem>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Div Element Showcase
      </h1>

      {/* Example Selection */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => handleExampleSelect("basic")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "basic"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Basic Div
        </button>
        <button
          onClick={() => handleExampleSelect("positioned")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "positioned"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Positioned Div
        </button>
        <button
          onClick={() => handleExampleSelect("overflow")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "overflow"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Overflow Div
        </button>
        <button
          onClick={() => handleExampleSelect("border-shadow")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "border-shadow"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Border & Shadow
        </button>
        <button
          onClick={() => handleExampleSelect("responsive")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "responsive"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Responsive Div
        </button>
      </div>

      {/* Example Display */}
      <div className="space-y-8">
        {activeExample === "basic" && <BasicDivExample />}
        {activeExample === "positioned" && <PositionedDivExample />}
        {activeExample === "overflow" && <OverflowDivExample />}
        {activeExample === "border-shadow" && <BorderShadowExample />}
        {activeExample === "responsive" && <ResponsiveDivExample />}
      </div>

      {/* Code Popups */}
      {showCode === "basic" && (
        <CodePopup
          code={`<div className="${codeProps.bgColor} text-white p-4 rounded-lg shadow-md"
  style={{
    width: "${codeProps.width}",
    height: "${codeProps.height}"
  }}>
  Basic Div
</div>`}
        />
      )}

      {showCode === "positioned" && (
        <CodePopup
          code={`<div className="bg-purple-500 text-white p-4 rounded-lg shadow-md"
  style={{
    position: "${codeProps.position}",
    top: "${codeProps.top}",
    left: "${codeProps.left}"
  }}>
  Positioned Div
</div>`}
        />
      )}

      {showCode === "overflow" && (
        <CodePopup
          code={`<div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md"
  style={{
    width: "200px",
    height: "100px",
    overflow: "${codeProps.overflow}"
  }}>
  ${codeProps.content === "long" ? "Long content..." : "Short content"}
</div>`}
        />
      )}

      {showCode === "border-shadow" && (
        <CodePopup
          code={`<div className="bg-pink-500 text-white p-4 rounded-lg ${codeProps.shadow}"
  style={{
    borderStyle: "${codeProps.borderStyle}",
    borderWidth: "${codeProps.borderWidth}",
    borderColor: "black"
  }}>
  Border & Shadow Div
</div>`}
        />
      )}

      {showCode === "responsive" && (
        <CodePopup
          code={`<div className={\`bg-indigo-500 text-white p-4 rounded-lg shadow-md \${
  breakpoint === "mobile"
    ? "w-full"
    : breakpoint === "tablet"
    ? "w-1/2"
    : "w-1/3"
}\`}>
  Responsive Div
</div>`}
        />
      )}
    </div>
  );
};

export default VariousDivCases;
