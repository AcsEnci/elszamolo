import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import StudentTable from "../Components/StudentTable";

const fetchStudents = (day, name) => {
  return fetch(`/api/students?day=${day}&name=${name}`).then((res) => res.json());
};


const fetchDays = () => {
  return fetch("/api/days/").then((res) => res.json());
};


const deleteStudent = (id) => {
  return fetch(`/api/students/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const StudentList = () => {
  const [studentLoading, setStudentLoading] = useState(true);
  const [daysLoading, setDaysLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [days, setDays] = useState([]);
  const [dayFilter, setDayFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleDelete = (id) => {
    deleteStudent(id);

    setStudents((students) => {
      return students.filter((student) => student._id !== id);
    });
  };

  useEffect(() => {
    setStudentLoading(true);
    fetchStudents(dayFilter, nameFilter)
      .then((students) => {
        setStudents(students);
        setStudentLoading(false);
      });
  }, [dayFilter]);

  useEffect(() => {
    setDaysLoading(true);
    fetchDays()
      .then((days) => {
        setDays(days);
        setDaysLoading(false);
      });
  },[]);

  const handleSearch = () => {
    setStudentLoading(true);
    fetchStudents(dayFilter, nameFilter)
      .then((students) => {
        setStudents(students);
        setStudentLoading(false);
      });
  }


  if (studentLoading || daysLoading) {
    return <Loading />;
  }

  return <div>
      <div className="filtering">
        <input
          type="text" 
          placeholder="Név szerinti keresés..."
          value={nameFilter}
          onChange={(e) => {setNameFilter(e.target.value)}}
        />
        <button onClick={handleSearch}>KERESÉS</button>
        <label htmlFor="dayFilter">Tanulók nap szerint:</label>
        <select
          value={dayFilter}
          onChange={(e) => {setDayFilter(e.target.value)}}
          name="dayFilter"
          id="dayFilter"
        >
            <option value="">Minden nap</option>
            {days.map((day) => (
                <option key={day} value={day}>{day}</option>
            ))}
        </select>
      </div>
      <StudentTable students={students} onDelete={handleDelete} onSave={handleSearch} />
    </div>
};

export default StudentList;
