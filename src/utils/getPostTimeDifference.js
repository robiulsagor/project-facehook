export const getPostTimeDiff = (specificTime) => {
  // Ensure valid format for specificTime (YYYY-MM-DDTHH:mm:ss.sssZ)
  //   const specificTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{3}.\d{3}Z$/;
  //   if (!specificTimeRegex.test(specificTime)) {
  //     throw new Error(
  //       "Invalid specificTime format. Use YYYY-MM-DDTHH:mm:ss.sssZ"
  //     );
  //   }

  const now = new Date();
  const then = new Date(specificTime);
  const diffInMs = now.getTime() - then.getTime();

  // Calculate differences in years, months, days, hours, minutes, and seconds
  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const monthsInMs = daysInMs * 30; // Approximate for simplicity
  const yearsInMs = daysInMs * 365;

  const years = Math.floor(diffInMs / yearsInMs);
  const remainingMonthsMs = diffInMs % yearsInMs;
  const months = Math.floor(remainingMonthsMs / monthsInMs);
  const remainingDaysMs = remainingMonthsMs % monthsInMs;
  const days = Math.floor(remainingDaysMs / daysInMs);
  const remainingHoursMs = remainingDaysMs % daysInMs;
  const hours = Math.floor(remainingHoursMs / hoursInMs);
  const remainingMinutesMs = remainingHoursMs % hoursInMs;
  const minutes = Math.floor(remainingMinutesMs / minutesInMs);
  const seconds = Math.floor((remainingMinutesMs % minutesInMs) / secondsInMs);

  // Handle pluralization for readability
  const yearText = years > 1 ? `${years} years` : `${years} year`;
  const monthText = months > 1 ? `${months} months` : `${months} month`;
  const dayText = days > 1 ? `${days} days` : `${days} day`;
  const hourText = hours > 1 ? `${hours} hours` : `${hours} hour`;
  const minuteText = minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
  const secondText = seconds > 1 ? `${seconds} seconds` : `${seconds} second`;

  // Construct the time difference string
  let timeDiffString = "";
  if (years > 0) {
    timeDiffString += `${yearText}, `;
  }
  if (months > 0) {
    timeDiffString += `${monthText}, `;
  }
  if (days > 0) {
    timeDiffString += `${dayText}, `;
  }
  if (hours > 0) {
    timeDiffString += `${hourText}, `;
  }
  if (minutes > 0) {
    timeDiffString += `${minuteText}, `;
  }

  // Ensure at least seconds are included
  timeDiffString += `${secondText}`;

  // Remove trailing comma and space if necessary
  timeDiffString = timeDiffString.slice(0, -2);

  console.log(timeDiffString);

  return timeDiffString;
};
