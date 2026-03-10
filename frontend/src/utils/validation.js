export const validation = {
  isValidEmail: (email) => {
    return /\S+@\S+\.\S+/.test(email);
  },

  isValidAge: (age) => {
    return age > 0 && age < 100;
  },

  isValidMarks: (marks) => {
    return marks >= 0 && marks <= 100;
  },

  isValidAttendance: (attendance) => {
    return attendance >= 0 && attendance <= 100;
  },

  validateStudentForm: (form) => {
    const errors = {};

    if (!form.studentId?.trim()) errors.studentId = "Student ID is required";
    if (!form.name?.trim()) errors.name = "Name is required";

    if (!form.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Enter a valid email";
    }

    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) {
      errors.phone = "Phone must be exactly 10 digits";
    }

    if (!form.dob) {
      errors.dob = "Date of birth is required";
    } else if (!form.age || form.age <= 0 || form.age >= 100) {
      errors.dob = "Enter a valid date of birth";
    }

    if (form.math === "" || form.math === undefined) {
      errors.math = "Required";
    } else if (form.math < 0 || form.math > 100) {
      errors.math = "Must be 0–100";
    }

    if (form.science === "" || form.science === undefined) {
      errors.science = "Required";
    } else if (form.science < 0 || form.science > 100) {
      errors.science = "Must be 0–100";
    }

    if (form.english === "" || form.english === undefined) {
      errors.english = "Required";
    } else if (form.english < 0 || form.english > 100) {
      errors.english = "Must be 0–100";
    }

    if (form.computer === "" || form.computer === undefined) {
      errors.computer = "Required";
    } else if (form.computer < 0 || form.computer > 100) {
      errors.computer = "Must be 0–100";
    }

    if (form.attendance === "" || form.attendance === undefined) {
      errors.attendance = "Required";
    } else if (form.attendance < 0 || form.attendance > 100) {
      errors.attendance = "Must be 0–100";
    }

    if (!form.status) errors.status = "Status is required";

    return errors;
  },
};