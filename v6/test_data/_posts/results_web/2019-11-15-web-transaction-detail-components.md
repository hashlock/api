---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/web-transactions/{testId}/{agentId}/{roundId}/{pageNum}'
title: '(Web) Web Transaction component detail'
type: GET

sortorder: 11.3
category-sortorder: 15
layout: null
---

Returns HAR (http archive) information, including component list and timing for elements loaded in a web transaction test.  This is analogous to what is shown in the waterfall view for a page load or transaction test, with an agent selected.  Includes response data, dns, connect, ssl, send, wait and receive times for each component loaded in a page.

Note: this endpoint is only available in v5 or higher of the ThousandEyes API.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the Web Transaction test you for wish to retrieve data
* `{agentId}` the ID of the agent for which you wish to retrieve data
* `{roundId}` the ID of the round for which you wish to retrieve data
* `{pageNum}` the page number for the page reached in a transaction.  Can be obtained from `/web/web-transactions/{testId}/{agentId}/{roundId}` endpoint.  Page numbers are zero-indexed.
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
markers | array | n/a | see below
markers.name | string | n/a | name assigned to marker in transaction script
markers.duration | integer | milliseconds | total time recorded by marker
pages | array | n/a | see below
pages.pageNum | integer | n/a | page index
pages.pageName | string | n/a | meta title value for page visited
pages.componentCount | integer | n/a | number of components on target page
pages.errorCount | integer | n/a | number of errors encountered during page load
pages.duration | integer | milliseconds | time spent on page
transactionTime | integer | milliseconds | elapsed execution time of the web transaction script
har | har\* | n/a | see [HAR specification][link-harspec] for details.


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/web-transactions/1161561/31/1573836000/0.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Date: Fri, 15 Nov 2019 17:13:46 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: 8xb13
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 1000
X-Organization-Rate-Limit-Remaining: 999
X-Organization-Rate-Limit-Reset: 1573838040
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
```

#### Body

```{
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
                "componentErrors": 6,
                "countryId": "US",
                "date": "2019-11-15 16:42:00",
                "har": {
                    "log": {
                        "creator": {
                            "name": "ThousandEyes DB Exporter"
                        },
                        "entries": [
                            {
                                "pageref": "page_0",
                                "request": {
                                    "headers": [
                                        {
                                            "name": ":authority",
                                            "value": "google.com"
                                        },
                                        {
                                            "name": ":method",
                                            "value": "GET"
                                        },
                                        {
                                            "name": ":path",
                                            "value": "/"
                                        },
                                        {
                                            "name": ":scheme",
                                            "value": "https"
                                        },
                                        {
                                            "name": "accept",
                                            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
                                        },
                                        {
                                            "name": "accept-encoding",
                                            "value": "gzip, deflate, br"
                                        },
                                        {
                                            "name": "accept-language",
                                            "value": "en-US,en;q=0.9"
                                        },
                                        {
                                            "name": "upgrade-insecure-requests",
                                            "value": "1"
                                        },
                                        {
                                            "name": "user-agent",
                                            "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.83 Safari/537.36"
                                        },
                                        {
                                            "name": "x-thousandeyes-agent",
                                            "value": "yes"
                                        }
                                    ],
                                    "method": "GET",
                                    "url": "https://google.com/"
                                },
                                "response": {
                                    "bodySize": 220,
                                    "content": {
                                        "mimeType": "text/html",
                                        "size": 220
                                    },
                                    "headers": [
                                        {
                                            "name": "alt-svc",
                                            "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
                                        },
                                        {
                                            "name": "cache-control",
                                            "value": "public, max-age=2592000"
                                        },
                                        {
                                            "name": "content-length",
                                            "value": "220"
                                        },
                                        {
                                            "name": "content-type",
                                            "value": "text/html; charset=UTF-8"
                                        },
                                        {
                                            "name": "date",
                                            "value": "Fri, 15 Nov 2019 16:41:54 GMT"
                                        },
                                        {
                                            "name": "expires",
                                            "value": "Sun, 15 Dec 2019 16:41:54 GMT"
                                        },
                                        {
                                            "name": "location",
                                            "value": "https://www.google.com/"
                                        },
                                        {
                                            "name": "server",
                                            "value": "gws"
                                        },
                                        {
                                            "name": "status",
                                            "value": "301"
                                        },
                                        {
                                            "name": "x-frame-options",
                                            "value": "SAMEORIGIN"
                                        },
                                        {
                                            "name": "x-xss-protection",
                                            "value": "0"
                                        }
                                    ],
                                    "headersSize": 471,
                                    "redirectURL": "",
                                    "status": 301,
                                    "statusText": "MOVED_PERMANENTLY"
                                },
                                "serverIPAddress": "172.217.6.110",
                                "startedDateTime": "2019-11-15T16:41:54.798Z",
                                "time": 71,
                                "timings": {
                                    "blocked": 2,
                                    "connect": 16,
                                    "dns": 1,
                                    "receive": 1,
                                    "send": 0,
                                    "ssl": 14,
                                    "wait": 50
                                }
                            },
                            {
                                "pageref": "page_0",
                                "request": {
                                    "headers": [
                                        {
                                            "name": ":authority",
                                            "value": "www.google.com"
                                        },
                                        {
                                            "name": ":method",
                                            "value": "GET"
                                        },
                                        {
                                            "name": ":path",
                                            "value": "/"
                                        },
                                        {
                                            "name": ":scheme",
                                            "value": "https"
                                        },
                                        {
                                            "name": "accept",
                                            "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
                                        },
                                        {
                                            "name": "accept-encoding",
                                            "value": "gzip, deflate, br"
                                        },
                                        {
                                            "name": "accept-language",
                                            "value": "en-US,en;q=0.9"
                                        },
                                        {
                                            "name": "upgrade-insecure-requests",
                                            "value": "1"
                                        },
                                        {
                                            "name": "user-agent",
                                            "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.83 Safari/537.36"
                                        },
                                        {
                                            "name": "x-thousandeyes-agent",
                                            "value": "yes"
                                        }
                                    ],
                                    "method": "GET",
                                    "url": "https://www.google.com/"
                                },
                                "response": {
                                    "bodySize": 65214,
                                    "content": {
                                        "mimeType": "text/html",
                                        "size": 225039
                                    },
                                    "headers": [
                                        {
                                            "name": "alt-svc",
                                            "value": "quic=\":443\"; ma=2592000; v=\"46,43\",h3-Q050=\":443\"; ma=2592000,h3-Q049=\":443\"; ma=2592000,h3-Q048=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000"
                                        },
                                        {
                                            "name": "cache-control",
                                            "value": "private, max-age=0"
                                        },
                                        {
                                            "name": "content-encoding",
                                            "value": "br"
                                        },
                                        {
                                            "name": "content-length",
                                            "value": "65214"
                                        },
                                        {
                                            "name": "content-type",
                                            "value": "text/html; charset=UTF-8"
                                        },
                                        {
                                            "name": "date",
                                            "value": "Fri, 15 Nov 2019 16:41:54 GMT"
                                        },
                                        {
                                            "name": "expires",
                                            "value": "-1"
                                        },
                                        {
                                            "name": "p3p",
                                            "value": "CP=\"This is not a P3P policy! See g.co/p3phelp for more info.\""
                                        },
                                        {
                                            "name": "server",
                                            "value": "gws"
                                        },
                                        {
                                            "name": "set-cookie",
                                            "value": "(removed)"
                                        },
                                        {
                                            "name": "status",
                                            "value": "200"
                                        },
                                        {
                                            "name": "strict-transport-security",
                                            "value": "max-age=31536000"
                                        },
                                        {
                                            "name": "x-frame-options",
                                            "value": "SAMEORIGIN"
                                        },
                                        {
                                            "name": "x-xss-protection",
                                            "value": "0"
                                        }
                                    ],
                                    "headersSize": 915,
                                    "redirectURL": "",
                                    "status": 200,
                                    "statusText": "OK"
                                },
                                "serverIPAddress": "172.217.4.196",
                                "startedDateTime": "2019-11-15T16:41:54.870Z",
                                "time": 182,
                                "timings": {
                                    "blocked": 2,
                                    "connect": 4,
                                    "dns": 0,
                                    "receive": 58,
                                    "send": 0,
                                    "ssl": 2,
                                    "wait": 118
                                }
                            },
                        ...
                        ],
                        "pages": [
                            {
                                "id": "page_0",
                                "pageTimings": {
                                    "onContentLoad": 367,
                                    "onLoad": 737
                                },
                                "responseCode": 0,
                                "startedDateTime": "2019-11-15T16:41:54.796Z",
                                "title": "Google"
                            }
                        ],
                        "version": "1.2"
                    }
                },
                "markers": [
                    {
                        "duration": 1360.0,
                        "name": "SearchForWebdriver"
                    }
                ],
                "pages": [
                    {
                        "duration": 1117.5660001039505,
                        "pageName": "Google",
                        "pageNum": 0
                    },
                    {
                        "duration": 1146.6330000162125,
                        "pageName": "webdriver - Google Search",
                        "pageNum": 1
                    }
                ],
                "permalink": "https://app.thousandeyes.com/null?__a=75&testId=1161561&roundId=1573836000&agentId=31",
                "roundId": 1573836000,
                "transactionTime": 2341
            }
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
