function UserModel({
  showForm,
  editIndex,
  name,
  email,
  setName,
  setEmail,
  onSave,
  onCancel,
}) {
  if (!showForm) return null;

  return (
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
          <button className="save-btn" onClick={onSave}>
            {editIndex !== null ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
