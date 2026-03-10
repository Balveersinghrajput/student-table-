import { useNavigate } from "react-router-dom";
import { ranking } from "../../utils/ranking";
import Avatar from "../common/Avatar";

export default function StudentRow({ student, onDelete }) {
  const navigate = useNavigate();
  const total = ranking.calcTotal(student);
  const { grade, color: gradeColor } = ranking.getGrade(total);

  return (
    <tr style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}
      onClick={() => navigate(`/students/${student.id}`)}>
      <td style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar profilePhoto={student.profilePhoto} name={student.name} size={34} />
          <span style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{student.name}</span>
        </div>
      </td>
      <td style={{ padding: "10px 14px", color: "#64748b", fontSize: 12 }}>{student.studentId}</td>
      <td style={{ padding: "10px 14px", color: "#64748b", fontSize: 12 }}>{student.email}</td>
      <td style={{ padding: "10px 14px" }}>
        <span className={student.status === "Active" ? "badge-active" : "badge-inactive"}>{student.status}</span>
      </td>
      <td style={{ padding: "10px 14px", color: "#3b82f6", fontWeight: 700, fontSize: 13 }}>{total}</td>
      <td style={{ padding: "10px 14px" }}>
        <span style={{ color: gradeColor, fontWeight: 700, fontSize: 13 }}>{grade}</span>
      </td>
      <td style={{ padding: "10px 14px" }}>
        <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => navigate(`/students/edit/${student.id}`)} title="Edit"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 13 }}>
            ✏️
          </button>
          <button onClick={() => onDelete?.(student)} title="Delete"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 13 }}>
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
}