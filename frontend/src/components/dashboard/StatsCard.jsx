export default function StatsCard({ icon, label, value, sub, color = "#3b82f6" }) {
  return (
    <div className="stat-card fade-in">
      <div className="stat-icon" style={{ background: color + "15", color }}>{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub" style={{ color }}>{sub}</div>}
    </div>
  );
}
