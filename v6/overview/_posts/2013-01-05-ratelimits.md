---
parent_category: overview
parent_category_label: Overview

title: 'Rate limits'

sortorder: 7
category-sortorder: 1
layout: null
---

The ThousandEyes API throttles API requests using a 240 request per minute (per organization) limit.  The limit rolls over one minute from the first request in a batch, and starts again when the minute rolls over.  These values are subject to change, as we work through identifying appropriate use patterns for our API.

Users can watch three header values in responses from the ThousandEyes API for information on rate limits:

```HTTP/1.1 200 OK
X-Organization-Rate-Limit-Limit: 20
X-Organization-Rate-Limit-Remaining: 19
X-Organization-Rate-Limit-Reset: 1469560440```

* X-Organization-Rate-Limit-Limit is the number of requests allowed for your organization in a 60-second period.
* X-Organization-Rate-Limit-Remaining is the number of requests remaining in the current 60-second period.
* X-Organization-Rate-Limit-Reset is the UTC timestamp of the next rate limit rollover.

Instant tests are governed through a separate set of throttling controls, and allow up to 24 calls per minute.  Instant test rate limit headers can be found below:

```X-Instant-Test-Rate-Limit-Limit: 2
X-Instant-Test-Rate-Limit-Remaining: 1
X-Instant-Test-Rate-Limit-Reset: 1469560440```

As above:

* X-Instant-Test-Rate-Limit-Limit is the number of requests allowed for your organization in a 60-second period.
* X-Instant-Test-Rate-Limit-Remaining is the number of requests remaining in the current 60-second period.
* X-Instant-Test-Rate-Limit-Reset: is the UTC timestamp of the next rate limit rollover.

If you are receiving an HTTP/429 (Too many requests) response code, your request was refused on the basis of a rate limit.  Wait until either X-Organization-Rate-Limit-Reset value or the X-Instant-Test-Rate-Limit-Reset value (as appliable based on the type of request you are submitting) before submitting another request.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
