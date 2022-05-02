---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/page-load/{testId}/{agentId}/{roundId}'
title: '(Web) Page load component detail'
type: GET

sortorder: 8
category-sortorder: 15
layout: null
---

Returns HAR (http archive) information, including component list and timing for elements loaded in a Page Load test. This is analogous to what is shown in the waterfall view for a Page Load test, with an agent selected.  Includes response data, dns, connect, ssl, send, wait and receive times for each component loaded in a page.

Note: this endpoint is only available in v5 or higher of the ThousandEyes API

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the Page Load test you for wish to retrieve data
* `{agentId}` the ID of the agent for which you wish to retrieve data
* `{roundId}` the ID of the round for which you wish to retrieve data
* There is no request body for this request.

### Response

Response data is returned according to the [HAR specification][link-harspec].

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | unique ID of agent, from `/agents` endpoint
agentName | string | n/a | display name of the agent responding
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
responseTime | integer | milliseconds | time to first byte
totalSize | integer | bytes | sum of wire size of all objects on page
numObjects | integer | n/a | number of objects found on the page
numErrors | integer | n/a | number of objects which encountered errors during download
domLoadTime | integer | milliseconds | time to interaction
pageLoadTime | integer | milliseconds | time to completely load page
har | har\* | n/a | see [HAR specification][link-harspec] for details.


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/page-load/818/12/1493288100.json \
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
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1493288220
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "web": {
        "test": {
            "createdDate": "2012-06-28 19:34:33",
            "modifiedDate": "2016-09-20 23:01:55",
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "enabled": 1,
            "savedEvent": 0,
            "testId": 818,
            "testName": "http://www.google.com",
            "type": "page-load",
            "interval": 900,
            "httpInterval": 900,
            "url": "http://www.google.com",
            "protocol": "TCP",
            "networkMeasurements": 1,
            "mtuMeasurements": 1,
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "usePublicBgp": 1,
            "alertsEnabled": 0,
            "liveShare": 0,
            "httpTimeLimit": 5,
            "httpTargetTime": 1000,
            "httpVersion": 2,
            "pageLoadTimeLimit": 30,
            "pageLoadTargetTime": 2,
            "followRedirects": 1,
            "includeHeaders": 0,
            "sslVersionId": 0,
            "sslVersion": "Auto",
            "verifyCertificate": 1,
            "useNtlm": 0,
            "authType": "NONE",
            "contentRegex": "",
            "probeMode": "AUTO",
            "pathTraceMode": "classic",
            "apiLinks": [...]
        },
        "pageLoad": [
            {
                "har": {
                    "log": {
                        "creator": {
                            "name": "ThousandEyes DB Exporter"
                        },
                        "entries": [
                            {
                                "pageref": "page_0",
                                "serverIPAddress": "2404:6800:4005:80d::2004",
                                "startedDateTime": "2018-07-12T16:00:26.948Z",
                                "time": 37,
                                "timings": {
                                    "blocked": 7,
                                    "dns": -1,
                                    "connect": -1,
                                    "ssl": -1,
                                    "send": 0,
                                    "wait": 28,
                                    "receive": 2
                                },
                                "request": {
                                    "url": "http://www.google.com/",
                                    "headers": [
                                        {
                                            "name": "Accept",
                                            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
                                        },
                                        ...
                                    ],
                                    "method": "GET"
                                },
                                "response": {
                                    "headersSize": 649,
                                    "bodySize": 231,
                                    "status": 302,
                                    "headers": [
                                        {
                                            "name": "Cache-Control",
                                            "value": "private"
                                        },
                                        ...
                                    ],
                                    "content": {
                                        "size": 231,
                                        "mimeType": "text/html"
                                    },
                                    "redirectURL": "",
                                    "statusText": "FOUND"
                                    "statusText": "FOUND"
                                }
                            },
                            ...
                        "pages": [
                            {
                                "id": "page_0",
                                "title": "Google",
                                "startedDateTime": "2018-07-12T16:00:26.946Z",
                                "responseCode": 0,
                                "pageTimings": {
                                    "onLoad": 504,
                                    "onContentLoad": 344
                                }
                            }
                        ],
                        "version": "1.2"
                    }
                },
                "agentName": "Kwai Chung, Hong Kong",
                "countryId": "HK",
                "date": "2018-07-12 16:00:31",
                "agentId": 12,
                "roundId": 1531411200,
                "responseTime": 35,
                "totalSize": 404397,
                "numObjects": 19,
                "numErrors": 0,
                "domLoadTime": 344,
                "pageLoadTime": 504,
                "permalink": "https://app.thousandeyes.com/web/page-load?__a=null&testId=818&roundId=1531411200&agentId=12"
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
