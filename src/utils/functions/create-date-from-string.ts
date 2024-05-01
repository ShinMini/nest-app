/**
 *
 * @param dateStr The date string to create the Date from
 * @returns The created Date object
 * @example
 * const date = createDateFromString('20210101');
 * console.log(date); // 2021-01-01T00:00:00.000Z
 *
 */
function createDateFromString(dateStr?: string) {
  if (!dateStr) return undefined; // If the dateStr is not provided, return null
  if (dateStr.length !== 8) return undefined; // If the dateStr is not in 'YYYYMMDD' format, return null
  // Assuming dateStr is in 'YYYYMMDD' format
  const formattedDateStr = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6)}`;
  return new Date(formattedDateStr);
}

export default createDateFromString;
