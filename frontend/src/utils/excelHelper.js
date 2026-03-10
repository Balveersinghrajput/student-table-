import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const excelHelper = {
  exportToExcel: (students, filename = "students.xlsx") => {
    const data = students.map((s, i) => ({
      Rank: s.rank || i + 1,
      "Student ID": s.studentId,
      Name: s.name,
      "Father's Name": s.fatherName || "",
      Class: s.className || "",
      Email: s.email,
      Phone: s.phone || "",
      Gender: s.gender || "",
      "Date of Birth": s.dob || "",
      Age: s.age,
      Address: s.address || "",
      Math: s.math,
      Science: s.science,
      English: s.english,
      Computer: s.computer,
      "Total Marks": (s.math || 0) + (s.science || 0) + (s.english || 0) + (s.computer || 0),
      "Attendance %": s.attendance,
      Status: s.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, filename);
  },

  parseExcelFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const students = jsonData.map((row, index) => ({
            studentId: row["Student ID"] || `STU${String(index + 1).padStart(3, "0")}`,
            name: row["Name"] || "",
            fatherName: row["Father's Name"] || "",
            className: row["Class"] || "",
            email: row["Email"] || "",
            phone: row["Phone"] || "",
            gender: row["Gender"] || "",
            dob: row["Date of Birth"] || "",
            age: Number(row["Age"]) || 0,
            address: row["Address"] || "",
            math: Number(row["Math"]) || 0,
            science: Number(row["Science"]) || 0,
            english: Number(row["English"]) || 0,
            computer: Number(row["Computer"]) || 0,
            attendance: Number(row["Attendance %"]) || 0,
            status: row["Status"] || "Active",
          }));

          resolve(students);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },
};