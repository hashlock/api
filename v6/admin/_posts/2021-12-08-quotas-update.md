---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/quotas'
title: 'Updating usage quotas'
type: POST

sortorder: 16
category-sortorder: 60

layout: null
---

{.inline-code}This endpoint allows the user to update organization and account groups usage quotas for all the organizations where user has `Edit organization and account group quotas` permission (a management permission). The successful response will return the latest quota values.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* Request body is an array of JSON objects, that allows the user to update account group and organization quotas for multiple organizations where user has quota update permission. Each JSON object can have these fields below:

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
organizationQuota | object | optional | JSON object with properties `orgId` (optional) and `value`. Null `value` will unset the organization quota
accountGroupQuotas | list of account group quota objects | optional | Each account group quota object should have properties `aid` and `value`. Null `value` will unset the account group quota for given aid.

### Example

```
$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/quotas/ \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '[
        {
            "organizationQuota": {
                "value": 2500000000,
                "orgId": 1
            },
            "accountGroupQuotas": [
                {
                    "value": 226000,
                    "aid": 38036
                },
                {
                    "value": 268000,
                    "aid": 38730
                },
                {
                    "value": 151000,
                    "aid": 45022
                }
            ]
        }
]' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
  ```

### Response

If successful, returns an HTTP/200 status code, as well as the list of updated usage quotas.

#### Header

```
HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 233
X-Organization-Rate-Limit-Reset: 1493736900
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3
```

#### Body

```
{
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
        }
    ]
}
```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
