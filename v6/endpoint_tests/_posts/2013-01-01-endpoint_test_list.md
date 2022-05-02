---
parent_category: endpoint_tests
parent_category_label: Endpoint Scheduled Tests

path: '{{ site.version_url_prefix_request }}/endpoint-tests'
title: 'Endpoint scheduled test list'
type: GET

sortorder: 1
category-sortorder: 25
layout: null
---

{.inline-code}Returns a list of all endpoint scheduled tests configured in ThousandEyes. This list does not contain saved events.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* There is no request body for this request.

### Response

Sends back an array of endpoint tests. See [Scheduled Endpoint Test Metadata][endpoint-test-metadata] page for information on fields returned by this endpoint.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-tests.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sat, 25 Aug 2018 17:03:50 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 237
X-Organization-Rate-Limit-Reset: 1535216640
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body

```{
    "endpointTest": [
        {
            "alertsEnabled": 0,
            "apiLinks": [...],
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 0,
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2018-08-25 16:56:50",
            "enabled": 1,
            "interval": 60,
            "agentSelectorConfig": {
                "agentIds": [],
                "agentSelectorType": "LIST_OF_LABELS",
                "labelIds": [10581, 12461],
                "maxMachines": 25
             },
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedDate": "2018-08-25 16:57:59",
            "mtuMeasurements": 0,
            "networkMeasurements": 1,
            "port": -1,
            "protocol": "ICMP",
            "savedEvent": 0,
            "server": "www.thousandeyes.com",
            "testId": 282,
            "testName": "ThousandeEyes",
            "type": "agent-to-server",
            "usePublicBgp": 0
        },
		...
    ]
}```

For more information on our response status codes, see the [response status codes documentation][overview-responsestatuscodes].
