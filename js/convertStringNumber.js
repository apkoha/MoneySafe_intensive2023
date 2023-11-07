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
