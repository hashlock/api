---
parent_category: labels
parent_category_label: Labels

path: '{{ site.version_url_prefix_request }}/groups/{type}'
title: 'Labels list by type'
type: GET

sortorder: 2
category-sortorder: 50
layout: null
---

Returns a list of all tests of the label (formerly called group) type specified, configured in ThousandEyes.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{type}` corresponds to the following options:
  * `agents`
  * `tests`
  * `endpoint-agents`
  * `endpoint-tests`
* no request body

### Response

Sends back an array of labels configured for the type specified in the platform. Metadata of the response is returned according to the following table:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
name | string | n/a | Name of the label
groupId | integer | n/a | Unique ID of the label; this number is negative for built-in labels.  Query the `/groups/{id}` endpoint to see a list of agents/tests with this label.
type | string | n/a | Either `tests`, `agents`,`endpoint_tests` or `endpoint_agents`, indicates the type of label.
builtin | integer | n/a | 1 for built-in labels, and 0 for user-created labels.  Note that built-in labels are read-only.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/groups/tests.json \
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
            "builtin": 1,
            "groupId": -8,
            "name": "Shared",
            "type": "tests"
        },
        {
            "builtin": 1,
            "groupId": -9,
            "name": "Saved Event",
            "type": "tests"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
