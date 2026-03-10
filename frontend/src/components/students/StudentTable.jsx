import { useNavigate } from "react-router-dom";
import { ranking } from "../../utils/ranking";

export default function StudentTable({ students, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="table-wrap">
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              {["Name", "Student ID", "Email", "Status", "Total", "Grade", "Actions"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const total = ranking.calcTotal(s);
              const { grade, color: gradeColor } = ranking.getGrade(total);
              return (
                <tr key={s.id} style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/students/${s.id}`)}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="avatar-sm">{s.name?.charAt(0)}</div>
                      <span style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{s.studentId}</td>
                  <td style={{ color: "#64748b", fontSize: 12 }}>{s.email}</td>
                  <td>
                    <span className={s.status === "Active" ? "badge-active" : "badge-inactive"}>{s.status}</span>
                  </td>
                  <td style={{ color: "#3b82f6", fontWeight: 700, fontSize: 13 }}>{total}</td>
                  <td>
                    <span style={{ color: gradeColor, fontWeight: 700, fontSize: 13 }}>{grade}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => navigate(`/students/edit/${s.id}`)} title="Edit"
                        style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 13 }}>
                        ✏️
                      </button>
                      <button onClick={() => onDelete?.(s)} title="Delete"
                        style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 13 }}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}