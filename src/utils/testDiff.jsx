export const testTimeDiff = (time) => {
  let diff = new Date().getTime() - new Date(time).getTime();

  let diffInS = diff / 1000;

  let yearInSec = 60 * 60 * 24 * 30 * 12;
  let monthInSec = 60 * 60 * 24 * 30;
  let dayInSec = 3600 * 24;
  let hourInSec = 3600;
  let minInSec = 60;

  const year = Math.floor(diffInS / yearInSec);
  const month = Math.floor((diffInS % yearInSec) / monthInSec);

  const day = Math.floor((diffInS % monthInSec) / dayInSec);
  const hour = Math.floor((diffInS % dayInSec) / hourInSec);
  const min = Math.floor((diffInS % hourInSec) / minInSec);

  let message = "";

  if (year > 0) {
    message = `${year} years`;
  }

  if (year <= 0 && month > 0) {
    message = `${message} ${month} month`;
  }

  if (month <= 0 && day > 0) {
    message = `${message} ${day} day`;
  }

  if (day <= 0 && hour > 0) {
    message = `${message} ${hour} hour`;
  }

  if (hour <= 0 && min > 0) {
    message = `${message} ${min} min`;
  }

  return `${message} ago`;
};
