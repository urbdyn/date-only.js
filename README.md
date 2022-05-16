# date-only.js

A zero-dependency micro library for actual "dates", not "date times" (the thing that `Date` is).
[View the generated docs for the library here](https://doc.deno.land/https://deno.land/x/date_only/mod.ts).

```bash
# NPM
npm install --save '@urbdyn/date-only'
# Deno
echo 'export { DateOnly } from "https://deno.land/x/date_only/mod.ts";' >> ./deps.ts
```

## Example Usage

```typescript
// Node.js
import { DateOnly } from '@urbdyn/date-only';
// Deno
import { DateOnly } from 'https://deno.land/x/date_only/mod.ts';

// Create a DateOnly for your local timezone
const myDateOnly = new DateOnly(2021, 03, 14)
const myDateOnlyFromString = DateOnly.fromString('2022-11-26')

// Create a DateOnly for timezone with offset -4 hours
const dateForUtcMinus4 = new DateOnly(2021, 03, 14, -4)

// Create a DateOnly which represents all possible timezones
const dateForAllTZ = new DateOnly(2021, 03, 14, 'min-max')

// Use the `.startEpoch` and `.endEpoch` values to easily compare a `DateOnly`
// interval to a given moment from `Date`.
const nowEpoch = Date.now()
// Check if a moment in time is during a date
if (nowEpoch >= myDateOnly.startEpoch && nowEpoch <= myDateOnly.endEpoch) { ... }
// Check if a moment in time was before a date (exclusive of day)
if (nowEpoch < myDateOnly.startEpoch) { ... }
// Check if a moment in time was before a date (inclusive of day)
if (nowEpoch <= myDateOnly.endEpoch) { ... }
// We think you've got the hang of it ...

// Check docs for all supported functions for working with DateOnly!
```

## Background

Javascript gives us `Date` but `Date` isn't actually, well, a "date".
This object actually is a "datetime" meaning it is meant to represent a specific "moment" in time which some idea of "location" for that moment in the for of a "timezone". Most of the time what we as engineers want are "datetimes". They allow us construct logic to state things like "The use clicked the button at time T1 and then later clicked the other button at time T2".

But sometimes we aren't taking about a "moment" but a "day", and "days" are tricky. This is because a "day" is an "interval" of time as opposed to a "moment". This means we should be able to ask questions like "Did this moment occur during this day?" or "Did this moment occur before this day?". The problem is that "days" are contextual to the user. The day "March 13, 2022" has a different start and end "moment" if you're in London, Los Angeles, Lagos, Lima, Lanzhou, etc.

## What Exactly is the Utility of This Library?

To allow you to easily turn March 13, 2022 into this interval this library provides the `DateOnly` class which is exactly what is says: Only a "date". As you can see from the example above, this allows for easy ways to do your usual logic of things like "Did this event occur before this date?".

You can initialize `DateOnly` with one of three timezone types:

1. **Local Timezone:** This will use the timezone that the `Date` class things the program is in. This is the default behavior if no timezone option is given.
2. **UTC Hour Offset:** You may pass in a number between `-12` and `+14` as that is the minimum and maximum timezone difference in hours from UTC time. This will result in the start and stop "moments" for the "date" being shifted accordingly.
3. **min-max:** This is a special option which causes the "date" to represent the earliest "moment" anyone on Earth could have experienced the date to the last moment on Earth that anyone could have experienced the date on Earth. Because a day is 24 hours (except for leap seconds which Javascript ignores, sadly) and timezones can vary from UTC -12 to UTC + 14 then this window is 50 hours (`24+12+14`). This is useful for when you have no idea where in the world the user is but still need to do some say logic. For example, if a user asks for all posts yesterday `'min-max'` to get all posts that "may have been yesterday" and then leave it to the webpage/app to filter down exactly which ones match for the given timezone.

## I'm Still Not Convinced This Is Useful

Well, one day when you're writing server code and there's posts/articles/events that are suppose to be shown starting at a certain date stored in the form `"YYYY-MM-DD"` and you realize that you have no idea what timezone any API call has come from then you can remember this little library and give it a nice Github Star for it saving you butt ⭐️

## Exactly What Does This Library Promise

This library utilizes the native Javascript `Date` object. The pro's of this are that it behaves the same way that `Date` behaves plus some additional safety checks. The con's of this is that... (_checks notes_)... it behaves the same way that `Date` behaves 😭

This library makes the following assumptions:

1. All days are 86,400 seconds (this isn't true in real life but Javascript decided different).
2. All timezones on Earth are somewhere between -12 and +14 hours from UTC time.
3. All dates are in the form of the Gregorian Calendar. This is the calendar which has dates like "April 11, 1988".
4. Javascript's `Date` object is trustworthy (this is admittedly a poor assumption but allows this library to be ~100 lines of code instead of ~10,000 so "80/20 rule" logic says it's worth the tradeoff).

And it gives the following promises:

1. If you give it a year, month, and day and it successfully initializes then that year, month, and day are valid! This is more than the native `Date` object can promise when initializing even though it knows if what you gave it is invalid.
2. Valid inputs for dates are integers where years are between -9999 and 9999, months are between 1 and 12, and days are between 1 and the last day of the month for that month.
3. Leap Days are supported! This is because `Date` supports them 😄
4. Leap Seconds are not supported! This is because `Date` does NOT support them 😞

## Is `DateOnly` Fast and Lightweight?

The short answer is: Yes! You likely shouldn't worry about the performance impacts of using `DateOnly`.

In terms of code size `DateOnly` is a mere 97 lines of Typescript when comments and whitespace are removed (and compiles to 88 lines of Javascript). It has zero dependencies. If your code is slow, it's not `DateOnly`s fault.

In terms of runtime speed, creating a new `DateOnly` via the method of your choosing takes ~2x to ~6x as many CPU cycles as making a regular `Date` for the same input.

Benchmarking on an Apple M1 64 bit ARM CPU via Deno resulted in time to create taking ~500-1,750 CPU cycles or ~175-600 nanoseconds. This means such an execution environment can make ~1,500,000 to ~5,500,000 new instances of `DateOnly` per second.

If you're curious feel free to benchmark, the included benchmarks are done via Deno and can be executed by: `deno bench --unstable deno/`

## Supported Environments

| Environment | Versions                             |
| ----------- | ------------------------------------ |
| Deno        | `v1.17.0` and `v1.21.3`              |
| Node.js     | `12.22.12`, `14.19.2`, and `16.15.0` |
