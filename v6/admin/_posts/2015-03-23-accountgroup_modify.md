---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/account-groups/{aid}/update'
title: 'Updating an account group'
type: POST

sortorder: 4
category-sortorder: 60

layout: null
---

Modifies an account group.  This can include changing the account group's name, or modifying the list of users assigned to the account group.  

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

* `aid={aid}` account group to query for detail.
* `content-type` and `accept` headers must be set (both to `application/json`) when using this endpoint.
* Request body allows update of certain account group fields:

Field | Data Type | Required/Optional | Notes
:------------|-------------|-------------|-------------|
accountGroupName | string | optional | name of the account group.  To rename the account group, specify a new name.
agents | array of agent objects | optional | To grant access to enterprise agents, specify the agent list.  `"agents":[{"agentId": 1234}]`.  Note that this is not an additive list - the full list must be specified if changing access to agents.

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups/315/update \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{ "accountGroupName": "Renamed account group" }' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If successful, returns an HTTP/200 status code, as well as the updated account group object.

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
    "accountGroups": [
        {
            "accountGroupName": "Renamed accounts group",
            "aid": 315,
            "organizationName": "ThousandEyes Internal",
            "current": 1,
            "default": 1,
            "users": [...]
            "agents": [...]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
