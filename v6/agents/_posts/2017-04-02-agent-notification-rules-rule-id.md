---
parent_category: agents
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/agent-notification-rules/{ruleId}'
title: 'Agent Notification Rule Detail'
type: GET

sortorder: 61
category-sortorder: 40
layout: null
---

Returns details of an agent notification rule, including agents it is assigned to.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agent-notification-rules/1234.json \
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
agents | collection | n/a | list of agent objects this rule is assigned to
notifications | object | n/a | alert notification object; see [Alert notification integrations][alert-integrations].

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Tue, 11 Apr 2017 13:41:58 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 598
X-Organization-Rate-Limit-Reset: 1491918120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "agentAlertRules": [
        {
            "default": 1,
            "expression": "((lastContact >= 30 min))",
            "notifyOnClear": 0,
            "ruleId": 1234,
            "ruleName": "Default Agent Offline Notification",
            "notifications": {
                "email": {
                    "message": "Test",
                    "recipient": [
                        "noreply@thousandeyes.com"
                    ]
                },
                "thirdParty": [
                    {
                        "channel": "@primoz",
                        "integrationId": "sl-57",
                        "integrationName": "Slack Primoz",
                        "integrationType": "SLACK",
                        "target": "https://hooks.slack.com/services/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"
                    }
                ],
                "webhook": [
                    {
                        "integrationId": "wb-41",
                        "integrationName": "Test Hooks",
                        "integrationType": "WEBHOOK",
                        "target": "https://example.com/hook"
                    }
                ]
            },
            "agents": [
                {
                    "agentId": 3113,
                    "agentName": "csc-statuspage",
                    "agentState": "Disabled",
                    "agentType": "Enterprise",
                    "countryId": "US",
                    "createdDate": "2017-03-31 04:33:52",
                    "enabled": 0,
                    "hostname": "csc-statuspage",
                    "ipAddresses": [
                        "10.100.100.200"
                    ],
                    "ipv6Policy": "FORCE_IPV4",
                    "keepBrowserCache": 0,
                    "lastSeen": "2017-04-05 01:14:05",
                    "location": "San Francisco Bay Area",
                    "network": "Cogent Communications (AS 174)",
                    "prefix": "38.0.0.0/8",
                    "publicIpAddresses": [
                        "38.122.0.1"
                    ],
                    "verifySslCertificates": 1
                },
                {
                    "agentId": 3116,
                    "agentName": "csc-ubuntu-docker",
                    "agentState": "Disabled",
                    "agentType": "Enterprise",
                    "countryId": "US",
                    "createdDate": "2017-03-31 04:34:11",
                    "enabled": 0,
                    "hostname": "csc-ubuntu-docker",
                    "ipAddresses": [
                        "10.100.20.201"
                    ],
                    "ipv6Policy": "FORCE_IPV4",
                    "keepBrowserCache": 0,
                    "lastSeen": "2017-04-20 14:54:39",
                    "location": "San Francisco Bay Area",
                    "network": "Cogent Communications (AS 174)",
                    "prefix": "38.0.0.0/8",
                    "publicIpAddresses": [
                        "38.122.0.1"
                    ],
                    "verifySslCertificates": 1
                }
            ]
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
