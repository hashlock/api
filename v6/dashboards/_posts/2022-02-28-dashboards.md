---
parent_category: dashboards
parent_category_label: Dashboards

path: '{{ site.version_url_prefix_request }}/dashboards'
title: 'Dashboards list'

sortorder: 1
category-sortorder: 55
type: GET

layout: null
---

{.inline-code}This endpoint returns a list of dashboards configured in ThousandEyes in the context of the user's current account group. Use this data to find a dashboard in your account, which is then used in other endpoints to access aggregated data.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dashboards.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of dashboards configured in the current account group. Each dashboard contains the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
id | string | unique Id of the dashboard
name | string | title of the dashboard
isBuiltIn | boolean | true for built-in dashboards, false for user-created dashboards
createdBy | integer | ID of the user that created the dashboard
modifiedBy | integer | ID of the user that last modified the dashboard
modifiedDate | dateTime | the date/time when the dashboard was last modified
accountId | integer | ID of the account that the dashboard belongs to
isPrivate | boolean | true if this dashboard is private
isDefaultForUser | boolean | true if this dashboard is the default for the user, false otherwise
isDefaultForAccount | boolean | true if this dashboard is the default for the account group, false otherwise
apiLinks | array of apiLink objects | a list of links which can be followed to pull more information

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Tue, 01 Mar 2022 17:53:57 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1492076520
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
       "dashboards": [
           {
               "id": "620ecb8e0112131fa51e263e",
               "name": "Dashboard Title A",
               "isBuiltIn": false,
               "createdBy": 6699,
               "modifiedBy": 6699,
               "modifiedDate": "2022-02-22 18:10:04",
               "accountId": 11,
               "isPrivate": false,
               "isDefaultForUser": false,
               "isDefaultForAccount": false,
               "apiLinks": [...]
           },
           ...
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
