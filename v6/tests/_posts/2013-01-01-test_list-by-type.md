---
parent_category: tests
parent_category_label: Tests

path: '{{ site.version_url_prefix_request }}/tests/{testType}'
title: 'Test list by type'
type: GET

sortorder: 2
category-sortorder: 10

layout: null
---

{.inline-code}Returns a list of all tests of the type specified, configured in ThousandEyes.  Also returns data for saved events, which are indicated by a boolean field, `"savedEvent": 1`

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testType}` corresponds to any of the following options:
  * agent-to-server
  * agent-to-agent
  * bgp
  * http-server
  * page-load
  * transactions
  * web-transactions
  * ftp-server
  * dns-trace
  * dns-server
  * dns-dnssec
  * dnsp-domain
  * dnsp-server
  * sip-server
  * voice (RTP Stream)
* There is no request body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests/http-server.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of tests of that type.  See [Test Metadata][test-metadata] page for information on fields returned by this endpoint.

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 19 Apr 2017 13:29:40 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1492608600
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-5```

#### Body

```{
    "test": [
        {
            "enabled": 1,
            "testId": 817,
            "testName": "http://www.thousandeyes.com",
            "interval": 900,
            "url": "http://www.thousandeyes.com",
            "modifiedDate": "2013-05-11 02:02:21",
            "networkMeasurements": 1,
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2012-06-28 19:33:12",
            "apiLinks": [...]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
