/**
 * Formats a date to "MONTH DAY, YEAR" (e.g., "MAY 29, 2025")
 * @param {string | Date} inputDate
 * @returns {string}
 */
export const formatReadableDate = (inputDate) => {
  if (!inputDate) return "";

  const date = new Date(inputDate);
  if (isNaN(date)) return "";

  return date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(
      /^(\w+)\s(\d+),\s(\d+)$/,
      (_, month, day, year) => `${month.toUpperCase()} ${day}, ${year}`
    );
};
export function formatToShortDate(isoDateStr) {
  const date = new Date(isoDateStr);

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits

  return `${month}/${day}/${year}`;
}
