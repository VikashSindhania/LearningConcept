import React, { useState } from "react";

// Component to show code popup on hover
const CodePopup = ({ code }) => {
  return (
    <div className="absolute z-10 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <pre>{code}</pre>
    </div>
  );
};

// Sample data for tables
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    email: "jane@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 45,
    email: "bob@example.com",
    status: "Active",
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 24,
    email: "alice@example.com",
    status: "Active",
  },
];

const VariousTable = () => {
  const [showCode, setShowCode] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [consoleCheckboxes, setConsoleCheckboxes] = useState([]);
  const [tableData, setTableData] = useState(sampleData);

  // Sorting function
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Search function
  const filteredData = tableData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Row selection function
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Edit/Delete handlers
  const handleEdit = (id) => {
    setEditingId(id);
    const rowToEdit = tableData.find((row) => row.id === id);
    setEditForm(rowToEdit);
  };

  const handleSave = (id) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, ...editForm } : row))
    );
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    setTableData((prevData) => prevData.filter((row) => row.id !== id));
  };

  // Console checkbox handler
  const handleConsoleCheckbox = (id) => {
    setConsoleCheckboxes((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];
      console.log("Selected rows:", newSelection);
      return newSelection;
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Table Types Showcase
      </h1>

      {/* Basic Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("basic")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Basic Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "basic" && (
          <CodePopup
            code={`<table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2">ID</th>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Age</th>
      <th className="border border-gray-300 px-4 py-2">Email</th>
      <th className="border border-gray-300 px-4 py-2">Status</th>
    </tr>
  </thead>
  <tbody>
    {data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{row.id}</td>
        <td className="border border-gray-300 px-4 py-2">{row.name}</td>
        <td className="border border-gray-300 px-4 py-2">{row.age}</td>
        <td className="border border-gray-300 px-4 py-2">{row.email}</td>
        <td className="border border-gray-300 px-4 py-2">{row.status}</td>
      </tr>
    ))}
  </tbody>
</table>`}
          />
        )}
      </div>

      {/* Sortable Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("sortable")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Sortable Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("id")}
                >
                  ID{" "}
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("age")}
                >
                  Age{" "}
                  {sortConfig.key === "age" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortConfig.key === "email" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "sortable" && (
          <CodePopup
            code={`const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

const handleSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction });
};

<table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th 
        className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-200"
        onClick={() => handleSort('id')}
      >
        ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
      </th>
      {/* ... other headers ... */}
    </tr>
  </thead>
  <tbody>
    {data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{row.id}</td>
        {/* ... other cells ... */}
      </tr>
    ))}
  </tbody>
</table>`}
          />
        )}
      </div>

      {/* Searchable Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("searchable")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Searchable Table</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "searchable" && (
          <CodePopup
            code={`const [searchTerm, setSearchTerm] = useState('');

