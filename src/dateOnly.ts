/**
 * TODO
 */
export class DateOnly {
  year: number;
  month: number;
  day: number;

  constructor(y: number, m: number, d: number, fullValidation = true) {
    if (fullValidation && !DateOnly.isValidDate(y, m, d)) {
      throw new Error('Attempted to initialized DateOnly with an invalid date');
    } else if (!DateOnly.isValidDateLoose(y, m, d)) {
      throw new Error(
        'Attempted to initialized DateOnly with an invalid date (loose validation)',
      );
    }
    this.year = y;
    this.month = m;
    this.day = d;
  }

  static newOrUndefined(y: number, m: number, d: number): DateOnly | undefined {
    if (!DateOnly.isValidDate(y, m, d)) return;
    return new DateOnly(y, m, d, false);
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
    return new DateOnly(...x, false);
  }

  static isValidDate(y: number, m: number, d: number): boolean {
    if (!DateOnly.isValidDateLoose(y, m, d)) return false;
    return !isNaN(
      new Date(
        `${String(y).padStart(4, '0')}-${String(m).padStart(2, '0')}-${
          String(d).padStart(2, '0')
        }`,
      ).valueOf(),
    );
  }

  static isValidDateLoose(y: number, m: number, d: number): boolean {
    return (Number.isInteger(y) && y > 0) &&
      (Number.isInteger(m) && m > 0 && m < 13) &&
      (Number.isInteger(d) && d > 0 && d < 32);
  }
}

const dateStringRegex = new RegExp('^(\\d{1,4})-(\\d\\d?)-(\\d\\d?)');

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

/** Error for when Result attempts to do action and fails */
export class ResultError extends Error {}
