---
parent_category: credentials
parent_category_label: Credentials

path: '{{ site.version_url_prefix_request }}/credentials/{credentialId}/update'
title: 'Updating a credential'
type: POST

sortorder: 4
category-sortorder: 15.1
layout: nil
---

Updates a credential in ThousandEyes, based on properties provided in the POST data. In order to update a credential, the user attempting the creation must have permission to update tests & should have access to the credential (same account)

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information.

### Request

* `{credentialId}` corresponds to the unique ID of the credential to be updated, obtained through the `/credentials` endpoint
* Request body should contain fields to be set during update.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
name | string | n/a | The name of the credential
value | string | n/a | The value of the credential that will be encrypted (if the user has permission to read sensitive data)


### Response

If a credential is successfully edited, an HTTP/200 OK response will be returned, and the credential definition (without its value) will be returned. 

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
credentialId | integer | n/a | unique ID of the credential
name | string | n/a | The name of the credential
apiLinks | object | n/a | The reference to this credential


### Example

Please note, credential creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/credentials/405/update.json \
  -d '{
        "value":"updated password"
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
