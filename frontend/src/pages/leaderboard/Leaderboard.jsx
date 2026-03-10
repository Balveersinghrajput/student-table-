import { toast } from "react-toastify";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import { useStudents } from "../../context/StudentContext";
import { excelHelper } from "../../utils/excelHelper";
import { ranking } from "../../utils/ranking";
import Avatar from "../../components/common/Avatar";

export default function Leaderboard() {
  const { students, loading } = useStudents();
  if (loading) return <Loader text="Loading leaderboard..." />;

  const ranked = ranking.getRankedList(students);

  const handleExport = () => {
    excelHelper.exportToExcel(ranked, "leaderboard.xlsx");
    toast.success("Leaderboard exported!");
  };

  const podiumColors = {
    1: { bg: "#fef3c7", border: "#fbbf24", text: "#b45309" },
    2: { bg: "#f1f5f9", border: "#94a3b8", text: "#475569" },
    3: { bg: "#fed7aa", border: "#f97316", text: "#9a3412" },
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">🏆 Leaderboard</h2>
          <p className="page-sub">Students ranked by total marks</p>
        </div>
        <button className="btn btn-outline" onClick={handleExport}>📤 Export Excel</button>
      </div>

      {/* Top 3 Podium */}
      {ranked.length >= 3 && (
        <div className="grid-3">
          {[ranked[1], ranked[0], ranked[2]].map((s, i) => {
            const r = i === 0 ? 2 : i === 1 ? 1 : 3;
            const c = podiumColors[r];
            return (
              <div key={s.id} style={{
                background: c.bg, border: "1px solid " + c.border, borderRadius: 12,
                padding: 20, textAlign: "center",
                transform: r === 1 ? "translateY(-6px)" : "none",
              }}>
                <div style={{ fontSize: 32, marginBottom: 6 }}>{ranking.getMedalEmoji(r)}</div>
                <Avatar profilePhoto={s.profilePhoto} name={s.name} size={44} style={{ margin: "0 auto 10px" }} />
                <div style={{ color: "#1e293b", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{s.name}</div>
                <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8 }}>{s.studentId}</div>
                <div style={{ color: c.text, fontWeight: 700, fontSize: 22 }}>{s.totalMarks}</div>
                <div style={{ color: "#94a3b8", fontSize: 11 }}>Total Marks</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div className="table-wrap">
        {ranked.length === 0 ? (
          <EmptyState title="No students yet" subtitle="Add students to see the leaderboard" icon="🏆" />
        ) : (
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  {["Rank", "Student", "Math", "Science", "English", "Computer", "Total", "Avg", "Attend%"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ranked.map((s) => {
                  const isTop = s.rank <= 3;
                  const pc = podiumColors[s.rank];
                  return (
                    <tr key={s.id} style={{ background: pc ? pc.bg + "66" : "transparent", cursor: "default" }}>
                      <td>
                        <span style={{ fontSize: isTop ? 18 : 13, color: pc ? pc.text : "#64748b", fontWeight: 700 }}>
                          {ranking.getMedalEmoji(s.rank)}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Avatar profilePhoto={s.profilePhoto} name={s.name} size={30} />
                          <div>
                            <div style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                            <div style={{ color: "#94a3b8", fontSize: 10 }}>{s.studentId}</div>
                          </div>
                        </div>
                      </td>
                      {["math", "science", "english", "computer"].map((subj) => (
                        <td key={subj} style={{ color: "#334155", fontSize: 13 }}>{s[subj] || 0}</td>
                      ))}
                      <td style={{ color: pc ? pc.text : "#3b82f6", fontWeight: 700, fontSize: 14 }}>{s.totalMarks}</td>
                      <td style={{ color: "#64748b", fontSize: 13 }}>{s.average}</td>
                      <td>
                        <span style={{ color: s.attendance >= 75 ? "#16a34a" : "#dc2626", fontSize: 13, fontWeight: 600 }}>
                          {s.attendance}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
