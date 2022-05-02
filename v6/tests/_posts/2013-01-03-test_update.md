---
parent_category: tests
parent_category_label: Tests

path: '{{ site.version_url_prefix_request }}/tests/{testType}/{testId}/update'
title: 'Updating a test'
type: POST
sortorder: 6
category-sortorder: 10
layout: nil
---

Updates a test in ThousandEyes, based on properties provided in the POST data.  In order to edit a test, the user attempting the creation must be an Account Admin, and the target test cannot be a live share or saved event.

Regular users are blocked from using any of the POST-based methods.

Note: When creating or updating a test and assigning alert rules, that alert rules are based on specific measurements being available.  For example, when creating an HTTP server test with network measurements disabled, you will not be able to assign any alert rules that are based on network metrics.  The same applies to BGP measurements.

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
* `{testId}` corresponds to a testId of the type specified by `{testType}`, see the test list endpoint for a listing of tests
* Request body should contain fields to be set during creation.  See the [Test Metadata][test-metadata] page for fields available during test creation

### Response

If a test is successfully edited, an HTTP/200 OK response will be returned, and the test definition will be returned.  The modifiedBy and modifiedDate fields should be updated according to the user who edited the account; See the example below:

### Example

Please note, test creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests/http-server/817/update.json \
  -d '{ "interval": 900,
        "agents": [
          {"agentId": 117}
        ],
       "testName": "Edited test name for API network test addition for www.thousandeyes.com"
      }' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 227
X-Organization-Rate-Limit-Reset: 1492608660
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
