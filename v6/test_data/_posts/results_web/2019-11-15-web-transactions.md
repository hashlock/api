---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/web-transactions/{testId}'
title: '(Web) Web Transactions'
type: GET

sortorder: 11.1
category-sortorder: 15
layout: null
---

Returns test configuration, and transaction time and errors from each agent selected to run a web transaction.  A **time frame** must be specified, or the current round of data will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the web transaction you wish to retrieve
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
transactionTime | integer | milliseconds | elapsed execution time of the web transaction script


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/web-transactions/1161561.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Date: Fri, 15 Nov 2019 16:36:19 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: f72ql
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 227
X-Organization-Rate-Limit-Reset: 1573835820
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

```{
    "pages": {
        "current": 1
    },
    "web": {
        "test": {
            "alertsEnabled": 0,
            "apiLinks": [
                {
                    "href": "https://api.thousandeyes.com/v6/tests/1161561",
                    "rel": "self"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/net/metrics/1161561",
                    "rel": "data"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/net/path-vis/1161561",
                    "rel": "data"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/net/bgp-metrics/1161561",
                    "rel": "data"
                }
            ],
            "authType": "NONE",
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "contentRegex": "",
            "createdBy": "ThousandEyes (support@thousandeyes.com)",
            "createdDate": "2019-11-15 16:29:55",
            "credentials": [],
            "enabled": 1,
            "followRedirects": 1,
            "httpTargetTime": 1000,
            "httpTimeLimit": 5,
            "httpVersion": 2,
            "includeHeaders": 1,
            "interval": 600,
            "liveShare": 0,
            "modifiedBy": "ThousandEyes (support@thousandeyes.com)",
            "modifiedDate": "2019-11-15 16:31:11",
            "mtuMeasurements": 1,
            "networkMeasurements": 1,
            "numPathTraces": 3,
            "probeMode": "AUTO",
            "pathTraceMode": "classic",
            "protocol": "TCP",
            "savedEvent": 0,
            "sslVersion": "Auto",
            "sslVersionId": 0,
            "targetTime": 10,
            "testId": 1161561,
            "testName": "Google.com Web Transaction",
            "timeLimit": 30,
            "transactionScript": "import { By, Key, until } from 'selenium-webdriver';\nimport { driver, markers, credentials, downloads, transaction } from 'thousandeyes';\n\nrunScript();\n\nasync function runScript() {\n\n    // Load page\n    await driver.get('https://google.com');\n    await driver.takeScreenshot();\n    \n    // Search\n    markers.start('SearchForWebdriver');\n    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);\n    await driver.takeScreenshot();\n    markers.stop('SearchForWebdriver');\n\n    // Wait for full page load\n    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);\n    await driver.takeScreenshot();\n};\n                    ",
            "type": "web-transactions",
            "url": "https://google.com",
            "useNtlm": 0,
            "usePublicBgp": 1,
            "verifyCertificate": 1
        },
        "webTransaction": [
            {
                "agentId": 31,
                "agentName": "Chicago, IL",
                "componentErrors": 5,
                "countryId": "US",
                "date": "2019-11-15 16:32:44",
                "permalink": "https://app.thousandeyes.com/null?__a=75&testId=1161561&roundId=1573835400&agentId=31",
                "roundId": 1573835400,
                "transactionTime": 2379
            },
            {
                "agentId": 10,
                "agentName": "Paris, France",
                "componentErrors": 5,
                "countryId": "FR",
                "date": "2019-11-15 16:32:55",
                "errorDetails": "TimeoutError: Waiting for title to be \"webdriver - Google Search\"\nWait timed out after 1002ms",
                "errorType": "OTHER",
                "permalink": "https://app.thousandeyes.com/null?__a=75&testId=1161561&roundId=1573835400&agentId=10",
                "roundId": 1573835400
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
