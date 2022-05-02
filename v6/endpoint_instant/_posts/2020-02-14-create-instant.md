---
parent_category: endpoint_instant
parent_category_label: Endpoint Instant Tests

path: '{{ site.version_url_prefix_request }}/endpoint-instant/{testType}'
title: 'Creating instant test'
type: POST

sortorder: 1
category-sortorder: 30
layout: null
---

{.inline-code} Creates and runs a new Endpoint Instant test in ThousandEyes, based on properties provided in the POST data.  In order to create and run an Instant test, the user attempting the creation must have `Edit endpoint tests` permission.


### Request

* `{testType}` corresponds to any of the following options:
  * `agent-to-server` - endpoint network test
  * `http-server` - endpoint http test

* Request body should contain fields to be set during creation. 

#### Example - http test

`$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-instant/http-server.json \
  -d '{ "authType": "NONE",
        "flagPing": true,
        "flagTraceroute": true,
        "groupId": 42,
        "httpTimeLimit": 5000,
        "maxMachines": 5,
        "sslVersion": 0,
        "targetResponseTime": 5000,
        "testName": "HTTP test",
        "url": "www.example.com",
        "verifyCertHostname": true
      }' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
`

| Field              | Data Type        | Units                                      | Notes                                                                                                                                                                 |
|:-------------------|------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| testName           | string           | n/a                                        | Name of the test                                                                                                                                                      |
| url                | string           | n/a                                        | Test target URL, for example "www.example.com". Optionally, it can specify a protocol (http or https). If the protocol is not specified, "https" is used by default   |
| maxMachines        | integer          | \[1-10000\]                                | Maximal number of agents which can execute this test                                                                                                                  |
| groupId            | integer          | n/a                                        | (Deprecated) Unique ID of the label, which can be retrieved or created by [Labels API][labels]                                                                        |
| agentIds           | array of strings | n/a                                        | List of agent ids. Must be set if agentSelectorType == SPECIFIC_AGENTS                                                                                                |
| agentSelectorType  | string           | ANY_AGENT, SPECIFIC_AGENTS, LIST_OF_LABELS | Agent selection type: either all agents available, or list of agents, of list of agent labels                                                                         |
| labelIds           | array of longs   | n/a                                        | List of label ids. Must be set if agentSelectorType == LIST_OF_LABELS                                                                                                 |
| sslVersion         | integer          | n/a                                        | Ssl protocol version (0 - AUTO, 3 - SSL v3, 4 - TLS v1.0, 5 - TLS 1.1, 6 - TLS 1.2)                                                                                   |
| targetResponseTime | integer          | milliseconds                               | Affects the colours of agents and legends on the view page. The value is compared with actual response time in order to determine the color scale (from green to red) |
| verifyCertHostname | boolean          | n/a                                        | Flag indicating if a certificate should be verified                                                                                                                   |
| authType           | string           | n/a                                        | Authentication type: NONE, BASIC or NTLM                                                                                                                              |
| username           | string           | n/a                                        | User name if authentication was specified to BASIC or NTLM                                                                                                            |
| password           | string           | n/a                                        | Password if authentication was specified to BASIC or NTLM                                                                                                             |
| httpTimeLimit      | integer          | milliseconds                               | Maximum amount of time in milliseconds the agents wait before a request times out                                                                                     |
| flagPing           | boolean          | n/a                                        | Optional flag indicating if test should run ping. If not specified, true is used by default                                                                           |
| flagTraceroute     | boolean          | n/a                                        | Optional flag indicating if test should run traceroute. If not specified, true is used by default                                                                     |
| port               | integer          | n/a                                        | Port number, if not specified, the port is selected based on a protocol (HTTP 80, HTTPS 443)                                                                          |
| networkProtocol    | String           | n/a                                        | ICMP or TCP, default ICMP                                                                                                                                             |
| tcpProbeMode       | String           | n/a                                        | TCP mode: AUTO, SYN or SACK. Applicable only if TCP is selected as a network protocol                                                                                 |
| pathtraceInSession | String           | n/a                                        | First initiates a TCP session with the target server and sends path trace packets within that TCP session. Applicable only if TCP is selected as a network protocol   |

#### Example - network test

