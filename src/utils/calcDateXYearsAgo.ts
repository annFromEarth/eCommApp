const MILLISECONDS_PER_YEAR = 31536000000;

export default function calcDateXYearsAgo(years: number) {
  return `${new Date(Date.now() - years * MILLISECONDS_PER_YEAR).getFullYear()}-${(
    new Date(Date.now() - years * MILLISECONDS_PER_YEAR).getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${new Date(Date.now() - years * MILLISECONDS_PER_YEAR)
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}
