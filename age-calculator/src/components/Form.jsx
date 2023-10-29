import { Input } from "./Input";
import { useState } from "react";
import { MAX_DAY_IN_MONTH } from "../utils/constant";
import { currDay, currMonth, currYear } from "../utils/todayDates";

export default function Form() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [answer, setAnswer] = useState(-1);
  const [err, setErr] = useState("");
  const [unit, setUnit] = useState("years");
  const [isBirthday, setIsBirthday] = useState(false);

  const handleSubmit = () => {
    setDatesInNumber(day, month, year);

    checkIfBirthday(currMonth, currDay)
      ? setIsBirthday(true)
      : setIsBirthday(false);

    const validationMessage = validateForm(currYear, currMonth, currDay);

    const [err, answer] = generateResponse(
      validationMessage,
      currYear,
      currMonth,
      currDay
    );

    setErr(err);
    setAnswer(answer);
  };

  const validateForm = (currYear, currMonth, currDay) => {
    const messages = [
      day === 0 || month === 0 || year === 0
        ? "Please fill in all fields"
        : null,
      day < 1 || day > MAX_DAY_IN_MONTH[month]
        ? "Please enter a valid day"
        : null,
      month < 1 || month > 12 ? "Please enter a valid month" : null,
      year > currYear ? "Please enter a valid year" : null,
      year === currYear && month > currMonth
        ? "Please enter a valid month"
        : null,
      year === currYear && month === currMonth && day > currDay
        ? "Please enter a valid day"
        : null,
    ];

    return messages.filter((message) => message !== null);
  };

  const checkIfBirthday = (currMonth, currDay) =>
    currMonth === month && currDay === day;

  const setDatesInNumber = (day, month, year) => {
    setDay(Number(day));
    setMonth(Number(month));
    setYear(Number(year));
  };

  const generateResponse = (
    validationMessage,
    currYear,
    currMonth,
    currDay
  ) => {
    return validationMessage.length === 0
      ? ["", calculateAge(currYear, currMonth, currDay)]
      : [validationMessage.join(", "), -1];
  };

  const calculateAge = (currYear, currMonth, currDay) => {
    const age = currYear - year;

    if (age === 0) {
      if (currMonth === month) {
        if (currDay === day) {
          return 0;
        } else if (currDay > day) {
          setUnit("days");
          return currDay - day;
        }
      }
      if (currMonth > month) {
        setUnit("months");
        return currMonth - month;
      }
      return 0;
    }
    setUnit("years");
    return currMonth < month || (currMonth === month && currDay < day)
      ? age - 1
      : age;
  };

  return (
    <div>
      <h2>Enter your date of birth</h2>
      <div>
        <Input
          label="Day of Birth"
          type="number"
          id="day"
          placeholder="Day"
          onChangeFn={setDay}
        />
        <Input
          label="Month of Birth"
          type="number"
          id="month"
          placeholder="Month"
          onChangeFn={setMonth}
        />
        <Input
          label="Year of Birth"
          type="number"
          id="year"
          placeholder="Year"
          onChangeFn={setYear}
        />
        <button onClick={handleSubmit}>Calculate</button>
      </div>
      <div>
        {err && <p>{err}</p>}
        {answer > -1 && (
          <p>
            You are {answer} {unit} old
          </p>
        )}
        {isBirthday && <p>Happy Birthday!</p>}
      </div>
    </div>
  );
}
