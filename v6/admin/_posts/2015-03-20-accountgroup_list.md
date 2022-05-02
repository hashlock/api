---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/account-groups'
title: 'Account group list'
type: GET

sortorder: 1
category-sortorder: 60

layout: null
---

Returns a list of all account groups available to the current user.  The aid value returned for an account in this list of account groups can be used in queries elsewhere within the app.  See [Account Context][overview-accountcontext] for more information on changing Account Group context.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error

### Request

* There is no request body for this request.
* There are no request parameters for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of account groups.

Field | Data Type | Notes
:------------|-------------|-------------|
accountGroupName | string | value must be unique across account groups in organization
aid | integer | system-generated unique ID of the account group
current | integer | 1 if the request is being made in the context of this account group, 0 otherwise
default | integer | 1 if the account group being queried is your user's login account group, 0 otherwise
organizationName | string | (optional) name of the organization; only present if user is a member of multiple organizations

If successful, returns a list of accounts available to the authenticated user.  The "default" flag indicates that this is the "login account group" for the current user, and that any query not including an aid parameter will be executed in that account group context.

{.inline-code}The "current" flag indicates that this is the account context you are in at present.  For example, calling `https://api.thousandeyes.com{{ site.version_url_prefix_request }}/account-groups?aid=354` would change the account context, and show current = 1 for account ID 354, even though the user's default account ID is 353.  Data is shown below using this call as an example.

If your user is assigned to account groups that exist in multiple organizations, the "organizationName" field will be shown for each account group.

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
            "accountGroupName": "API Sandbox",
            "aid": 75,
            "current": 1,
            "default": 1
        }
    ]
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
