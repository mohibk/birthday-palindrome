const checkBtn = document.querySelector("#check-btn");
const dobInput = document.querySelector("#dob-input");
const output = document.querySelector("#output");

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPallindrome(str) {
  return str === reverseStr(str);
}

function getDateInString(date) {
  let dateStr = { day: "", month: "", year: "" };
  let { day, month, year } = date || {};

  dateStr.day = day < 10 ? "0" + day : day.toString();
  dateStr.month = month < 10 ? "0" + month : month.toString();
  dateStr.year = year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  const dateStr = getDateInString(date);
  const { day, month, year } = dateStr;

  const ddmmyyyy = day + month + year;
  const mmddyyyy = month + day + year;
  const yyyymmdd = year + month + day;

  const ddmmyy = ddmmyyyy.slice(0, 6);
  const mmddyy = mmddyyyy.slice(0, 6);
  const yymmdd = yyyymmdd.slice(2);

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkAllDateFormatsForPallindrome(date) {
  const dateArray = getAllDateFormats(date);

  return dateArray.map((date) => isPallindrome(date));
}

function checkForLeapYear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day > daysInMonth[month - 1]) {
    day = 1;
    month++;
  }

  return { day, month, year };
}

const test = {
  day: 2,
  month: 2,
  year: 2020,
};
console.log(checkAllDateFormatsForPallindrome(test));
