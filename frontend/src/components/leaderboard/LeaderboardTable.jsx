import { ranking } from "../../utils/ranking";
import Avatar from "../common/Avatar";

export default function LeaderboardTable({ students }) {
  const ranked = ranking.getRankedList(students);

  return (
    <div className="table-wrap">
      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              {["Rank", "Student", "Student ID", "Math", "Science", "English", "Computer", "Total"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map((s) => (
              <tr key={s.id}>
                <td style={{ fontSize: 16 }}>{ranking.getMedalEmoji(s.rank)}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar profilePhoto={s.profilePhoto} name={s.name} size={30} />
                    <span style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ color: "#64748b", fontSize: 12 }}>{s.studentId}</td>
                <td style={{ color: "#334155", fontSize: 12 }}>{s.math}</td>
                <td style={{ color: "#334155", fontSize: 12 }}>{s.science}</td>
                <td style={{ color: "#334155", fontSize: 12 }}>{s.english}</td>
                <td style={{ color: "#334155", fontSize: 12 }}>{s.computer}</td>
                <td style={{ color: "#3b82f6", fontWeight: 700, fontSize: 13 }}>{s.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}