import Loader from "../../components/common/Loader";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import MarksChart from "../../components/dashboard/MarksChart";
import StatsCard from "../../components/dashboard/StatsCard";
import SubjectChart from "../../components/dashboard/SubjectChart";
import { useStudents } from "../../context/StudentContext";
import { ranking } from "../../utils/ranking";

export default function Dashboard() {
  const { students, loading } = useStudents();

  if (loading) return <Loader text="Loading dashboard..." />;

  const ranked = ranking.getRankedList(students);
  const topStudent = ranked[0];
  const avgMarks = students.length
    ? Math.round(students.reduce((sum, s) => sum + ranking.calcTotal(s), 0) / students.length)
    : 0;
  const avgAttendance = students.length
    ? Math.round(students.reduce((sum, s) => sum + (s.attendance || 0), 0) / students.length)
    : 0;

  return (
    <div className="page fade-in">

      {/* Stats Row */}
      <div className="stats-grid">
        <StatsCard
          icon="👨‍🎓" label="Total Students"
          value={students.length} sub="Enrolled"
          color="#3b82f6"
        />
        <StatsCard
          icon="📊" label="Average Marks"
          value={avgMarks} sub="Out of 400"
          color="#06b6d4"
        />
        <StatsCard
          icon="🏆" label="Top Student"
          value={topStudent?.name?.split(" ")[0] || "—"}
          sub={topStudent ? `${topStudent.totalMarks} pts` : ""}
          color="#f59e0b"
        />
        <StatsCard
          icon="📅" label="Avg Attendance"
          value={`${avgAttendance}%`} sub="Overall"
          color="#10b981"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid-2-1">
        <MarksChart students={students} />
        <AttendanceChart students={students} />
      </div>

      <SubjectChart students={students} />

      {/* Top 3 Students */}
      <div className="card">
        <div className="card-title">🏅 Top 3 Students</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ranked.slice(0, 3).map((s) => (
            <div key={s.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 14px", borderRadius: 8,
              background: "#f8fafc", border: "1px solid #f1f5f9",
              flexWrap: "wrap", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{ranking.getMedalEmoji(s.rank)}</span>
                <div>
                  <div style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                  <div style={{ color: "#94a3b8", fontSize: 11 }}>{s.studentId}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#3b82f6", fontWeight: 700, fontSize: 15 }}>{s.totalMarks}</div>
                <div style={{ color: "#94a3b8", fontSize: 10 }}>Total Marks</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}