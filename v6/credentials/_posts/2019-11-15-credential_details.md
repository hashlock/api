---
parent_category: credentials
parent_category_label: Credentials

path: '{{ site.version_url_prefix_request }}/credentials/{credentialId}'
title: 'Credential details'
type: GET

sortorder: 2
category-sortorder: 15.1
layout: null
---

{.inline-code}Returns details for a credential, including test name, reference & value (value is only visible if the user has `View sensitive data in web transaction` permission). The user should have access to this credential by sharing the same account and must have the `View tests` permission.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information.

### Request

* `{credentialId}` the ID of the credential you wish to retrieve
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
credentialId | integer | n/a | unique ID of the credential
name | string | n/a | The name of the credential
value | string | n/a | The value of the credential that will be encrypted (if the user has permission to read sensitive data)
apiLinks | object | n/a | The reference to this credential

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/credentials/405.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Date: Fri, 15 Nov 2019 19:36:19 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: f72ql
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 228
X-Organization-Rate-Limit-Reset: 1573846620
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

```{
    "credentials": [
        {
            "credentialId": 405,
            "name": "Example Credential 1",
            "apiLinks": [
                {
                    "rel": "self",
                    "href": "https://api.thousandeyes.com/v6/credentials/405"
                }
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
