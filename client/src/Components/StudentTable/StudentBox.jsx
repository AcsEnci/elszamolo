import { useState } from "react";
import { useNavigate } from "react-router-dom";

const updateStudent = (student) => {
    return fetch(`/api/students/${student._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }).then((res) => res.json());
  };


function StudentBox({ student, onDelete, onSave }) {
    const [isPaying, setIsPaying] = useState(false);
    const [dept, setDept] = useState(0);
    const [payment, setPayment] = useState(0);
    const [balance, setBalance] = useState(student.balance);
    const [payments, setPayments] = useState(student.payments);
    const days = student.studyDay;
    const [isDeleting, setIsDeleting] = useState (false);

    const navigate = useNavigate();

    const goBack = () => {
        setDept(0);
        setPayment(0);
        setIsPaying(false);
    }

    const handleSave = (e) => {
        e.preventDefault();
        const newPayments = payments;
        let newBalance = balance;
        if (dept) {
            const price = dept * (-1);
            const newPayment = {
                date: Date.now(),
                price,
            }
            newPayments.push(newPayment);
            newBalance += price;
        }
        if (payment) {
            const newPayment = {
                date: Date.now(),
                price: payment,
            }
            newPayments.push(newPayment);
            newBalance += payment;
        }

        updateStudent({...student,
            balance: newBalance,
            payments: newPayments,
        })

        setBalance(newBalance);
        setPayments(newPayments);
        onSave();
        goBack();
    }

    const addDept = (e) => {
        e.preventDefault();
        setDept( Number(dept) + student.budget);
    };

    const addPayment = (e) => {
        e.preventDefault();
        setPayment(Number(payment) + student.budget);
    }

    if (isDeleting) {
        return <div className="StudentBox">
            <h1>{student.name} törlődni fog a rendszerből.</h1>
            <button onClick={() => {onDelete(student._id)}}>IGEN, TÖRLÉS</button>
            <button onClick={() => {setIsDeleting(false)}}>NE, MÉGSE</button>
        </div>
    }

  return (
    <div className="StudentBox">
        {isPaying? (
            <div>
                <h4>{student.name}</h4>
                <h4>Óradíj: {student.budget}Ft</h4>
                <form>
                    <div className="control">
                        <label htmlFor="dept">Tartozás:</label>
                        <input
                        type="number"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        name="dept"
                        id="dept"
                        />
                        <button onClick={addDept}>Óradíj</button>
                    </div>
                    <div className="control">
                        <label htmlFor="payment">Fizetett:</label>
                        <input
                        type="number"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        name="payment"
                        id="payment"
                        />
                        <button onClick={addPayment}>Óradíj</button>
                    </div>
                </form>
                    <button onClick={handleSave}>Mentés</button>
                    <button onClick={goBack}>Vissza</button>
            </div>
        ):(
            <div>
        <button onClick={() => navigate(`/update/${student._id}`)}>Szerkesztés</button>
        <button onClick={() => {setIsDeleting(true)}}>Törlés</button>
      <h3 onClick={() => {setIsPaying(true)}}>{student.name}</h3>
      <h4>Egyenleg:  {balance}Ft</h4>
      <h3 onClick={() => {navigate(`/payments/${student._id}`)}}>Utolsó Könyvelés:</h3>
      {payments.length? (
        <h4>{new Date(payments[payments.length - 1].date).toLocaleDateString("hu-HU")} : {payments[payments.length - 1].price}</h4>
      ):(
        <h4>Még nincs könyvelés</h4>
      )}
      <div className="days">

      <h4>Nap(ok):</h4>
      {days.map((day) => (
        <p key={day}>{day} </p>
      ))}
      </div>
        </div>)}
    </div>
  )
}

export default StudentBox;
