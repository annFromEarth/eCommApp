export default function calcDateXYearsAgo(years: number) {
  return `${new Date(Date.now() - years * 31536000000).getFullYear()}-${(
    new Date(Date.now() - years * 31536000000).getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${new Date(Date.now() - years * 31536000000)
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}
