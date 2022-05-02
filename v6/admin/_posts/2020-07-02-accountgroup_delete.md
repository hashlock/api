---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/account-groups/{aid}/delete'
title: 'Deleting an account group'
type: POST

sortorder: 4.1
category-sortorder: 60

layout: null
---

{.inline-code}Deletes an account group.  Requires the following permissions to be assigned to the user making the request:
* Assign management permissions
* Delete account
* Edit all account groups

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the organization context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error. This must not match the account group to be deleted.

### Request

* `{aid}` account group to delete.
* There is no request body for this request.

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups/31415/delete.json \
    -d '' \
    -H "Content-Type: application/json" \
    -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If the deletion is successful, will return an HTTP/204 response code with an empty response body.

#### Header

```HTTP/1.1 204 No Content
Server: nginx
Date: Sat, 04 Jul 2020 16:21:59 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 223
X-Organization-Rate-Limit-Reset: 1493736900
Strict-Transport-Security: max-age=31536000
X-Server-Name: shplv```

#### Body

Empty response body.

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
