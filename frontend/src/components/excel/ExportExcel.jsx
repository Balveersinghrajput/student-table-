import { toast } from "react-toastify";
import { excelHelper } from "../../utils/excelHelper";

export default function ExportExcel({ students, filename = "students.xlsx" }) {
  const handleExport = () => {
    if (!students?.length) {
      toast.warning("No students to export");
      return;
    }
    excelHelper.exportToExcel(students, filename);
    toast.success("Excel file downloaded!");
  };

  return (
    <button className="btn btn-outline" onClick={handleExport}>
      📤 Export Excel
    </button>
  );
}