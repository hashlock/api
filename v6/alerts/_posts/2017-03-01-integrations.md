---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/integrations'
title: 'Alert notification integrations'
type: GET

sortorder: 41
category-sortorder: 45
layout: null
---

Returns a list of all alert notification integrations (webhooks, PagerDuty, Slack, ...)

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/integrations.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns an object with two array properties: *thirdParty* and *webhook*.

*thirdParty* array objects reflect the following content:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
integrationId | integer | n/a | unique ID of the integration
integrationName | string | n/a | name of the integration
integrationType | string | n/a | type of the integration, `PAGER_DUTY` or `SLACK`
target | string | n/a | target URL of the integration
authMethod | string | n/a | (PagerDuty only) always set to `Auth Token`
authUser | string | n/a | (PagerDuty only) PagerDuty user
authToken | string | n/a | (PagerDuty only) authentication token
channel | string | n/a | (Slack only) Slack `#channel` or `@user`

*webhook* array objects reflect the following content:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
integrationId | integer | n/a | unique ID of the integration
integrationName | string | n/a | name of the integration
integrationType | string | n/a | type of the integration, always set to `WEBHOOK`
target | string | n/a | target URL of the integration

#### Body

```{
    "integrations": {
        "thirdParty": [
            {
                "authMethod": "Auth Token",
                "authToken": "0a4693462246893f9393ed8ab2bf22f69",
                "authUser": "te",
                "integrationId": 123,
                "integrationName": "Jira Thousandeyes",
                "integrationType": "PAGER_DUTY"
            },
            {
                "channel": "@primoz",
                "integrationId": 789,
                "integrationName": "ThousandEyes Private",
                "integrationType": "SLACK",
                "target": "https://hooks.slack.com/services/T3G3DA1EY/B3243AG4Q/kwGHQz126speipc3E0e0Hx"
            }
        ],
        "webhook": [
            {
                "integrationId": 999,
                "integrationName": "Alert ThousandEyes",
                "integrationType": "WEBHOOK",
                "target": "https://webhooker.example.com/alert/z126g4a3f2a"
            }
        ]
    }
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
