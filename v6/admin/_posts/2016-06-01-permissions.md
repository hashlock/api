---
parent_category: admin
parent_category_label: Administrative endpointst

path: '{{ site.version_url_prefix_request }}/permissions'
title: 'Permission list'
type: GET

sortorder: 14
category-sortorder: 60

layout: null
---

Returns a list of all assignable permissions, which is used in the context of modifying roles.

Users must be in a role that is assigned managment permissions in order to access this endpoint.  Users without management permissions attempting to access this endpoint will have an HTTP/403 response code returned.

### Optional Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* There is no request body for this request.
* There are no request parameters for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/permissions.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of permissions.

Field | Data Type | Notes
:------------|-------------|-------------|
permissionId | integer | unique ID of the permission
label | string | label for the permission (as shown in the ThousandEyes roles interface)
isManagementPermission | integer | 1 if the permission is classified as a management permission,  0 Otherwise

#### Header

```HTTP/1.1 200 OK
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

```{
    "permissions": [
        {
            "permissionId": 1,
            "label": "Assign users emails to alerts",
            "isManagementPermission": 0
        },
        {
            "permissionId": 51,
            "label": "View billing",
            "isManagementPermission": 1
        },
        ...
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
