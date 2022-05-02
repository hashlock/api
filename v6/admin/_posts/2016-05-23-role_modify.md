---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/roles/{roleId}/update'
title: 'Updating a role'
type: POST

sortorder: 13
category-sortorder: 60

layout: null
---

Modifies a user-defined role by changing the role name or permissions assigned.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* `{roleId}` is the unique ID for the role
* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* Request body allows update of certain role fields:

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
roleName | string | optional | the name of the role
permissions | list of permission objects | optional | see below (and notes below)
permissions.permissionId | integer | required for permissions object | system-defined unique ID of the permission

A few notes related to role modifications:

* The full list of permissions must be sent, this endpoint does not support a delta-based grant or revocation of permissions.
* Permission definitions and details can be obtained from the [permissions][roles-permissions] endpoint.  


### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/roles/57/update \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "roleName": "New name for my role",
    "permissions": [
      { "permissionId": 1 },
      { "permissionId": 3 }
    ]
  }' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If successful, returns updated role details, including role name and assigned permissions.

Field | Data Type | Notes
:------------|-------------|-------------|
roleName | string | the name of the role
roleId | integer | unique ID of the role
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
            "roleName": "New name for my role",
            "roleId": 57,
            "builtin": 0,
            "permissions": [
                {
                    "permissionId": 1,
                    "label": "Assign users emails to alerts",
                    "isManagementPermission": 0
                },
                [...]
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
