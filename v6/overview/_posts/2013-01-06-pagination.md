---
parent_category: overview
parent_category_label: Overview

title: 'Pagination'

sortorder: 8
category-sortorder: 1
layout: null
---

The ThousandEyes API returns data in paginated format, where the response exceeds a page of data. For requests showing current values, or less than a page worth of data, all data will be presented in a single page.

{.inline-code} Look for the `pages` element in your response to find links to subsequent pages of result data. The `pages[next]` element will contain the URL to the next page of data.  Note that where relative windows are requested, our API translates these windows into exact times, since it may take time to iterate through several pages of response data.

* if `pages[next]` is present, there is more data available. If not, you are on the last page of data.

A sample of a response including pages is shown below:

#### Request

`$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/page-load/818.json?window=10d \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Response

The main object can be ignored in this request.  Note a few things:

* The requested window was 10d, which forced pagination. The length of time required to cause pagination varies based on the number of agents on a test, and the number of records returned per agent. For example, DNS Server tests are more verbose than page load tests, because they typically query multiple nameservers per agent.
* If the result set exceeds one page worth of data, `next` URL will be shown in the pages section of data. If the time range requested in the query was specified in a window format, it will be converted to from and to format (based on the original query time), to prevent missing data as you iterate through your result set.

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 15 Aug 2018 20:14:43 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 217
X-Organization-Rate-Limit-Reset: 1534364100
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-2```

#### Body

```{
    "from": "2018-08-05 17:15:44",
    "pages": {
        "current": 1,
        "next": "https://api.thousandeyes.com/v6/web/page-load/818.json?lastRoundId=1533713400&from=2018-08-05+17%3A15%3A44&to=2018-08-15+17%3A15%3A44"
    },
    "to": "2018-08-15 17:15:44",
    "web": {...}
}```


For error responses, see the [response status codes documentation][overview-responsestatuscodes].
