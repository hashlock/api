---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-suppression-windows/{alertSuppressionWindowId}/delete'
title: 'Deleting an alert suppression window'
type: POST

sortorder: 55
category-sortorder: 45
layout: null
---

Deletes an alert suppression window.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* {alertSuppressionWindowId} corresponds to the id of an alertSuppressionWindow, see the alert suppression window list endpoint for a listing of alert suppression windows.
* No request body

### Example

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-suppression-windows/217/delete.json \
  -d '' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
  -H "Content-Type: application/json"```

### Response

If an alert suppression window is successfully deleted, an HTTP/204 NO CONTENT response will be returned, and an empty JSON response will be in the body of the response.

#### Header

```HTTP/1.1 204 NO CONTENT
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

* The body of a delete request will be empty.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
