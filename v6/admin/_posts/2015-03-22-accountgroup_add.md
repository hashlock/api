---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/account-groups/new'
title: 'Creating an account group'
type: POST

sortorder: 3
category-sortorder: 60

layout: null
---

{.inline-code}Creates a new account group.  Requires the `Edit all account groups` permission.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* Request body should contain the following fields:

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
accountGroupName | string | required | the name of the account group
agents | array of agent objects | optional | To grant access to enterprise agents, specify the agent list.  `"agents":[{"agentId": 1234}]`.  Note that this is not an additive list - the full list must be specified if changing access to agents.

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups/new \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"accountGroupName": "my testing account group"}' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If successful, returns details for the requested account group.  Note that any user assigned to "All Account Groups" is automatically assigned to the new account group.  Metadata for the request is based on the following detail:

Field | Data Type | Notes
:------------|-------------|-------------|
accountGroupName | string | the name of the account group
aid | integer | unique ID for the account group
organizationName | string | name of the organization (can only be configured by ThousandEyes Customer Success)
current | integer | 1 if the request is being made in the context of this account group, 0 otherwise.  If you are receiving a 0 response to this request, try making the call with `aid={aid}` querystring parameter to change the response
default | integer | 1 if the account group being queried is your user's login account group, otherwise 0.
users | array of user objects | see individual fields below prefixed by `user`
users.name | string | user's display name
users.email | string | user's email address
users.uid | integer | unique ID for the user
users.roles | array of role objects | see individual fields below prefixed by `roles`
users.roles.roleName | string | name of the role
users.roles.roleId | integer | unique ID of the role
users.roles.hasManagementPermissions | integer | 1 if the user has management permissions, 0 otherwise
users.roles.builtin | integer | 1 if the role is built-in, 0 if the role is user-defined

#### Header

```HTTP/1.1 201 Created
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
    "accountGroups": [
        {
            "accountGroupName": "my testing account group",
            "aid": 9881,
            "organizationName": "ThousandEyes Internal",
            "current": 0,
            "default": 0,
            "users": [
                {
                    "name": "newest username",
                    "email": "dave+documentation@thousandeyes.com",
                    "uid": 1307,
                    "roles": [
                        {
                            "roleName": "Organization Admin",
                            "roleId": 60,
                            "hasManagementPermissions": 1,
                            "builtin": 1
                        }
                    ]
                },
                [...]
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
