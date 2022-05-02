---
parent_category: overview
parent_category_label: Overview

title: 'Time ranges'

sortorder: 5
category-sortorder: 1
layout: null
---

{.inline-code}Most requests (check _Optional Parameters_ section in each endpoint), allow a time range to be specified using parameters. Specifically, `window` is allowed for alert listings, and either `window`, `from`, or `from` and `to` are allowed on all data requests.  If the endpoint doesn't respect the optional parameters, they will be ignored.

{.inline-code}`window=[0-9]+[smhdw]?`
The `window` parameter is used to specify an amount of time in the past for which to fetch data. That is, data will be retrieved from the specified amount of time ago up until the time of the request. A time window is a number followed by an optional time interval type. The supported time interval types are `s` for seconds, `m` for minutes, `h` for hours, `d` for days, and `w` for weeks. If no time interval type is specified, seconds are assumed. For example, `window=10d` would retrieve data from the last 10 days, `window=12h` would retrieve data from the last 12 hours, and `window=1200` will retrieve data from the last 1200 seconds.

```from=YYYY-mm-ddTHH:MM:SS
from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS```

{.inline-code}The `from` and `to` parameters are used to specify a specific date and time range for the data. The `to` parameter is optional -- if omitted, the current time (at the time of the request) will be assumed. Dates must be specified in the ISO 8601 date-time format, with hyphens between date fields and colons between time fields. The full time (hours, minutes, and seconds) must be included. The date and time can be separated by either a space or the letter T. Example: `2012-01-01T00:00:00.` The date range is inclusive. Time zone is UTC.

{.inline-code} Note: The `from`/`to` and `window` parameters are mutually exclusive -- the server will produce a 400 error if both `window` and either `from` or `to` is specified. It will also produce a 400 error if `to` is specified without `from`.

{.inline-code} On endpoints where `roundId` is required component of the URL, roundId is represented as epoch time corresponding to the start of a round, in seconds.  For example, if a round starts on 2015-06-30 16:00:00 UTC, the roundId would be 1435680000.  roundId values are always exactly divisible by the test frequency, which is specified in seconds.  The next rounds for a test with a 5-minute interval would be 1435680000 + 300, or 1435680300, 1435680600, 1435680900 and so on.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].