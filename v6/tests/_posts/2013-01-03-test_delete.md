---
parent_category: tests
parent_category_label: Tests

path: '{{ site.version_url_prefix_request }}/tests/{testType}/{testId}/delete'
title: 'Deleting a test'
type: POST

sortorder: 7
category-sortorder: 10
layout: null
---

Deletes the specified test in ThousandEyes, based on the testId provided in the API request.   In order to delete a test, the user attempting the creation must be an Account Admin.

Regular users are blocked from using any of the POST-based methods.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testType}` corresponds to any of the following options:
  * bgp
  * agent-to-server
  * agent-to-agent
  * http-server
  * page-load
  * transactions
  * web-transactions
  * ftp-server
  * dns-trace
  * dns-server
  * dns-dnssec
  * sip-server
  * voice (RTP Stream)
* `{testId}` corresponds to a testId of the type specified by `{testType}`, see the test list endpoint for a listing of tests.
* The request body must be provided, but should be empty

### Response

If a test is successfully deleted, an HTTP/204 NO CONTENT response will be returned, and an empty JSON response will be in the body of the response.


### Example

Please note, test creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests/agent-to-server/811/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 NO CONTENT
Date: Thu, 07 Nov 2013 07:32:48 GMT
Server: Apache/2.2.22 (Ubuntu)
Transfer-Encoding: chunked
Content-Type: application/json
Connection: keep-alive
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 224
X-Organization-Rate-Limit-Reset: 1492608660
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

* The body of a delete request will be empty.

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
