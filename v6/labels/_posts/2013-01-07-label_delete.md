---
parent_category: labels
parent_category_label: Labels

path: '{{ site.version_url_prefix_request }}/groups/{groupId}/delete'
title: 'Deleting a label'
type: POST

sortorder: 7
category-sortorder: 50
layout: null
---

{.inline-code}Deletes a label (formerly called group) currently configured in ThousandEyes.  Note that built-in labels (with negative `groupId` numbers) are not eligible for deletion.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `groupId` the label that you wish to delete, found in either the `/groups` or the `/groups/{type}` endpoint.
* No request body

### Response

{.inline-code}Returns an `HTTP/204 NO CONTENT` response.  

### Example

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/groups/1356/delete \
  -d '' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 NO CONTENT
Server: nginx
Date: Tue, 15 Mar 2016 00:20:26 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 227
X-Organization-Rate-Limit-Reset: 1493730300
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

* The body of a delete request will be empty.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
