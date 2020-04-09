const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const dateToStr = (date) => {
  let year = date.getFullYear().toString();

  let month = monthNames[date.getMonth()];
  
  let day = date.getDate().toString();
  day = day.length === 1 ? '0' + day : day;

  let hour = date.getHours();
  let min = date.getMinutes();

  const fullDate = [day, month, year];
  
  return `${fullDate.join(" ")} ${hour}:${min}`;
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  }
};