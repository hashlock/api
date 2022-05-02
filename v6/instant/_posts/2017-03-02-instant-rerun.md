---
parent_category: instant
parent_category_label: Instant tests

path: '{{ site.version_url_prefix_request }}/instant/{testId}/rerun'
title: 'Instant test rerun'
type: POST

sortorder: 2
category-sortorder: 5
layout: null
---

Reruns an existent Instant test in ThousandEyes. In order to rerun an Instant test, the user attempting the rerun must be a Regular user or have the following permissions:
* API Access
* View tests

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` the ID of the Instant test you wish to rerun.
* There is no request body for this request.

### Response

There is no response body for this request. See the example below.

Once the instant test is reran, results can be retrieved using [Test Data][test-data] endpoints.

### Example

Please note, Instant tests are not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

`$curl -X POST -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/instant/344811/rerun \
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
