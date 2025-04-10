import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

// Flex item component
const FlexItem = ({ index, size = "normal", onHover }) => {
  const sizes = {
    small: "min-w-[50px] min-h-[50px]",
    normal: "min-w-[100px] min-h-[100px]",
    large: "min-w-[150px] min-h-[150px]",
  };

  return (
    <div
      className={`flex-item bg-blue-500 text-white p-4 rounded-lg shadow-md ${sizes[size]} flex items-center justify-center`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      Item {index + 1}
    </div>
  );
};

const VariousFlexConcept = () => {
  const [showCode, setShowCode] = useState(null);
  const [activeExample, setActiveExample] = useState("basic");
  const [codeProps, setCodeProps] = useState({});

  // Handle example selection
  const handleExampleSelect = (example) => {
    setActiveExample(example);
    console.log(`Selected example: ${example}`);
  };

  // Basic Flex Example
  const BasicFlexExample = () => {
    const [direction, setDirection] = useState("row");
    const [justify, setJustify] = useState("flex-start");
    const [align, setAlign] = useState("stretch");

    const updateCodeProps = () => {
      setCodeProps({ direction, justify, align });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
              updateCodeProps();
              console.log("Direction changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="row">Row</option>
            <option value="column">Column</option>
          </select>
          <select
            value={justify}
            onChange={(e) => {
              setJustify(e.target.value);
              updateCodeProps();
              console.log("Justify changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="flex-start">Flex Start</option>
            <option value="center">Center</option>
            <option value="flex-end">Flex End</option>
            <option value="space-between">Space Between</option>
          </select>
          <select
            value={align}
            onChange={(e) => {
              setAlign(e.target.value);
              updateCodeProps();
              console.log("Align changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="stretch">Stretch</option>
            <option value="center">Center</option>
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
          </select>
        </div>
        <div
          className="flex-container p-4 border rounded-lg shadow-sm bg-gray-100 min-h-[200px]"
          style={{
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
          }}
          onMouseEnter={() => {
            setShowCode("basic");
            updateCodeProps();
          }}
          onMouseLeave={() => setShowCode(null)}
        >
          {[...Array(3)].map((_, index) => (
            <FlexItem
              key={index}
              index={index}
              onHover={(i) =>
                setShowCode(i === null ? "basic" : `basic-item-${i}`)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  // Wrapping Example
  const WrappingExample = () => {
    const [wrap, setWrap] = useState("nowrap");
    const [gap, setGap] = useState("10px");

    const updateCodeProps = () => {
      setCodeProps({ wrap, gap });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={wrap}
            onChange={(e) => {
              setWrap(e.target.value);
              updateCodeProps();
              console.log("Wrap changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="nowrap">No Wrap</option>
            <option value="wrap">Wrap</option>
            <option value="wrap-reverse">Wrap Reverse</option>
          </select>
          <select
            value={gap}
            onChange={(e) => {
              setGap(e.target.value);
              updateCodeProps();
              console.log("Gap changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="0">No Gap</option>
            <option value="10px">Small Gap</option>
            <option value="20px">Medium Gap</option>
            <option value="30px">Large Gap</option>
          </select>
        </div>
        <div
          className="flex-container p-4 border rounded-lg shadow-sm bg-gray-100 min-h-[200px]"
          style={{
            display: "flex",
            flexWrap: wrap,
            gap: gap,
          }}
          onMouseEnter={() => {
            setShowCode("wrap");
            updateCodeProps();
          }}
          onMouseLeave={() => setShowCode(null)}
        >
          {[...Array(8)].map((_, index) => (
            <FlexItem
              key={index}
              index={index}
              onHover={(i) =>
                setShowCode(i === null ? "wrap" : `wrap-item-${i}`)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  // Nested Flex Example
  const NestedFlexExample = () => {
    const [outerAlign, setOuterAlign] = useState("center");
    const [innerAlign, setInnerAlign] = useState("center");

    const updateCodeProps = () => {
      setCodeProps({ outerAlign, innerAlign });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={outerAlign}
            onChange={(e) => {
              setOuterAlign(e.target.value);
              updateCodeProps();
              console.log("Outer align changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="center">Center</option>
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
          </select>
          <select
            value={innerAlign}
            onChange={(e) => {
              setInnerAlign(e.target.value);
              updateCodeProps();
              console.log("Inner align changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="center">Center</option>
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
          </select>
        </div>
        <div
          className="flex-container p-4 border rounded-lg shadow-sm bg-gray-100 min-h-[300px]"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: outerAlign,
          }}
          onMouseEnter={() => {
            setShowCode("nested-outer");
            updateCodeProps();
          }}
          onMouseLeave={() => setShowCode(null)}
        >
          <div
            className="inner-container p-4 border rounded-lg shadow-sm bg-gray-200"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: innerAlign,
              gap: "10px",
            }}
            onMouseEnter={() => {
              setShowCode("nested-inner");
              updateCodeProps();
            }}
            onMouseLeave={() => setShowCode(null)}
          >
            {[...Array(3)].map((_, index) => (
              <FlexItem
                key={index}
                index={index}
                size="small"
                onHover={(i) =>
                  setShowCode(i === null ? "nested-inner" : `nested-item-${i}`)
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Advanced Alignment Example
  const AdvancedAlignmentExample = () => {
    const [alignContent, setAlignContent] = useState("stretch");
    const [items, setItems] = useState(6);

    const updateCodeProps = () => {
      setCodeProps({ alignContent });
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={alignContent}
            onChange={(e) => {
              setAlignContent(e.target.value);
              updateCodeProps();
              console.log("Align content changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="stretch">Stretch</option>
            <option value="flex-start">Flex Start</option>
            <option value="flex-end">Flex End</option>
            <option value="center">Center</option>
            <option value="space-between">Space Between</option>
            <option value="space-around">Space Around</option>
          </select>
          <select
            value={items}
            onChange={(e) => {
              setItems(parseInt(e.target.value));
              console.log("Number of items changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="3">3 Items</option>
            <option value="6">6 Items</option>
            <option value="9">9 Items</option>
          </select>
        </div>
        <div
          className="flex-container p-4 border rounded-lg shadow-sm bg-gray-100 min-h-[300px]"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: alignContent,
            gap: "10px",
          }}
          onMouseEnter={() => {
            setShowCode("advanced");
            updateCodeProps();
          }}
          onMouseLeave={() => setShowCode(null)}
        >
          {[...Array(items)].map((_, index) => (
            <FlexItem
              key={index}
              index={index}
              onHover={(i) =>
                setShowCode(i === null ? "advanced" : `advanced-item-${i}`)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  // Responsive Flex Example
  const ResponsiveFlexExample = () => {
    const [breakpoint, setBreakpoint] = useState("mobile");

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <select
            value={breakpoint}
            onChange={(e) => {
              setBreakpoint(e.target.value);
              console.log("Breakpoint changed:", e.target.value);
            }}
            className="rounded-md border-gray-300 shadow-sm"
          >
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>
        <div
          className={`flex-container p-4 border rounded-lg shadow-sm bg-gray-100 min-h-[200px] ${
            breakpoint === "mobile"
              ? "flex-col"
              : breakpoint === "tablet"
              ? "flex-row flex-wrap"
              : "flex-row"
          }`}
          onMouseEnter={() => setShowCode("responsive")}
          onMouseLeave={() => setShowCode(null)}
        >
          {[...Array(4)].map((_, index) => (
            <FlexItem
              key={index}
              index={index}
              onHover={(i) =>
                setShowCode(i === null ? "responsive" : `responsive-item-${i}`)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Flexbox Concepts</h1>

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
          Basic Flex
        </button>
        <button
          onClick={() => handleExampleSelect("wrap")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "wrap"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Wrapping
        </button>
        <button
          onClick={() => handleExampleSelect("nested")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "nested"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Nested Flex
        </button>
        <button
          onClick={() => handleExampleSelect("advanced")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "advanced"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Advanced Alignment
        </button>
        <button
          onClick={() => handleExampleSelect("responsive")}
          className={`px-4 py-2 rounded-md ${
            activeExample === "responsive"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Responsive
        </button>
      </div>

      {/* Example Display */}
      <div className="space-y-8">
        {activeExample === "basic" && <BasicFlexExample />}
        {activeExample === "wrap" && <WrappingExample />}
        {activeExample === "nested" && <NestedFlexExample />}
        {activeExample === "advanced" && <AdvancedAlignmentExample />}
        {activeExample === "responsive" && <ResponsiveFlexExample />}
      </div>

      {/* Code Popups */}
      {showCode === "basic" && (
        <CodePopup
          code={`<div style={{
  display: "flex",
  flexDirection: "${codeProps.direction}",
  justifyContent: "${codeProps.justify}",
  alignItems: "${codeProps.align}"
}}>
  {/* Flex items */}
</div>`}
        />
      )}

      {showCode?.startsWith("basic-item-") && (
        <CodePopup
          code={`<div className="flex-item">
  Item ${parseInt(showCode.split("-")[2]) + 1}
</div>`}
        />
      )}

      {showCode === "wrap" && (
        <CodePopup
          code={`<div style={{
  display: "flex",
  flexWrap: "${codeProps.wrap}",
  gap: "${codeProps.gap}"
}}>
  {/* Flex items */}
</div>`}
        />
      )}

      {showCode === "nested-outer" && (
        <CodePopup
          code={`<div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "${codeProps.outerAlign}"
}}>
  {/* Inner container */}
</div>`}
        />
      )}

      {showCode === "nested-inner" && (
        <CodePopup
          code={`<div style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "${codeProps.innerAlign}",
  gap: "10px"
}}>
  {/* Flex items */}
</div>`}
        />
      )}

      {showCode === "advanced" && (
        <CodePopup
          code={`<div style={{
  display: "flex",
  flexWrap: "wrap",
  alignContent: "${codeProps.alignContent}",
  gap: "10px"
}}>
  {/* Flex items */}
</div>`}
        />
      )}

      {showCode === "responsive" && (
        <CodePopup
          code={`<div className={\`flex-container \${
  breakpoint === "mobile"
    ? "flex-col"
    : breakpoint === "tablet"
    ? "flex-row flex-wrap"
    : "flex-row"
}\`}>
  {/* Flex items */}
</div>`}
        />
      )}
    </div>
  );
};

export default VariousFlexConcept;
