import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import "../App.css";

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const columns = useMemo(
  () => [
    { Header: "S.No", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Edit",
      Cell: ({ row }) => (
        <button className="edit-btn" onClick={() => handleEdit(row.original)}>
          Edit
        </button>
      ),
    },
    {
      Header: "Delete",
      Cell: ({ row }) => (
        <button
          className="delete-btn"
          onClick={() => handleDelete(row.original.id - 1)}
        >
          Delete
        </button>
      ),
    },
  ],
  [handleEdit, handleDelete]
);


  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleSave = () => {
    if (!name || !email) return alert("Fill all fields");

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = { id: editIndex + 1, name, email };
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, { id: data.length + 1, name, email }]);
    }

    setName("");
    setEmail("");
    setShowForm(false);
  };

  const handleEdit = (user) => {
  setName(user.name);
  setEmail(user.email);
  setEditIndex(user.id - 1);
  setShowForm(true);
};


  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2 className="title">User Management Table</h2>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        Add
      </button>

      {/* Popup */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{editIndex !== null ? "Edit User" : "Add User"}</h3>
            <input
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-buttons">
              <button className="save-btn" onClick={handleSave}>
                {editIndex !== null ? "Update" : "Save"}
              </button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((col) => (
                  <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
