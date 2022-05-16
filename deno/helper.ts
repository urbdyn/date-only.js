import { DateOnlyTimezone } from '../mod.ts';
import { DateOnly } from '../mod.ts';
import { assertEquals, assertThrows } from '../test_deps.ts';

export type PassingTestCase = {
  name: string;
  y: number;
  m: number;
  d: number;
  tz?: DateOnlyTimezone;
  utcStart: number;
  utcEnd: number;
};

export type PassingStringTestCase = PassingTestCase & { s: string };

export function testSuccessWithGenerator<T extends PassingTestCase>(
  t: T,
  d: DateOnly | undefined,
) {
  Deno.test({
    name: t.name,
    fn: () => {
      const o = (t.tz === 'local' || t.tz === undefined)
        ? new Array(2).fill(new Date().getTimezoneOffset() * 60 * 1000)
        : t.tz === 'min-max'
        ? [-43_200_000, 50_400_000]
        : new Array(2).fill(t.tz * 60 * 60 * 1000);
      assertEquals(d === undefined, false);
      if (d === undefined) throw Error('UNREACHABLE');
      assertEquals(d.year, t.y);
      assertEquals(d.month, t.m);
      assertEquals(d.day, t.d);
      assertEquals(d.timezoneShift, t.tz !== undefined ? t.tz : 'local');
      assertEquals(d.startEpoch - o[0], t.utcStart);
      assertEquals(d.endEpoch - o[1], t.utcEnd);
      assertEquals(
        d.endEpoch - d.startEpoch + 1,
        (t.tz !== 'min-max' ? 24 : 50) * 60 * 60 * 1000,
      );
    },
  });
}

// new Date(...)
export function testDateConstructorSuccess(t: PassingTestCase) {
  testSuccessWithGenerator(t, new DateOnly(t.y, t.m, t.d, t.tz));
}

export function testDateConstructorFailure(t: PassingTestCase) {
  Deno.test({
    name: t.name,
    fn: () => assertThrows(() => new DateOnly(t.y, t.m, t.d, t.tz)),
  });
}

// Date.newOrUndefined(...)
export function testDateNewOrUndefinedSuccess(t: PassingTestCase) {
  testSuccessWithGenerator(t, DateOnly.newOrUndefined(t.y, t.m, t.d, t.tz));
}

export function testDateNewOrUndefinedFailure(t: PassingTestCase) {
  Deno.test({
    name: t.name,
    fn: () =>
      assertEquals(DateOnly.newOrUndefined(t.y, t.m, t.d, t.tz), undefined),
  });
}

export function testDateNewOrUndefinedFailureError(t: PassingTestCase) {
  Deno.test({
    name: t.name,
    fn: () => assertThrows(() => DateOnly.newOrUndefined(t.y, t.m, t.d, t.tz)),
  });
}

// Date.fromString(...)
export function testDateFromStringSuccess(t: PassingStringTestCase) {
  testSuccessWithGenerator(t, DateOnly.fromString(t.s, t.tz));
}

export function testDateFromStringFailure(t: PassingStringTestCase) {
  Deno.test({
    name: t.name,
    fn: () => assertThrows(() => DateOnly.fromString(t.s, t.tz)),
  });
}

// Date.fromStringOrUndefined(...)
export function testDateFromStringOrUndefinedSuccess(t: PassingStringTestCase) {
  testSuccessWithGenerator(t, DateOnly.fromStringOrUndefined(t.s, t.tz));
}

export function testDateFromStringOrUndefinedFailure(t: PassingStringTestCase) {
  Deno.test({
    name: t.name,
    fn: () =>
      assertEquals(DateOnly.fromStringOrUndefined(t.s, t.tz), undefined),
  });
}
