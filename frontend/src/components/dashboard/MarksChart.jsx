import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export default function MarksChart({ students }) {
  const data = students.slice(0, 8).map((s) => ({
    name: s.name?.split(" ")[0] || "N/A",
    Total: (s.math || 0) + (s.science || 0) + (s.english || 0) + (s.computer || 0),
  }));

  return (
    <div className="card">
      <div className="card-title">📊 Student Marks Overview</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 400]} />
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 13 }} />
          <Bar dataKey="Total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
