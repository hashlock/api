---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/account-groups/{aid}'
title: 'Account group detail'
type: GET

sortorder: 2
category-sortorder: 60

layout: null
---

{.inline-code}Returns detailed information about a specific account group.  Requires that the user making the request has the `View all account groups settings` permission.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

* `aid={aid}` account group to query for detail.
* There is no request body for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups/315.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

If successful, returns details for the requested account group.  Metadata for the request is based on the following detail:

Field | Data Type | Notes
:------------|-------------|-------------|
accountGroupName | string | the name of the account group
aid | integer | unique ID for the account group
organizationName | string | name of the organization (can only be configured by ThousandEyes Customer Success)
current | integer | 1 if the request is being made in the context of this account group, 0 otherwise.  If you are receiving a 0 response to this request, try making the call with `aid={aid}` querystring parameter to change the response
default | integer | 1 if the account group being queried is your user's login account group, 0 otherwise
users | array of user objects | see individual fields below prefixed by `user`
users.name | string | user's display name
users.email | string | user's email address
users.uid | integer | unique ID for the user
users.roles | array of role objects | see individual fields below prefixed by `roles`
users.roles.roleName | string | name of the role
users.roles.roleId | integer | unique ID of the role
users.roles.hasManagementPermissions | integer | 1 if the user has management permissions, 0 otherwise
users.roles.builtin | integer | 1 if the role is built-in, 0 if the role is user-defined
agents | array of agent objects | see individual fields below prefixed by `agents`
agents.agentId | integer | unique ID for the agent
agents.agentName | string | name of the agent
agents.location | string | location specification
agents.countryId | string | 2-digit ISO country code
agents.prefix | string | prefix containing agents public IP address
agents.utilization | integer | utilization percentage of agent; only available if agentState is `Online`
agents.ipAddresses | array of strings | array of private IP addresses
agents.publicIpAddresses | array of strings | array of public IP addresses
agents.enabled | integer | 1 for enabled, 0 for disabled
agents.verifySslCertificates | integer | 1 for normal operation, 0 to ignore SSL errors on browserbot-based tests
agents.keepBrowserCache | integer | 0 for normal operation, 1 for retain cache
agents.lastSeen | dateTime | date last seen in YYYY-mm-dd HH:MM:SS format
agents.agentType | string | enterprise, enterprise cluster
agents.network | string | network (including ASN) of agent's public IP
agents.agentState | string | online or offline

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
            "accountGroupName": "Documentation",
            "aid": 315,
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
                            "roleName": "Account Admin",
                            "roleId": 57,
                            "hasManagementPermissions": 0,
                            "builtin": 1
                        },
                        {
                            "roleName": "Organization Admin",
                            "roleId": 60,
                            "hasManagementPermissions": 1,
                            "builtin": 1
                        }
                    ]
                },
                [...]
            ],
            "agents": [
                {
                    "agentId": 2486,
                    "agentName": "thousandeyes-stg-va-2546",
                    "location": "San Francisco Bay Area",
                    "countryId": "US",
                    "ipAddress": "192.168.1.78",
                    "publicIpAddress": "99.139.65.220",
                    "prefix": "99.128.0.0/11",
                    "ipAddresses": [
                        "192.168.1.78"
                    ],
                    "publicIpAddresses": [
                        "99.139.65.220"
                    ],
                    "enabled": 1,
                    "verifySslCertificates": 1,
                    "keepBrowserCache": 0,
                    "lastSeen": "2016-04-26 02:44:08",
                    "agentType": "Enterprise",
                    "network": "AT&T Services, Inc. (AS 7018)",
                    "agentState": "Offline"
                }
            ]
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
