// преобразует строку в число
// /\s+/ убирает первый пробел
// /\s+/g убирает все пробелы
export const convertStringNumber = (str) => {
  const noSpaceStr = str.replace(/\s+/g, "");
  const num = parseFloat(noSpaceStr);

  //проверка на число и бескоечность
  if (!isNaN(num) && isFinite(num)) {
    return num;
  } else {
    return false;
  }
};

//преобразование формата даты
export const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};