`$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-instant/agent-to-server.json \
  -d '{ "flagPing": true,
        "flagTraceroute": true,
        "groupId": "23020",
        "maxMachines": 5,
        "serverName": "www.example.com",
        "port": 80,
        "testName": "Network test"
     }' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
`

| Field             | Data Type        | Units                                      | Notes                                                                                                                                                                            |
|:------------------|------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| testName          | string           | n/a                                        | Name of the test                                                                                                                                                                 |
| serverName        | string           | n/a                                        | A server address without a protocol (for example "www.example.com") or IP address                                                                                                |
| groupId           | integer          | n/a                                        | (Deprecated) Unique ID of the label, which can be retrieved or created by [Labels API][labels]. Should be substituted by combination of agentSelectorType, agentIds and labelIds |
| agentIds          | array of strings | n/a                                        | List of agent ids. Must be set if agentSelectorType == SPECIFIC_AGENTS                                                                                                           |
| agentSelectorType | string           | ANY_AGENT, SPECIFIC_AGENTS, LIST_OF_LABELS | Agent selection type: either all agents available, or list of agents, of list of agent labels                                                                                    |
| labelIds          | array of longs   | n/a                                        | List of label ids. Must be set if agentSelectorType == LIST_OF_LABELS                                                                                                            |
| maxMachines       | integer          | \[1-10000\]                                | Maximal number of agents which can execute this test                                                                                                                             |
| flagPing          | boolean          | n/a                                        | Optional flag indicating if test should run ping. If not specified, true is used by default                                                                                      |
| flagTraceroute    | boolean          | n/a                                        | Optional flag indicating if test should run traceroute. If not specified, true is used by default                                                                                |
| port              | integer          | n/a                                        | Port number, if not specified, it's set to 80 by default                                                                                                                         |

### Response

If an instant test is successfully created, an HTTP/201 CREATED response will be returned, and the test definition will be returned. See the example below.

Response does not include the results of the instant test. Once the instant test has been run, results can be retrieved using [Endpoint Test Data][endpoint-test-data] endpoints. API test data endpoints URLs are provided in test definition output upon instant test creation. See the example below.

#### Header

```HTTP/1.1 201 Created
Server: nginx
Date: Mon, 17 Feb 2020 13:41:02 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 599
X-Organization-Rate-Limit-Reset: 1490622120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```


For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].

#### Body

`{
     "endpointTest": [
         {
             "alertsEnabled": 0,
             "apiLinks": [
                 {
                     "href": "https://api.thousandeyes.com/v6/endpoint-data/tests/net/metrics/9902783",
                     "rel": "data"
                 },
                 {
                     "href": "https://api.thousandeyes.com/v6/endpoint-data/tests/net/path-vis/9902783",
                     "rel": "data"
                 },
                 {
                     "href": "https://api.thousandeyes.com/v6/endpoint-data/tests/web/http-server/9902783",
                     "rel": "data"
                 },
                 {
                     "href": "https://api.thousandeyes.com/v6/endpoint-tests/9902783",
                     "rel": "self"
                 }
             ],
             "authType": "NONE",
             "bandwidthMeasurements": 0,
             "bgpMeasurements": 0,
             "createdBy": "API User (noprely@thousandeyes.com)",
             "createdDate": "2020-02-17 11:11:19",
             "enabled": 1,
             "followRedirects": 1,
             "httpTargetTime": 5000,
             "httpTimeLimit": 5000,
             "httpVersion": 1,
             "interval": 60,
             "agentSelectorConfig": {
                "agentIds": [],
                "agentSelectorType": "LIST_OF_LABELS",
                "labelIds": [10581, 12461],
                "maxMachines": 25
             },
             "modifiedBy": "API User (noprely@thousandeyes.com)",
             "modifiedDate": "2020-02-17 11:11:19",
             "mtuMeasurements": 0,
             "networkMeasurements": 1,
             "port": 443,
             "protocol": "TCP",
             "savedEvent": 0,
             "server": "www.example.com",
             "sslVersion": "Auto",
             "sslVersionId": 0,
             "testId": 9902783,
             "testName": "HTTP test",
             "type": "http-server",
             "url": "https://www.example.com",
             "useNtlm": 0,
             "usePublicBgp": 0,
             "username": "",
             "verifyCertificate": 1
         }
     ]
 }
`
