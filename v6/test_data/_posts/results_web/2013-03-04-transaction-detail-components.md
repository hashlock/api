---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/transactions/{testId}/{agentId}/{roundId}/{pageNum}'
title: '(Web) Transaction component detail'
type: GET

sortorder: 11
category-sortorder: 15
layout: null
---

Returns HAR (http archive) information, including component list and timing for elements loaded in a transaction test.  This is analogous to what is shown in the waterfall view for a page load or transaction test, with an agent selected.  Includes response data, dns, connect, ssl, send, wait and receive times for each component loaded in a page.

Note: this endpoint is only available in v5 or higher of the ThousandEyes API.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the Transaction test you for wish to retrieve data
* `{agentId}` the ID of the agent for which you wish to retrieve data
* `{roundId}` the ID of the round for which you wish to retrieve data
* `{pageNum}` the page number for the page reached in a transaction.  Can be obtained from `/web/transactions/{testId}/{agentId}/{roundId}` endpoint.  Page numbers are zero-indexed.
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
stepsCompleted | integer | n/a | number of steps successfully completed
totalSteps | integer | n/a | total number of steps in the transaction script
transactionTime | integer | milliseconds | elapsed execution time between beginning of start step and end of end step in the transaction
har | har\* | n/a | see [HAR specification][link-harspec] for details.


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/transactions/825/12/1412784300/0.json \
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
            "alertsEnabled": 1,
            "apiLinks": [...],
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2012-06-29 00:39:35",
            "enabled": 1,
            "endStep": 0,
            "includeHeaders": 0,
            "interval": 900,
            "liveShare": 0,
            "modifiedBy": "Deleted User",
            "modifiedDate": "2016-06-08 06:50:34",
            "savedEvent": 0,
            "startStep": 0,
            "targetTime": 10000,
            "testId": 825,
            "testName": "http://thousandeyes.com",
            "timeLimit": 60,
            "totalSteps": 1,
            "type": "transactions",
            "url": "http://thousandeyes.com",
            "userAgent": "Mozilla/5.0 AppleWebKit/999.0 (KHTML, like Gecko) Chrome/99.0 Safari/999.0"
        },
        "transaction": [
            {
                "agentId": 12,
                "agentName": "San Po Kong, Hong Kong",
                "componentErrors": 0,
                "countryId": "HK",
                "date": "2017-04-27 10:30:23",
                "har": {
                    "log": {
                        "creator": {
                            "name": "ThousandEyes DB Exporter"
                        },
                        "entries": [
                            {
                                "pageref": "page_0",
                                "request": {
                                    "method": "GET",
                                    "queryString": [],
                                    "url": "http://thousandeyes.com/"
                                },
                                "response": {
                                    "bodySize": 213,
                                    "content": {
                                        "mimeType": "text/html",
                                        "size": 213
                                    },
                                    "headersSize": 239,
                                    "redirectURL": "",
                                    "status": 302,
                                    "statusText": "FOUND"
                                },
                                "serverIPAddress": "54.208.6.220",
                                "startedDateTime": "2017-04-27T17:30:23.001Z",
                                "time": 402,
                                "timings": {
                                    "blocked": 0,
                                    "connect": 190,
                                    "dns": 0,
                                    "receive": 2,
                                    "send": 0,
                                    "ssl": -1,
                                    "wait": 210
                                }
                            },
                            ...
                        ],
                        "pages": [
                            {
                                "id": "page_0",
                                "pageTimings": {},
                                "responseCode": 0,
                                "startedDateTime": "2017-04-27T17:30:23.000Z",
                                "title": "Network Intelligence Software | ThousandEyes"
                            }
                        ],
                        "version": "1.2"
                    }
                },
                "pages": [
                    {
                        "componentCount": 44,
                        "duration": 1640,
                        "errorCount": 0,
                        "pageName": "Network Intelligence Software | ThousandEyes",
                        "pageNum": 0
                    }
                ],
                "permalink": "https://app.thousandeyes.com/web/transactions?__a=75&testId=825&roundId=1493289000&agentId=12",
                "roundId": 1493289000,
                "steps": [
                    {
                        "duration": 1656,
                        "offset": 0,
                        "pageNum": 0,
                        "stepNum": 0
                    }
                ],
                "stepsCompleted": 1,
                "totalSteps": 1,
                "transactionTime": 1656
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
