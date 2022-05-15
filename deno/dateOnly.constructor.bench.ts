import { DateOnly } from '../mod.ts';

Deno.bench('new Date(2001, 2, 3)', () => {
  new Date(2001, 2, 3);
});

Deno.bench('new Date("2001-02-03")', () => {
  new Date('2001-02-03');
});

Deno.bench('new Date("2001-2-3")', () => {
  new Date('2001-2-3');
});

Deno.bench('new DateOnly(2001, 2, 3)', () => {
  new DateOnly(2001, 2, 3);
});

Deno.bench('new DateOnly(2001, 2, 3, +4)', () => {
  new DateOnly(2001, 2, 3, +4);
});

Deno.bench('new DateOnly(2001, 2, 3, "min-max")', () => {
  new DateOnly(2001, 2, 3, 'min-max');
});
