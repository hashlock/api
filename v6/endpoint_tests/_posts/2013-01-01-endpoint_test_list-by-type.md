---
parent_category: endpoint_tests
parent_category_label: Endpoint Scheduled Tests

path: '{{ site.version_url_prefix_request }}/endpoint-tests/{testType}'
title: 'Endpoint scheduled test list by type'
type: GET

sortorder: 2
category-sortorder: 25
layout: null
---

{.inline-code}Returns a list of all endpoint scheduled tests of the type specified, configured in ThousandEyes. The list does not contain saved events.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested. See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint. Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testType}` corresponds to any of the following options:
  * agent-to-server
  * http-server
* There is no request body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-tests/http-server.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of tests matching the requested test type. See [Scheduled Endpoint Test Metadata][endpoint-test-metadata] page for information on fields returned by this endpoint.

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sat, 25 Aug 2018 17:03:54 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 238
X-Organization-Rate-Limit-Reset: 1535216640
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-1```

#### Body

```{
    "endpointTest": [
        {
            "alertsEnabled": 0,
            "apiLinks": [...],
            "authType": "NONE",
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 0,
            "createdBy": "API Sandbox User (noprely@thousandeyes.com)",
            "createdDate": "2018-08-18 18:33:23",
            "enabled": 1,
            "followRedirects": 1,
            "httpTargetTime": 1000,
            "httpTimeLimit": 5000,
            "httpVersion": 1,
            "interval": 60,
            "agentSelectorConfig": {
                "agentIds": ["LAPTOP-MAC-AGENT", "PC-WINDOWS-AGENT"],
                "agentSelectorType": "SPECIFIC_AGENTS",
                "labelIds": [],
                "maxMachines": 25
             },
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedDate": "2018-08-25 17:22:54",
            "mtuMeasurements": 0,
            "networkMeasurements": 1,
            "port": 443,
            "protocol": "TCP",
            "savedEvent": 0,
            "server": "developer.thousandeyes.com",
            "sslVersion": "Auto",
            "sslVersionId": 0,
            "testId": 273,
            "testName": "Developer Reference",
            "type": "http-server",
            "url": "https://developer.thousandeyes.com/",
            "useNtlm": 0,
            "usePublicBgp": 0,
            "username": "",
            "verifyCertificate": 1
        },
        ...
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
