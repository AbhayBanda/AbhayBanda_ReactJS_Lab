import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpensesEntryForm from "./components/ExpensesEntryForm";
import ExpensesList from "./components/ExpensesList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpensesList />}></Route>
        <Route
          path="add"
          element={<ExpensesEntryForm onClose={() => {}} onTrue={() => {}} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
