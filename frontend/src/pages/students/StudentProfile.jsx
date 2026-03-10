import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { studentService } from "../../services/studentService";
import { ranking } from "../../utils/ranking";
import Avatar from "../../components/common/Avatar";
import "./StudentProfile.css";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [current, all] = await Promise.all([
          studentService.getById(id),
          studentService.getAll(),
        ]);
        const ranked = ranking.getRankedList(all);
        const withRank = ranked.find((s) => String(s.id) === String(id)) || { ...current, rank: null };
        setStudent(withRank);
      } catch {
        navigate("/students");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <Loader text="Loading profile..." />;
  if (!student) return null;

  const total = ranking.calcTotal(student);
  const average = ranking.calcAverage(student);
  const { grade, color: gradeColor } = ranking.getGrade(total);

  const subjects = [
    { label: "Mathematics", key: "math", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", bg: "#ede9fe" },
    { label: "Science", key: "science", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", bg: "#fce7f3" },
    { label: "English", key: "english", gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)", bg: "#dbeafe" },
    { label: "Computer", key: "computer", gradient: "linear-gradient(135deg, #22c55e, #14b8a6)", bg: "#dcfce7" },
  ];

  const attPct = student.attendance || 0;
  const circumference = 2 * Math.PI * 54;
  const attOffset = circumference - (attPct / 100) * circumference;
  const attColor = attPct >= 75 ? "#22c55e" : "#ef4444";

  const bestSubject = subjects.reduce((b, s) => (student[s.key] || 0) > (student[b.key] || 0) ? s : b, subjects[0]);
  const weakSubject = subjects.reduce((w, s) => (student[s.key] || 0) < (student[w.key] || 0) ? s : w, subjects[0]);

  return (
    <div className="prof fade-in">
      {/* Back */}
      <button className="prof-back" onClick={() => navigate("/students")}>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"/></svg>
        Back to Students
      </button>

      {/* ====== HERO BANNER ====== */}
      <div className="prof-hero">
        <div className="prof-hero-bg" />
        <div className="prof-hero-content">
          <div className="prof-avatar">
            <Avatar profilePhoto={student.profilePhoto} name={student.name} size={80} />
            <div className={`prof-dot ${student.status === "Active" ? "on" : "off"}`} />
          </div>
          <div className="prof-hero-info">
            <h1 className="prof-hero-name">{student.name}</h1>
            <p className="prof-hero-id">{student.studentId} &middot; {student.email}</p>
            <div className="prof-hero-tags">
              <span className={`prof-tag ${student.status === "Active" ? "tag-active" : "tag-inactive"}`}>
                {student.status}
              </span>
              {student.className && <span className="prof-tag tag-age">📚 {student.className}</span>}
              <span className="prof-tag tag-age">Age {student.age}</span>
              {student.gender && <span className="prof-tag tag-age">{student.gender === "Male" ? "👦" : student.gender === "Female" ? "👧" : "🧑"} {student.gender}</span>}
              <span className="prof-tag tag-grade" style={{ background: `${gradeColor}22`, color: gradeColor, borderColor: `${gradeColor}44` }}>
                Grade {grade}
              </span>
              {student.createdAt && (
                <span className="prof-tag tag-date">
                  Joined {new Date(student.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              )}
            </div>
          </div>
          <button className="prof-edit-btn" onClick={() => navigate(`/students/edit/${student.id}`)}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
        </div>
      </div>

      {/* ====== STATS ROW ====== */}
      <div className="prof-stats">
        {[
          { label: "Total Marks", val: total, sub: "out of 400", grad: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
          { label: "Average", val: average, sub: "per subject", grad: "linear-gradient(135deg, #ec4899, #f43f5e)" },
          { label: "Attendance", val: `${attPct}%`, sub: "overall", grad: "linear-gradient(135deg, #22c55e, #14b8a6)" },
          { label: "Rank", val: student.rank ? `#${student.rank}` : "—", sub: student.rank ? ranking.getMedalEmoji(student.rank) : "—", grad: "linear-gradient(135deg, #f59e0b, #f97316)" },
        ].map((s) => (
          <div className="prof-stat" key={s.label}>
            <div className="prof-stat-accent" style={{ background: s.grad }} />
            <div className="prof-stat-val">{s.val}</div>
            <div className="prof-stat-label">{s.label}</div>
            <div className="prof-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ====== MAIN GRID ====== */}
      <div className="prof-grid">

        {/* Subject Performance */}
        <div className="prof-card prof-subjects">
          <h3 className="prof-card-title">Subject Performance</h3>
          <p className="prof-card-desc">Marks scored in each subject</p>
          <div className="prof-subj-list">
            {subjects.map((subj) => {
              const mark = student[subj.key] || 0;
              return (
                <div className="prof-subj" key={subj.key}>
                  <div className="prof-subj-top">
                    <span className="prof-subj-name">{subj.label}</span>
                    <span className="prof-subj-score">{mark}<small>/100</small></span>
                  </div>
                  <div className="prof-bar-track">
                    <div className="prof-bar-fill" style={{ width: `${mark}%`, background: subj.gradient }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attendance Ring */}
        <div className="prof-card prof-att">
          <h3 className="prof-card-title">Attendance</h3>
          <p className="prof-card-desc">Overall class presence</p>
          <div className="prof-ring-wrap">
            <svg className="prof-ring-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={attColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={attOffset}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="prof-ring-center">
              <span className="prof-ring-val" style={{ color: attColor }}>{attPct}%</span>
              <span className="prof-ring-lbl">Present</span>
            </div>
          </div>
          <div className={`prof-att-msg ${attPct >= 75 ? "good" : "low"}`}>
            {attPct >= 75 ? "✅ Meets 75% requirement" : "⚠️ Below 75% requirement"}
          </div>
        </div>

        {/* Marks Table */}
        <div className="prof-card prof-table-card" style={{ gridColumn: '1 / -1' }}>
          <h3 className="prof-card-title">Marks Breakdown</h3>
          <p className="prof-card-desc">Detailed subject-wise performance</p>
          <div className="prof-table-wrap">
            <table className="prof-table">
              <thead>
                <tr><th>Subject</th><th>Marks</th><th>%</th><th>Grade</th></tr>
              </thead>
              <tbody>
                {subjects.map((subj) => {
                  const mark = student[subj.key] || 0;
                  const sg = mark >= 90 ? "A+" : mark >= 80 ? "A" : mark >= 70 ? "B" : mark >= 60 ? "C" : mark >= 50 ? "D" : "F";
                  const sgColor = mark >= 80 ? "#22c55e" : mark >= 60 ? "#f59e0b" : "#ef4444";
                  return (
                    <tr key={subj.key}>
                      <td>{subj.label}</td>
                      <td className="prof-td-mark">{mark}/100</td>
                      <td>{mark}%</td>
                      <td><span className="prof-grade-pill" style={{ background: `${sgColor}20`, color: sgColor }}>{sg}</span></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td className="prof-td-mark"><strong>{total}/400</strong></td>
                  <td><strong>{Math.round((total / 400) * 100)}%</strong></td>
                  <td><span className="prof-grade-pill" style={{ background: `${gradeColor}20`, color: gradeColor }}>{grade}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="prof-card prof-insights">
          <h3 className="prof-card-title">Quick Insights</h3>
          <p className="prof-card-desc">Performance highlights</p>
          <div className="prof-insight-list">
            <div className="prof-insight-item">
              <div className="prof-insight-icon" style={{ background: bestSubject.bg }}>🏅</div>
              <div>
                <div className="prof-insight-label">Best Subject</div>
                <div className="prof-insight-val">{bestSubject.label} — {student[bestSubject.key]}/100</div>
              </div>
            </div>
            <div className="prof-insight-item">
              <div className="prof-insight-icon" style={{ background: weakSubject.bg }}>📉</div>
              <div>
                <div className="prof-insight-label">Needs Improvement</div>
                <div className="prof-insight-val">{weakSubject.label} — {student[weakSubject.key]}/100</div>
              </div>
            </div>
            <div className="prof-insight-item">
              <div className="prof-insight-icon" style={{ background: "#fef3c7" }}>📊</div>
              <div>
                <div className="prof-insight-label">Overall Score</div>
                <div className="prof-insight-val">{Math.round((total / 400) * 100)}% — {total >= 320 ? "Excellent" : total >= 240 ? "Good" : total >= 160 ? "Average" : "Needs Work"}</div>
              </div>
            </div>
            <div className="prof-insight-item">
              <div className="prof-insight-icon" style={{ background: attColor === "#22c55e" ? "#dcfce7" : "#fee2e2" }}>📅</div>
              <div>
                <div className="prof-insight-label">Attendance Status</div>
                <div className="prof-insight-val" style={{ color: attColor }}>{attPct >= 75 ? "Regular" : "Irregular"} — {attPct}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="prof-card prof-insights">
          <h3 className="prof-card-title">Personal Details</h3>
          <p className="prof-card-desc">Student information</p>
          <div className="prof-insight-list">
            {[
              { icon: "🆔", label: "Student ID", val: student.studentId },
              { icon: "👨‍👦", label: "Father's Name", val: student.fatherName },
              { icon: "📚", label: "Class", val: student.className },
              { icon: "📧", label: "Email", val: student.email },
              { icon: "📱", label: "Phone", val: student.phone },
              { icon: "🎂", label: "Date of Birth", val: student.dob ? new Date(student.dob).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : null },
              { icon: "⚧️", label: "Gender", val: student.gender },
              { icon: "📍", label: "Address", val: student.address },
            ].filter(d => d.val).map(d => (
              <div className="prof-insight-item" key={d.label}>
                <div className="prof-insight-icon" style={{ background: "#f1f5f9" }}>{d.icon}</div>
                <div>
                  <div className="prof-insight-label">{d.label}</div>
                  <div className="prof-insight-val">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}