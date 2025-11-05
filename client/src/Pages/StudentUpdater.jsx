import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../Components/StudentForm";
import Loading from "../Components/Loading";

const updateStudent = (student) => {
  return fetch(`/api/students/${student._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((res) => res.json());
};

const fetchStudent = (id) => {
  return fetch(`/api/students/${id}`).then((res) => res.json());
};

const StudentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [StudentLoading, setStudentLoading] = useState(true);

  useEffect(() => {
    setStudentLoading(true);
    fetchStudent(id)
      .then((student) => {
        setStudent(student);
        setStudentLoading(false);
      });
  }, [id]);

  const handleUpdateStudent = (student) => {
    setUpdateLoading(true);
    updateStudent(student)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (StudentLoading) {
    return <Loading />;
  }

  return (
    <StudentForm
      student={student}
      onSave={handleUpdateStudent}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default StudentUpdater;
