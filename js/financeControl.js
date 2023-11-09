import { convertStringNumber } from "./helpers.js";
import { getData, postData } from "./service.js";

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");

let amount = 0;

financeAmount.textContent = amount;

const addNewOperation = async (event) => {
  event.preventDefault();

  //определяем нажат "-" или "+"
  const typeOperation = event.submitter.dataset.typeOperation;

  const financeFormDate = Object.fromEntries(new FormData(financeForm));
  financeFormDate.type = typeOperation;

  const newOperation = await postData("/finance", financeFormDate);

  //преобразуем введённое значение в число. Math.abs() приводит число к натуральному
  const changeAmount = Math.abs(convertStringNumber(newOperation.amount));

  if (typeOperation === "income") {
    amount += changeAmount; // или amount = amount + changeAmount
  }

  if (typeOperation === "expenses") {
    amount -= changeAmount; // или amount = amount - changeAmount
  }

  // `` - шаблонная строка // меняем отображение суммы и добавляем значок валюты
  financeAmount.textContent = `${amount.toLocaleString()} ₽`;
  financeForm.reset();
};

export const financeControl = async () => {
  const operations = await getData("/finance");

  amount = operations.reduce((acc, item) => {
    if (item.type === "income") {
      acc += convertStringNumber(item.amount);
    }
    if (item.type === "expenses") {
      acc -= convertStringNumber(item.amount);
    }

    return acc;
  }, 0);

  financeAmount.textContent = `${amount.toLocaleString()} ₽`;

  financeForm.addEventListener("submit", addNewOperation);
};
