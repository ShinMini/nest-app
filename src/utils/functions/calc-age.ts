/**
 * Calculate the age from the birthDate
 * @param birthDate The birthDate to calculate the age from
 * @returns The age of the person
 * @example
 * const age = calculateAge('1990-01-01');
 * console.log(age); // 31
 */
function calculateAge(birthDate?: Date) {
  if (!birthDate) return undefined; // If the birthDate is not provided, return null
  const currentYear = new Date().getFullYear(); // Get the current year
  const birthYear = birthDate.getFullYear(); // Parse the birthDate

  const currentMonth = new Date().getMonth(); // Get the current month
  const birthMonth = birthDate.getMonth(); // Parse the birthDate

  const month = currentMonth - birthMonth; // Calculate the difference in months
  const year = currentYear - birthYear; // Calculate the difference in years

  // If the difference in months is negative or 0 and the difference in years is 0, the person is less than a year old
  if (month <= 0 && year === 0) return 0;
  // If the difference in months is negative, subtract 1 from the difference in years
  if (month < 0) return year - 1;
  // Otherwise, return the difference in years
  return year;
}

export default calculateAge;
