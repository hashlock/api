---
parent_category: reports
parent_category_label: Reports

path: '{{ site.version_url_prefix_request }}/report-snapshots/{snapshotId}/delete'
title: 'Deleting a report snapshot'

sortorder: 13
category-sortorder: 55
type: POST

layout: null
---

{.inline-code}Deletes the specified report snapshot in ThousandEyes, based on the snapshotId provided in the API request. Users with the `Edit reports for all users in account group` permission (Account Admin) can delete any report snapshot. Users with `Edit own reports` permission (Regular User) can only delete the report snapshots for reports they have created.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{snapshotId}` the ID of the report snapshot you would like to delete

### Response

If the report snapshot is successfully deleted, an HTTP 204 NO CONTENT response will be returned. If user lacks the permissions to delete the report, an HTTP 401 UNAUTHORIZED response will be returned.

Response has no body.

### Example

Please note, report snapshot deletion is not allowed on the Sandbox API account, and will not work if attempted. The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com/v6/report-snapshot/2bee381c-cc97-49f4-9ef5-1013c97f4124/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 No Content
Server: nginx
Date: Thu, 13 Apr 2017 09:43:28 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1492076520
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
