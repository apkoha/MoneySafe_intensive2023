// преобразует строку в число
// /\s+/ убирает первый пробел
// /\s+/g убирает все пробелы
export const convertStringNumber = (str) => {
  const noSpaceStr = String(str).replace(/\s+/g, "");
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

export const animationNumber = (element, number) => {
  const fps = 60;
  const duration = 1000;
  const frameDuration = duration / fps;
  const totalFrame = Math.round(duration / frameDuration);

  let currentFrame = 0;

  const initialNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ""));

  const increment = Math.trunc((number - initialNumber) / totalFrame);

  const animate = () => {
    currentFrame += 1;
    const newNumber = initialNumber + increment * currentFrame;
    element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;
    if (currentFrame < totalFrame) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = `${number.toLocaleString("RU-ru")} ₽`;
    }
  };

  requestAnimationFrame(animate);
};

//https://youtu.be/YmWyQDiecs4?t=5667  1:34:27
// export const animationNumber = (element, number) => {
//   const fps = 60;
//   const duration = 1000;
//   const frameDuration = duration / fps;
//   const totalFrame = Math.round(duration / frameDuration);

//   let currentFrame = 0;

//   const initialNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ""));

//   const increment = Math.trunc((number - initialNumber) / totalFrame);

//   const intervalId = setInterval(() => {
//     currentFrame += 1;
//     const newNumber = initialNumber + increment * currentFrame;

//     element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;

//     if (currentFrame === totalFrame) {
//       clearInterval(intervalId);
//       element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;
//     }
//   }, frameDuration);
// };
