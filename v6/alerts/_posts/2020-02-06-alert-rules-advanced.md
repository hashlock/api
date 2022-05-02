---
parent_category: alerts
parent_category_label: Alerts & Notifications

title: 'Creating an advanced Alert Rule'

sortorder: 56
category-sortorder: 45
layout: null
---

* When creating an alert rule from API the alerting logic is specified in the `expression` Keyword. Below are examples for complex Alert Rules which apply to a specific set of Agents and have other complex logic.

## Alert only for specific agents

* Alert rules applicable to specific agents can be created by adding a `locationId` keyword with an `in` operator, followed by agentIds of the Agents applicable to the rule.

### Example Expression

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/new \
  -H 'Content-Type: application/json' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -d '{
    "alertType": "HTTP Server",
  "default": 0,
  "expression": "[(locationId in {\"58\", \"25\", \"7815\"})]((probDetail != \"\"))",
  "minimumSources": 10,
  "notes": "HTTP Alert rule for agentIds 58, 25 and 7815 only",
  "description": "TE HTTP Alert rule with write api",
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
  "ruleName": "HTTP Server Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1001,
    1002
  ],
  "severity": "INFO"
}'
```

### Response

If successful, will respond with an HTTP/201 response and a body which contains the new alert rule definition.

## Alert except  specific agents

* Alert rule applicable to  **all agents except** specific agents can be created by appending a `locationId` with a `!in` operator followed by `agentId`s of desired agents to the expression.

### Example Expression

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/new \
  -H 'Content-Type: application/json' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -d '{
  "alertType": "HTTP Server",
  "default": 0,
  "expression": "[(locationId !in {\"58\", \"25\", \"7815\"})]((probDetail != \"\"))",
  "minimumSources": 10,
  "notes": "HTTP Alert rule for all agentIds except 58, 25 and 7815",
  "description": "TE HTTP Alert rule with write api",
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
  "ruleName": "HTTP Server Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1001,
    1002
  ],
  "severity": "INFO"
}'
```

### Response

If successful, will respond with an HTTP/201 response and a body which contains the new alert rule definition.

## Alert when ALL conditions match

* Multiple conditions can be compounded with the `&&` (AND) operator in an `expression` to alert when **All** conditions match.

### Example Expression

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/new \
  -H 'Content-Type: application/json' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -d '{
  "alertType": "End-to-End (Agent)",
  "default": 0,
  "expression": "((probDetail != \"\") && (loss <= 10%) && (latency <= 50 ms))",
  "minimumSources": 10,
  "notes": "Alert only when all conditions match",
  "description": "TE Agent to Agent Alert rule with write api",
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
  "direction": "TO_TARGET",
  "roundsViolatingOutOf": 10,
  "roundsViolatingRequired": 10,
  "roundsViolatingMode": "ANY",
  "ruleName": "Agent to Agent Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1003,
    1004
  ],
  "severity": "INFO"
}'
```
### Response

If successful, will respond with an HTTP/201 response and a body which contains the new alert rule definition.

## Alert when ANY conditions match

* Multiple conditions can be combined with the `||` (OR) operator in an `expression` to alert when **ANY** conditions match.

### Example Expression

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/new \
  -H 'Content-Type: application/json' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -d '{
  "alertType": "End-to-End (Agent)",
  "default": 0,
  "expression": "((probDetail != \"\") || (loss <= 10%) || (latency <= 50 ms))",
  "minimumSources": 10,
  "notes": "Alert when any conditions match",
  "description": "TE Agent to Agent Alert rule with write api",
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
  "direction": "BIDIRECTIONAL",
  "roundsViolatingOutOf": 10,
  "roundsViolatingRequired": 10,
  "roundsViolatingMode": "ANY",
  "ruleName": "Agent to Agent Alert Rule",
  "sourceMeasure": "percent",
  "testIds": [
    1005,
    1006
  ],
  "severity": "INFO"
}'
```
### Response

If successful, will respond with an HTTP/201 response and a body which contains the new alert rule definition.

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
