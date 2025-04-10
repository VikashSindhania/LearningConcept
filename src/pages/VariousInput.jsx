import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

const VariousInput = () => {
  const [showCode, setShowCode] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    number: "",
    tel: "",
    url: "",
    search: "",
    date: "",
    time: "",
    datetime: "",
    month: "",
    week: "",
    color: "#000000",
    range: 50,
    file: null,
    checkbox: false,
    radio: "option1",
    textarea: "",
    select: "option1",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Input Types Showcase
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Text Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Text Input</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter text"
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("text")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "text" && (
            <CodePopup
              code={`<input
  type="text"
  name="text"
  value={text}
  onChange={handleChange}
  placeholder="Enter text"
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Email Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Email Input</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("email")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "email" && (
            <CodePopup
              code={`<input
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  placeholder="Enter email"
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Password Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">
            Password Input
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("password")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "password" && (
            <CodePopup
              code={`<input
  type="password"
  name="password"
  value={password}
  onChange={handleChange}
  placeholder="Enter password"
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Number Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Number Input</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter number"
            min="0"
            max="100"
            step="1"
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("number")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "number" && (
            <CodePopup
              code={`<input
  type="number"
  name="number"
  value={number}
  onChange={handleChange}
  placeholder="Enter number"
  min="0"
  max="100"
  step="1"
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Date Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Date Input</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("date")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "date" && (
            <CodePopup
              code={`<input
  type="date"
  name="date"
  value={date}
  onChange={handleChange}
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Color Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Color Input</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full h-10 border rounded"
            onMouseEnter={() => setShowCode("color")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "color" && (
            <CodePopup
              code={`<input
  type="color"
  name="color"
  value={color}
  onChange={handleChange}
  className="w-full h-10 border rounded"
/>`}
            />
          )}
        </div>

        {/* Range Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Range Input</label>
          <input
            type="range"
            name="range"
            value={formData.range}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full"
            onMouseEnter={() => setShowCode("range")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "range" && (
            <CodePopup
              code={`<input
  type="range"
  name="range"
  value={range}
  onChange={handleChange}
  min="0"
  max="100"
  className="w-full"
/>`}
            />
          )}
        </div>

        {/* File Input */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">File Input</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("file")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "file" && (
            <CodePopup
              code={`<input
  type="file"
  name="file"
  onChange={handleChange}
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Checkbox Input */}
        <div className="relative group">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
              className="h-4 w-4"
              onMouseEnter={() => setShowCode("checkbox")}
              onMouseLeave={() => setShowCode(null)}
            />
            <span>Checkbox Input</span>
          </label>
          {showCode === "checkbox" && (
            <CodePopup
              code={`<input
  type="checkbox"
  name="checkbox"
  checked={checkbox}
  onChange={handleChange}
  className="h-4 w-4"
/>`}
            />
          )}
        </div>

        {/* Radio Inputs */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Radio Inputs</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="radio"
                value="option1"
                checked={formData.radio === "option1"}
                onChange={handleChange}
                className="h-4 w-4"
                onMouseEnter={() => setShowCode("radio")}
                onMouseLeave={() => setShowCode(null)}
              />
              <span>Option 1</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="radio"
                value="option2"
                checked={formData.radio === "option2"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span>Option 2</span>
            </label>
          </div>
          {showCode === "radio" && (
            <CodePopup
              code={`<input
  type="radio"
  name="radio"
  value="option1"
  checked={radio === "option1"}
  onChange={handleChange}
  className="h-4 w-4"
/>`}
            />
          )}
        </div>

        {/* Textarea */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">Textarea</label>
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            placeholder="Enter text"
            rows="4"
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("textarea")}
            onMouseLeave={() => setShowCode(null)}
          />
          {showCode === "textarea" && (
            <CodePopup
              code={`<textarea
  name="textarea"
  value={textarea}
  onChange={handleChange}
  placeholder="Enter text"
  rows="4"
  className="w-full p-2 border rounded"
/>`}
            />
          )}
        </div>

        {/* Select Dropdown */}
        <div className="relative group">
          <label className="block text-sm font-medium mb-1">
            Select Dropdown
          </label>
          <select
            name="select"
            value={formData.select}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            onMouseEnter={() => setShowCode("select")}
            onMouseLeave={() => setShowCode(null)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {showCode === "select" && (
            <CodePopup
              code={`<select
  name="select"
  value={select}
  onChange={handleChange}
  className="w-full p-2 border rounded"
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VariousInput;
