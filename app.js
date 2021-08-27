const checkBtn = document.querySelector("#check-btn");
const dobInput = document.querySelector("#dob-input");
const output = document.querySelector("#output");

function reverseStr(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseStr(str);
}

function getDateInString(date) {
  let dateStr = { day: "", month: "", year: "" };
  let { day, month, year } = date || {};

  dateStr.day = day < 10 ? "0" + day : day?.toString();
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

  const ddmmyy = ddmmyyyy.slice(0, 5) + year.slice(-2);
  const mmddyy = mmddyyyy.slice(0, 5) + year.slice(-2);
  const yymmdd = yyyymmdd.slice(2, 8);

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkAllDateFormatsForPalindrome(date) {
  const dateArray = getAllDateFormats(date);

  return dateArray.some((date) => isPalindrome(date));
}

function isLeapYear(year) {
  // return year % 400 ?? year % 4 === 0;
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  if (day > daysInMonth[month - 1]) {
    day = 1;
    month++;
  }

  if (month > daysInMonth.length) {
    month = 1;
    year++;
  }

  return { day, month, year };
}

function getNextPalindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (true) {
    counter++;
    if (checkAllDateFormatsForPalindrome(nextDate)) break;

    nextDate = getNextDate(nextDate);
  }
  return [counter, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  if (!day) {
    day = daysInMonth[month - 2];
    month--;
  }

  if (!month) {
    month = 12;
    day = daysInMonth[month - 1];
    year--;
  }

  return { day, month, year };
}

function getPreviousPalindrome(date) {
  let counter = 0;
  let previousDate = getPreviousDate(date);

  while (true) {
    counter++;
    if (checkAllDateFormatsForPalindrome(previousDate)) break;

    previousDate = getPreviousDate(previousDate);
  }

  return [counter, previousDate];
}

function handleClick() {
  if (dobInput.value) {
    const dateOfBirth = dobInput.value.split("-");
    let [year, month, day] = dateOfBirth;

    day = Number(day);
    month = Number(month);
    year = Number(year);

    const date = { day, month, year };

    if (checkAllDateFormatsForPalindrome(date)) {
      output.innerHTML = `Yay! Your birthday is a palindrome 🚀`;
    } else {
      const [next, nextPalindrome] = getNextPalindromeDate(date);
      const [previous, previousPalindrome] = getPreviousPalindrome(date);

      const nextPalindromeDate = `${nextPalindrome.day}-${nextPalindrome.month}-${nextPalindrome.year}`;
      const previousPalindromeDate = `${previousPalindrome.day}-${previousPalindrome.month}-${previousPalindrome.year}`;

      if (next < previous) {
        output.innerHTML = `The next palindrome is on ${nextPalindromeDate} <br>
        You missed it by ${next} ${next === 1 ? "day" : "days"} 😞`;
      } else {
        output.innerHTML = `The previous palindrome was on ${previousPalindromeDate} <br> 
        You missed it by ${previous} ${previous === 1 ? "day" : "days"} 😞`;
      }
    }
  } else {
    output.innerHTML = `Please select your birthday first, yo 😐`;
  }
}

checkBtn.addEventListener("click", handleClick);
