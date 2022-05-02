---
parent_category: labels
parent_category_label: Labels

path: '{{ site.version_url_prefix_request }}/groups'
title: 'Labels list'
type: GET

sortorder: 1
category-sortorder: 50
layout: null
---

Returns a list of all labels (formerly called groups) configured in ThousandEyes.  This includes both Agent and Test labels.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Response

Sends back an array of labels configured in the platform. Metadata of the response is returned according to the following table:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
name | string | n/a | Name of the label
groupId | integer | n/a | Unique ID of the label; this number is negative for built-in labels.  Query the `/groups/{id}` endpoint to see a list of agents/tests with this label.
type | string | n/a | either `tests`, `agents`, `endpoint_tests` or `endpoint_agents`, indicates the type of label.  To show only this label type, query the /groups/{type} endpoint.
builtin | integer | n/a | 1 for built-in labels, and 0 for user-created labels.  Note that built-in labels are read-only.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/groups.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Tue, 15 Mar 2016 00:20:26 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 227
X-Organization-Rate-Limit-Reset: 1493730300
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "groups": [
        {
            "name": "Infrastructure tests",
            "groupId": 961,
            "type": "tests",
            "builtin": 0
        },
        {
            "name": "My label",
            "groupId": 714,
            "type": "agents",
            "builtin": 0
        },
        {
            "builtin": 1,
            "groupId": -8,
            "name": "Shared",
            "type": "tests"
        },
        {
            "builtin": 0,
            "groupId": 25458,
            "name": "Endpoint label",
            "type": "endpoint_agents"
        },
        {
            "builtin": 1,
            "groupId": -2,
            "name": "Cloud",
            "type": "agents"
        },
        {
            "builtin": 1,
            "groupId": -3,
            "name": "IPv4 Compatible",
            "type": "agents"
        },
        {
            "builtin": 1,
            "groupId": -4,
            "name": "IPv6 Compatible",
            "type": "agents"
        },
        {
            "builtin": 1,
            "groupId": -5,
            "name": "Proxied",
            "type": "agents"
        },
        {
            "builtin": 1,
            "groupId": -6,
            "name": "Enterprise Cluster",
            "type": "agents"
        },
        {
            "builtin": 1,
            "groupId": -1,
            "name": "Enterprise",
            "type": "agents"
        }
    ]
}
```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
