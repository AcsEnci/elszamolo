import React, { useEffect, useState } from 'react'

function PaymentTable({payments}) {
    const filters = ["MIND", "POZITÍV", "NEGATIV"];
    const [shownPayments, setShownPayments] = useState(payments);
    const [chosenFilter, setChosenFilter] = useState(filters[0]);

    useEffect(() => {
        if (chosenFilter === filters[0]) {
            setShownPayments(payments);
        } else if (chosenFilter === filters[1]) {
            const filteredPayments = payments.filter(payment => payment.price > 0);
            setShownPayments(filteredPayments);
        } else if (chosenFilter === filters[2]) {
            const filteredPayments = payments.filter(payment => payment.price < 0);
            setShownPayments(filteredPayments);
        }
    }, [chosenFilter, payments]);


  return (
    <div>
        <div>
        <label htmlFor="chosenFilter">Milyen könyvelés látszik:</label>
        <select
          value={chosenFilter}
          onChange={(e) => setChosenFilter(e.target.value)}
          name="chosenFilter"
          id="chosenFilter"
        >
            {filters.map((filter) => (
                <option key={filter} value={filter}>{filter}</option>
            ))}
        </select>
      </div>
        <div className="EmployeeTable">
            <table>
                <thead>
                    <tr>
                    <th>Mikor</th>
                    <th>Mennyit</th>
                    <th />
                    </tr>
                </thead>
                <tbody>
                    {shownPayments.map((payment, index) => (
                    <tr key={index}>
                        <td>{new Date(payment.date).toLocaleDateString("hu-HU")}</td>
                        <td>{payment.price}Ft</td>
                        <td>
                        
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default PaymentTable;
