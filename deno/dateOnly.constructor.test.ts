import { assertEquals, assertThrows } from '../test_deps.ts';
import { DateOnly } from '../mod.ts';

Deno.test({
  name: 'new DateOnly(2001,02,03) initializes year, month, and day properties',
  fn: () => {
    const d = new DateOnly(2001, 2, 3);
    assertEquals(d.year, 2001);
    assertEquals(d.month, 2);
    assertEquals(d.day, 3);
  },
});

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
