import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../Components/StudentForm";

const createStudent = (student) => {
  return fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((res) => res.json());
};

const StudentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (student) => {
    setLoading(true);

    createStudent(student)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  return (
    <StudentForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default StudentCreator;
