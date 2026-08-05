/**
 * Converts a human-friendly duration like "15 minutes" or "1 hour 30 min"
 * into an ISO 8601 duration ("PT15M", "PT1H30M") for schema.org JSON-LD.
 * Returns undefined if nothing could be parsed, so callers can omit the
 * field rather than emit invalid markup.
 */
export function toISODuration(input: string): string | undefined {
  const hoursMatch = input.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)\b/i);
  const minsMatch = input.match(/(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)\b/i);
  const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
  const mins = minsMatch ? parseFloat(minsMatch[1]) : 0;

  if (!hours && !mins) return undefined;

  let iso = 'PT';
  if (hours) iso += `${hours}H`;
  if (mins) iso += `${mins}M`;
  return iso;
}
