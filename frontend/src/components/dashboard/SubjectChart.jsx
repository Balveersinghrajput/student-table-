import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export default function SubjectChart({ students }) {
  const avg = (key) => {
    if (!students.length) return 0;
    return Math.round(students.reduce((sum, s) => sum + (s[key] || 0), 0) / students.length);
  };
  const data = [
    { subject: "Math", Average: avg("math") },
    { subject: "Science", Average: avg("science") },
    { subject: "English", Average: avg("english") },
    { subject: "Computer", Average: avg("computer") },
  ];

  return (
    <div className="card">
      <div className="card-title">📚 Subject-wise Class Average</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 13 }} />
          <Legend formatter={(v) => <span style={{ color: "#64748b", fontSize: 12 }}>{v}</span>} />
          <Line type="monotone" dataKey="Average" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
