---
parent_category: endpoint_instant
parent_category_label: Endpoint Instant Tests

path: '{{ site.version_url_prefix_request }}/endpoint-instant/{testId}/rerun'
title: 'Rerunning instant test'
type: POST

sortorder: 2
category-sortorder: 30
layout: null
---

{.inline-code} Reruns an existing Endpoint Instant test in ThousandEyes. In order to rerun an Instant test, the user attempting this must have `Edit endpoint tests` permission.

### Request

* `{testId}` the ID of the Instant test you wish to rerun.
* There is no request body for this request.

### Response

There is no response body for this request. See the example below.

Once the instant test is reran, results can be retrieved using [Endpoint Test Data][endpoint-test-data] endpoints.

### Example

`$curl -X POST -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-instant/348811/rerun \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

`HTTP/1.1 200 OK
Server: nginx
Date: Tue, 14 Mar 2017 18:10:22 GMT
Content-Length: 0
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 969
X-Organization-Rate-Limit-Reset: 1489515060
X-Instant-Test-Rate-Limit-Limit: 97
X-Instant-Test-Rate-Limit-Remaining: 96
X-Instant-Test-Rate-Limit-Reset: 1489515060
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3`

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
