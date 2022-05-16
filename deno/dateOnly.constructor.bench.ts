import { DateOnly, parseStringToDateComponents } from '../mod.ts';

// from_string
const benchConfigString = { group: 'from_string' };

Deno.bench('from_string, new Date("2001-02-03")', benchConfigString, () => {
  new Date('2001-02-03');
});

Deno.bench('from_string, new Date("2001-2-3")', benchConfigString, () => {
  new Date('2001-2-3');
});

Deno.bench(
  'from_string, DateOnly.fromString("2001-02-03")',
  benchConfigString,
  () => {
    DateOnly.fromString('2001-02-03');
  },
);

Deno.bench(
  'from_string, DateOnly.fromString("2001-2-3")',
  benchConfigString,
  () => {
    DateOnly.fromString('2001-2-3');
  },
);

// from_numbers
const benchConfigNumbers = { group: 'from_numbers' };

Deno.bench('from_numbers, new Date(2001, 2, 3)', benchConfigNumbers, () => {
  new Date(2001, 2, 3);
});

Deno.bench(
  'from_numbers, new DateOnly(2001, 2, 3, +4)',
  benchConfigNumbers,
  () => {
    new DateOnly(2001, 2, 3, +4);
  },
);

Deno.bench(
  'from_numbers, new DateOnly(2001, 2, 3, "local")',
  benchConfigNumbers,
  () => {
    new DateOnly(2001, 2, 3, 'local');
  },
);

Deno.bench(
  'from_numbers, new DateOnly(2001, 2, 3, "min-max")',
  benchConfigNumbers,
  () => {
    new DateOnly(2001, 2, 3, 'min-max');
  },
);

// from_nums_or_undefined
const benchConfigNumbersOrUndefined = { group: 'from_nums_or_undefined' };

Deno.bench(
  'from_nums_or_undefined, new DateOnly(2001, 1, 1, 0)',
  benchConfigNumbersOrUndefined,
  () => {
    new DateOnly(2001, 1, 1, 0);
  },
);

Deno.bench(
  'from_nums_or_undefined, DateOnly.newOrUndefined(2001, 1, 1, 0)',
  benchConfigNumbersOrUndefined,
  () => {
    DateOnly.newOrUndefined(2001, 1, 1, 0);
  },
);

Deno.bench(
  'from_nums_or_undefined, new DateOnly(2001, 99, 99, 0)',
  benchConfigNumbersOrUndefined,
  () => {
    try {
      new DateOnly(2001, 99, 99, 0);
    } catch {}
  },
);

Deno.bench(
  'from_nums_or_undefined, DateOnly.newOrUndefined(2001, 99, 99, 0)',
  benchConfigNumbersOrUndefined,
  () => {
    DateOnly.newOrUndefined(2001, 99, 99, 0);
  },
);

// parse_string
const benchConfigParseString = { group: 'parse_string' };

Deno.bench(
  'parse_string, new Date("2001-03-02")',
  benchConfigParseString,
  () => {
    new Date('2001-03-02');
  },
);

Deno.bench(
  'parse_string, parseStringToDateComponents("2001-03-02")',
  benchConfigParseString,
  () => {
    parseStringToDateComponents('2001-03-02');
  },
);

// parse_string2
const benchConfigParseString2 = { group: 'parse_string2' };

Deno.bench(
  'parse_string, new Date("2001-3-2")',
  benchConfigParseString2,
  () => {
    new Date('2001-3-2');
  },
);

Deno.bench(
  'parse_string, parseStringToDateComponents("2001-3-2")',
  benchConfigParseString2,
  () => {
    parseStringToDateComponents('2001-3-2');
  },
);
