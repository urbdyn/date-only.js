import {
  testDateConstructorFailure,
  testDateConstructorSuccess,
  testDateNewOrUndefinedFailure,
  testDateNewOrUndefinedSuccess,
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
    `new DateOnly(${t.y},${t.m},${t.d},${t.tz}) initializes correctly`;
  testDateConstructorSuccess({ name, ...t });
});

constructorTests.forEach((t) => {
  const name =
    `DateOnly.newOrUndefined(${t.y},${t.m},${t.d},${t.tz}) initializes correctly`;
  testDateNewOrUndefinedSuccess({ name, ...t });
});

// Invalid year
const invalidYears = [0, 'a', undefined, null] as const;
invalidYears.forEach((invalidYear) => {
  const name = `new DateOnly(${invalidYear}, _, _) [invalid year] throws error`;
  testDateConstructorFailure({
    name,
    ...dateTest20010203,
    y: invalidYear as unknown as number,
  });
});
invalidYears.forEach((invalidYear) => {
  const name =
    `DateOnly.newOrUndefined(${invalidYear}, _, _) [invalid year] returns undefined`;
  testDateNewOrUndefinedFailure({
    name,
    ...dateTest20010203,
    y: invalidYear as unknown as number,
  });
});

// Invalid month
const invalidMonths = [0, 13, 4.5, 'a', -4, undefined, null] as const;
invalidMonths.forEach((invalidMonth) => {
  const name =
    `new DateOnly(_, ${invalidMonth}, _) [invalid month] throws error`;
  testDateConstructorFailure({
    name,
    ...dateTest20010203,
    m: invalidMonth as unknown as number,
  });
});
invalidMonths.forEach((invalidMonth) => {
  const name =
    `DateOnly.newOrUndefined(_, ${invalidMonth}, _) [invalid month] returns undefined`;
  testDateNewOrUndefinedFailure({
    name,
    ...dateTest20010203,
    m: invalidMonth as unknown as number,
  });
});

// Invalid day
const invalidDays = [0, 32, 4.5, 'a', -4, undefined, null] as const;
invalidDays.forEach((invalidDay) => {
  const name = `new DateOnly(_, _, ${invalidDay}) [invalid day] throws error`;
  testDateConstructorFailure({
    name,
    ...dateTest20010203,
    d: invalidDay as unknown as number,
  });
});
invalidDays.forEach((invalidDay) => {
  const name =
    `DateOnly.newOrUndefined(_, _, ${invalidDay}) [invalid day] returns undefined`;
  testDateNewOrUndefinedFailure({
    name,
    ...dateTest20010203,
    d: invalidDay as unknown as number,
  });
});
