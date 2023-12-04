import dayjs from "dayjs";

export const YearData = [
  {
    value: dayjs().year() - 1,
    label: `Năm ${dayjs().year() - 1}`,
  },
  {
    value: dayjs().year(),
    label: `Năm ${dayjs().year()}`,
  },
  {
    value: dayjs().year() + 1,
    label: `Năm ${dayjs().year() + 1}`,
  },
];

export const MonthData = [
  {
    value: 1,
    label: "Tháng 1",
  },
  {
    value: 2,
    label: "Tháng 2",
  },
  {
    value: 3,
    label: "Tháng 3",
  },
  {
    value: 4,
    label: "Tháng 4",
  },
  {
    value: 5,
    label: "Tháng 5",
  },
  {
    value: 6,
    label: "Tháng 6",
  },
  {
    value: 7,
    label: "Tháng 7",
  },
  {
    value: 8,
    label: "Tháng 8",
  },
  {
    value: 9,
    label: "Tháng 9",
  },
  {
    value: 10,
    label: "Tháng 10",
  },
  {
    value: 11,
    label: "Tháng 11",
  },
  {
    value: 12,
    label: "Tháng 12",
  },
];
