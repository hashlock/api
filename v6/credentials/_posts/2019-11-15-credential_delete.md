---
parent_category: credentials
parent_category_label: Credentials

path: '{{ site.version_url_prefix_request }}/credentials/{credentialId}/delete'
title: 'Deleting a credential'
type: POST

sortorder: 5
category-sortorder: 15.1
layout: null
---

Deletes the specified credential in ThousandEyes, based on the credentialID provided in the API request.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information.

### Request

* The request body must be provided, but should be empty

### Response

If a credential is successfully deleted, an HTTP/204 NO CONTENT response will be returned, and an empty JSON response will be in the body of the response.


### Example

Please note, credential creation/modification/deletion is not allowed on the Sandbox API account, and will not work if attempted.  The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/credentials/405/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 No Content
Date: Fri, 15 Nov 2019 20:24:33 GMT
Content-Type: application/json;charset=UTF-8
Connection: keep-alive
X-Server-Name: fjxcv
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 236
X-Organization-Rate-Limit-Reset: 1573849500
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff```

#### Body

* The body of a delete response will be empty.

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
