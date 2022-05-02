---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/{sessionId}/page/{pageId}'
title: 'Endpoint web page details'
type: GET

sortorder: 4
category-sortorder: 20
layout: null
---

Returns details for endpoint user session web page request. Provides complete waterfall information with all object requests.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* {sessionId} corresponds to the id of a endpoint user sessions, see the Endpoint user session list endpoint for a listing of endpoint user sessions.
* {pageId} corresponds to the id of a web page, see the Endpoint user session details endpoint for a listing of web pages.
* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/07625:1490529480:h3qJQTpl/page/page_1.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back detailed data of an endpoint user session web page request.

{.inline-code}Returned object has one parameter: `har`. `har` is an HAR object according to the HTTP Archive 1.2 specifications. You can read more about the specification [here][link-harspec].

{.inline-code}In addition to standard fields, the object `har` includes a custom property `_systemMetrics` which contain metrics about CPU and physical memory usage.


{.inline-code}`_systemMetrics` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
startTimeMs | integer | milliseconds | time at which metrics collection started, as milliseconds since the Epoch
endTimeMs | integer | milliseconds | time at which metrics collection ended, as milliseconds since the Epoch
cpuUtilization | object | n/a | contains utilization of the system's processors over the monitored period
physicalMemoryUsedBytes | object | n/a | contains metrics about used physical memory
physicalMemoryTotalBytes | integer | bytes | total physical memory of the system

{.inline-code}`cpuUtilization` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
min | double | \[0.0-1.0\] | minimal value of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
max | double | \[0.0-1.0\] | maximal value of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
mean | double | \[0.0-1.0\] | mean of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
median | double | \[0.0-1.0\] | median of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
stdDev | double | \[0.0-1.0\] | standard deviation  of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
count | integer | n/a | the number of collected samples over the monitored period

