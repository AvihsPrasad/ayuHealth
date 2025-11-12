interface DateTimeInput {
  date: string; // e.g., "2025-11-16"
  time: string; // e.g., "09:00"
}

/**
 * Converts a date/time object into a PostgreSQL-compatible timestamp string.
 * This is crucial for safely inserting data into NeonDB (PostgreSQL).
 * @param input The object containing date and time strings.
 * @returns A string in 'YYYY-MM-DD HH:MM:SS' format.
 */
export function toPostgreSQLTimestamp(input: DateTimeInput): string {
  const { date, time } = input;
  
  // 1. Combine into a full datetime string. 
  // We use the T separator to indicate the start of the time and assume local time 
  // if not specified, which matches the common use case for 'timestamp without time zone'.
  const combinedString = `${date}T${time}:00`; 

  // 2. Create a Date object from the combined string.
  const dt = new Date(combinedString);

  if (isNaN(dt.getTime())) {
    throw new Error("Invalid date or time format provided.");
  }

  // Helper to ensure two digits (e.g., '09' instead of '9')
  const pad = (num: number) => num.toString().padStart(2, '0');

  // 3. Format into the strict PostgreSQL 'timestamp' format: YYYY-MM-DD HH:MM:SS
  const postgresTimestamp = 
    `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ` +
    `${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;

  return postgresTimestamp;
}