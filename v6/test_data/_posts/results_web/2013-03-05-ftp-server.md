---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/ftp-server/{testId}'
title: '(Web) FTP server'
type: GET

sortorder: 12
category-sortorder: 15
layout: null
---

Returns response code, response and fetch times, as well as component-level (DNS, Connect, Negotiation, Response and Transfer) timing for the load of an object over FTP.  FTP tests support plain text FTP, FTPS (FTP over SSL), and SFTP (secure FTP).

*Note*: this endpoint is only available in API v6 and higher.

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
agentId | integer | n/a | unique ID of agent, from `/agents` endpoint
agentName | string | n/a | display name of the agent responding
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
serverIp | string | n/a | IP address of destination server
responseCode | integer | n/a | code of FTP response
dnsTime | float | milliseconds | time required to resolve DNS
connectTime | fload | milliseconds | time required to establish a TCP connection to the server
negotiationTime | float | milliseconds | time negotiate the connection and authenticate with the destination server
waitTime | float | milliseconds | time elapsed between completion of request and first byte of response
responseTime | float | milliseconds | sum of DNS, connect, negotiation and wait times
transferTime | float | milliseconds | elapsed time between first and last byte of the transfer
wireSize | float | bytes | size of content, in bytes
totalTime | integer | milliseconds | sum of response + transfer time
errorType | string | n/a | type of error encountered; corresponds to phase of connection
errorDetails | string | n/a | error details, if an error were encountered

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/ftp-server/367580.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 08 Nov 2013 07:32:48 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1493288220
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "pages": {
        "current": 1
    },
    "web": {
        "ftpServer": [
            {
                "agentId": 144,
                "agentName": "Vienna, Austria",
                "connectTime": 50.153,
                "countryId": "AT",
                "date": "2017-04-27 11:44:13",
                "dnsTime": 0.589,
                "errorType": "None",
                "negotiationTime": 503.413,
                "permalink": "https://app.thousandeyes.com/web/ftp-server?__a=75&testId=367580&roundId=1493293440&agentId=144",
                "responseCode": 226,
                "responseTime": 605.689,
                "roundId": 1493293440,
                "serverIp": "193.2.1.88",
                "throughput": 222019,
                "totalTime": 705.554,
                "transferTime": 99.865,
                "waitTime": 52.1,
                "wireSize": 22172
            }
        ],
        "test": {
            "alertsEnabled": 0,
            "apiLinks": [...],
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "createdBy": "Deleted User",
            "createdDate": "2017-04-27 11:40:12",
            "enabled": 1,
            "ftpTargetTime": 1000,
            "ftpTimeLimit": 10,
            "interval": 120,
            "liveShare": 0,
            "modifiedBy": "Deleted User",
            "modifiedDate": "2017-04-27 11:42:31",
            "mtuMeasurements": 1,
            "networkMeasurements": 1,
            "requestType": "List",
            "savedEvent": 0,
            "testId": 367580,
            "testName": "ftp://ftp.arnes.si",
            "type": "ftp-server",
            "url": "ftp://ftp.arnes.si/packages/gnu/",
            "useActiveFtp": 0,
            "useExplicitFtps": 0,
            "username": "anonymous"
        }
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