{.inline-code}`physicalMemoryUsedBytes` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
min | double | bytes | minimal value of memory usage sampled over the monitored period
max | double | bytes | maximal value of memory usage sampled over the monitored period
mean | double | bytes | mean value of memory usage sampled over the monitored period
median | double | bytes | median value of memory usage sampled over the monitored period
stdDev | double | bytes | standard deviation of memory usage sampled over the monitored period
count | integer | n/a | the number of collected samples over the monitored period

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 22 Mar 2017 17:13:02 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 598
X-Organization-Rate-Limit-Reset: 1490642120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "har": {
        "log": {
            "browser": {
                "name": "Google Chrome",
                "version": "57.0.2987.98"
            },
            "creator": {
                "name": "ThousandEyes Endpoint Agent",
                "version": "0.47.0"
            },
            "entries": [
                {
                    "pageref": "page_1",
                    "request": {
                        "headers": [
                            {
                                "name": "Upgrade-Insecure-Requests",
                                "value": "1"
                            },
                            {
                                "name": "User-Agent",
                                "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36"
                            },
                            {
                                "name": "Accept",
                                "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
                            },
                            {
                                "name": "Referer",
                                "value": "https://www.thousandeyes.com/"
                            },
                            {
                                "name": "Accept-Encoding",
                                "value": "gzip, deflate, sdch, br"
                            },
                            {
                                "name": "Accept-Language",
                                "value": "en-US,en;q=0.6"
                            },
                            {
                                "name": "Cookie",
                                "value": "(removed)"
                            }
                        ],
                        "method": "GET",
                        "queryString": [],
                        "url": "https://www.thousandeyes.com/resources"
                    },
                    "response": {
                        "bodySize": 17776,
                        "content": {
                            "mimeType": "text/html;charset=ISO-8859-1",
                            "size": 17776
                        },
                        "headers": [
                            {
                                "name": "Content-Type",
                                "value": "text/html;charset=ISO-8859-1"
                            },
                            {
                                "name": "Content-Length",
                                "value": "17776"
                            },
                            {
                                "name": "Connection",
                                "value": "keep-alive"
                            },
                            {
                                "name": "Date",
                                "value": "Sun, 26 Mar 2017 11:58:54 GMT"
                            },
                            {
                                "name": "Server",
                                "value": "Apache"
                            },
                            {
                                "name": "Cache-Control",
                                "value": "max-age=600, must-revalidate"
                            },
                            {
                                "name": "Content-Language",
                                "value": "en-US"
                            },
                            {
                                "name": "Content-Encoding",
                                "value": "gzip"
                            },
                            {
                                "name": "X-Frame-Options",
                                "value": "sameorigin"
                            },
                            {
                                "name": "Strict-Transport-Security",
                                "value": "max-age=31536000"
                            },
                            {
                                "name": "Vary",
                                "value": "Accept-Encoding"
                            },
                            {
                                "name": "X-Cache",
                                "value": "Miss from cloudfront"
                            },
                            {
                                "name": "Via",
                                "value": "1.1 5dbe09af3a2c87121e31ffa67f174f66.cloudfront.net (CloudFront)"
                            },
                            {
                                "name": "X-Amz-Cf-Id",
                                "value": "YkvlkBNKgHt5aMu9vcS22Z8kHn1MUr-8adupwhDk3j9vF-TpSyIxZA=="
                            }
                        ],
                        "headersSize": 527,
                        "redirectURL": "",
                        "status": 200,
                        "statusText": "OK"
                    },
                    "serverIPAddress": "13.32.22.80",
                    "startedDateTime": "2017-03-22T11:58:54.123+02:00",
                    "time": 177,
                    "timings": {
                        "blocked": -1,
                        "connect": -1,
                        "dns": -1,
                        "receive": 27,
                        "send": -1,
                        "ssl": -1,
                        "wait": 150
                    }
                },
                {
                    "pageref": "page_1",
                    "request": {
                        "headers": [
                            {
                                "name": "User-Agent",
                                "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36"
                            },
                            {
                                "name": "Accept",
                                "value": "*/*"
                            },
                            {
                                "name": "Referer",
                                "value": "https://www.thousandeyes.com/resources"
                            },
                            {
                                "name": "Accept-Encoding",
                                "value": "gzip, deflate, sdch, br"
                            },
                            {
                                "name": "Accept-Language",
                                "value": "en-US,en;q=0.6"
                            }
                        ],
                        "method": "GET",
                        "queryString": [],
                        "url": "https://use.typekit.net/cjy5myw.js"
                    },
                    "response": {
                        "bodySize": 0,
                        "content": {
                            "mimeType": "text/javascript;charset=utf-8",
                            "size": 7814
                        },
                        "headers": [
                            {
                                "name": "status",
                                "value": "200"
                            },
                            {
                                "name": "access-control-allow-origin",
                                "value": "*"
                            },
                            {
                                "name": "cache-control",
                                "value": "public, max-age=600, stale-while-revalidate=604800"
                            },
                            {
                                "name": "content-encoding",
                                "value": "gzip"
                            },
                            {
                                "name": "content-type",
                                "value": "text/javascript;charset=utf-8"
                            },
                            {
                                "name": "server",
                                "value": "nginx"
                            },
                            {
                                "name": "status",
                                "value": "200 OK"
                            },
                            {
                                "name": "timing-allow-origin",
                                "value": "*"
                            },
                            {
                                "name": "vary",
                                "value": "Accept-Encoding"
                            },
                            {
                                "name": "content-length",
                                "value": "7814"
                            },
                            {
                                "name": "date",
                                "value": "Sun, 26 Mar 2017 11:58:43 GMT"
                            }
                        ],
                        "headersSize": 334,
                        "redirectURL": "",
                        "status": 200,
                        "statusText": "OK"
                    },
                    "serverIPAddress": "104.103.103.234",
                    "startedDateTime": "2017-03-22T11:58:54.123+02:00",
                    "time": 72,
                    "timings": {
                        "blocked": -1,
                        "connect": -1,
                        "dns": -1,
                        "receive": 10,
                        "send": -1,
                        "ssl": -1,
                        "wait": 62
                    }
                }
                [...]
            ],
            "pages": [
                {
                    "id": "page_1",
                    "pageTimings": {
                        "onContentLoad": 874,
                        "onLoad": 3492
                    },
                    "responseCode": 200,
                    "startedDateTime": "2017-03-22T11:58:54.123+02:00",
                    "title": "Network Performance Resources | ThousandEyes"
                }
            ],
            "_systemMetrics": {
                "startTimeMs": 1581508857327,
                "endTimeMs": 1581508867333,
                "cpuUtilization": {
                    "min": 0.30859375,
                    "max": 0.5625,
                    "mean": 0.38931831001805056,
                    "median": 0.353515625,
                    "stdDev": 0.08389194281742307,
                    "count": 10
                },
                "physicalMemoryUsedBytes": {
                    "min": 1.2805128192E10,
                    "max": 1.2825530368E10,
                    "mean": 1.281914582109091E10,
                    "median": 1.2818219008E10,
                    "stdDev": 5741124.05691331,
                    "count": 11
                },
                "physicalMemoryTotalBytes": 17069891584
            }
            "version": "1.2"
        }
    }
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
