import { START_DATE } from './itinerary.config';

/**
 * Calculates the date for a specific day of the itinerary
 * @param dayIndex - The day number (1-based index)
 * @returns Formatted date string for the given day
 */
export function getDateForDay(dayIndex: number): string {
  // Parse the date string and create date in UTC to avoid timezone issues
  const [year, month, day] = START_DATE.split('-').map(Number);
  const startDate = new Date(year, month - 1, day); // month is 0-indexed
  const targetDate = new Date(year, month - 1, day + (dayIndex - 1));
  
  // Format as "February 20, 2026"
  return targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Calculates the short date for a specific day of the itinerary
 * @param dayIndex - The day number (1-based index)
 * @returns Short formatted date string for the given day
 */
export function getShortDateForDay(dayIndex: number): string {
  // Parse the date string and create date to avoid timezone issues
  const [year, month, day] = START_DATE.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day + (dayIndex - 1)); // month is 0-indexed
  
  // Format as "Feb 20"
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[targetDate.getMonth()]} ${targetDate.getDate()}`;
}