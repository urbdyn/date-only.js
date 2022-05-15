export type DateOnlyTimezone = 'local' | 'min-max' | number;

/**
 * TODO
 */
export class DateOnly {
  year: number;
  month: number;
  day: number;
  timezoneShift: DateOnlyTimezone;
  startEpoch: number;
  endEpoch: number;

  constructor(y: number, m: number, d: number, tz: DateOnlyTimezone = 'local') {
    const dateStart = DateOnly.isValidDate(y, m, d);
    if (dateStart === false) {
      throw new Error('Attempted to initialized DateOnly with an invalid date');
    }
    const offset = getTimezoneOffset(tz);
    this.year = y;
    this.month = m;
    this.day = d;
    this.timezoneShift = tz;
    this.startEpoch = dateStart.valueOf() + offset[0];
    this.endEpoch = Date.UTC(y, m - 1, d + 1) + offset[1];
  }

  public toString() {
    return `${String(this.year).padStart(4, '0')}-${
      String(this.month).padStart(2, '0')
    }-${String(this.day).padStart(2, '0')}`;
  }

  public valueOf() {
    return this.toString();
  }

  public toJSON() {
    return this.toString();
  }

  static newOrUndefined(y: number, m: number, d: number): DateOnly | undefined {
    if (!DateOnly.isValidDate(y, m, d)) return;
    return new DateOnly(y, m, d);
  }

  static fromString(s: string): DateOnly {
    const x = parseStringToDateComponents(s);
    if (x === undefined) {
      throw new Error('DateOnly.fromString given invalid date');
    }
    return new DateOnly(...x);
  }

  static fromStringOrUndefined(s: string): DateOnly | undefined {
    const x = parseStringToDateComponents(s);
    if (x === undefined) return;
    if (!DateOnly.isValidDate(...x)) return;
    return new DateOnly(...x);
  }

  static isValidDate(y: number, m: number, d: number): Date | false {
    if (!DateOnly.isValidDateLoose(y, m, d)) return false;
    const date = new Date(
      `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${
        String(d).padStart(2, '0')
      }`,
    );
    if (isNaN(date.valueOf())) return false;
    return date;
  }

  static isValidDateLoose(y: number, m: number, d: number): boolean {
    return (Number.isInteger(y) && y > 0) &&
      (Number.isInteger(m) && m > 0 && m < 13) &&
      (Number.isInteger(d) && d > 0 && d < 32);
  }

  public getMinEpoch(): number {
    return 0;
  }
}

const dateStringRegex = new RegExp('^(\\d{1,4})-(\\d\\d?)-(\\d\\d?)$');

export function parseStringToDateComponents(
  s: string,
): [number, number, number] | undefined {
  if (typeof s !== 'string') return;
  const match = s.match(dateStringRegex);
  if (!match) return;
  const y = parseInt(match[0]);
  const m = parseInt(match[1]);
  const d = parseInt(match[2]);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return;
  return [y, m, d];
}

export function getTimezoneOffset(tz: DateOnlyTimezone): [number, number] {
  if (tz === 'min-max') return [-43_200_000, 50_400_000];
  if (tz === 'local') {
    const o = new Date().getTimezoneOffset() * 60_000;
    return [o, o];
  }
  if (!isNaN(tz) && tz <= 14 && tz >= -12) return [tz * 3_600_000, tz * 3_600_000];
  throw new Error(
    'Timezone must be "local", "min-max", or a number between -12 and 14',
  );
}

/** Error for when Result attempts to do action and fails */
export class ResultError extends Error {}
