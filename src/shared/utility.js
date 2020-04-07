export const dateToStr = (date) => {
  let year = date.getFullYear().toString();

  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? '0' + month : month;

  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day;

  const fullDate = [year, month, day];
  
  return fullDate.join("-");
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  }
};