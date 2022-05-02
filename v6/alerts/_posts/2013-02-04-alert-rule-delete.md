---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-rules/{ruleId}/delete'
title: 'Deleting an alert rule'
type: POST

sortorder: 8
category-sortorder: 45
layout: null
---

Deletes an alert rule in your account.  In order to delete an alert rule, the user attempting the creation must be in a role that has the Edit alert rules permission, as well as Edit Tests permission, in the event that the alert rule is assigned to any tests.  Users without appropriate permissions will receive an error.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{ruleId}` corresponds to a ruleId returned by the `/alert-rules` endpoint. 

### Example

Please note, object creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-rules/1234/delete.json \
  -d '' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

Response header will be returned as HTTP/204 response code.  No response body will be returned.

#### Header

```HTTP/1.1 204 No Content
Date: Fri, 12 Jul 2019 22:11:49 GMT
Connection: keep-alive
X-Server-Name: 9gxxn
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 239
X-Organization-Rate-Limit-Reset: 1562969520
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

```
```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
