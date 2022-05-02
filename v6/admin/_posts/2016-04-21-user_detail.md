---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/users/{uid}'
title: 'User detail'
type: GET

sortorder: 6
category-sortorder: 60

layout: null
---

{.inline-code}Returns detailed information about a specific user.  Requires that the user making the request has the `API Access` and `View all users` permissions.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* `uid={uid}` unique ID for the user to query for detail.
* There is no body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/users/245.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}If successful, returns details for the requested user.  If the user is explicitly assigned to multiple account groups,  each account group will explicitly be shown. If the user is assigned to "All Account Groups", then there will be a special entry for the user using the `allAccountGroupRoles` object.  

Field | Data Type | Notes
:------------|-------------|-------------|
name | string | the name of the user
email | string | email address for the user
uid | integer | unique user ID for the user
lastLogin | dateTime | the last login of the user (UTC)
dateRegistered | dateTime | the date the user registered their account (UTC)
loginAccountGroup | accountGroup object | login accountGroup for the user
loginAccountGroup.accountGroupName | string | name of the accountGroup
loginAccountGroup.aid | integer | system-generated unique ID of the account group
accountGroupRoles | list of accountGroupRole objects | see below
accountGroupRoles.accountGroup.accountGroupName | string | name of the accountGroup
accountGroupRoles.accountGroupName.aid | integer | unique account ID for the accountGroup
accountGroupRoles.roles.roleName | string | the name of the role
accountGroupRoles.roles.roleID | integer | system-defined unique ID of the role
accountGroupRoles.roles.hasManagementPermissions | integer | 1 for roles with management permissions, 0 for roles without
accountGroupRoles.roles.builtin | integer | 1 for built-in roles (Account Admin, Organization Admin, Regular User), 0 for user-defined roles
allAccountGroupRoles | list of roles objects | see below
allAccountGroupRoles.roles.roleName | string | the name of the role
allAccountGroupRoles.roles.roleID | integer | system-defined unique ID of the role
allAccountGroupRoles.roles.hasManagementPermissions | integer | 1 for roles with management permissions, 0 for roles without
allAccountGroupRoles.roles.builtin | integer | 1 for built-in roles (Account Admin, Organization Admin, Regular User), 0 for


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
    "users": [
        {
            "accountGroupRoles": [
                {
                    "accountGroup": {
                        "accountGroupName": "API Sandbox",
                        "aid": 75
                    },
                    "roles": [
                        {
                            "builtin": 0,
                            "hasManagementPermissions": 1,
                            "roleId": 280871,
                            "roleName": "API User"
                        }
                    ]
                }
            ],
            "dateRegistered": "2012-06-27 17:23:50",
            "email": "noreply@thousandeyes.com",
            "lastLogin": "2013-11-26 17:53:42",
            "loginAccountGroup": {
                "accountGroupName": "API Sandbox",
                "aid": 75
            },
            "name": "API Sandbox User",
            "uid": 245
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
