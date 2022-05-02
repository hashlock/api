---
parent_category: endpoint_test_data
parent_category_label: Endpoint Scheduled Test Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/tests/web/http-server/{testId}'
title: '(Web) HTTP server'
type: GET

sortorder: 4
category-sortorder: 30
layout: null
---

Returns response code and response times, as well as component-level (DNS, Connect, Wait and Receive) timing for the load of an object over HTTP.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the HTTP Server (or page load) test you wish to retrieve
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | string | n/a | unique ID of agent, from `/endpoint-agents` endpoint
connectTime | integer | milliseconds | time required to establish a TCP connection to the server
dnsTime | integer | milliseconds | time required to resolve DNS
errorType | string | n/a | type of error encountered; corresponds to phase of connection
errorDetails | string | n/a | error details, if an error was encountered
numRedirects | integer | n/a | number of redirects
permalink | url | n/a | link to jump to this result in the front end
receiveTime | integer | milliseconds | elapsed time between first and last byte of response
redirectTime | integer | milliseconds | cumulative redirect timing
requestHeaders | string | n/a | CRLF-delimited list of request headers in header: value format
responseCode | integer | n/a | code of HTTP response
responseHeaders | string | n/a | CRLF-delimited list of response headers in header: value format
responseTime | integer | milliseconds | time to first byte
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
serverIp | string | n/a | IP address of destination server
sslTime | integer | milliseconds | time to negotiate SSL/TLS
totalTime | integer | milliseconds | response time + receive time
waitTime | integer | milliseconds | time elapsed between completion of request and first byte of response
wireSize | float | bytes | size of content, in bytes
systemMetrics | object | n/a | contains system metrics such as CPU and physical memory usage

{.inline-code}`systemMetrics` object has following properties:

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


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/tests/web/http-server/273.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 29 Aug 2018 14:28:18 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 237
X-Organization-Rate-Limit-Reset: 1535552940
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-4```

#### Body

```{
    "endpointWeb": 
        "endpointTest": {...},
        "httpServer": [
            {
                "agentId": "1cf6d996-2400-4724-a805-2de78756c209",
                "connectTime": 12,
                "dnsTime": 6,
                "errorType": "None",
                "permalink": "https://app.thousandeyes.com/view/endpoint-agent?__a=160&scenarioId=eyebrowHttp&testId=273&roundId=1535551800",
                "receiveTime": 17,
                "requestHeaders": "GET / HTTP/1.1\r\n\nHost: developer.thousandeyes.com\r\n\nAuthorization: Basic (removed)\r\n\nUser-Agent: curl/\r\n\nAccept: */*\r\n\nX-ThousandEyes-Endpoint-Agent: yes\r\n",
                "responseCode": 200,
                "responseHeaders": "HTTP/1.1 200 OK\r\n\nServer: GitHub.com\r\n\nContent-Type: text/html; charset=utf-8\r\n\nLast-Modified: Thu, 23 Aug 2018 14:16:48 GMT\r\n\nETag: \"5b7ec1d0-14f4f\"\r\n\nAccess-Control-Allow-Origin: *\r\n\nExpires: Thu, 23 Aug 2018 14:37:00 GMT\r\n\nCache-Control: max-age=600\r\n\nX-GitHub-Request-Id: F86C:9AD2:7ABF9:89530:5B7EC42E\r\n\nContent-Length: 85839\r\n\nAccept-Ranges: bytes\r\n\nDate: Wed, 29 Aug 2018 14:10:00 GMT\r\n\nVia: 1.1 varnish\r\n\nAge: 480\r\n\nConnection: keep-alive\r\n\nX-Served-By: cache-pao17433-PAO\r\n\nX-Cache: HIT\r\n\nX-Cache-Hits: 1\r\n\nX-Timer: S1535551800.182689,VS0,VE1\r\n\nVary: Accept-Encoding\r\n\nX-Fastly-Request-ID: a665076014deec318792ec930c9cd6ae62fd2ae3\r\n",
                "responseTime": 46,
                "roundId": 1535551800,
                "serverIp": "185.199.111.153",
                "sslTime": 11,
                "totalTime": 63,
                "waitTime": 16,
                "wireSize": 86462,
                "systemMetrics": {
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
            },
            ...
        ]
    },
    "pages": {
        "current": 1
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
