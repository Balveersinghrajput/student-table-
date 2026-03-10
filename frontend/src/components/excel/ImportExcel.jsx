import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useStudents } from "../../context/StudentContext";
import { studentService } from "../../services/studentService";
import { excelHelper } from "../../utils/excelHelper";

export default function ImportExcel() {
  const fileInputRef = useRef(null);
  const { fetchStudents } = useStudents();
  const [importing, setImporting] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const students = await excelHelper.parseExcelFile(file);
      if (!students.length) {
        toast.warning("No valid student data found in file");
        return;
      }
      await studentService.bulkImport(students);
      toast.success(`${students.length} students imported!`);
      fetchStudents();
    } catch {
      toast.error("Failed to import Excel file");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()} disabled={importing} style={{ opacity: importing ? 0.6 : 1 }}>
        {importing ? "⏳ Importing..." : "📥 Import Excel"}
      </button>
    </>
  );
}