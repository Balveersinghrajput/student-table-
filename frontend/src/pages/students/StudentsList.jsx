import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";
import DeleteModal from "../../components/students/DeleteModal";
import { useStudents } from "../../context/StudentContext";
import { studentService } from "../../services/studentService";
import { ranking } from "../../utils/ranking";
import Avatar from "../../components/common/Avatar";

const PER_PAGE = 8;

export default function StudentsList() {
  const { students, loading, fetchStudents } = useStudents();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name?.toLowerCase().includes(q) || s.studentId?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.className?.toLowerCase().includes(q) || s.fatherName?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    const { grade } = ranking.getGrade(ranking.calcTotal(s));
    const matchGrade = gradeFilter === "All" || grade === gradeFilter;
    return matchSearch && matchStatus && matchGrade;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await studentService.delete(deleteTarget.id);
      toast.success(deleteTarget.name + " deleted");
      fetchStudents();
    } catch { toast.error("Failed to delete"); }
    finally { setDeleteTarget(null); }
  };

  if (loading) return <Loader text="Loading students..." />;

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">👨‍🎓 Students</h2>
          <p className="page-sub">{filtered.length} student{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/students/add")}>+ Add Student</button>
      </div>

      {/* Search & Filters */}
      <div className="toolbar">
        <input className="input" placeholder="🔍 Search by name, ID or email..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <div className="toolbar-filters">
          <select className="select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select className="select" value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1); }}>
            <option value="All">All Grades</option>
            {["A+","A","B","C","D","F"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? <EmptyState /> : (
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  {["Name","Student ID","Class","Email","Status","Total","Grade","Actions"].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => {
                  const total = ranking.calcTotal(s);
                  const { grade, color: gc } = ranking.getGrade(total);
                  return (
                    <tr key={s.id} onClick={() => navigate("/students/" + s.id)} style={{ cursor: "pointer" }}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Avatar profilePhoto={s.profilePhoto} name={s.name} size={34} />
                          <span style={{ color: "#1e293b", fontWeight: 600, fontSize: 13 }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#64748b", fontSize: 12 }}>{s.studentId}</td>
                      <td style={{ color: "#64748b", fontSize: 12 }}>{s.className || "—"}</td>
                      <td style={{ color: "#64748b", fontSize: 12 }}>{s.email}</td>
                      <td><span className={s.status === "Active" ? "badge badge-active" : "badge badge-inactive"}>{s.status}</span></td>
                      <td style={{ color: "#3b82f6", fontWeight: 700 }}>{total}</td>
                      <td><span style={{ color: gc, fontWeight: 700 }}>{grade}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
                          <button onClick={() => navigate("/students/edit/" + s.id)} title="Edit"
                            style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 13 }}>✏️</button>
                          <button onClick={() => setDeleteTarget(s)} title="Delete"
                            style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 13 }}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "10px 14px" }}>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} itemsPerPage={PER_PAGE} />
          </div>
        </div>
      )}

      {deleteTarget && <DeleteModal student={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
    </div>
  );
}