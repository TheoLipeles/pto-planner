import { Card, CardProps, Grid, Stack } from "@mui/material";
import { chunk } from "lodash";
import { type MonthIndex } from "@/lib/date";

function getNumDaysInMonth(year: number, month: number) {
  const lastDay = [31, 30, 29, 28].find(
    (day) => new Date(year, month, day).getMonth() === month
  );
  console.log(lastDay);
  if (lastDay === undefined) {
    throw new Error(`could not find last date for year:${year} month:${month}`);
  }
  return lastDay;
}

interface CalendarProps {
  month: MonthIndex;
  year: number;
}

export default function Calendar(props: CalendarProps) {
  const { month, year } = props;
  const startDate = new Date(year, month, 1);
  const startIndex = startDate.getDay();
  const numDaysInMonth = getNumDaysInMonth(year, month);
  const endIndex = numDaysInMonth + startIndex - 1;

  const numRows = Math.ceil((endIndex + 1) / 7);
  console.log({ numRows, startIndex, endIndex });
  const slots = [...Array(7 * numRows)].map((_, idx) => idx);
  const weeks = chunk(slots, 7);
  const dayOfWeek = (slotIdx: number) => slotIdx % 7;
  const isWeekend = (slotIdx: number) =>
    dayOfWeek(slotIdx) == 0 || dayOfWeek(slotIdx) == 6;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getSlotDayNumber = (slotIdx: number) => {
    if (slotIdx < startIndex || slotIdx > endIndex) {
      return -1;
    }
    return slotIdx - startIndex + 1;
  };

  const getSlotColor = (slotIdx: number) => {
    if (getSlotDayNumber(slotIdx) === -1) {
      return "#fff2";
    }
    if (isWeekend(slotIdx)) {
      return "#fff9";
    }
    return "#fff";
  };

  const getDisplaySlotDayNumber = (slotIdx: number) => {
    const slotDayNumber = getSlotDayNumber(slotIdx);
    if (slotDayNumber != -1) return slotDayNumber;
    if (slotIdx > endIndex) return slotIdx - endIndex;
    const lastMonthIdx = (month + 12 - 1) % 12;
    const lastMonthIsLastYear = month == 11;
    const lastMonthYearIdx = year - Number(lastMonthIsLastYear);
    const daysInLastMonth = getNumDaysInMonth(lastMonthYearIdx, lastMonthIdx);
    return daysInLastMonth - (startIndex - slotIdx) + 1;
  };

  const columnSpacing = 1;
  const columnWidth = "5rem";

  const showSlotIndex = false;
  return (
    <>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} spacing={columnSpacing}>
          {daysOfWeek.map((dayName) => (
            <Card key={dayName} sx={{ width: columnWidth }}>
              {dayName}
            </Card>
          ))}
        </Stack>
        {weeks.map((week, weekIdx) => (
          <Stack key={weekIdx} direction={"row"} spacing={columnSpacing}>
            {week.map((day) => (
              <Card
                key={day}
                sx={{
                  width: columnWidth,
                  height: columnWidth,
                  alignContent: "center",
                }}
                style={{
                  backgroundColor: getSlotColor(day),
                }}
              >
                {showSlotIndex && `${day} | `} {getDisplaySlotDayNumber(day)}
              </Card>
            ))}
          </Stack>
        ))}
      </Stack>
    </>
  );
}
