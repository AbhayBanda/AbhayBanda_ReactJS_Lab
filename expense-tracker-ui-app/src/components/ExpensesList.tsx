import { useEffect, useState } from "react";
import IExpense from "../model/IExpense";
import getExpenseData from "../services/ExpenseService";
import ExpensesEntryForm from "./ExpensesEntryForm";
const ExpensesList = () => {
  const [expense, setExpense] = useState<IExpense[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [sum, setSum] = useState<number>(0);
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const expenseData = await getExpenseData();
        setExpense(expenseData);
        setSum(
          expenseData.reduce(
            (result, expense) => result + Number(expense.price),
            0
          )
        );
        calculateMoneySpentByEachPayee(expenseData);
        console.log(expenseData);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchExpensesData();
  }, [showForm]);
  const calculateMoneySpentByEachPayee = (expenseList: IExpense[]) => {
    var rahulSpentMoney: number = 0;
    var rameshSpentMoney: number = 0;
    expenseList.map((expense) =>
      expense.payeeName === "Rahul"
        ? (rahulSpentMoney += expense.price)
        : (rameshSpentMoney += expense.price)
    );
    setRahulSpent(rahulSpentMoney);
    setRameshSpent(rameshSpentMoney);
  };
  const getTableHeaders = () => {
    return (
      <>
        <div className="use-inline date header-color"> Date </div>
        <div className="use-inline header-color"> Product Purchased </div>
        <div className="use-inline price header-color"> Price </div>
        <div className="use-inline header-color"> Payee </div>
      </>
    );
  };

  const renderExpensesList = (expense: IExpense) => {
    return (
      <>
        <div key={expense.id}>
          <div className="use-inline date">{expense.date}</div>
          <div className="use-inline ">{expense.productName}</div>
          <div className="use-inline price">{expense.price}</div>
          <div className={`use-inline ${expense.payeeName}`}>
            {expense.payeeName}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      {/* TODO:- Add button */}
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showForm && (
        <div className="form">
          <ExpensesEntryForm
            onTrue={() => setShowForm(false)}
            onClose={() => setShowForm(false)}
          ></ExpensesEntryForm>
        </div>
      )}
      {getTableHeaders()}
      {expense && expense.map((expense) => renderExpensesList(expense))}
      {
        <>
          <hr />
          <div className="use-inline ">Total: </div>
          <span className="use-inline total">{sum}</span> <br />
          <div className="use-inline ">Rahul paid: </div>
          <span className="use-inline total Rahul">{rahulSpent}</span> <br />
          <div className="use-inline ">Ramesh paid: </div>
          <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
          <span className="use-inline payable">
            {rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}
          </span>
          <span className="use-inline payable price">
            {" "}
            {Math.abs((rahulSpent - rameshSpent) / 2)}
          </span>
          {error && <strong>{error?.message}</strong>}
        </>
      }
    </>
  );
};

export default ExpensesList;
