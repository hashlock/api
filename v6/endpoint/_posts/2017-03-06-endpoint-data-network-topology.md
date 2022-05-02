---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/network-topology'
title: 'Endpoint network topology list'
type: GET-POST

sortorder: 6
category-sortorder: 20
layout: null
---

{.inline-code}Returns a list of all endpoint network topology results. Results from the last round are provided unless an explicit start and end is provided with `from`, `to` or `window` optional parameters.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `page={pageNo}` this parameter is going to be deprecated - please rely on the URL in the `pages[next]` element included in the response. See [Pagination][overview-pagination] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Warning
Note that a maximum of 12h worth of data can be retreived at once. If you need more, you need to make multiple requests.

### Optional Filtering

{.inline-code}`/endpoint-data` endpoints support optional filtering. See [Endpoint Data Filtering][endpoint-data-filtering] for more information.

### Request

* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/network-topology.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}Sends back an object. `networkProbes` parameter returns an array of network topology probes. Network topology probes shown are from the latest round, or based on the time range specified.
Each entry represents a network topology probe.

{.inline-code}Each object in `networkProbes` array has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
networkProbeId | string | n/a | network probe ID; each network probe occurrence has a unique ID
agentId | string | n/a | endpoint agent ID
roundId | integer | n/a | endpoint user session round ID
date | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when network probe took place; all dates are UTC
target | string | n/a | IP of the target the network probe was performed against; this is typically a default gateway, proxy or VPN endpoint
icmpPing | object | n/a | contains number parameters representing results of a ping test performed against the target: `pktsSent`, `pktsReceived`, `minRtt`, `avgRtt`, `maxRtt` and `meanDevRtt`
icmpBlocked | boolean | n/a | true when network path trace could not complete, but TCP connection to the target was successfully established
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
Date: Mon, 22 Mar 2017 13:48:23 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 596
X-Organization-Rate-Limit-Reset: 1490622120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "networkProbes": [
        {
            "agentId": "c7a58c49-4d1a-481f-b41c-0e72ea4b9239",
            "date": "2017-03-26 13:55:01",
            "icmpPing": {
                "avgRtt": 0,
                "maxRtt": 0,
                "meanDevRtt": 0,
                "minRtt": 0.0,
                "pktsReceived": 10,
                "pktsSent": 10
            },
            "networkProbeId": "00160:54c3a4b180c6:1490536500:c7a58c49",
            "roundId": 1490536500,
            "target": "10.0.2.2",
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
            "agentId": "c7a58c49-4d1a-481f-b41c-0e72ea4b9239",
            "date": "2017-03-26 14:02:00",
            "icmpPing": {
                "avgRtt": 0,
                "maxRtt": 0,
                "meanDevRtt": 0,
                "minRtt": 0.0,
                "pktsReceived": 10,
                "pktsSent": 10
            },
            "networkProbeId": "00160:54c3a4b180c6:1490536800:c7a58c49",
            "roundId": 1490536800,
            "target": "10.0.2.2",
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
