---
parent_category: endpoint_test_data
parent_category_label: Endpoint Scheduled Test Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/tests/net/path-vis/{testId}'
title: '(Network) Path visualization'
type: GET

sortorder: 2
category-sortorder: 30
layout: null
---

Returns a summary of the path visualization data collected from each endpoint agent to the destination. In each path visualization attempt, one attempt is made to reach the destination. Each set of data is summarized, based on response time, number of hops, and response time to the target. A **time frame** must be specified, or the most recent round within last 2 hours will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested. See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set. See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data. See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the test you wish to retrieve
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | string | n/a | unique ID of agent, from `/endpoint-agents` endpoint
location | string | n/a | geographic location of the endpoint agent
permalink | url | n/a | link to jump to this result in the front end
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
server | url | n/a | target server, including port
serverIp | string | n/a | IP address of target server
sourceIp | string | n/a | IP address of source enpoint agent
sourcePrefix | string | n/a | IP prefix of source agent
endpoints | array | n/a | shows all iterations of path trace, with each iteration specified by a pathId
endpoints.ipAddress | string | n/a | destination
endpoints.numberOfHops | integer | n/a | number of hops for path trace to destination
endpoints.pathId | string | n/a | unique ID of path trace
endpoints.responseTime | integer | n/a | RTT of the path trace to the destination
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

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/tests/net/path-vis/273.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 29 Aug 2018 14:01:39 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 239
X-Organization-Rate-Limit-Reset: 1535551320
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body

```{
    "endpointNet": {
        "endpointTest": {...},
        "pathVis": [
            {
                "agentId": "1cf6d996-2400-4724-a805-2de78756c209",
                "endpoints": [
                    {
                        "ipAddress": "185.199.111.153",
                        "numberOfHops": 8,
                        "pathId": "8498006760529413427021933451903980591243082534558334817588690338427397277769705862118603451313420092120640807102236650497915440",
                        "responseTime": 5
                    }
                ],
                "location": "San Francisco Area",
                "permalink": "https://app.thousandeyes.com/view/endpoint-agent?__a=160&scenarioId=eyebrowNetworkTest&testId=273&roundId=1535550480",
                "roundId": 1535550480,
                "server": "developer.thousandeyes.com:443",
                "serverIp": "185.199.111.153",
                "sourceIp": "10.100.10.35",
                "sourcePrefix": "38.122.6.64/30",
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
