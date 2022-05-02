---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/users/{uid}/delete'
title: 'Deleting a user'
type: POST

sortorder: 9
category-sortorder: 60

layout: null
---

{.inline-code}Deletes a user.  Requires `Edit users in all account groups` or `Edit users` permissions to be assigned to the user making the request.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* `uid={uid}` is the unique user ID for the user to delete.
* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* There is no request body for this request.

### Example

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/users/3914/delete.json \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d '' \
    -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If the deletion is successful, will return an HTTP/204 response code with an empty response body.

#### Header

```HTTP/1.1 204 No Content
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 233
X-Organization-Rate-Limit-Reset: 1493736900
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

Empty response body.

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
