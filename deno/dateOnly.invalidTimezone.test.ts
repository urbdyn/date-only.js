import {
  testDateConstructorFailure,
  testDateNewOrUndefinedFailureError,
} from './helper.ts';

const dateTest20010203 = {
  y: 2001,
  m: 2,
  d: 3,
  utcStart: 981158400000,
  utcEnd: 981244799999,
};

const constructorInvalidTests = [
  { ...dateTest20010203, tz: 'a' as unknown as number },
  { ...dateTest20010203, tz: +14.1 },
  { ...dateTest20010203, tz: -12.1 },
] as const;

constructorInvalidTests.forEach((t) => {
  const name =
    `new DateOnly(${t.y},${t.m},${t.d},${t.tz}) [invalid timezone] throws error`;
  testDateConstructorFailure({ name, ...t });
});

constructorInvalidTests.forEach((t) => {
  const name =
    `DateOnly.newOrUndefined(${t.y},${t.m},${t.d},${t.tz}) [invalid timezone] throws error`;
  testDateNewOrUndefinedFailureError({ name, ...t });
});
