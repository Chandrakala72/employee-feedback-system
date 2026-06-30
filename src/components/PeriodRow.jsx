import { MONTHS } from "../global/constants";
import { selectStyle } from "../global/helper";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const years = [];
for (let y = currentYear - 2; y <= currentYear + 1; y++) years.push(y);

export const PeriodRow = ({
  monthVal,
  yearVal,
  onMonthChange,
  onYearChange,
  monthKey,
  yearKey,
  setFocusField,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: window.innerWidth < 560 ? "1fr" : "1fr 1fr",
      gap: 16,
    }}
  >
    <select
      style={selectStyle(monthKey)}
      value={monthVal}
      onChange={(e) => onMonthChange(Number(e.target.value))}
      onFocus={() => setFocusField(monthKey)}
      onBlur={() => setFocusField(null)}
    >
      {MONTHS.map((m, i) => (
        <option key={m} value={i}>
          {m}
        </option>
      ))}
    </select>
    <select
      style={selectStyle(yearKey)}
      value={yearVal}
      onChange={(e) => onYearChange(Number(e.target.value))}
      onFocus={() => setFocusField(yearKey)}
      onBlur={() => setFocusField(null)}
    >
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  </div>
);
