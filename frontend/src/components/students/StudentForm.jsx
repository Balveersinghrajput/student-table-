import { useEffect, useRef, useState } from "react";
import { validation } from "../../utils/validation";

function calcAge(dob) {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age > 0 ? age : "";
}

function Field({ label, field, type = "text", placeholder, readOnly = false, maxLength, form, setForm, errors }) {
  return (
    <div>
      <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{label}</label>
      <input
        className={"input" + (errors[field] ? " input-error" : "")}
        type={type}
        placeholder={placeholder}
        value={form[field]}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
        style={{ width: "100%", opacity: readOnly ? 0.6 : 1 }}
      />
      {errors[field] && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors[field]}</p>}
    </div>
  );
}

export default function StudentForm({ initial, onSave, onCancel, loading }) {
  const isEdit = !!initial;
  const [form, setForm] = useState({
    studentId: "", name: "", email: "", fatherName: "", className: "",
    phone: "", gender: "", dob: "", address: "", age: "",
    math: "", science: "", english: "", computer: "",
    attendance: "", status: "Active",
  });
  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (initial) {
      setForm({
        studentId: initial.studentId || "", name: initial.name || "", email: initial.email || "",
        fatherName: initial.fatherName || "", className: initial.className || "",
        phone: initial.phone || "", gender: initial.gender || "", dob: initial.dob || "",
        address: initial.address || "", age: initial.dob ? calcAge(initial.dob) : (initial.age ?? ""),
        math: initial.math ?? "", science: initial.science ?? "",
        english: initial.english ?? "", computer: initial.computer ?? "",
        attendance: initial.attendance ?? "", status: initial.status || "Active",
      });
      if (initial.profilePhoto) {
        setPhotoPreview(`http://localhost:3000${initial.profilePhoto}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial?.studentId]);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = () => {
    const errs = validation.validateStudentForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(
      {
        ...form,
        age: Number(form.age), math: Number(form.math), science: Number(form.science),
        english: Number(form.english), computer: Number(form.computer), attendance: Number(form.attendance),
      },
      photoFile,
    );
  };

  const fieldProps = { form, setForm, errors };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: "#1e293b", fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
        {isEdit ? "✏️ Edit Student" : "➕ Add New Student"}
      </h2>

      {/* Profile Photo */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
        <div
          style={{
            width: 72, height: 72, borderRadius: "50%", background: "#e2e8f0",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0, border: "2px solid #e2e8f0",
          }}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: "#94a3b8", fontSize: 28 }}>📷</span>
          )}
        </div>
        <div>
          <p style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Profile Photo</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="btn btn-outline" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => fileRef.current?.click()}>
              {photoPreview ? "Change" : "Upload"}
            </button>
            {photoPreview && (
              <button type="button" className="btn btn-outline" style={{ fontSize: 12, padding: "5px 12px", color: "#ef4444", borderColor: "#fecaca" }} onClick={removePhoto}>
                Remove
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
          <p style={{ color: "#94a3b8", fontSize: 10, marginTop: 4 }}>JPG, PNG or WebP. Max 5MB.</p>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>Basic Information</p>
        <div className="sf-grid">
          <Field label="Student ID" field="studentId" placeholder="STU001" readOnly={isEdit} {...fieldProps} />
          <Field label="Full Name" field="name" placeholder="John Doe" {...fieldProps} />
          <Field label="Father's Name" field="fatherName" placeholder="Robert Doe" {...fieldProps} />
          <Field label="Email" field="email" placeholder="student@email.com" {...fieldProps} />
          <Field label="Phone" field="phone" placeholder="9876543210" maxLength={10} {...fieldProps} />
          <Field label="Class" field="className" placeholder="10th A" {...fieldProps} />
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Date of Birth</label>
            <input
              className={"input" + (errors.dob ? " input-error" : "")}
              type="date"
              value={form.dob}
              onChange={(e) => {
                const dob = e.target.value;
                setForm((f) => ({ ...f, dob, age: calcAge(dob) }));
              }}
              style={{ width: "100%" }}
            />
            {errors.dob && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors.dob}</p>}
          </div>
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Age</label>
            <input className="input" type="number" value={form.age} readOnly style={{ width: "100%", opacity: 0.6 }} />
            <p style={{ color: "#94a3b8", fontSize: 10, marginTop: 2 }}>Auto-calculated from DOB</p>
          </div>
          <div>
            <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Gender</label>
            <select className="select" value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))} style={{ width: "100%" }}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors.gender}</p>}
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Address</label>
          <textarea
            className={"input" + (errors.address ? " input-error" : "")}
            placeholder="123 Main Street, City, State"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            rows={2}
            style={{ width: "100%", resize: "vertical" }}
          />
          {errors.address && <p style={{ color: "#ef4444", fontSize: 11, marginTop: 2 }}>{errors.address}</p>}
        </div>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, padding: 14, marginBottom: 14, border: "1px solid #f1f5f9" }}>
        <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginBottom: 10 }}>Subject Marks (0 – 100)</p>
        <div className="sf-grid">
          <Field label="Mathematics" field="math" type="number" placeholder="0–100" {...fieldProps} />
          <Field label="Science" field="science" type="number" placeholder="0–100" {...fieldProps} />
          <Field label="English" field="english" type="number" placeholder="0–100" {...fieldProps} />
          <Field label="Computer" field="computer" type="number" placeholder="0–100" {...fieldProps} />
        </div>
      </div>

      <div className="sf-grid" style={{ marginBottom: 20 }}>
        <Field label="Attendance %" field="attendance" type="number" placeholder="0–100" {...fieldProps} />
        <div>
          <label style={{ color: "#64748b", fontSize: 11, fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>Status</label>
          <select className="select" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} style={{ width: "100%" }}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 1, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Student"}
        </button>
        <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
