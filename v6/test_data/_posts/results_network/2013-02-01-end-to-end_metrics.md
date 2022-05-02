---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/net/metrics/{testId}'
title: '(Network) End-to-End metrics'
type: GET

sortorder: 1
category-sortorder: 15
layout: null
---

Returns network metrics (loss, latency, jitter, and bandwidth) from each agent, for each *roundId* in the requested window.  A **time frame** must be specified, or the current round of data will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `direction=[FROM_TARGET, TO_TARGET, BIDIRECTIONAL]` Applicable only for bidirectional Agent-to-Agent tests, specifies the direction for the metrics being retrieved.  In the case of bidirectional data, the aggregated data is returned, otherwise unidirectional data will be returned.  In the case of unidirectional tests queried with an invalid direction parameter, an error response will be thrown.

### Request

* `{testId}` the ID of the test you wish to retrieve
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | unique ID of agent, from `/agents` endpoint
agentName | string | n/a | display name of the agent responding
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
serverIp | string | n/a | ip of target server
server | url | n/a | target server, including port (if method used is TCP)
loss | float | percentage | % of packets not reaching destination
minLatency | float | milliseconds | minimum RTT for packets sent to destination
maxLatency | float | milliseconds | maximum RTT for packets sent to destination
avgLatency | float | milliseconds | average RTT for packets sent to destination
jitter | float | milliseconds | standard deviation of latency

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/net/metrics/817.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 08 Nov 2013 07:32:48 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1493231280
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "net": {
        "test": {
            "enabled": 1,
            "testId": 817,
            "testName": "http://www.thousandeyes.com",
            "type": "http-server",
            "interval": 900,
            "url": "http://www.thousandeyes.com",
            "modifiedDate": "2013-05-11 02:02:21",
            "networkMeasurements": 1,
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2012-06-28 19:33:12",
            "apiLinks": [...]
        },
        "metrics": [
            {
                "agentName": "Hong Kong",
                "countryId": "HK",
                "date": "2013-11-13 02:33:05",
                "serverIp": "50.18.127.223",
                "loss": 0.0,
                "permalink": "https://app.thousandeyes.com/net/metrics?__a=75&testId=817&roundId=1384309800&serverId=71&agentId=12",
                "agentId": 12,
                "server": "www.thousandeyes.com:80",
                "roundId": 1384309800
                "minLatency": 167.0,
                "avgLatency": 167.04,
                "maxLatency": 168.0,
                "jitter": 0.076808
            },
            ...
        ]
    },
    "pages": {
        "current": 1
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
