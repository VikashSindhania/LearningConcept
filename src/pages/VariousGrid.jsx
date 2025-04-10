import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

// Grid Item Component
const GridItem = ({ children, className = "" }) => (
  <div className={`bg-blue-500 text-white p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

const VariousGrid = () => {
  const [showCode, setShowCode] = useState(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Grid Layouts Showcase
      </h1>

      {/* Basic Grid */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("basic")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Basic Grid</h2>
        <div className="grid grid-cols-3 gap-4">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </div>
        {showCode === "basic" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 gap-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg">1</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
</div>`}
          />
        )}
      </div>

      {/* Responsive Grid */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("responsive")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Responsive Grid</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
          <GridItem>7</GridItem>
          <GridItem>8</GridItem>
        </div>
        {showCode === "responsive" && (
          <CodePopup
            code={`<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg">1</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">7</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">8</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Span */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("span")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Grid with Span</h2>
        <div className="grid grid-cols-3 gap-4">
          <GridItem className="col-span-2">1 (spans 2 columns)</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem className="col-span-3">4 (spans all columns)</GridItem>
          <GridItem>5</GridItem>
          <GridItem className="col-span-2">6 (spans 2 columns)</GridItem>
        </div>
        {showCode === "span" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 gap-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg col-span-2">1 (spans 2 columns)</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg col-span-3">4 (spans all columns)</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg col-span-2">6 (spans 2 columns)</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Auto Flow */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("auto-flow")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Grid with Auto Flow</h2>
        <div className="grid grid-cols-3 auto-rows-min gap-4">
          <GridItem className="row-span-2">1 (spans 2 rows)</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem className="row-span-3">5 (spans 3 rows)</GridItem>
          <GridItem>6</GridItem>
          <GridItem>7</GridItem>
        </div>
        {showCode === "auto-flow" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 auto-rows-min gap-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg row-span-2">1 (spans 2 rows)</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg row-span-3">5 (spans 3 rows)</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">7</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Template Areas */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("template-areas")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Grid with Template Areas</h2>
        <div
          className="grid grid-cols-3 grid-rows-3 gap-4"
          style={{
            gridTemplateAreas: `
            "header header header"
            "sidebar main main"
            "footer footer footer"
          `,
          }}
        >
          <GridItem className="bg-red-500" style={{ gridArea: "header" }}>
            Header
          </GridItem>
          <GridItem className="bg-green-500" style={{ gridArea: "sidebar" }}>
            Sidebar
          </GridItem>
          <GridItem className="bg-yellow-500" style={{ gridArea: "main" }}>
            Main Content
          </GridItem>
          <GridItem className="bg-purple-500" style={{ gridArea: "footer" }}>
            Footer
          </GridItem>
        </div>
        {showCode === "template-areas" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 grid-rows-3 gap-4" style={{
  gridTemplateAreas: \`
    "header header header"
    "sidebar main main"
    "footer footer footer"
  \`
}}>
  <div className="bg-red-500" style={{ gridArea: 'header' }}>Header</div>
  <div className="bg-green-500" style={{ gridArea: 'sidebar' }}>Sidebar</div>
  <div className="bg-yellow-500" style={{ gridArea: 'main' }}>Main Content</div>
  <div className="bg-purple-500" style={{ gridArea: 'footer' }}>Footer</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Auto Fit */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("auto-fit")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Grid with Auto Fit</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </div>
        {showCode === "auto-fit" && (
          <CodePopup
            code={`<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg">1</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Gap Variations */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("gap")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Grid with Gap Variations</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </div>
        {showCode === "gap" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 gap-x-8 gap-y-4">
  <div className="bg-blue-500 text-white p-4 rounded-lg">1</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
</div>`}
          />
        )}
      </div>

      {/* Grid with Justify and Align */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("justify-align")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">
          Grid with Justify and Align
        </h2>
        <div className="grid grid-cols-3 gap-4 h-48 items-center justify-items-center">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
          <GridItem>4</GridItem>
          <GridItem>5</GridItem>
          <GridItem>6</GridItem>
        </div>
        {showCode === "justify-align" && (
          <CodePopup
            code={`<div className="grid grid-cols-3 gap-4 h-48 items-center justify-items-center">
  <div className="bg-blue-500 text-white p-4 rounded-lg">1</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">2</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">3</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">4</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">5</div>
  <div className="bg-blue-500 text-white p-4 rounded-lg">6</div>
</div>`}
          />
        )}
      </div>
    </div>
  );
};

export default VariousGrid;
