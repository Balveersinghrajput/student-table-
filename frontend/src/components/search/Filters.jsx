export default function Filters({ statusFilter, onStatusChange, gradeFilter, onGradeChange }) {
  return (
    <>
      <select className="select" value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <select className="select" value={gradeFilter} onChange={(e) => onGradeChange(e.target.value)}>
        <option value="All">All Grades</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    </>
  );
}