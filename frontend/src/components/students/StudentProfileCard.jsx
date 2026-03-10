import { ranking } from "../../utils/ranking";
import Avatar from "../common/Avatar";

export default function StudentProfileCard({ student }) {
  if (!student) return null;

  const total = ranking.calcTotal(student);
  const average = ranking.calcAverage(student);
  const { grade, color: gradeColor } = ranking.getGrade(total);

  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <Avatar profilePhoto={student.profilePhoto} name={student.name} size={56} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
          <h2 style={{ color: "#1e293b", fontSize: 18, fontWeight: 700 }}>{student.name}</h2>
          <span className={student.status === "Active" ? "badge-active" : "badge-inactive"}>
            {student.status === "Active" ? "🟢" : "🔴"} {student.status}
          </span>
        </div>
        <p style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>{student.studentId} · {student.email}</p>
        <p style={{ color: "#94a3b8", fontSize: 12 }}>
          {student.fatherName && <>Father: <strong style={{ color: "#1e293b" }}>{student.fatherName}</strong> · </>}
          {student.className && <>Class: <strong style={{ color: "#1e293b" }}>{student.className}</strong> · </>}
          Age: <strong style={{ color: "#1e293b" }}>{student.age}</strong> ·
          Total: <strong style={{ color: "#3b82f6" }}>{total}</strong> ·
          Avg: <strong style={{ color: "#1e293b" }}>{average}</strong>
        </p>
      </div>
      <div style={{
        width: 52, height: 52, borderRadius: 10,
        background: `${gradeColor}15`, border: `2px solid ${gradeColor}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ color: gradeColor, fontWeight: 700, fontSize: 20, lineHeight: 1 }}>{grade}</div>
        <div style={{ color: "#94a3b8", fontSize: 9, marginTop: 2 }}>Grade</div>
      </div>
    </div>
  );
}