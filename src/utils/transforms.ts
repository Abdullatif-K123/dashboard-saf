import i18n from "lib/i18next";
import dayjs from "dayjs";

export const enumToStringArray = (_enum: any) => {
  return Object.values(_enum) as string[];
};
export const enumToNumberArray = (_enum: any) => {
  return Object.values(_enum).filter((e) => !isNaN(e as number)) as number[];
};
const intl = new Intl.DateTimeFormat("ar", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const intlWithTime = new Intl.DateTimeFormat("ar", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const DateFormatter = (
  date: string | Date | undefined,
  { withTime = false } = {}
) =>
  (withTime ? intlWithTime : intl).format(
    new Date(Date.parse((date ?? new Date()).toString()))
  );
export function creationDateFormat(date: string) {
  return dayjs(date).format("YYYY/MM/DD");
}

export const moneyFormatter = new Intl.NumberFormat(i18n.language, {
  style: "currency",
  currency: "SYP",
});
