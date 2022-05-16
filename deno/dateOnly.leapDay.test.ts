import {
  PassingTestCase,
  testDateConstructorFailure,
  testDateConstructorSuccess,
  testDateNewOrUndefinedFailure,
  testDateNewOrUndefinedSuccess,
} from './helper.ts';

/** Valid leap day */
const dateTest20200229 = {
  y: 2020,
  m: 2,
  d: 29,
  utcStart: 1582934400000,
  utcEnd: 1583020799999,
};

const constructorTests: Omit<PassingTestCase, 'name'>[] = [
  { ...dateTest20200229, tz: undefined },
  { ...dateTest20200229, tz: 'local' },
  { ...dateTest20200229, tz: 'min-max' },
  { ...dateTest20200229, tz: 0 },
  { ...dateTest20200229, tz: 3.5 },
  { ...dateTest20200229, tz: +14 },
  { ...dateTest20200229, tz: -12 },
];

constructorTests.forEach((t) => {
  const name =
    `leap day, new DateOnly(${t.y},${t.m},${t.d},${t.tz}) initializes correctly`;
  testDateConstructorSuccess({ name, ...t });
});

constructorTests.forEach((t) => {
  const name =
    `leap day, DateOnly.newOrUndefined(${t.y},${t.m},${t.d},${t.tz}) initializes correctly`;
  testDateNewOrUndefinedSuccess({ name, ...t });
});

/** Invalid "year day" */
const dateTest20190229 = {
  y: 2019,
  m: 2,
  d: 29,
  utcStart: 0,
  utcEnd: 0,
};

const constructorInvalidTests: Omit<PassingTestCase, 'name'>[] = [
  { ...dateTest20190229, tz: undefined },
  { ...dateTest20190229, tz: 'local' },
  { ...dateTest20190229, tz: 'min-max' },
  { ...dateTest20190229, tz: 0 },
  { ...dateTest20190229, tz: 3.5 },
  { ...dateTest20190229, tz: +14 },
  { ...dateTest20190229, tz: -12 },
];

constructorInvalidTests.forEach((t) => {
  const name =
    `invalid leap day, new DateOnly(${t.y},${t.m},${t.d},${t.tz}) throws error`;
  testDateConstructorFailure({ name, ...t });
});

constructorInvalidTests.forEach((t) => {
  const name =
    `invalid leap day, DateOnly.newOrUndefined(${t.y},${t.m},${t.d},${t.tz}) returns undefined`;
  testDateNewOrUndefinedFailure({ name, ...t });
});
