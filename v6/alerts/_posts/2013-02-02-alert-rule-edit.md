---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-rules/{ruleId}/update'
title: 'Updating an alert rule'
type: POST

sortorder: 7
category-sortorder: 45
layout: null
---

Modifies an existing alert rule in your account, based on properties provided in the POST data.  In order to modify an alert rule, the user attempting the creation must be in a role that has the Edit alert rules permission.  Users without this permission will receive an error.

Note: when assigning any alert rule to a test (which can be done as part of the update activity), the user must be in a role that has the Edit tests permission.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{ruleId}` corresponds to a ruleId returned by the `/alert-rules` endpoint. 
* request body must contain a full list of fields.  It is recommended to make a request to the `alert-rules/{ruleId}` endpoint and modify the conditions of the alert rule based on fields returned in that request.  See the [Alert Rule Metadata][alert-rule-metadata] page for fields available during alert rule modification.

### Example

Please note, object creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/123/update \
  -H 'Content-Type: application/json' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -d '{
  "alertType": "FTP",
  "default": 0,
  "expression": "((reachability < 90%))",
  "minimumSources": 10,
  "notes": "FTP Alert rule created using write api",
  "description": "TE FTP Alert rule with write api",
  "notifications": {
    "email": {
        "message": "",
        "recipient": [
            "noreply@thousandeyes.com"
        ]
    },
    "thirdParty": [
      {
        "integrationId": "sl-101",
        "integrationType": "SLACK"
      }
    ],
    "webhook": [
      {
        "integrationId": "wb-201",
        "integrationType": "WEBHOOK"
      }
    ]
  },
  "notifyOnClear": 1,
  "roundsViolatingOutOf": 10,
  "roundsViolatingRequired": 10,
  "roundsViolatingMode": "ANY",
  "ruleName": "FTP Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1001,
    1002
  ],
  "severity": "INFO"
}'`

### Response

If successful, will respond with an HTTP/200 response and the modified rule definition in the body.

#### Header

```HTTP/1.1 200 OK
Date: Fri, 12 Jul 2019 22:06:04 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Server-Name: ldkvx
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1562969220
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

```{
  "alertRuleId": 1234,
  "alertType": "FTP",
  "default": 0,
  "expression": "((reachability < 90%))",
  "minimumSources": 10,
  "notes": "FTP Alert rule created using write api",
  "description": "TE FTP Alert rule with write api",
  "notifications": {
    "email": {
        "message": "",
        "recipient": [
            "noreply@thousandeyes.com"
        ]
    },
    "thirdParty": [
      {
        "integrationId": "sl-101",
        "integrationType": "SLACK"
      }
    ],
    "webhook": [
      {
        "integrationId": "wb-201",
        "integrationType": "WEBHOOK"
      }
    ]
  },
  "notifyOnClear": 1,
  "roundsViolatingOutOf": 10,
  "roundsViolatingRequired": 10,
  "roundsViolatingMode": "ANY",
  "ruleName": "FTP Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1001,
    1002
  ],
  "severity": "INFO"
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
