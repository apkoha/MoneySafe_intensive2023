//включение строгого режима
// "use strict";

import { convertStringNumber } from "./convertStringNumber.js";
import { OverlayScrollbars } from "./overlayscrollbars.esm.min.js";
const API_URL = "https://luxuriant-honorable-alibi.glitch.me/api";

const typeOperation = {
  income: "доход",
  expenses: "расход",
};

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");
const financeReport = document.querySelector(".finance__report");
const report = document.querySelector(".report");
const reportOperationList = document.querySelector(".report__operation-list");
const reportDates = document.querySelector(".report__dates");

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

OverlayScrollbars(report, {});

const getData = async (url) => {
  try {
    const response = await fetch(`${API_URL}${url}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка получения данных", error);
    throw error;
  }
};

//закрывает отчёт по кнопке или клику вне формы.
const closeReport = ({ target }) => {
  if (
    target.closest(".report__close") ||
    (!target.closest(".report") && target !== financeReport)
  ) {
    report.classList.remove("report__open");
    document.removeEventListener("click", closeReport);
  }
};

//открывает отчёт
const openReport = () => {
  report.classList.add("report__open");
  document.addEventListener("click", closeReport);
};

//преобразование формата даты
const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

const renderReport = (data) => {
  reportOperationList.textContent = "";

  // можно использоавать деструктуризацию пишем operation - {category, amount, description, date, type} и ниже удаляем "operation."
  const reportRows = data.map((operation) => {
    const reportRow = document.createElement("tr");
    reportRow.classList.add("report--row");
    reportRow.innerHTML = `
    <td class="report__cell">${operation.category}</td>
    <td class="report__cell" style="text-align: right">${operation.amount.toLocaleString()}&nbsp;₽</td>
    <td class="report__cell">${operation.description}</td>
    <td class="report__cell">${reformatDate(operation.date)}</td>
    <td class="report__cell">${typeOperation[operation.type]}</td>
    <td class="report__action-cell">
      <button class="report__button report__button_table">&#10006;</button>
    </td>
    `;
    return reportRow;
  });

  reportOperationList.append(...reportRows);
};

financeReport.addEventListener("click", async () => {
  openReport();
  const data = await getData("/test");
  console.log("data: ", data);
  renderReport(data);
});

reportDates.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(reportDates));

  const searchParams = new URLSearchParams();

  if (formData.startDate) {
    searchParams.append("startDate", formData.startDate);
  }
  if (formData.endDate) {
    searchParams.append("endDate", formData.endDate);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/test?${queryString}` : "/test";

  const data = await getData(url);
  renderReport(data);
});
