---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-rules/{ruleId}'
title: 'Alert rule detail'
type: GET

sortorder: 4
category-sortorder: 45
layout: null
---

Returns details about an alert rule.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/322.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back detailed information about a specific alert rule.  If the ruleId doesn't exist or is inaccessible by your account, an empty response will be returned.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
ruleId | integer | n/a | unique ID of the alert rule
ruleName | string | n/a | name of the alert rule
expression | string | n/a | string expression of alert rule
direction | string | n/a | optional field with one of the following values: `TO_TARGET`, `FROM_TARGET`, `BIDIRECTIONAL`, for applicable alert types (eg. path trace, End-to-End (Agent) etc.)
notifications | object with notification properties | n/a | Alert notification object. See [Alert notification integrations][alert-integrations].
notifyOnClear | boolean | n/a | 1 to send notification when alert clears
default | boolean | n/a | Alert rules allow up to 1 alert rule to be selected as a default for each type.  By checking the default option, this alert rule will be automatically included on subsequently created tests that test a metric used in alerting here
alertType | string | n/a | type of alert rule, as determined by metric selection
minimumSources | integer | n/a | the minimum number of agents or monitors that must meet the specified criteria in order to trigger the alert
minimumSourcesPct | integer | n/a | the minimum percentage of all assigned agents or monitors that must meet the specified criteria in order to trigger the alert
roundsViolatingMode | string | n/a | `EXACT` requires that the same agent(s) meet the threshold in consecutive rounds; default is `ANY`
roundsViolatingOutOf | integer | n/a | applies to only v6 and higher, specifies the divisor (y value) for the "X of Y times" condition.
roundsViolatingRequired | integer | n/a | applies to only v6 and higher, specifies the numerator (x value) for the "X of Y times" condition
tests | array | n/a | list of tests alert rule is assigned to, expressed in the same format as `/tests` endpoint
severity | string | n/a | field with one of the following values: INFO, MAJOR, MINOR, CRITICAL for all alert types

{.inline-code}If Alert Rule has email notifications configured, `notifications` object has an `email` parameter. Email object has the following parameters:

Field Name | Data Type | Notes
:----------|-----------|----------|
recipient | array of email addresses | notification recipients are specified in an array of email addresses
message | string | additional content sent to notification recipients in alert emails

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
            "ruleId": 322,
            "ruleName": "Default BGP Alert Rule",
            "notes": "",
            "expression": "((reachability < 100%))",
            "notifications": {
                "email": {
                    "message": "",
                    "recipient": [
                        "noreply@thousandeyes.com"
                    ]
                },
                "thirdParty": [
                    {
                        "channel": "@primoz",
                        "integrationId": "sl-57",
                        "integrationName": "Slack to Primoz",
                        "integrationType": "SLACK",
                        "target": "https://hooks.slack.com/services/T0DXA4R8U/B2Y23HERL/uL3lz43raw1HfakeIDRChoOH"
                    },
                    {
                        "authMethod": "Auth Token",
                        "authToken": "a2b93fakeToken39feacf5fea49defacdc",
                        "authUser": "thousandeyes",
                        "integrationId": 1234,
                        "integrationName": "Frontend ThousandEyes",
                        "integrationType": "PAGER_DUTY"
                    }
                ]
            },
            "notifyOnClear": 0,
            "roundsBeforeTrigger": 1,
            "default": 1,
            "recipient": [],
            "alertType": "BGP",
            "tests": [
                {
                   "alertsEnabled": 1,
                   "bandwidthMeasurements": 0,
                   "bgpMeasurements": 1,
                   "contentRegex": "",
                   "createdBy": "Primoz (noreply@thousandeyes.com)",
                   "createdDate": "2016-12-14 19:18:51",
                   "enabled": 1,
                   "followRedirects": 1,
                   "httpInterval": 120,
                   "httpTargetTime": 1000,
                   "httpTimeLimit": 5,
                   "includeHeaders": 0,
                   "interval": 300,
                   "liveShare": 0,
                   "modifiedBy": "Primoz (noreply@thousandeyes.com)",
                   "modifiedDate": "2017-04-07 11:08:47",
                   "mtuMeasurements": 0,
                   "networkMeasurements": 1,
                   "pageLoadTargetTime": 6,
                   "pageLoadTimeLimit": 10,
                   "savedEvent": 0,
                   "sslVersion": "Auto",
                   "sslVersionId": 0,
                   "testId": 35180,
                   "testName": "Google PL",
                   "type": "page-load",
                   "url": "http://google.com",
                   "useNtlm": 0,
                   "verifyCertificate": 1
               }
            ],
            "severity": "INFO"
        },
        {
            "ruleId": 300,
            "ruleName": "Default DNS Server Alert Rule",
            "notes": "",
            "expression": "((probDetail != \"\"))",
            "minimumSources": 2,
            "notifyOnClear": 0,
            "roundsBeforeTrigger": 1,
            "default": 1,
            "recipient": [
                "noreply@thousandeyes.com"
            ],
            "alertType": "DNS Server",
            "severity": "MAJOR"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
