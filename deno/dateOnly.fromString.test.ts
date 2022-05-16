import {
  testDateFromStringFailure,
  testDateFromStringOrUndefinedFailure,
  testDateFromStringOrUndefinedSuccess,
  testDateFromStringSuccess,
} from './helper.ts';

const dateTest20010203 = {
  y: 2001,
  m: 2,
  d: 3,
  utcStart: 981158400000,
  utcEnd: 981244799999,
};

const constructorTests = [
  { ...dateTest20010203, tz: undefined },
  { ...dateTest20010203, tz: 'local' },
  { ...dateTest20010203, tz: 'min-max' },
  { ...dateTest20010203, tz: 0 },
  { ...dateTest20010203, tz: 3.5 },
  { ...dateTest20010203, tz: +14 },
  { ...dateTest20010203, tz: -12 },
] as const;

constructorTests.forEach((t) => {
  const name =
    `DateOnly.fromString(${t.y}-${t.m}-${t.d}) initializes correctly`;
  const s = `${t.y}-${t.m}-${t.d}`;
  testDateFromStringSuccess({ name, ...t, s });
});
constructorTests.forEach((t) => {
  const name =
    `DateOnly.fromStringOrUndefined(${t.y}-${t.m}-${t.d}) initializes correctly`;
  const s = `${t.y}-${t.m}-${t.d}`;
  testDateFromStringOrUndefinedSuccess({ name, ...t, s });
});

// Invalid year
const invalidYears = [0, 'a', undefined, null] as const;
invalidYears.forEach((invalidYear) => {
  const t = { ...dateTest20010203, y: invalidYear as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name = `DateOnly.fromString(${s}) [invalid year] throws error`;
  testDateFromStringFailure({ name, ...t, s });
});
invalidYears.forEach((invalidYear) => {
  const t = { ...dateTest20010203, y: invalidYear as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name =
    `DateOnly.fromStringOrUndefined(${s}) [invalid year] returns undefined`;
  testDateFromStringOrUndefinedFailure({ name, ...t, s });
});

// Invalid month
const invalidMonths = [0, 13, 4.5, 'a', -4, undefined, null] as const;
invalidMonths.forEach((invalidMonth) => {
  const t = { ...dateTest20010203, m: invalidMonth as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name = `DateOnly.fromString(${s}) [invalid month] throws error`;
  testDateFromStringFailure({ name, ...t, s });
});
invalidMonths.forEach((invalidMonth) => {
  const t = { ...dateTest20010203, m: invalidMonth as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name =
    `DateOnly.fromStringOrUndefined(${s}) [invalid month] returns undefined`;
  testDateFromStringOrUndefinedFailure({ name, ...t, s });
});

// Invalid days
const invalidDays = [0, 32, 4.5, 'a', -4, undefined, null] as const;
invalidDays.forEach((invalidDay) => {
  const t = { ...dateTest20010203, d: invalidDay as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name = `DateOnly.fromString(${s}) [invalid day] throws error`;
  testDateFromStringFailure({ name, ...t, s });
});
invalidDays.forEach((invalidDay) => {
  const t = { ...dateTest20010203, d: invalidDay as unknown as number };
  const s = `${t.y}-${t.m}-${t.d}`;
  const name =
    `DateOnly.fromStringOrUndefined(${s}) [invalid day] returns undefined`;
  testDateFromStringOrUndefinedFailure({ name, ...t, s });
});
