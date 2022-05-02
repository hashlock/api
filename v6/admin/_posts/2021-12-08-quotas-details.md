---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/quotas'
title: 'Obtaining usage quota'
type: GET

sortorder: 16
category-sortorder: 60

layout: null
---

{.inline-code}This endpoint returns organization and account groups usage quotas. This endpoint requires the `Edit organization and account group quotas` permission (a management permission). For users who have quota update permission in multiple organizations, the API will return data from all such organizations.

### Optional Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

* There is no request body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/quotas.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back detailed usage quota information about the organization.  Users in roles with insufficient permissions will receive an HTTP/403 response.

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
organizationQuota | object | optional | JSON object with properties `orgId` (optional) and `value`. Null `value` will unset the organization quota
accountGroupQuotas | list of account group quota objects | optional | Each account group quota object should have properties `aid` and `value`. Null `value` will unset the account group quota for given aid.

#### Header

```HTTP/1.1 200 OK
Date: Fri, 17 Jan 2020 17:59:14 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: r1grs
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 1000
X-Organization-Rate-Limit-Remaining: 999
X-Organization-Rate-Limit-Reset: 1579284000
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
```

#### Body

```{
    "quotas": [
        {
            "organizationQuota": {
                "value": 2500000000,
                "orgId": 1
            },
            "accountGroupQuotas": [
                {
                    "value": 226000,
                    "aid": 100
                },
                {
                    "value": 268000,
                    "aid": 101
                },
                {
                    "value": 151000,
                    "aid": 102
                }
            ]
        },
        {
            "organizationQuota": {
                "value": 1100000000,
                "orgId": 2
            },
            "accountGroupQuotas": [
                {
                    "value": 226000,
                    "aid": 200
                }
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
