import { Button, ButtonGroup, Stack } from "@mui/material";
import { Months, type MonthIndex } from "@/lib/date";
type MonthSelectorProps = {
  monthState: [number, (val: MonthIndex) => any];
  yearState: [number, (val: number) => any];
};
export default function MonthSelector(props: MonthSelectorProps) {
  const [month, setMonth] = props.monthState;
  const [year, setYear] = props.yearState;
  const updateMonth = (dir: 1 | -1) => {
    let newMonth = month + dir;
    if (newMonth == 12) {
      newMonth = 1;
      updateYear(1);
    }
    if (newMonth == -1) {
      newMonth = 11;
      updateYear(-1);
    }
    setMonth(newMonth);
  };

  const updateYear = (dir: 1 | -1) => {
    setYear(year + dir);
  };

  return (
    <>
      <Stack direction={"row"} spacing={2} margin={2}>
        <ButtonGroup>
          <Button onClick={() => updateMonth(-1)}>{"<"}</Button>
          <Button>{Months[month]}</Button>
          <Button onClick={() => updateMonth(1)}>{">"}</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={() => updateYear(-1)}>{"<"}</Button>
          <Button>{year}</Button>
          <Button onClick={() => updateYear(1)}>{">"}</Button>
        </ButtonGroup>
      </Stack>
    </>
  );
}
