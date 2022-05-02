---
parent_category: agents
parent_category_label: Agents & Monitors

path: '{{ site.version_url_prefix_request }}/bgp-monitors'
title: 'BGP Monitor list'
type: GET

sortorder: 50
category-sortorder: 40
layout: null
---

Returns a list of all BGP monitors available to your account in ThousandEyes, including both public and private feeds.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/bgp-monitors.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of BGP monitors, including monitorId, which can be used by other areas of the API.  The example below shows both a public and private BGP monitor.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
monitorId | integer | n/a | unique ID of BGP monitor
ipAddress | string | n/a | IP address of the BGP monitor
network | string | n/a | name of the autonomous system in which the monitor is found
monitorType | string | n/a | either Public or Private, shows the type of monitor
monitorName | string | n/a | display name of the BGP monitor

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1493294160
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "bgpMonitors": [
        {
            "ipAddress": "2001:240:100:ff::2497:2",
            "monitorId": 64,
            "monitorName": "Tokyo-3",
            "monitorType": "Public",
            "network": "Internet Initiative Japan Inc. (AS 2497)"
        },
        {
            "ipAddress": "4.69.184.193",
            "monitorId": 1,
            "monitorName": "Seattle, WA",
            "monitorType": "Public",
            "network": "Level 3 Communications, Inc. (AS 3356)"
        },
        ...
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
