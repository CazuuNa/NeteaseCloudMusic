import dayjs from "dayjs"

export function dateToISO(dataTime:number,format:string) {
  format = format || "YYYY.MM.DD HH:mm";
  return dayjs(dataTime).format(format);
}