import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

const VariousForm = () => {
  const [showCode, setShowCode] = useState(null);
  const [formData, setFormData] = useState({
    basic: { name: "", email: "", password: "" },
    validation: { email: "", password: "", confirmPassword: "" },
    dynamic: { fields: [{ id: 1, value: "" }] },
    file: { file: null },
    checkbox: { terms: false, newsletter: false },
    radio: { gender: "" },
    select: { country: "" },
    date: { date: "", time: "", datetime: "" },
    range: { volume: 50, rating: 3 },
    search: { query: "" },
    textarea: { message: "" },
  });

  const [errors, setErrors] = useState({});

  // Handle form changes
  const handleChange = (formType, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        [field]: value,
      },
    }));
    console.log(`Form ${formType} - ${field}:`, value);
  };

  // Handle dynamic form field changes
  const handleDynamicChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      dynamic: {
        fields: prev.dynamic.fields.map((field) =>
          field.id === id ? { ...field, value } : field
        ),
      },
    }));
  };

  // Add new dynamic field
  const addDynamicField = () => {
    setFormData((prev) => ({
      ...prev,
      dynamic: {
        fields: [...prev.dynamic.fields, { id: Date.now(), value: "" }],
      },
    }));
  };

  // Remove dynamic field
  const removeDynamicField = (id) => {
    setFormData((prev) => ({
      ...prev,
      dynamic: {
        fields: prev.dynamic.fields.filter((field) => field.id !== id),
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (formType, e) => {
    e.preventDefault();
    console.log(`${formType} form submitted:`, formData[formType]);
  };

  // Validate form
  const validateForm = (formType) => {
    const newErrors = {};
    if (formType === "validation") {
      if (!formData.validation.email.includes("@")) {
        newErrors.email = "Invalid email format";
      }
      if (formData.validation.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (
        formData.validation.password !== formData.validation.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Form Types Showcase
      </h1>

      {/* Basic Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("basic")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Basic Form</h2>
        <form onSubmit={(e) => handleSubmit("basic", e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.basic.name}
              onChange={(e) => handleChange("basic", "name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.basic.email}
              onChange={(e) => handleChange("basic", "email", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.basic.password}
              onChange={(e) =>
                handleChange("basic", "password", e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "basic" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => handleChange('name', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      value={formData.email}
      onChange={(e) => handleChange('email', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      value={formData.password}
      onChange={(e) => handleChange('password', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Validation Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("validation")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Validation Form</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm("validation")) {
              handleSubmit("validation", e);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.validation.email}
              onChange={(e) =>
                handleChange("validation", "email", e.target.value)
              }
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.validation.password}
              onChange={(e) =>
                handleChange("validation", "password", e.target.value)
              }
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.validation.confirmPassword}
              onChange={(e) =>
                handleChange("validation", "confirmPassword", e.target.value)
              }
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "validation" && (
          <CodePopup
            code={`const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!formData.email.includes('@')) {
    newErrors.email = 'Invalid email format';
  }
  if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

<form onSubmit={(e) => {
  e.preventDefault();
  if (validateForm()) {
    handleSubmit(e);
  }
}} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      value={formData.email}
      onChange={(e) => handleChange('email', e.target.value)}
      className={\`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 \${
        errors.email ? 'border-red-500' : 'border-gray-300'
      }\`}
    />
    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
  </div>
  {/* ... other fields ... */}
</form>`}
          />
        )}
      </div>

      {/* Dynamic Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("dynamic")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Dynamic Form</h2>
        <form
          onSubmit={(e) => handleSubmit("dynamic", e)}
          className="space-y-4"
        >
          {formData.dynamic.fields.map((field) => (
            <div key={field.id} className="flex items-center space-x-4">
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleDynamicChange(field.id, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeDynamicField(field.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDynamicField}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Field
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "dynamic" && (
          <CodePopup
            code={`const [formData, setFormData] = useState({
  fields: [{ id: 1, value: "" }]
});

const handleDynamicChange = (id, value) => {
  setFormData(prev => ({
    fields: prev.fields.map(field =>
      field.id === id ? { ...field, value } : field
    )
  }));
};

const addDynamicField = () => {
  setFormData(prev => ({
    fields: [
      ...prev.fields,
      { id: Date.now(), value: "" }
    ]
  }));
};

const removeDynamicField = (id) => {
  setFormData(prev => ({
    fields: prev.fields.filter(field => field.id !== id)
  }));
};

<form onSubmit={handleSubmit} className="space-y-4">
  {formData.fields.map((field) => (
    <div key={field.id} className="flex items-center space-x-4">
      <input
        type="text"
        value={field.value}
        onChange={(e) => handleDynamicChange(field.id, e.target.value)}
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => removeDynamicField(field.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addDynamicField}
    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
  >
    Add Field
  </button>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* File Upload Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("file")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">File Upload Form</h2>
        <form onSubmit={(e) => handleSubmit("file", e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              File Upload
            </label>
            <input
              type="file"
              onChange={(e) => handleChange("file", "file", e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        {showCode === "file" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">File Upload</label>
    <input
      type="file"
      onChange={(e) => handleChange('file', e.target.files[0])}
      className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Upload
  </button>
</form>`}
          />
        )}
      </div>

      {/* Checkbox Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("checkbox")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Checkbox Form</h2>
        <form
          onSubmit={(e) => handleSubmit("checkbox", e)}
          className="space-y-4"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.checkbox.terms}
              onChange={(e) =>
                handleChange("checkbox", "terms", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.checkbox.newsletter}
              onChange={(e) =>
                handleChange("checkbox", "newsletter", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Subscribe to newsletter
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "checkbox" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={formData.terms}
      onChange={(e) => handleChange('terms', e.target.checked)}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label className="ml-2 block text-sm text-gray-900">
      I agree to the terms and conditions
    </label>
  </div>
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={formData.newsletter}
      onChange={(e) => handleChange('newsletter', e.target.checked)}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label className="ml-2 block text-sm text-gray-900">
      Subscribe to newsletter
    </label>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Radio Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("radio")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Radio Form</h2>
        <form onSubmit={(e) => handleSubmit("radio", e)} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.radio.gender === "male"}
                onChange={(e) =>
                  handleChange("radio", "gender", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-900">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.radio.gender === "female"}
                onChange={(e) =>
                  handleChange("radio", "gender", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-900">Female</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.radio.gender === "other"}
                onChange={(e) =>
                  handleChange("radio", "gender", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-900">Other</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "radio" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div className="space-y-2">
    <div className="flex items-center">
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formData.gender === "male"}
        onChange={(e) => handleChange('gender', e.target.value)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label className="ml-2 block text-sm text-gray-900">Male</label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        name="gender"
        value="female"
        checked={formData.gender === "female"}
        onChange={(e) => handleChange('gender', e.target.value)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label className="ml-2 block text-sm text-gray-900">Female</label>
    </div>
    <div className="flex items-center">
      <input
        type="radio"
        name="gender"
        value="other"
        checked={formData.gender === "other"}
        onChange={(e) => handleChange('gender', e.target.value)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
      />
      <label className="ml-2 block text-sm text-gray-900">Other</label>
    </div>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Select Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("select")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Select Form</h2>
        <form onSubmit={(e) => handleSubmit("select", e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              value={formData.select.country}
              onChange={(e) =>
                handleChange("select", "country", e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "select" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Country</label>
    <select
      value={formData.country}
      onChange={(e) => handleChange('country', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
      <option value="au">Australia</option>
    </select>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Date/Time Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("date")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Date/Time Form</h2>
        <form onSubmit={(e) => handleSubmit("date", e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={formData.date.date}
              onChange={(e) => handleChange("date", "date", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              value={formData.date.time}
              onChange={(e) => handleChange("date", "time", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date and Time
            </label>
            <input
              type="datetime-local"
              value={formData.date.datetime}
              onChange={(e) => handleChange("date", "datetime", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "date" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Date</label>
    <input
      type="date"
      value={formData.date}
      onChange={(e) => handleChange('date', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Time</label>
    <input
      type="time"
      value={formData.time}
      onChange={(e) => handleChange('time', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">Date and Time</label>
    <input
      type="datetime-local"
      value={formData.datetime}
      onChange={(e) => handleChange('datetime', e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Range Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("range")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Range Form</h2>
        <form onSubmit={(e) => handleSubmit("range", e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Volume: {formData.range.volume}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.range.volume}
              onChange={(e) => handleChange("range", "volume", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating: {formData.range.rating}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={formData.range.rating}
              onChange={(e) => handleChange("range", "rating", e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "range" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Volume: {formData.volume}
    </label>
    <input
      type="range"
      min="0"
      max="100"
      value={formData.volume}
      onChange={(e) => handleChange('volume', e.target.value)}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Rating: {formData.rating}
    </label>
    <input
      type="range"
      min="1"
      max="5"
      value={formData.rating}
      onChange={(e) => handleChange('rating', e.target.value)}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>

      {/* Search Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("search")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Search Form</h2>
        <form onSubmit={(e) => handleSubmit("search", e)} className="space-y-4">
          <div className="relative">
            <input
              type="search"
              value={formData.search.query}
              onChange={(e) => handleChange("search", "query", e.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        {showCode === "search" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div className="relative">
    <input
      type="search"
      value={formData.query}
      onChange={(e) => handleChange('query', e.target.value)}
      placeholder="Search..."
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Search
  </button>
</form>`}
          />
        )}
      </div>

      {/* Textarea Form */}
      <div
        className="relative group mb-12 p-6 border rounded-lg shadow-sm"
        onMouseEnter={() => setShowCode("textarea")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Textarea Form</h2>
        <form
          onSubmit={(e) => handleSubmit("textarea", e)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={formData.textarea.message}
              onChange={(e) =>
                handleChange("textarea", "message", e.target.value)
              }
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {showCode === "textarea" && (
          <CodePopup
            code={`<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Message</label>
    <textarea
      value={formData.message}
      onChange={(e) => handleChange('message', e.target.value)}
      rows="4"
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="Enter your message..."
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Submit
  </button>
</form>`}
          />
        )}
      </div>
    </div>
  );
};

export default VariousForm;
