---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/roles/{roleId}'
title: 'Role detail'
type: GET

sortorder: 11
category-sortorder: 60

layout: null
---

Returns detailed information about a role, defining role name, ID and assigned permissions.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* `{roleId}` is the unique ID for the role
* There is no request body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/roles/280871.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

If successful, returns role details, including role name and assigned permissions.

Field | Data Type | Notes
:------------|-------------|-------------|
roleName | string | the name of the role
roleId | integer | unique ID of the role
hasManagementPermissions | integer | if the role is assigned any management permissions, this value will be 1.  Otherwise, 0
builtin | integer | 1 for built-in roles (Account Admin, Organization Admin, Regular User), 0 for user-defined roles
permissions | list of permission objects | see below
permissions.permissionId | integer | system-defined unique ID of the permission
permissions.label | string | label corresponding to the permission
permissions.isManagementPermission | integer | 1 if the permission is classified as a management permission, 0 Otherwise

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
    "roles": [
        {
            "builtin": 0,
            "roleId": 280871,
            "roleName": "API User",
            "permissions": [
                {
                    "isManagementPermission": 0,
                    "label": "View reports",
                    "permissionId": 8
                },
                {
                    "isManagementPermission": 0,
                    "label": "View snapshots",
                    "permissionId": 11
                },
                ...
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