const filteredData = data.filter(item =>
  Object.values(item).some(value =>
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);

<div className="mb-4">
  <input
    type="text"
    placeholder="Search..."
    className="border border-gray-300 rounded px-4 py-2 w-full"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>
<table className="min-w-full border-collapse border border-gray-300">
  {/* ... table content ... */}
</table>`}
          />
        )}
      </div>

      {/* Selectable Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("selectable")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Selectable Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === tableData.length}
                    onChange={() => {
                      if (selectedRows.length === tableData.length) {
                        setSelectedRows([]);
                      } else {
                        setSelectedRows(tableData.map((row) => row.id));
                      }
                    }}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    selectedRows.includes(row.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "selectable" && (
          <CodePopup
            code={`const [selectedRows, setSelectedRows] = useState([]);

const handleRowSelect = (id) => {
  setSelectedRows(prev =>
    prev.includes(id)
      ? prev.filter(rowId => rowId !== id)
      : [...prev, id]
  );
};

<table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2">
        <input
          type="checkbox"
          checked={selectedRows.length === data.length}
          onChange={() => {
            if (selectedRows.length === data.length) {
              setSelectedRows([]);
            } else {
              setSelectedRows(data.map(row => row.id));
            }
          }}
        />
      </th>
      {/* ... other headers ... */}
    </tr>
  </thead>
  <tbody>
    {data.map((row) => (
      <tr 
        key={row.id} 
        className={\`hover:bg-gray-50 \${selectedRows.includes(row.id) ? 'bg-blue-50' : ''}\`}
      >
        <td className="border border-gray-300 px-4 py-2">
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleRowSelect(row.id)}
          />
        </td>
        {/* ... other cells ... */}
      </tr>
    ))}
  </tbody>
</table>`}
          />
        )}
      </div>

      {/* Responsive Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("responsive")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Responsive Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "responsive" && (
          <CodePopup
            code={`<div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">ID</th>
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Age</th>
        <th className="border border-gray-300 px-4 py-2">Email</th>
        <th className="border border-gray-300 px-4 py-2">Status</th>
        <th className="border border-gray-300 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-4 py-2">{row.id}</td>
          <td className="border border-gray-300 px-4 py-2">{row.name}</td>
          <td className="border border-gray-300 px-4 py-2">{row.age}</td>
          <td className="border border-gray-300 px-4 py-2">{row.email}</td>
          <td className="border border-gray-300 px-4 py-2">
            <span className={\`px-2 py-1 rounded-full text-xs \${
              row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }\`}>
              {row.status}
            </span>
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`}
          />
        )}
      </div>

      {/* Edit/Delete Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("editDelete")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Edit/Delete Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === row.id ? (
                      <input
                        type="number"
                        value={editForm.age}
                        onChange={(e) =>
                          setEditForm({ ...editForm, age: e.target.value })
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      row.age
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === row.id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      row.email
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === row.id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    ) : (
                      row.status
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingId === row.id ? (
                      <>
                        <button
                          onClick={() => handleSave(row.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "editDelete" && (
          <CodePopup
            code={`const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({});

const handleEdit = (id) => {
  setEditingId(id);
  const rowToEdit = data.find(row => row.id === id);
  setEditForm(rowToEdit);
};

const handleSave = (id) => {
  console.log('Saving changes for ID:', id, editForm);
  setEditingId(null);
  setEditForm({});
};

const handleDelete = (id) => {
  console.log('Deleting row with ID:', id);
};

<table className="min-w-full border-collapse border border-gray-300">
  {/* ... table headers ... */}
  <tbody>
    {data.map((row) => (
      <tr key={row.id} className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{row.id}</td>
        <td className="border border-gray-300 px-4 py-2">
          {editingId === row.id ? (
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              className="border border-gray-300 rounded px-2 py-1"
            />
          ) : (
            row.name
          )}
        </td>
        {/* ... other editable cells ... */}
        <td className="border border-gray-300 px-4 py-2">
          {editingId === row.id ? (
            <>
              <button onClick={() => handleSave(row.id)}>Save</button>
              <button onClick={() => { setEditingId(null); setEditForm({}); }}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(row.id)}>Edit</button>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>`}
          />
        )}
      </div>

      {/* Console Checkbox Table */}
      <div
        className="relative group mb-12"
        onMouseEnter={() => setShowCode("consoleCheckbox")}
        onMouseLeave={() => setShowCode(null)}
      >
        <h2 className="text-xl font-semibold mb-4">Console Checkbox Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={consoleCheckboxes.length === tableData.length}
                    onChange={() => {
                      if (consoleCheckboxes.length === tableData.length) {
                        setConsoleCheckboxes([]);
                        console.log("Selected rows: []");
                      } else {
                        setConsoleCheckboxes(tableData.map((row) => row.id));
                        console.log(
                          "Selected rows:",
                          tableData.map((row) => row.id)
                        );
                      }
                    }}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Age</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    consoleCheckboxes.includes(row.id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={consoleCheckboxes.includes(row.id)}
                      onChange={() => handleConsoleCheckbox(row.id)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showCode === "consoleCheckbox" && (
          <CodePopup
            code={`const [consoleCheckboxes, setConsoleCheckboxes] = useState([]);

const handleConsoleCheckbox = (id) => {
  setConsoleCheckboxes(prev => {
    const newSelection = prev.includes(id)
      ? prev.filter(rowId => rowId !== id)
      : [...prev, id];
    console.log('Selected rows:', newSelection);
    return newSelection;
  });
};

<table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-300 px-4 py-2">
        <input
          type="checkbox"
          checked={consoleCheckboxes.length === data.length}
          onChange={() => {
            if (consoleCheckboxes.length === data.length) {
              setConsoleCheckboxes([]);
              console.log('Selected rows: []');
            } else {
              setConsoleCheckboxes(data.map(row => row.id));
              console.log('Selected rows:', data.map(row => row.id));
            }
          }}
        />
      </th>
      {/* ... other headers ... */}
    </tr>
  </thead>
  <tbody>
    {data.map((row) => (
      <tr 
        key={row.id} 
        className={\`hover:bg-gray-50 \${consoleCheckboxes.includes(row.id) ? 'bg-blue-50' : ''}\`}
      >
        <td className="border border-gray-300 px-4 py-2">
          <input
            type="checkbox"
            checked={consoleCheckboxes.includes(row.id)}
            onChange={() => handleConsoleCheckbox(row.id)}
          />
        </td>
        {/* ... other cells ... */}
      </tr>
    ))}
  </tbody>
</table>`}
          />
        )}
      </div>
    </div>
  );
};

export default VariousTable;
