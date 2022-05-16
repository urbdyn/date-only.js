/**
 * The hours to offset the `DateOnly` from UTC time. Other valid options are
 * `'local'` and `'min-max'`.
 *
 * `'local'` => Uses the local timezone as determined via using `new Date().getTimezoneOffset()`
 *
 * `'min-max'` => Creates creates a 50 hour window instead of a 24 hours one to represent the
 * range that the date would have occurred for at least one timezone in the world. This comes
 * from the fact that all timezones in the world have a range of 30 hours from UTC -12 to
 * UTC + 14. This is useful for when you're unsure of the viewers timezone, such as filtering
 * server side for a query, and want to return all items which could possibly match depending
 * on their location.
 */
export type DateOnlyTimezone = 'local' | 'min-max' | number;

/**
 * A class to represent Dates and the interval of time they represent.
 *
 * This allows easy and fast creation of an  which has the properties
 * `.startEpoch` and `.endEpoch` which allow you to check if a given
 * epoch moment is within that date, before it, after it, etc.
 *
 * New class instances can be created via `new DateOnly(...)`,
 * `DateOnly.newOrUndefined(...)`, `DateOnly.fromString(...)`, and
 * `DateOnly.fromStringOrUndefined(...)`.
 *
 * @throws `DateOnlyError` on failure
 *
 * See documentation on type `DateOnlyTimezone` for details about
 * argument `timezoneShift`.
 *
 * Example:
 * ```typescript
 * const myDateOnly = new DateOnly(2021, 03, 14)
 * const nowEpoch = Date.now()
 *
 * // Check if a moment in time is during a date
 * if (nowEpoch >= myDateOnly.startEpoch && nowEpoch <= myDateOnly.endEpoch) { ... }
 *
 * // Check if a moment in time was before a date (exclusive of day)
 * if (nowEpoch < myDateOnly.startEpoch) { ... }
 *
 * // Check if a moment in time was before a date (inclusive of day)
 * if (nowEpoch <= myDateOnly.endEpoch) { ... }
 * ```
 */
export class DateOnly {
  year: number;
  month: number;
  day: number;
  /** See docs on `DateOnlyTimezone` for details */
  timezoneShift: DateOnlyTimezone;
  /** The inclusive epoch timestamp for when the day started (i.e. first millisecond of the day) */
  startEpoch: number;
  /** The inclusive epoch timestamp for when the day ended (i.e. last millisecond of the day) */
  endEpoch: number;

  constructor(y: number, m: number, d: number, tz: DateOnlyTimezone = 'local') {
    const dateStart = isValidDate(y, m, d);
    if (dateStart === false) {
      throw new DateOnlyError(
        'Attempted to initialized DateOnly with an invalid date',
      );
    }
    const offset = getTimezoneOffset(tz);
    this.year = y;
    this.month = m;
    this.day = d;
    this.timezoneShift = tz;
    this.startEpoch = dateStart.valueOf() + offset[0];
    this.endEpoch = dateStart.valueOf() + 86_399_999 + offset[1];
  }

  /** Returns `'YYYY-MM-DD'` */
  public toString() {
    return `${String(this.year).padStart(4, '0')}-${
      String(this.month).padStart(2, '0')
    }-${String(this.day).padStart(2, '0')}`;
  }

  /** Returns `'YYYY-MM-DD'` */
  public valueOf() {
    return this.toString();
  }

  /** Returns `'YYYY-MM-DD'` */
  public toJSON() {
    return this.toString();
  }

  /** Same as constructor, but returns `undefined` on failure instead of throwing `DateOnlyError` */
  static newOrUndefined(
    y: number,
    m: number,
    d: number,
    tz: DateOnlyTimezone = 'local',
  ): DateOnly | undefined {
    if (!isValidDate(y, m, d)) return;
    return new DateOnly(y, m, d, tz);
  }

  /**
   * Parse string via `parseStringToDateComponents` and then create new `DateOnly`
   *
   * @throws `DateOnlyError` on failure
   */
  static fromString(s: string, tz: DateOnlyTimezone = 'local'): DateOnly {
    const x = parseStringToDateComponents(s);
    if (x === undefined) {
      throw new DateOnlyError('DateOnly.fromString given invalid date');
    }
    return new DateOnly(...x, tz);
  }

  /** Same as `.fromString`, but returns `undefined` on failure instead of throwing `DateOnlyError` */
  static fromStringOrUndefined(
    s: string,
    tz: DateOnlyTimezone = 'local',
  ): DateOnly | undefined {
    const x = parseStringToDateComponents(s);
    if (x === undefined) return;
    if (!isValidDate(...x)) return;
    return new DateOnly(...x, tz);
  }
}

/** Checks if given date is valid as tested by builtin `Date` logic */
export function isValidDate(y: number, m: number, d: number): Date | false {
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (
    isNaN(dt.valueOf()) || dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d
  ) {
    return false;
  }
  return dt;
}

const dateStringRegex = new RegExp('^(-?\\d{1,4})-(\\d{1,2})-(\\d{1,2})$');

/**
 * Parses string and returns their date components using regex:
 *
 * `^(-?\d{1,4})-(\d{1,2})-(\d{1,2})$`
 */
export function parseStringToDateComponents(
  s: string,
): [number, number, number] | undefined {
  if (typeof s !== 'string') return;
  const match = s.match(dateStringRegex);
  if (!match) return;
  const y = parseInt(match[1]);
  const m = parseInt(match[2]);
  const d = parseInt(match[3]);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return;
  return [y, m, d];
}

/**
 * Get timezone offset in milliseconds from UTC for start and end epoch.
 *
 * @throws `DateOnlyError` if invalid input given
 */
export function getTimezoneOffset(tz: DateOnlyTimezone): [number, number] {
  if (tz === 'local') {
    const o = new Date().getTimezoneOffset() * 60_000;
    return [o, o];
  }
  if (tz === 'min-max') return [-43_200_000, 50_400_000];
  if (!isNaN(tz) && tz <= 14 && tz >= -12) {
    return [tz * 3_600_000, tz * 3_600_000];
  }
  throw new DateOnlyError(
    'Timezone must be "local", "min-max", or a number between -12 and 14',
  );
}

/** Error for when DateOnly class or helper functions attempts to do an action and fails */
export class DateOnlyError extends Error {}
