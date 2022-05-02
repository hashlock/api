---
parent_category: credentials
parent_category_label: Credentials

path: '{{ site.version_url_prefix_request }}/credentials/new'
title: 'Creating a credential'
type: POST

sortorder: 3
category-sortorder: 15.1
layout: null
---

Creates a new credential in ThousandEyes, based on properties provided in the POST data. In order to create a new credential, the user attempting the creation must have permission to create tests.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information.

### Request

* Request body should contain both a name and value to be set during creation.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
name | string | n/a | The name of the credential
value | string | n/a | The value of the credential that will be encrypted (if the user has permission to read sensitive data)

### Response

If a credential is successfully created, an HTTP/201 CREATED response will be returned, and the credential definition (without its value) will be returned.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
credentialId | integer | n/a | unique ID of the credential
name | string | n/a | The name of the credential
apiLinks | object | n/a | The reference to this credential

### Example

Please note, credential creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/credentials/new.json \
  -d '{
        "name": "new_api_credential",
        "value": "secret p@ssword"
      }' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
```

#### Header

```HTTP/1.1 201 CREATED
Date: Fri, 15 Nov 2019 19:46:31 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: 8xb13
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 239
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
