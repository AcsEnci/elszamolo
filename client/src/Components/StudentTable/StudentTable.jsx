import { useEffect, useState } from "react";
import "./EmployeeTable.css";
import StudentBox from "./StudentBox";

const StudentTable = ({ students, onDelete, onSave }) => {
  const [shownStudents, setShownStudents] = useState([]);
  const [isDeptShown, setIsDeptShown] = useState(true);
  const [isBalanceShown, setIsBalanceShown] = useState(true);
  const [isLuckyShown, setIsLuckyShown] = useState(true);
  
  const findNeededStudents = (owe) => {
    if (owe === -1) {
      return students.filter(student => student.balance < 0);
    } else if (owe === 0) {
      return students.filter(student => student.balance === 0);
    } else {
      return students.filter(student => student.balance > 0);
    }
  }

  const [studentsInDept, setStudentsInDept] = useState(findNeededStudents(-1));
  const [studentsInBalance, setStudentsInBalance] = useState(findNeededStudents(0));
  const [studentsInLuck, setStudentsInLuck] = useState(findNeededStudents(1));
  

  const handleDeptCheck = () => {
    let newStudents = [];
    if (isDeptShown) {
      setIsDeptShown(false);
      newStudents = [];
      setStudentsInDept(newStudents);
    } else {
      setIsDeptShown(true);
      newStudents = findNeededStudents(-1)
      setStudentsInDept(newStudents);
    }
  }

  const handleBalanceCheck = () => {
    let newStudents = [];
    if (isBalanceShown) {
      setIsBalanceShown(false);
      newStudents = [];
      setStudentsInBalance(newStudents);
    } else {
      setIsBalanceShown(true);
      newStudents = findNeededStudents(0)
      setStudentsInBalance(newStudents);
    }
  }

  const handleLuckyCheck = () => {
    let newStudents = [];
    if (isLuckyShown) {
      setIsLuckyShown(false);
      newStudents = [];
      setStudentsInLuck(newStudents);
    } else {
      setIsLuckyShown(true);
      newStudents = findNeededStudents(1)
      setStudentsInLuck(newStudents);
    }
  }

  useEffect(() => {
    setShownStudents([...studentsInDept, ...studentsInBalance, ...studentsInLuck]);
  },[studentsInBalance, studentsInDept, studentsInLuck])

  return (
    <div>
      <div className="filtering">
        <div>
          <input type="checkbox"
            checked = {isDeptShown}
            onChange={handleDeptCheck}
            name="inDept"
            id="inDept"
          />
          <label htmlFor="inDept">Tartozik</label>
        </div>
        <div>
          <input type="checkbox"
            checked = {isBalanceShown}
            onChange={handleBalanceCheck}
            name="inBalance"
            id="inBalance"
          />
          <label htmlFor="inBalance">Null számlás</label>
        </div>
        <div>
          <input type="checkbox"
            checked = {isLuckyShown}
            onChange={handleLuckyCheck}
            name="inLuck"
            id="inLuck"
          />
          <label htmlFor="inLuck">Plusz számlás</label>
        </div>
      </div>
      <div className="EmployeeTable">
        {shownStudents.map((student) => (
          <StudentBox key={student._id} student={student} onDelete={onDelete} onSave={onSave} />
        ))}
      </div>
    </div>
)};

export default StudentTable;
