import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

const VariousCard = () => {
  const [showCode, setShowCode] = useState(null);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Card Types Showcase
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Card */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("basic")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Basic Card</h2>
            <p className="text-gray-600">
              This is a simple card with basic styling.
            </p>
          </div>
          {showCode === "basic" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-2">Basic Card</h2>
  <p className="text-gray-600">This is a simple card with basic styling.</p>
</div>`}
            />
          )}
        </div>

        {/* Card with Image */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("image")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Card image"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Card with Image</h2>
              <p className="text-gray-600">
                This card includes an image at the top.
              </p>
            </div>
          </div>
          {showCode === "image" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <img 
    src="https://via.placeholder.com/300x200" 
    alt="Card image" 
    className="w-full h-48 object-cover"
  />
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-2">Card with Image</h2>
    <p className="text-gray-600">This card includes an image at the top.</p>
  </div>
</div>`}
            />
          )}
        </div>

        {/* Card with Hover Effect */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("hover")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Hover Effect Card</h2>
            <p className="text-gray-600">This card scales up on hover.</p>
          </div>
          {showCode === "hover" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6 
  transition-transform duration-300 hover:scale-105 hover:shadow-lg">
  <h2 className="text-xl font-semibold mb-2">Hover Effect Card</h2>
  <p className="text-gray-600">This card scales up on hover.</p>
</div>`}
            />
          )}
        </div>

        {/* Card with Badge */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("badge")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <span className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              New
            </span>
            <h2 className="text-xl font-semibold mb-2">Card with Badge</h2>
            <p className="text-gray-600">
              This card includes a badge in the top-right corner.
            </p>
          </div>
          {showCode === "badge" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6 relative">
  <span className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
    New
  </span>
  <h2 className="text-xl font-semibold mb-2">Card with Badge</h2>
  <p className="text-gray-600">This card includes a badge in the top-right corner.</p>
</div>`}
            />
          )}
        </div>

        {/* Card with Action Buttons */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("action")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">Card with Actions</h2>
            <p className="text-gray-600 mb-4">
              This card includes action buttons at the bottom.
            </p>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Action 1
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                Action 2
              </button>
            </div>
          </div>
          {showCode === "action" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-2">Card with Actions</h2>
  <p className="text-gray-600 mb-4">This card includes action buttons at the bottom.</p>
  <div className="flex space-x-2">
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Action 1
    </button>
    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
      Action 2
    </button>
  </div>
</div>`}
            />
          )}
        </div>

        {/* Card with Avatar */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("avatar")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">Card with Avatar</h2>
                <p className="text-gray-500">User Name</p>
              </div>
            </div>
            <p className="text-gray-600">
              This card includes a user avatar and name.
            </p>
          </div>
          {showCode === "avatar" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6">
  <div className="flex items-center mb-4">
    <img 
      src="https://via.placeholder.com/50" 
      alt="Avatar" 
      className="w-12 h-12 rounded-full mr-4"
    />
    <div>
      <h2 className="text-xl font-semibold">Card with Avatar</h2>
      <p className="text-gray-500">User Name</p>
    </div>
  </div>
  <p className="text-gray-600">This card includes a user avatar and name.</p>
</div>`}
            />
          )}
        </div>

        {/* Card with Stats */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("stats")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Card with Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">1.2K</p>
                <p className="text-gray-500">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">450</p>
                <p className="text-gray-500">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">120</p>
                <p className="text-gray-500">Shares</p>
              </div>
            </div>
          </div>
          {showCode === "stats" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">Card with Stats</h2>
  <div className="grid grid-cols-3 gap-4">
    <div className="text-center">
      <p className="text-2xl font-bold text-blue-500">1.2K</p>
      <p className="text-gray-500">Views</p>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-green-500">450</p>
      <p className="text-gray-500">Likes</p>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold text-purple-500">120</p>
      <p className="text-gray-500">Shares</p>
    </div>
  </div>
</div>`}
            />
          )}
        </div>

        {/* Card with Progress */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("progress")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Card with Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Task 1</span>
                  <span className="text-sm text-gray-500">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Task 2</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {showCode === "progress" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-4">Card with Progress</h2>
  <div className="space-y-4">
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Task 1</span>
        <span className="text-sm text-gray-500">75%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
      </div>
    </div>
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Task 2</span>
        <span className="text-sm text-gray-500">45%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
      </div>
    </div>
  </div>
</div>`}
            />
          )}
        </div>

        {/* Card with Tabs */}
        <div
          className="relative group"
          onMouseEnter={() => setShowCode("tabs")}
          onMouseLeave={() => setShowCode(null)}
        >
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex border-b">
              <button className="px-4 py-2 text-blue-500 border-b-2 border-blue-500">
                Tab 1
              </button>
              <button className="px-4 py-2 text-gray-500">Tab 2</button>
              <button className="px-4 py-2 text-gray-500">Tab 3</button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Card with Tabs</h2>
              <p className="text-gray-600">
                This card includes tab navigation at the top.
              </p>
            </div>
          </div>
          {showCode === "tabs" && (
            <CodePopup
              code={`<div className="bg-white rounded-lg shadow-md">
  <div className="flex border-b">
    <button className="px-4 py-2 text-blue-500 border-b-2 border-blue-500">Tab 1</button>
    <button className="px-4 py-2 text-gray-500">Tab 2</button>
    <button className="px-4 py-2 text-gray-500">Tab 3</button>
  </div>
  <div className="p-6">
    <h2 className="text-xl font-semibold mb-2">Card with Tabs</h2>
    <p className="text-gray-600">This card includes tab navigation at the top.</p>
  </div>
</div>`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VariousCard;
