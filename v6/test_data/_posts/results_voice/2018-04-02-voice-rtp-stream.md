---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/voice/rtp-stream/{testId}'
title: '(Voice) RTP stream'
type: GET

sortorder: 21
category-sortorder: 15
layout: null
---

Returns voice RTP stream metrics (loss, latency, jitter, MOS score) from each agent, for each *roundId* in the requested window.  A **time frame** must be specified, or the current round of data will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` (Optional) specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` (Optional) specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` (Optional) specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` (Required) the ID of the RTP Stream test for which you wish to retrieve data
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | source agent unique Id, from `/agents` endpoint
agentName | string | n/a | display name of the source agent
serverIp | string | n/a | target agent IP address
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
dscp | string | n/a | DSCP value received by the server from the agent
dscpName | string | n/a | name of DSCP value received by the server from the agent
mos | float | n/a | Mean opinion score for agent's stream
codecName | string | n/a | name of codec used by agent
codecMaxMos | float | n/a | maximum value of Mean Opinion Score based on codec selection
loss | float | percentage | percentage value of packets sent from agent not received by server
discards | integer | n/a | number of packets discarded
latency | integer | milliseconds | time to send packets from source to server
pdv | float | milliseconds | variation in packet delay, measured in milliseconds
errorDetail | string | n/a | error details, if an error was encountered.


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/voice/rtp-stream/1004633.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sat, 10 Nov 2018 16:43:10 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1541868240
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body

```{
    "pages": {
        "current": 1
    },
    "voice": {
        "metrics": [
            {
                "agentId": 58,
                "agentName": "Cairo, Egypt",
                "codecMaxMos": 4.41,
                "codecName": "G.711 @ 64 Kbps",
                "countryId": "EG",
                "date": "2020-09-09 04:58:06",
                "discards": 0.0,
                "dscp": 46,
                "dscpName": "EF (DSCP 46)",
                "latency": 103,
                "loss": 0.0,
                "mos": 4.351024,
                "pdv": 1,
                "permalink": "https://app.thousandeyes.com/voice/metrics?__a=75&testId=1661929&roundId=1599627480&agentId=58",
                "roundId": 1599627480,
                "serverIp": "172.97.102.37"
            }
        ],
        "test": {
            "alertsEnabled": 0,
            "apiLinks": [...],
            "bgpMeasurements": 0,
            "codec": "G.711 @ 64 Kbps",
            "codecId": 0,
            "createdBy": "ThousandEyes (support@thousandeyes.com)",
            "createdDate": "2020-09-09 02:56:03",
            "dscp": "EF (DSCP 46)",
            "dscpId": 46,
            "duration": 5,
            "enabled": 1,
            "interval": 120,
            "jitterBuffer": 40,
            "liveShare": 0,
            "numPathTraces": 3,
            "savedEvent": 0,
            "server": "a1-docker1-abq.ag1.thousandeyes.com:49152",
            "targetAgentId": 8641,
            "testId": 1661929,
            "testName": "RTP-Stream",
            "type": "voice",
            "usePublicBgp": 1
        }
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
