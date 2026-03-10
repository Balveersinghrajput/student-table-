export default function EmptyState({ title = "No data found", subtitle = "Try adjusting your search or filters", icon = "📭" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: 10 }}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <h3 style={{ color: "#1e293b", fontSize: 18, fontWeight: 700 }}>{title}</h3>
      <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", maxWidth: 280 }}>{subtitle}</p>
    </div>
  );
}
