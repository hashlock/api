---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/web-transactions/{testId}/{agentId}/{roundId}'
title: '(Web) Web Transaction detail'
type: GET

sortorder: 11.2
category-sortorder: 15
layout: null
---

{.inline-code}Returns transaction time, marker duration, error counts, and pages transited during the execution of a web transaction.  An `agentId` and `roundId` is required, since results from a single round of a web transaction execution will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the web transaction you wish to retrieve
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
transactionTime | integer | milliseconds | elapsed execution time of the web transaction script
componentErrors | integer | n/a | total number of component errors encountered during load of this page
markers | array | n/a | see below
markers.name | string | n/a | name assigned to marker in transaction script
markers.duration | integer | milliseconds | total time recorded by marker
pages | array | n/a | see below
pages.pageNum | integer | n/a | page index
pages.pageName | string | n/a | meta title value for page visited
pages.componentCount | integer | n/a | number of components on target page
pages.errorCount | integer | n/a | number of errors encountered during page load
pages.duration | integer | milliseconds | time spent on page


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/web-transactions/1161561/31/1573836000.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Date: Fri, 15 Nov 2019 16:59:49 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: fjxcv
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 232
X-Organization-Rate-Limit-Reset: 1573837200
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

```{
    "web": {
        "test": {
            "createdDate": "2019-11-15 16:29:55",
            "modifiedDate": "2019-11-15 16:31:11",
            "createdBy": "ThousandEyes (support@thousandeyes.com)",
            "modifiedBy": "ThousandEyes (support@thousandeyes.com)",
            "enabled": 1,
            "savedEvent": 0,
            "testId": 1161561,
            "testName": "Google.com Web Transaction",
            "type": "web-transactions",
            "interval": 600,
            "url": "https://google.com",
            "protocol": "TCP",
            "networkMeasurements": 1,
            "mtuMeasurements": 1,
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "usePublicBgp": 1,
            "alertsEnabled": 0,
            "liveShare": 0,
            "timeLimit": 30,
            "targetTime": 10,
            "httpTimeLimit": 5,
            "httpTargetTime": 1000,
            "httpVersion": 2,
            "followRedirects": 1,
            "includeHeaders": 1,
            "sslVersionId": 0,
            "verifyCertificate": 1,
            "useNtlm": 0,
            "authType": "NONE",
            "contentRegex": "",
            "transactionScript": "import { By, Key, until } from 'selenium-webdriver';\nimport { driver, markers, credentials, downloads, transaction } from 'thousandeyes';\n\nrunScript();\n\nasync function runScript() {\n\n    // Load page\n    await driver.get('https://google.com');\n    await driver.takeScreenshot();\n    \n    // Search\n    markers.start('SearchForWebdriver');\n    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);\n    await driver.takeScreenshot();\n    markers.stop('SearchForWebdriver');\n\n    // Wait for full page load\n    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);\n    await driver.takeScreenshot();\n};\n                    ",
            "probeMode": "AUTO",
            "pathTraceMode": "classic",
            "numPathTraces": 3,
            "credentials": [],
            "apiLinks": [
                {
                    "rel": "self",
                    "href": "https://api.thousandeyes.com/v6/tests/1161561"
                },
                {
                    "rel": "data",
                    "href": "https://api.thousandeyes.com/v6/net/metrics/1161561"
                },
                {
                    "rel": "data",
                    "href": "https://api.thousandeyes.com/v6/net/path-vis/1161561"
                },
                {
                    "rel": "data",
                    "href": "https://api.thousandeyes.com/v6/net/bgp-metrics/1161561"
                }
            ],
            "sslVersion": "Auto"
        },
        "webTransaction": [
            {
                "agentName": "Chicago, IL",
                "countryId": "US",
                "date": "2019-11-15 16:42:00",
                "permalink": "https://app.thousandeyes.com/null?__a=75&testId=1161561&roundId=1573836000&agentId=31",
                "roundId": 1573836000,
                "agentId": 31,
                "componentErrors": 6,
                "markers": [
                    {
                        "name": "SearchForWebdriver",
                        "duration": 1360.0
                    }
                ],
                "pages": [
                    {
                        "pageNum": 0,
                        "pageName": "Google",
                        "duration": 1117.5660001039505
                    },
                    {
                        "pageNum": 1,
                        "pageName": "webdriver - Google Search",
                        "duration": 1146.6330000162125
                    }
                ],
                "transactionTime": 2341
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
