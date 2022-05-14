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

Deno.bench('new DateOnly(2001, 2, 3, false)', () => {
  new DateOnly(2001, 2, 3, false);
});
