---
parent_category: agents
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/agent-notification-rules'
title: 'Agent Notification Rules'
type: GET

sortorder: 60
category-sortorder: 40
layout: null
---

Returns a list of all agent notification rules configured under your account in ThousandEyes.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agent-notification-rules.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}Sends back an object with one property. `agentAlertRules` is a collection of agent notification rule objects. Each object has the following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
ruleId | integer | n/a | unique ID of the agent notification rule
ruleName | string | n/a | name of the agent notification rule
expression | string | n/a | string expression of agent notification rule
notifyOnClear | boolean | n/a | 1 to send notification when notification clears
default | boolean | n/a | when set to 1, agent notification rule will be automatically included on all new Enterprise agents

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Tue, 11 Apr 2017 13:41:28 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 599
X-Organization-Rate-Limit-Reset: 1491918120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "agentAlertRules": [
        {
            "default": 1,
            "expression": "((clockOffset >= 60 s))",
            "notifyOnClear": 0,
            "ruleId": 1234,
            "ruleName": "Default Agent Clock Offset Notification"
        },
        {
            "default": 1,
            "expression": "((lastContact >= 30 min))",
            "notifyOnClear": 0,
            "ruleId": 1244,
            "ruleName": "Default Agent Offline Notification"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
