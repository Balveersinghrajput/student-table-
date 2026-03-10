export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
      <p style={{ color: "#64748b", fontSize: 12 }}>
        Showing <strong style={{ color: "#1e293b" }}>{start}–{end}</strong> of <strong style={{ color: "#1e293b" }}>{totalItems}</strong>
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button className="btn btn-outline btn-sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.4 : 1 }}>
          ← Prev
        </button>
        {pages.map((p) => (
          <button key={p} onClick={() => onPageChange(p)}
            style={{
              padding: "4px 10px", borderRadius: 6, border: "1px solid " + (currentPage === p ? "#3b82f6" : "#e2e8f0"),
              background: currentPage === p ? "#3b82f6" : "#fff", color: currentPage === p ? "#fff" : "#64748b",
              fontSize: 12, fontWeight: currentPage === p ? 700 : 400, cursor: "pointer", minWidth: 30,
            }}
          >
            {p}
          </button>
        ))}
        <button className="btn btn-outline btn-sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  );
}
