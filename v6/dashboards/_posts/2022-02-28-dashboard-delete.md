---
parent_category: dashboards
parent_category_label: Dashboards

path: '{{ site.version_url_prefix_request }}/dashboards/{dashboardId}/delete'
title: 'Deleting a dashboard'

sortorder: 4
category-sortorder: 55
type: POST

layout: null
---

{.inline-code}Deletes the specified dashboard in ThousandEyes, based on the dashboardId provided in the API request. Users with the `Edit dashboard templates for all users in account group` permission (Account Admin) can delete any dashboard. Users with `Edit own dashboard templates` permission (Regular User) can only delete the dashboards they have created.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{dashboardId}` the ID of the dashboard you would like to delete

### Response

If the dashboard is successfully deleted, an HTTP 204 NO CONTENT response will be returned. If user lacks the permissions to delete the dashboard, an HTTP 401 UNAUTHORIZED response will be returned.

Response has no body.

### Example

Please note, dashboard deletion is not allowed on the Sandbox API account, and will not work if attempted. The following example is presented for documentation and reference purposes only.

```$ curl -i https://api.thousandeyes.com/v6/dashboards/58c9437149b02d5410fd06cd/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 204 No Content
Server: nginx
Date: Tue, 01 Mar 2022 22:50:32 GMT
Content-Type: application/json;charset=UTF-8
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1489585680
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
