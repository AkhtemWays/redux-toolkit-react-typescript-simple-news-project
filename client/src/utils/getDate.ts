export default function getDate(str: string) {
  return `${new Date(str).getDay()}.${new Date(str).getMonth()}.${new Date(
    str
  ).getFullYear()} 
    ${new Date(str).getHours()}:${new Date(str).getMinutes()}`;
}
