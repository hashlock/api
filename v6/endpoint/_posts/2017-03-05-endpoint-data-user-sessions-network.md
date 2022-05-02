---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/network'
title: 'Endpoint network sessions list'
type: GET-POST

sortorder: 5
category-sortorder: 20
layout: null
---

{.inline-code}Returns a list of all endpoint network sessions. Sessions from the last round are provided unless an explicit start and end is provided with `from`, `to` or `window` optional parameters.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `page={pageNo}` this parameter is going to be deprecated - please rely on the URL in the `pages[next]` element included in the response. See [Pagination][overview-pagination] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Optional Filtering

{.inline-code}`/endpoint-data` endpoints support optional filtering. See [Endpoint Data Filtering][endpoint-data-filtering] for more information.

### Request

* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/network.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}Sends back an object. `networkSessions` parameter returns an array of endpoint network session. Network sessions shown are from the latest round, or based on the time range specified.
Each entry represents an endpoint network session.

{.inline-code}Each page object in `networkSessions` array has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
userSessionId | string | n/a | endpoint user session ID; each endpoint user session occurrence has a unique ID
agentId | string | n/a | endpoint agent ID
roundId | integer | n/a | endpoint user session round ID
date | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when endpoint user session took place; all dates are UTC
destination | object | n/a | contains number parameters representing results of a network test performed against the target website: `latency`, `loss` and `jitter`, `avgRtt`, `maxRtt`, `meanDevRtt`; string parameter `target` represents target IP address
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

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 22 Mar 2017 13:47:53 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 597
X-Organization-Rate-Limit-Reset: 1490622120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "webSessions": [
    "networkSessions": [
        {
            "agentId": "3fde6422-f119-40e1-ae32-d08a1243c038",
            "date": "2017-03-22 11:58:42",
            "destination": {
                "jitter": 46,
                "latency": 150,
                "loss": 0.0,
                "target": "54.208.6.220"
            },
            "roundId": 1490529480,
            "userSessionId": "07625:1490529480:aVDViw0i",
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
        {
            "agentId": "3fde6422-f119-40e1-ae32-d08a1243c038",
            "date": "2017-03-22 11:58:43",
            "destination": {
                "jitter": 36,
                "latency": 24,
                "loss": 0.0,
                "target": "13.32.22.232"
            },
            "roundId": 1490529480,
            "userSessionId": "07625:1490529480:h3qJQTpl",
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
        }
    ]
    "pages": {
        "current": 1
    }
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
