import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function AttendanceChart({ students }) {
  const active = students.filter((s) => s.status === "Active").length;
  const inactive = students.length - active;
  const data = [
    { name: "Active", value: active },
    { name: "Inactive", value: inactive },
  ];
  const COLORS = ["#3b82f6", "#ef4444"];

  return (
    <div className="card">
      <div className="card-title">🟢 Student Status</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, color: "#1e293b", fontSize: 13 }} />
          <Legend formatter={(v) => <span style={{ color: "#64748b", fontSize: 12 }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
