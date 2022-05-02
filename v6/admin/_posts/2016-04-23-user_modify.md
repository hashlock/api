---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/users/{uid}/update'
title: 'Updating a user'
type: POST

sortorder: 8
category-sortorder: 60

layout: null
---

{.inline-code}Modifies a user.  This can include changing the user's name, email address, account group assignments, or roles.  Use of this endpoint requires the `Edit users in all account groups` or `Edit users` permission.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* `uid={uid}` is the unique user ID for the user
* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* Request body allows update of certain user fields:

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
name | string | required | the name of the user
email | string | required | email address for the user
loginAccountGroup | accountGroup object | required | login accountGroup for the user
loginAccountGroup.aid | integer | required for loginAccountGroup object | system-generated unique ID of the account group
accountGroupRoles | list of accountGroupRole objects | optional | see below
accountGroupRoles.accountGroupName.aid | integer | required for accountGroupName object | unique account ID for the accountGroup
accountGroupRoles.roles.roleID | integer | required for roles object | system-defined unique ID of the role
allAccountGroupRoles | list of roles objects | optional | see below
allAccountGroupRoles.roles.roleID | integer | required for roles object | system-defined unique ID of the role

A few notes on the topic of user modifications:

* If a user's email is updated, the user will need to validate the username change before being able to subsequently log in, or execute API operations.
* Any update which contains accountGroupRoles is a replace-based update, rather than a delta-based update.

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/users/1390/update \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{  
    "name":"newest username",
    "email":"dave+documentationNEW@thousandeyes.com",
    "loginAccountGroup": { "aid":691 },
    "accountGroupRoles":[  
      {  
        "accountGroup": { "aid":315 },
        "roles":[  
          { "roleId":57 }
        ]
      },
      {  
        "accountGroup": { "aid":691 },
        "roles":[  
          { "roleId":60 }
        ]
      }
   ],
   "allAccountGroupRoles": [
     { "roleId": 1140 }
   ]
  }' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If successful, returns an updated user object in the same format as the user detail endpoint.

Field | Data Type | Notes
:------------|-------------|-------------|
name | string | the name of the user
email | string | email address for the user
uid | integer | unique user ID for the user
loginAccountGroup | accountGroup object | login accountGroup for the user
loginAccountGroup.accountGroupName | string | name of the accountGroup
loginAccountGroup.aid | integer | system-generated unique ID of the account group
lastLogin | dateTime | the last login of the user (UTC)
dateRegistered | dateTime | the date the user registered their account (UTC)
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
            "name": "newest username",
            "email": "dave+documentationNEW@thousandeyes.com",
            "uid": 1307,
            "loginAccountGroup": {
                "accountGroupName": "Doc Account 2",
                "aid": 691
            },
            "lastLogin": "2016-10-14 01:27:39",
            "dateRegistered": "2013-03-29 19:57:23",
            "accountGroupRoles": [
                {
                    "accountGroup": {
                        "accountGroupName": "Doc Account 2",
                        "aid": 691
                    },
                    "roles": [
                        {
                            "roleName": "Organization Admin",
                            "roleId": 60,
                            "hasManagementPermissions": 1,
                            "builtin": 1
                        }
                    ]
                },
                {
                    "accountGroup": {
                        "accountGroupName": "Documentation",
                        "aid": 315
                    },
                    "roles": [
                        {
                            "roleName": "Account Admin",
                            "roleId": 57,
                            "hasManagementPermissions": 0,
                            "builtin": 1
                        }
                    ]
                }
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
