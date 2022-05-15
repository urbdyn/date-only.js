import { assertEquals, assertThrows } from '../test_deps.ts';
import { DateOnly } from '../mod.ts';

const dateTest20010203 = {
  y: 2001,
  m: 2,
  d: 3,
  utcStart: 981158400000,
  utcEnd: 981244800000,
};
const date20010203UtcStart = 981158400000;
const date20010203UtcEnd = 981244800000;

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
  Deno.test({
    name:
      `new DateOnly(${t.y},${t.m},${t.d},${t.tz}) initializes all properties properly`,
    fn: () => {
      const d = new DateOnly(t.y, t.m, t.d, t.tz);
      const o = (t.tz === 'local' || t.tz === undefined)
        ? new Array(2).fill(new Date().getTimezoneOffset() * 60 * 1000)
        : t.tz === 'min-max'
        ? [-43_200_000, 50_400_000]
        : new Array(2).fill(t.tz * 60 * 60 * 1000);
      assertEquals(d.year, t.y);
      assertEquals(d.month, t.m);
      assertEquals(d.day, t.d);
      assertEquals(d.timezoneShift, t.tz !== undefined ? t.tz : 'local');
      assertEquals(d.startEpoch - o[0], t.utcStart);
      assertEquals(d.endEpoch - o[1], t.utcEnd);
      assertEquals(
        d.endEpoch - d.startEpoch,
        (t.tz !== 'min-max' ? 24 : 50) * 60 * 60 * 1000,
      );
    },
  });
});

/**
Deno.test({
  name:
    'DateOnly.newOrUndefined(2001,02,03) initializes year, month, and day properties',
  fn: () => {
    const d = new DateOnly(2001, 2, 3);
    assertEquals(d.year, 2001);
    assertEquals(d.month, 2);
    assertEquals(d.day, 3);
  },
});

// Invalid year
const invalidYears = [0, 'a', -4, undefined, null] as const;
invalidYears.forEach((invalidYear) => {
  Deno.test({
    name: `new DateOnly(${invalidYear}, _, _) [invalid year] throws error`,
    fn: () =>
      assertThrows(() => new DateOnly(invalidYear as unknown as number, 1, 1)),
  });

  Deno.test({
    name:
      `new DateOnly(${invalidYear}, _, _) [invalid year] throws error (loose validation)`,
    fn: () =>
      assertThrows(() =>
        new DateOnly(invalidYear as unknown as number, 1, 1, false)
      ),
  });

  Deno.test({
    name:
      `DateOnly.newOrUndefined(${invalidYear}, _, _) [invalid year] throws error`,
    fn: () =>
      assertEquals(
        DateOnly.newOrUndefined(invalidYear as unknown as number, 1, 1),
        undefined,
      ),
  });

  Deno.test({
    name:
      `DateOnly.isValidDate(${invalidYear}, _, _) [invalid year] returns false`,
    fn: () =>
      assertEquals(
        DateOnly.isValidDate(invalidYear as unknown as number, 1, 1),
        false,
      ),
  });
});

// Invalid month
const invalidMonths = [0, 13, 4.5, 'a', -4, undefined, null] as const;
invalidMonths.forEach((invalidMonth) => {
  Deno.test({
    name: `new DateOnly(_, ${invalidMonth}, _) [invalid month] throws error`,
    fn: () =>
      assertThrows(() =>
        new DateOnly(2001, invalidMonth as unknown as number, 1)
      ),
  });

  Deno.test({
    name:
      `new DateOnly(_, ${invalidMonth}, _) [invalid month] throws error (loose validation)`,
    fn: () =>
      assertThrows(() =>
        new DateOnly(2001, invalidMonth as unknown as number, 1, false)
      ),
  });

  Deno.test({
    name:
      `DateOnly.newOrUndefined(_, ${invalidMonth}, _) [invalid month] throws error`,
    fn: () =>
      assertEquals(
        DateOnly.newOrUndefined(2001, invalidMonth as unknown as number, 1),
        undefined,
      ),
  });

  Deno.test({
    name:
      `DateOnly.isValidDate(_, ${invalidMonth}, _) [invalid month] returns false`,
    fn: () =>
      assertEquals(
        DateOnly.isValidDate(2001, invalidMonth as unknown as number, 1),
        false,
      ),
  });
});

// Invalid day
const invalidDays = [0, 32, 4.5, 'a', -4, undefined, null] as const;
invalidDays.forEach((invalidDay) => {
  Deno.test({
    name: `new DateOnly(_, _, ${invalidDay}) [invalid day] throws error`,
    fn: () =>
      assertThrows(() =>
        new DateOnly(2001, 1, invalidDay as unknown as number)
      ),
  });

  Deno.test({
    name:
      `new DateOnly(_, _, ${invalidDay}) [invalid day] throws error (loose validation)`,
    fn: () =>
      assertThrows(() =>
        new DateOnly(2001, 1, invalidDay as unknown as number, false)
      ),
  });

  Deno.test({
    name:
      `DateOnly.newOrUndefined(_, _, ${invalidDay}) [invalid day] returns undefined`,
    fn: () =>
      assertEquals(
        DateOnly.newOrUndefined(2001, 1, invalidDay as unknown as number),
        undefined,
      ),
  });

  Deno.test({
    name:
      `DateOnly.isValidDate(_, _, ${invalidDay}) [invalid day] returns false`,
    fn: () =>
      assertEquals(
        DateOnly.isValidDate(2001, 1, invalidDay as unknown as number),
        false,
      ),
  });
});
*/
