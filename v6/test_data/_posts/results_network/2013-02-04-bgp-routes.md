---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/net/bgp-routes/{testId}/{prefixId}/{roundId}'
title: '(Network) BGP route information'
type: GET

sortorder: 5
category-sortorder: 15
layout: null
---

Returns a sequenced list of networks transited for a specific network prefix.  Shows a list of monitors assigned to the test, and the paths transited to reach the destination.  This is analogous to showing the ASPath information from a BGP Routing Information Base (rib) dump.  

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the test for which BGP data is of interest
* `{prefixId}` the ID of the prefix in question. Obtain prefixId from the `/net/bgp-metrics/{testId}` endpoint
* `{roundId}` the round for which you wish to obtain data.  Obtain roundId from the `/net/bgp-metrics/{testId}` endpoint
* There is no request body for this request.

### Response

* **Note:** Monitors are not agents.  Not all agents are in a network being monitored, and not all monitors have associated agents.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
monitorId | integer | n/a | unique ID of monitor, from `/bgp-monitors` endpoint
monitorName | string | n/a | display name used for the monitor
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
prefixId | integer | n/a | internally tracked prefix ID
prefix | string | n/a | prefix being tracked
active | boolean | n/a | 1 for an active route, 0 for an inactive route. An inactive route was an active route in the previous test round and is now superseded by another active (preferred) route. When requesting data for the test round in which a route change happened, both routes (active and inactive one) are included in the response.
hops | array | n/a | see below for individual hop fields
hops.asn | integer | n/a | ASN of transit autonomous system
hops.asName | string | n/a | name of autonomous system

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/net/bgp-routes/1137/27/1413225900.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 07 Nov 2013 07:32:48 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1493233860
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "net": {
        "test": {
            "enabled": 1,
            "savedEvent": 0,
            "testId": 1137,
            "testName": "Agents up?",
            "type": "network",
            "interval": 300,
            "server": "www.google.com:80",
            "protocol": "TCP",
            "networkMeasurements": 1,
            "mtuMeasurements": 0,
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "alertsEnabled": 0,
            "liveShare": 0,
            "createdDate": "2013-03-06 18:07:51",
            "modifiedDate": "2014-10-13 18:17:53",
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "apiLinks": [...]
        },
        "bgpRoutes": [
            {
                "countryId": "CA",
                "date": "2014-10-13 18:45:00",
                "monitorId": 15,
                "monitorName": "Calgary, Canada - Telus (AS 852)",
                "prefixId": 27,
                "prefix": "74.125.0.0/16",
                "active": 1,
                "roundId": 1413225900,
                "hops": [
                    {
                        "asn": 852,
                        "asName": "Telus Advanced Communications"
                    },
                    {
                        "asn": 15169,
                        "asName": "Google Inc."
                    }
                ],
                "permalink": "https://app.thousandeyes.com/net/bgp-vis?__a=11&testId=1137&roundId=1413225900&agentId=null"
            },
            ...
        ]
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
