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
const FlexItem = ({ index, onHover }) => {
  return (
    <div
      className={`flex-item bg-blue-500 text-white p-4 rounded-lg shadow-md min-w-[100px] min-h-[100px] flex items-center justify-center`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      Item {index + 1}
    </div>
  );
};

const VariousFlexCases = () => {
  const [showCode, setShowCode] = useState(null);
  const [flexConfig, setFlexConfig] = useState({
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    alignContent: "stretch",
    gap: "10px",
  });

  // Handle property changes
  const handlePropertyChange = (property, value) => {
    setFlexConfig((prev) => ({
      ...prev,
      [property]: value,
    }));
    console.log(`Flex property changed: ${property} = ${value}`);
  };

  // Generate flex container style
  const getFlexContainerStyle = () => ({
    display: "flex",
    flexDirection: flexConfig.direction,
    justifyContent: flexConfig.justify,
    alignItems: flexConfig.align,
    flexWrap: flexConfig.wrap,
    alignContent: flexConfig.alignContent,
    gap: flexConfig.gap,
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Flexbox Showcase</h1>

      {/* Controls Section */}
      <div className="mb-8 p-6 border rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Flex Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Flex Direction */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Flex Direction
            </label>
            <select
              value={flexConfig.direction}
              onChange={(e) =>
                handlePropertyChange("direction", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="row">Row</option>
              <option value="row-reverse">Row Reverse</option>
              <option value="column">Column</option>
              <option value="column-reverse">Column Reverse</option>
            </select>
          </div>

          {/* Justify Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Justify Content
            </label>
            <select
              value={flexConfig.justify}
              onChange={(e) => handlePropertyChange("justify", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
              <option value="space-evenly">Space Evenly</option>
            </select>
          </div>

          {/* Align Items */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Align Items
            </label>
            <select
              value={flexConfig.align}
              onChange={(e) => handlePropertyChange("align", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="baseline">Baseline</option>
            </select>
          </div>

          {/* Flex Wrap */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Flex Wrap
            </label>
            <select
              value={flexConfig.wrap}
              onChange={(e) => handlePropertyChange("wrap", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="nowrap">No Wrap</option>
              <option value="wrap">Wrap</option>
              <option value="wrap-reverse">Wrap Reverse</option>
            </select>
          </div>

          {/* Align Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Align Content
            </label>
            <select
              value={flexConfig.alignContent}
              onChange={(e) =>
                handlePropertyChange("alignContent", e.target.value)
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Flex Start</option>
              <option value="flex-end">Flex End</option>
              <option value="center">Center</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
            </select>
          </div>

          {/* Gap */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Gap
            </label>
            <select
              value={flexConfig.gap}
              onChange={(e) => handlePropertyChange("gap", e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="0">No Gap</option>
              <option value="10px">Small Gap</option>
              <option value="20px">Medium Gap</option>
              <option value="30px">Large Gap</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flex Container */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm bg-gray-100 min-h-[400px]"
        style={getFlexContainerStyle()}
        onMouseEnter={() => setShowCode("container")}
        onMouseLeave={() => setShowCode(null)}
      >
        {[...Array(6)].map((_, index) => (
          <FlexItem
            key={index}
            index={index}
            onHover={(i) => setShowCode(i === null ? "container" : `item-${i}`)}
          />
        ))}
      </div>

      {/* Code Popups */}
      {showCode === "container" && (
        <CodePopup
          code={`<div className="flex-container" style={{
  display: "flex",
  flexDirection: "${flexConfig.direction}",
  justifyContent: "${flexConfig.justify}",
  alignItems: "${flexConfig.align}",
  flexWrap: "${flexConfig.wrap}",
  alignContent: "${flexConfig.alignContent}",
  gap: "${flexConfig.gap}"
}}>
  {/* Flex items */}
</div>`}
        />
      )}

      {showCode?.startsWith("item-") && (
        <CodePopup
          code={`<div className="flex-item">
  Item ${parseInt(showCode.split("-")[1]) + 1}
</div>`}
        />
      )}

      {/* Responsive Examples */}
      <div className="space-y-8">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Responsive Flex Example
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-blue-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Mobile (Column)</h3>
              <p>Flex direction: column</p>
              <p>Justify content: flex-start</p>
            </div>
            <div className="flex-1 bg-green-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tablet/Desktop (Row)</h3>
              <p>Flex direction: row</p>
              <p>Justify content: space-between</p>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Nested Flex Example</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-purple-100 p-4 rounded-lg">Header</div>
              <div className="flex-1 bg-purple-200 p-4 rounded-lg">Content</div>
              <div className="bg-purple-100 p-4 rounded-lg">Footer</div>
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-purple-300 p-4 rounded-lg flex-1 min-w-[200px]"
                >
                  Card {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariousFlexCases;
