//включение строгого режима
"use strict";

import { convertStringNumber } from "./convertStringNumber.js";

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");
const financeReport = document.querySelector(".finance__report");
const report = document.querySelector(".report");
const reportCloseBtn = document.querySelector(".report__close");

let amount = 0;

financeAmount.textContent = amount;

financeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //определяем нажат "-" или "+"
  const typeOperation = event.submitter.dataset.typeOperation;
  //преобразуем введённое значение в число. Math.abs() приводит число к натуральному
  const changeAmount = Math.abs(convertStringNumber(financeForm.amount.value));

  if (typeOperation === "income") {
    amount += changeAmount; // или amount = amount + changeAmount
  }

  if (typeOperation === "expenses") {
    amount -= changeAmount; // или amount = amount - changeAmount
  }

  // `` - шаблонная строка // меняем отображение суммы и добавляем значок валюты
  financeAmount.textContent = `${amount.toLocaleString()} ₽`;
});

financeReport.addEventListener("click", (event) => {
  report.classList.add("report__open");
});

reportCloseBtn.addEventListener("click", (event) => {
  report.classList.remove("report__open");
});
