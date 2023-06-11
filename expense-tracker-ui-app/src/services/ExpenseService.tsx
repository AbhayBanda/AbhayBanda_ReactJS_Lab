import axios from "axios";
import IExpense from "../model/IExpense";

const getExpenseData = () => {
  return axios
    .get<IExpense[]>("http://localhost:3004/expenses/")
    .then((response) => response.data);
};

export const postExpenseData = (data: Omit<IExpense, "id">) => {
  return axios
    .post<IExpense>("http://localhost:3004/expenses/", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export default getExpenseData;
