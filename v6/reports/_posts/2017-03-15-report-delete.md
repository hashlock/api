---
parent_category: reports
parent_category_label: Reports

path: '{{ site.version_url_prefix_request }}/reports/{reportId}/delete'
title: 'Deleting a report'

sortorder: 4
category-sortorder: 55
type: POST

layout: null
---

{.inline-code}Deletes the specified report in ThousandEyes, based on the reportId provided in the API request. Users with the `Edit reports for all users in account group` permission (Account Admin) can delete any report. Users with `Edit own reports` permission (Regular User) can only delete the reports they have created.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{reportId}` the ID of the report you would like to delete

### Response

If the report is successfully deleted, an HTTP 204 NO CONTENT response will be returned. If user lacks the permissions to delete the report, an HTTP 401 UNAUTHORIZED response will be returned.

Response has no body.

### Example

Please note, report deletion is not allowed on the Sandbox API account, and will not work if attempted. The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com/v6/reports/58c9437149b02d5410fd06cd/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 No Content
Server: nginx
Date: Wed, 15 Mar 2017 13:47:45 GMT
Content-Type: application/json;charset=UTF-8
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1489585680
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
