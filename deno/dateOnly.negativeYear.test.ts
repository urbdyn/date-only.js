import {
  testDateConstructorSuccess,
  testDateFromStringSuccess,
} from './helper.ts';

const dateTestNegativeYear = {
  y: -1001,
  m: 2,
  d: 3,
  utcStart: -93752812800000,
  utcEnd: -93752726400001,
  tz: 0,
};
const t = dateTestNegativeYear;

testDateConstructorSuccess({
  name:
    `new DateOnly(${t.y},${t.m},${t.d},${t.tz}) [negative year] initializes correctly`,
  ...t,
});

const s = `${t.y}-${t.m}-${t.d}`;
testDateFromStringSuccess({
  name:
    `DateOnly.fromString(${t.y}-${t.m}-${t.d}) [negative year] initializes correctly`,
  ...t,
  s,
});
