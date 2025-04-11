import React from "react";

const ResponsiveCss = () => {
  return (
    <div className="p-4 space-y-8">
      {/* Navbar Example */}
      <div className="flex flex-col sm:flex-row gap-2 justify-around m-2 p-3 space-between bg-gray-500">
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black- border-2 rounded-lg bg-red-500 w-full sm:w-auto">
          Page1
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-blue-500 w-full sm:w-auto">
          Page2
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-green-500 w-full sm:w-auto">
          Page3
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-[20px] bg-yellow-500 w-full sm:w-auto">
          Page4
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-full bg-purple-500 w-full sm:w-auto">
          Page5
        </p>
      </div>

      {/* Breakpoints Info */}
      <div className="flex flex-col sm:flex-row gap-2 justify-around m-2 p-3 space-between bg-gray-500">
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-lg bg-green-400 w-full sm:w-auto">
          Tailwind's Responsive Breakpoints: sm: 640px md: 768px lg: 1024px xl:
          1280px 2xl: 1536px 3xl: 1792px 4xl: 2048px 5xl: 2560px 6xl: 3072px
        </p>
      </div>

      {/* Positioning Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Positioning Examples (Absolute & Relative)
        </h2>

        {/* Example 1: Tooltip with Absolute Positioning */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Example 1: Tooltip</h3>
          <div className="relative inline-block">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Hover me
            </button>
            <div className="absolute left-0 top-full mt-2 bg-gray-800 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100">
              This is a tooltip
            </div>
          </div>
        </div>

        {/* Example 2: Modal Overlay */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 2: Modal Overlay
          </h3>
          <div className="relative">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Open Modal
            </button>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
              <div className="bg-white p-4 rounded-lg">Modal Content</div>
            </div>
          </div>
        </div>

        {/* Example 3: Dropdown Menu */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 3: Dropdown Menu
          </h3>
          <div className="relative inline-block">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              Menu
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Item 1
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Item 2
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Item 3
              </a>
            </div>
          </div>
        </div>

        {/* Example 4: Badge on Icon */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 4: Notification Badge
          </h3>
          <div className="relative inline-block">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              3
            </span>
          </div>
        </div>

        {/* Example 5: Image Overlay */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 5: Image Overlay
          </h3>
          <div className="relative w-48 h-32 bg-gray-300 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white">Hover Overlay</span>
            </div>
          </div>
        </div>

        {/* Example 6: Sticky Header */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 6: Sticky Header
          </h3>
          <div className="relative h-20 overflow-y-auto">
            <div className="sticky top-0 bg-blue-500 text-white p-2 rounded-lg">
              Sticky Header
            </div>
            <div className="h-40 bg-gray-300"></div>
          </div>
        </div>

        {/* Example 7: Fixed Navigation */}
        <div className="relative h-40 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 7: Fixed Navigation
          </h3>
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full">
            Fixed Button
          </div>
        </div>
      </div>

      {/* Responsive Grid Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Grid Examples</h2>

        {/* Example 1: Basic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-blue-500 p-4 rounded-lg text-white">
              Grid Item {item}
            </div>
          ))}
        </div>

        {/* Example 2: Auto-fit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-green-500 p-4 rounded-lg text-white">
              Auto-fit Item {item}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Flex Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Flex Examples</h2>

        {/* Example 1: Direction Change */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-200 rounded-lg">
          <div className="flex-1 bg-red-500 p-4 rounded-lg">Flex Item 1</div>
          <div className="flex-1 bg-blue-500 p-4 rounded-lg">Flex Item 2</div>
          <div className="flex-1 bg-green-500 p-4 rounded-lg">Flex Item 3</div>
        </div>

        {/* Example 2: Wrap Behavior */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-200 rounded-lg">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-purple-500 p-4 rounded-lg text-white"
            >
              Wrap Item {item}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Typography */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Typography</h2>

        <div className="space-y-4 p-4 bg-gray-200 rounded-lg">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
            This text size changes based on screen size
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light sm:font-normal md:font-medium lg:font-bold">
            This text weight changes based on screen size
          </p>
        </div>
      </div>

      {/* Responsive Spacing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Spacing</h2>

        <div className="p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-200 rounded-lg">
          <div className="space-y-2 sm:space-y-4 md:space-y-6">
            <div className="bg-yellow-500 p-2 sm:p-4 rounded-lg">Item 1</div>
            <div className="bg-yellow-500 p-2 sm:p-4 rounded-lg">Item 2</div>
            <div className="bg-yellow-500 p-2 sm:p-4 rounded-lg">Item 3</div>
          </div>
        </div>
      </div>

      {/* Responsive Images */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Images</h2>

        <div className="space-y-4">
          <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-300 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500">Responsive Image Container</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Cards</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-32 sm:h-40 md:h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold">
                  Card Title {item}
                </h3>
                <p className="text-sm sm:text-base mt-2">
                  This card content adjusts based on screen size
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg w-full sm:w-auto">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Navigation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Navigation</h2>

        <div className="bg-gray-800 text-white rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4">
            <div className="text-xl font-bold mb-4 sm:mb-0">Logo</div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="hover:text-blue-400">
                Home
              </a>
              <a href="#" className="hover:text-blue-400">
                About
              </a>
              <a href="#" className="hover:text-blue-400">
                Services
              </a>
              <a href="#" className="hover:text-blue-400">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Tips and Tricks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Responsive Design Tips & Tricks</h2>

        <div className="bg-gray-100 p-4 rounded-lg">
          <ul className="list-disc pl-5 space-y-2">
            <li>Always start with mobile-first design</li>
            <li>Use relative units (rem, em, %) instead of fixed units (px)</li>
            <li>Implement fluid typography using clamp()</li>
            <li>Use CSS Grid and Flexbox for layouts</li>
            <li>Test on multiple devices and screen sizes</li>
            <li>Consider touch targets (minimum 44x44px)</li>
            <li>Use media queries for breakpoints</li>
            <li>Optimize images for different screen sizes</li>
            <li>Implement responsive tables</li>
            <li>Use container queries for component-level responsiveness</li>
          </ul>
        </div>
      </div>

      {/* Advanced Positioning Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Advanced Positioning Examples</h2>

        {/* Example 1: Parallax Scrolling Effect */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">
            Example 1: Parallax Scrolling
          </h3>
          <div className="relative h-full">
            <div className="absolute inset-0 bg-blue-500 transform translate-y-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <h4 className="text-2xl font-bold">Parallax Content</h4>
            </div>
          </div>
        </div>

        {/* Example 2: Advanced Modal with Backdrop Blur */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 2: Advanced Modal
          </h3>
          <div className="relative">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
              Open Advanced Modal
            </button>
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center hidden">
              <div className="bg-white p-6 rounded-lg shadow-xl transform scale-95 transition-transform duration-300">
                <div className="absolute top-4 right-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <h4 className="text-xl font-bold mb-4">Advanced Modal</h4>
                <p className="text-gray-600">
                  This modal includes backdrop blur and transform effects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Example 3: Sticky Table Headers with Scroll */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 3: Sticky Table Headers
          </h3>
          <div className="relative h-48 overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-800 text-white">
                <tr>
                  <th className="p-2">Header 1</th>
                  <th className="p-2">Header 2</th>
                  <th className="p-2">Header 3</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                  <tr key={row} className="bg-white even:bg-gray-100">
                    <td className="p-2">Row {row} Col 1</td>
                    <td className="p-2">Row {row} Col 2</td>
                    <td className="p-2">Row {row} Col 3</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example 4: Advanced Tooltip with Arrow */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 4: Advanced Tooltip
          </h3>
          <div className="relative inline-block">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
              Hover for Advanced Tooltip
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 text-white p-3 rounded-lg hidden group-hover:block">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 transform rotate-45"></div>
              <div className="relative z-10">Advanced tooltip with arrow</div>
            </div>
          </div>
        </div>

        {/* Example 5: Floating Action Button with Animation */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 5: Floating Action Button
          </h3>
          <div className="fixed bottom-8 right-8">
            <button className="bg-red-500 text-white w-12 h-12 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Example 6: Advanced Dropdown with Nested Menus */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 6: Nested Dropdown
          </h3>
          <div className="relative inline-block">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Advanced Menu
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl hidden group-hover:block">
              <div className="relative">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Menu Item 1
                </a>
                <div className="relative group">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                  >
                    Submenu
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-xl hidden group-hover:block">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Submenu Item 1
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Submenu Item 2
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example 7: Advanced Image Gallery with Overlay */}
        <div className="relative h-64 bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Example 7: Image Gallery Overlay
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative group">
                <div className="aspect-w-1 aspect-h-1 bg-gray-300 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="font-bold">Image {item}</h4>
                      <p className="text-sm">Description</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCss;
