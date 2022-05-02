---
parent_category: endpoint_test_data
parent_category_label: Endpoint Scheduled Test Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/tests/net/path-vis/{testId}/{agentId}/{roundId}'
title: '(Network) Detailed path trace'
type: GET

sortorder: 3
category-sortorder: 30
layout: null
---

{.inline-code} Returns a hop-by-hop summary of the path trace data collected during path visualization. In each round, one path discovery attempt is made to reach the destination. The entire path is returned. A `roundId` must be specified.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

Required parameters:

* `{testId}` the ID of the test you wish to retrieve
* `{agentId}` the ID of the endpoint agent from which you wish to obtain data
* `{roundId}` the round ID for which you wish to obtain data.  Equals the beginning of the testing round, in epoch time format.
* There is no request body for this request.

### Response

* Each route should start with a hop of 1
* Where a hop number is missing from response data, this is an indication that a star (\*) response was returned in the path trace attempt for that hop.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | unique ID of agent, from `/endpoint-agents` endpoint
permalink | url | n/a | link to jump to this result in the front end
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
server | url | n/a | target server, including port
serverIp | string | n/a | IP address of target server
sourceIp | string | n/a | IP address of source endpoint agent
sourcePrefix | string | n/a | IP prefix of source agent
routes | array | n/a | shows an iteration of path trace, with each iteration specified by a pathId
routes.pathId | string | n/a | unique ID of path trace
routes.hops | array | n/a | array of hop objects indicating each step in the traceroute
routes.hops.hop | integer | n/a | index of hop
routes.hops.ipAddress | string | n/a | IP address of the hop
routes.hop.prefix | string | n/a | Prefix of IP address shown in CIDR
routes.hop.rdns | string | n/a | reverse DNS entry of IP, if available
routes.hop.network | string | n/a | Autonomous System originating the prefix
routes.hop.responseTime | integer | milliseconds | RTT to the hop's IP
routes.hop.location | string | n/a | location information for the hop
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

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/tests/net/path-vis/273/1cf6d996-2400-4724-a805-2de78756c209/1535551380.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 29 Aug 2018 14:08:20 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 239
X-Organization-Rate-Limit-Reset: 1535551740
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-5```

#### Body

```{
    "endpointNet": {
        "endpointTest": {...},
        "pathVis": [
            {
                "agentId": "1cf6d996-2400-4724-a805-2de78756c209",
                "permalink": "https://app.thousandeyes.com/view/endpoint-agent?__a=160&scenarioId=eyebrowNetworkTest&testId=273&roundId=1535551380",
                "roundId": 1535551380,
                "routes": [
                    {
                        "hops": [
                            {
                                "hop": 1,
                                "ipAddress": "10.100.10.1",
                                "rdns": "vlan10.fw1.sfo1.o.thousandeyes.com",
                                "responseTime": 3
                            },
                            {
                                "hop": 2,
                                "ipAddress": "38.122.6.65",
                                "location": "San Francisco, California, US",
                                "network": "Cogent Communications (AS 174)",
                                "prefix": "38.0.0.0/8",
                                "rdns": "gi0-0-0-4.nr11.b001920-0.sfo01.atlas.cogentco.com",
                                "responseTime": 4
                            },
                            {
                                "hop": 3,
                                "ipAddress": "154.24.7.73",
                                "location": "San Francisco, California, US",
                                "network": "Cogent Communications (AS 174)",
                                "prefix": "154.24.0.0/13",
                                "rdns": "gi0-0-0-6.agr22.sfo01.atlas.cogentco.com",
                                "responseTime": 3
                            },
                            {
                                "hop": 4,
                                "ipAddress": "154.54.30.221",
                                "location": "San Francisco, California, US",
                                "network": "Cogent Communications (AS 174)",
                                "prefix": "154.48.0.0/12",
                                "rdns": "be2905.ccr22.sfo01.atlas.cogentco.com",
                                "responseTime": 4
                            },
                            {
                                "hop": 5,
                                "ipAddress": "154.54.0.178",
                                "location": "San Jose, California, US",
                                "network": "Cogent Communications (AS 174)",
                                "prefix": "154.48.0.0/12",
                                "rdns": "be2016.ccr31.sjc04.atlas.cogentco.com",
                                "responseTime": 4
                            },
                            {
                                "hop": 6,
                                "ipAddress": "62.115.34.73",
                                "location": "San Jose, California, US",
                                "network": "TeliaNet Global Network (AS 1299)",
                                "prefix": "62.115.0.0/16",
                                "rdns": "palo-b1-link.telia.net",
                                "responseTime": 6
                            },
                            {
                                "hop": 8,
                                "ipAddress": "185.199.111.153",
                                "location": "San Jose, California, US",
                                "network": "Fastly (AS 54113)",
                                "prefix": "185.199.111.0/24",
                                "rdns": "185.199.111.153",
                                "responseTime": 4
                            }
                        ],
                        "pathId": "8498006760529413427021933451903980591243082534558334817588690338427397277769705862118603451313420092120640807102237745714575920"
                    }
                ],
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
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
