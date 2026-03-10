export default function DeleteModal({ student, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div className="fade-in" style={{ background: "#fff", borderRadius: 14, padding: 30, maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🗑️</div>
        <h3 style={{ color: "#1e293b", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Delete Student</h3>
        <p style={{ color: "#64748b", fontSize: 13, marginBottom: 20 }}>
          Are you sure you want to delete <strong style={{ color: "#1e293b" }}>{student.name}</strong>? This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
          <button className="btn" onClick={onConfirm} style={{ flex: 1, background: "#ef4444", color: "#fff" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}
