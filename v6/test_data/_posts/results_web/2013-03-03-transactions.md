---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/transactions/{testId}'
title: '(Web) Transactions'
type: GET

sortorder: 9
category-sortorder: 15
layout: null
---

Returns transaction time, counts of steps and errors from each agent selected to run a transaction.  A **time frame** must be specified, or the current round of data will be returned.

For step-level detail, see [Detailed Transactions][results-tx-detail]

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the transaction you wish to retrieve
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
componentErrors | integer | n/a | number of components which did not successfully load
stepsCompleted | integer | n/a | number of steps successfully completed
totalSteps | integer | n/a | total number of steps in the transaction script
transactionTime | integer | milliseconds | elapsed execution time between beginning of start step and end of end step in the transaction


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/transactions/825.json \
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
            "enabled": 1,
            "testId": 825,
            "testName": "http://thousandeyes.com",
            "type": "transactions",
            "interval": 900,
            "url": "http://thousandeyes.com",
            "totalSteps": 1,
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2012-06-29 00:39:35",
            "apiLinks": [...]
        },
        "transaction": [
            {
                "agentName": "Hong Kong",
                "countryId": "HK",
                "date": "2013-11-13 04:30:15",
                "stepsCompleted": 1,
                "totalSteps": 1,
                "componentErrors": 0,
                "permalink": "https://app.thousandeyes.com/web/transactions?__a=75&testId=825&roundId=1384317000&agentId=12",
                "agentId": 12,
                "transactionTime": 4096,
                "roundId": 1384317000
            },
            ...
        ]
    },
    "pages": {
        "current": 1
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
