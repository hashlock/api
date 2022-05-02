---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/transactions/{testId}/{agentId}/{roundId}'
title: '(Web) Transaction detail'
type: GET

sortorder: 10
category-sortorder: 15
layout: null
---

Returns transaction time, duration and error counts of steps and pages transited during a execution of a transaction.  An agent and roundId is required, since results from a single round of transaction execution will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the transaction you wish to retrieve
* `{agentId}` the ID of the agent for which you wish to obtain transaction data
* `{roundId}` the roundID for which data is being requested
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
stepsCompleted | integer | n/a | number of steps successfully completed
totalSteps | integer | n/a | total number of steps in the transaction script
transactionTime | integer | milliseconds | elapsed execution time between beginning of start step and end of end step in the transaction
componentErrors | integer | n/a | total number of component errors encountered during load of this page
steps | array | n/a | see below
steps.stepNum | integer | n/a | step index
steps.pageNum | integer | n/a | page index
steps.duration | integer | milliseconds | time spent on this step
steps.offset | integer | milliseconds | time spent waiting for previous steps to execute
pages | array | n/a | see below
pages.pageNum | integer | n/a | page index
pages.pageName | string | n/a | meta title value for page visited
pages.componentCount | integer | n/a | number of components on target page
pages.errorCount | integer | n/a | number of errors encountered during page load
pages.duration | integer | milliseconds | time spent on page


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/transactions/825/12/1383891300.json \
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
                "date": "2013-11-08 06:15:10",
                "stepsCompleted": 1,
                "totalSteps": 1,
                "componentErrors": 0,
                "steps": [
                    {
                        "stepNum": 0,
                        "pageNum": 0,
                        "duration": 4095,
                        "offset": 0
                    }
                ],
                "pages": [
                    {
                        "pageNum": 0,
                        "pageName": "IT Performance Management for the Cloud Era - ThousandEyes",
                        "componentCount": 46,
                        "errorCount": 0,
                        "duration": 4091
                    }
                ],
                "permalink": "https://app.thousandeyes.com/web/transactions?__a=75&testId=825&roundId=1383891300&agentId=12",
                "agentId": 12,
                "transactionTime": 4095,
                "roundId": 1383891300
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
