import { assertEquals, assertThrows } from '../test_deps.ts';
import { DateOnly } from '../mod.ts';

Deno.test({
  name: 'new DateOnly(2001,2,3).valueOf() equals "2001-02-03"',
  fn: () => assertEquals(new DateOnly(2001, 2, 3).valueOf(), '2001-02-03'),
});

Deno.test({
  name: 'new DateOnly(2001,2,3).toString() equals "2001-02-03"',
  fn: () => assertEquals(new DateOnly(2001, 2, 3).toString(), '2001-02-03'),
});

Deno.test({
  name: 'new DateOnly(2001,2,3).toJSON() equals "2001-02-03"',
  fn: () => assertEquals(new DateOnly(2001, 2, 3).toJSON(), '2001-02-03'),
});
