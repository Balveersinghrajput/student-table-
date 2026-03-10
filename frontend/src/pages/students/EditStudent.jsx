import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import StudentForm from "../../components/students/StudentForm";
import { useStudents } from "../../context/StudentContext";
import { studentService } from "../../services/studentService";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchStudents } = useStudents();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await studentService.getById(id);
        setStudent(data);
      } catch {
        toast.error("Student not found");
        navigate("/students");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSave = async (data, photoFile) => {
    setSaving(true);
    try {
      if (photoFile) {
        await studentService.uploadPhoto(id, photoFile);
      }
      await studentService.update(id, data);
      toast.success("Student updated!");
      fetchStudents();
      navigate("/students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading student..." />;
  if (!student) return null;

  return (
    <div className="fade-in" style={{ maxWidth: 660, margin: "0 auto", width: "100%" }}>
      <div className="card" style={{ padding: 0 }}>
        <StudentForm initial={student} onSave={handleSave} onCancel={() => navigate("/students")} loading={saving} />
      </div>
    </div>
  );
}
