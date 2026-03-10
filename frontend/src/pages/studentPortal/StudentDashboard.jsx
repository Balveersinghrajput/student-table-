import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../../context/AuthContext";
import { useStudents } from "../../context/StudentContext";
import { ranking } from "../../utils/ranking";
import Avatar from "../../components/common/Avatar";

export default function StudentDashboard() {
  const { studentSession, studentLogout } = useAuth();
  const { students } = useStudents();
  const navigate = useNavigate();

  const handleLogout = () => { studentLogout(); toast.success("Logged out"); navigate("/student-login"); };

  if (!studentSession) return null;

  const ranked = ranking.getRankedList(students);
  const myData = ranked.find((s) => s.studentId === studentSession.studentId);

  if (!myData) return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#64748b", fontSize: 13 }}>Student data not found.</p>
    </div>
  );

  const total = ranking.calcTotal(myData);
  const average = ranking.calcAverage(myData);
  const { grade, color: gradeColor } = ranking.getGrade(total);

  const subjectData = [
    { subject: "Math", marks: myData.math || 0 },
    { subject: "Science", marks: myData.science || 0 },
    { subject: "English", marks: myData.english || 0 },
    { subject: "Computer", marks: myData.computer || 0 },
  ];

  const subjects = [
    { label: "Mathematics", key: "math", color: "#3b82f6" },
    { label: "Science", key: "science", color: "#06b6d4" },
    { label: "English", key: "english", color: "#8b5cf6" },
    { label: "Computer", key: "computer", color: "#10b981" },
  ];

  return (
    <div className="sd-page">
      {/* Header */}
      <header className="sd-header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="sd-logo-icon">🎓</div>
          <span className="sd-logo-text">EduTrack — Student Portal</span>
        </div>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
      </header>

      <div className="sd-content">
        {/* Profile Card */}
        <div className="card fade-in sd-profile">
          <Avatar profilePhoto={myData.profilePhoto} name={myData.name} size={50} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 className="sd-name">{myData.name}</h2>
            <p className="sd-meta">{myData.studentId} · {myData.className ? myData.className + " · " : ""}{myData.email}</p>
          </div>
          <div className="sd-grade" style={{ borderColor: gradeColor, background: gradeColor + "15" }}>
            <div style={{ color: gradeColor, fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{grade}</div>
            <div style={{ color: "#94a3b8", fontSize: 9 }}>Grade</div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Total Marks", value: total, sub: "/ 400", color: "#3b82f6" },
            { label: "Average", value: average, sub: "per subject", color: "#06b6d4" },
            { label: "Attendance", value: myData.attendance + "%", sub: "overall", color: "#10b981" },
            { label: "Class Rank", value: ranking.getMedalEmoji(myData.rank), sub: "#" + myData.rank + " of " + ranked.length, color: "#f59e0b" },
          ].map((item) => (
            <div className="stat-card" key={item.label} style={{ textAlign: "center" }}>
              <div className="stat-value" style={{ color: item.color }}>{item.value}</div>
              <div className="stat-label">{item.label}</div>
              <div className="stat-sub">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Subject + Chart */}
        <div className="grid-2">
          <div className="card">
            <div className="card-title">📚 Subject Marks</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {subjects.map((subj) => {
                const mark = myData[subj.key] || 0;
                return (
                  <div key={subj.key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#334155", fontSize: 12 }}>{subj.label}</span>
                      <span style={{ color: subj.color, fontSize: 12, fontWeight: 600 }}>{mark}/100</span>
                    </div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: mark + "%", background: subj.color, borderRadius: 3, transition: "width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-title">📊 Performance Chart</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={subjectData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="marks" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="card-title">🏆 Class Leaderboard</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ranked.slice(0, 5).map((s) => {
              const isMe = s.studentId === myData.studentId;
              return (
                <div key={s.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px", borderRadius: 8,
                  background: isMe ? "#eff6ff" : "#f8fafc",
                  border: "1px solid " + (isMe ? "#93c5fd" : "#f1f5f9"),
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, minWidth: 24 }}>{ranking.getMedalEmoji(s.rank)}</span>
                    <span style={{ color: isMe ? "#3b82f6" : "#1e293b", fontWeight: isMe ? 700 : 400, fontSize: 13 }}>
                      {s.name} {isMe && "(You)"}
                    </span>
                  </div>
                  <span style={{ color: "#3b82f6", fontWeight: 700, fontSize: 13 }}>{s.totalMarks} pts</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
