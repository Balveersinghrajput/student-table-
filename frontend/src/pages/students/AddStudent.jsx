import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../../components/students/StudentForm";
import { useStudents } from "../../context/StudentContext";
import { studentService } from "../../services/studentService";

export default function AddStudent() {
  const navigate = useNavigate();
  const { fetchStudents } = useStudents();
  const [loading, setLoading] = useState(false);

  const handleSave = async (data, photoFile) => {
    setLoading(true);
    try {
      const student = await studentService.create(data);
      if (photoFile && student?.id) {
        await studentService.uploadPhoto(student.id, photoFile);
      }
      toast.success("Student added successfully!");
      fetchStudents();
      navigate("/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: 660, margin: "0 auto", width: "100%" }}>
      <div className="card" style={{ padding: 0 }}>
        <StudentForm onSave={handleSave} onCancel={() => navigate("/students")} loading={loading} />
      </div>
    </div>
  );
}
