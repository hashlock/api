---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-rules'
title: 'Alert rules'
type: GET

sortorder: 3
category-sortorder: 45
layout: null
---

Returns a list of all alert rules configured under your account in ThousandEyes.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of alert rules, indicating ruleID, whether or not the alert is enabled, recipient lists, and the rule criteria and clearing logic.  Default rules for each type are indicated with a bit response (1 or 0); default alert rules are assigned by default to each type of test to which they apply.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
ruleId | integer | n/a | unique ID of the alert rule
ruleName | string | n/a | name of the alert rule
expression | string | n/a | string expression of alert rule
direction | string | n/a | optional field with one of the following values: `TO_TARGET`, `FROM_TARGET`, `BIDIRECTIONAL`, for applicable alert types (eg. path trace, End-to-End (Agent) etc.)
notifyOnClear | boolean | n/a | 1 to send notification when alert clears
default | boolean | n/a | Alert rules allow up to 1 alert rule to be selected as a default for each type.  By checking the default option, this alert rule will be automatically included on subsequently created tests that test a metric used in alerting here
alertType | string | n/a | type of alert rule, as determined by metric selection
minimumSources | integer | n/a | the minimum number of agents or monitors that must meet the specified criteria in order to trigger the alert
minimumSourcesPct | integer | n/a | the minimum percentage of all assigned agents or monitors that must meet the specified criteria in order to trigger the alert
roundsViolatingMode | string | n/a | `EXACT` requires that the same agent(s) meet the threshold in consecutive rounds; default is `ANY`
roundsViolatingOutOf | integer | n/a | applies to only v6 and higher, specifies the divisor (y value) for the "X of Y times" condition.
roundsViolatingRequired | integer | n/a | applies to only v6 and higher, specifies the numerator (x value) for the "X of Y times" condition
severity | string | n/a | field with one of the following values: INFO, MAJOR, MINOR, CRITICAL for all alert types

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1493373360
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-1```

#### Body

```{
    "alertRules": [
    {
        "alertType": "Path Trace",
        "default": 0,
        "expression": "((hops((hopDelay >= 100 ms))))",
        "minimumSources": 1,
        "notifyOnClear": 1,
        "roundsViolatingOutOf": 10,
        "roundsViolatingRequired": 9,
        "ruleId": 99453,
        "ruleName": "The End of the Internet",
        "severity": "INFO"
    },
    {
        "alertType": "HTTP Server",
        "default": 0,
        "expression": "((errorType != \"None\"))",
        "minimumSourcesPct": 30,
        "notifyOnClear": 1,
        "roundsViolatingOutOf": 1,
        "roundsViolatingRequired": 1,
        "ruleId": 127094,
        "ruleName": "The End of the World",
        "severity": "CRITICAL"
    }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
