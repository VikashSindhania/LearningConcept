import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm max-w-md transform -translate-y-full -translate-x-1/2 left-1/2 mt-2">
      <pre className="whitespace-pre-wrap font-mono text-xs">{code}</pre>
    </div>
  );
};

// Element component with hover functionality
const ElementWithCode = ({ className, children, code, id, style }) => {
  const [showCode, setShowCode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setShowCode(true);
  };

  return (
    <div className="relative">
      <div
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowCode(false)}
      >
        {children}
      </div>
      {showCode && (
        <div
          style={{
            position: "fixed",
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -100%)",
            marginTop: "-10px",
            zIndex: 9999,
          }}
        >
          <CodePopup code={code} />
        </div>
      )}
    </div>
  );
};

const PlayWithElement = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Navigation Bar */}
      <ElementWithCode
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-40"
        code={`<nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">`}
        id="navbar"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ElementWithCode
                className="text-xl font-bold text-gray-800"
                code={`<span className="text-xl font-bold text-gray-800">`}
                id="logo"
              >
                Logo
              </ElementWithCode>
            </div>
            <div className="flex space-x-4">
              <ElementWithCode
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                code={`<a className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">`}
                id="nav-link"
              >
                Home
              </ElementWithCode>
              <ElementWithCode
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                code={`<a className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">`}
                id="nav-link"
              >
                About
              </ElementWithCode>
            </div>
          </div>
        </div>
      </ElementWithCode>

      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <ElementWithCode
          className="text-center mb-8"
          code={`<div className="text-center mb-8">`}
          id="centered-text"
        >
          <ElementWithCode
            className="text-4xl font-bold text-gray-900 mb-4"
            code={`<h1 className="text-4xl font-bold text-gray-900 mb-4">`}
            id="hero-title"
          >
            Welcome to CSS Learning
          </ElementWithCode>
          <ElementWithCode
            className="text-xl text-gray-600"
            code={`<p className="text-xl text-gray-600">`}
            id="hero-subtitle"
          >
            Hover over elements to see their CSS code
          </ElementWithCode>
        </ElementWithCode>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ElementWithCode
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          code={`<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">`}
          id="card"
        >
          <ElementWithCode
            className="text-2xl font-semibold text-gray-800 mb-4"
            code={`<h3 className="text-2xl font-semibold text-gray-800 mb-4">`}
            id="card-title"
          >
            Card Title
          </ElementWithCode>
          <ElementWithCode
            className="text-gray-600"
            code={`<p className="text-gray-600">`}
            id="card-content"
          >
            This is a sample card with hover effects and shadow.
          </ElementWithCode>
        </ElementWithCode>

        {/* Input Form */}
        <ElementWithCode
          className="bg-white rounded-lg shadow-md p-6"
          code={`<div className="bg-white rounded-lg shadow-md p-6">`}
          id="form"
        >
          <ElementWithCode
            className="mb-4"
            code={`<div className="mb-4">`}
            id="form-group"
          >
            <ElementWithCode
              className="block text-gray-700 text-sm font-bold mb-2"
              code={`<label className="block text-gray-700 text-sm font-bold mb-2">`}
              id="form-label"
            >
              Email
            </ElementWithCode>
            <ElementWithCode
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              code={`<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">`}
              id="text-input"
              type="text"
              placeholder="Enter your email"
            />
          </ElementWithCode>
        </ElementWithCode>

        {/* Button Showcase */}
        <ElementWithCode
          className="bg-white rounded-lg shadow-md p-6"
          code={`<div className="bg-white rounded-lg shadow-md p-6">`}
          id="button-container"
        >
          <ElementWithCode
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            code={`<button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">`}
            id="primary-button"
          >
            Primary Button
          </ElementWithCode>
        </ElementWithCode>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <ElementWithCode
          className="relative overflow-hidden rounded-lg"
          code={`<div className="relative overflow-hidden rounded-lg">`}
          id="image-container"
        >
          <ElementWithCode
            className="w-full h-48 object-cover"
            code={`<img className="w-full h-48 object-cover">`}
            id="responsive-image"
            src="https://via.placeholder.com/300"
            alt="Sample"
          />
        </ElementWithCode>
      </div>

      {/* Footer */}
      <ElementWithCode
        className="bg-gray-800 text-white py-8"
        code={`<footer className="bg-gray-800 text-white py-8">`}
        id="footer"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <ElementWithCode
              className="text-sm"
              code={`<p className="text-sm">`}
              id="footer-text"
            >
              © 2024 CSS Learning
            </ElementWithCode>
            <ElementWithCode
              className="flex space-x-4"
              code={`<div className="flex space-x-4">`}
              id="social-links"
            >
              <ElementWithCode
                className="text-gray-400 hover:text-white"
                code={`<a className="text-gray-400 hover:text-white">`}
                id="social-link"
              >
                Twitter
              </ElementWithCode>
              <ElementWithCode
                className="text-gray-400 hover:text-white"
                code={`<a className="text-gray-400 hover:text-white">`}
                id="social-link"
              >
                GitHub
              </ElementWithCode>
            </ElementWithCode>
          </div>
        </div>
      </ElementWithCode>
    </div>
  );
};

export default PlayWithElement;
