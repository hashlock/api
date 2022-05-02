---
parent_category: admin
parent_category_label: Administrative endpoints

path: '{{ site.version_url_prefix_request }}/audit/user-events/search'
title: 'Activity log'
type: GET

sortorder: 15
category-sortorder: 60

layout: null
---

{.inline-code}Returns a list of activity log events. User with `View activity log for all users in account group` permission can see all activity log events in the current account group. User with `View own activity log` permission can see own activity log events in the current account group. See [Account Context][overview-accountcontext] for more information on changing Account Group context.

### Optional (querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information.
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional, changes the account group context of the current request.  If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error.

### Request

* There is no request body for this request.
* There are no request parameters for this request.

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/audit/user-events/search.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of audit events.

Field | Data Type | Notes
:------------|-------------|-------------|
accountGroupName | string | the name of the account group
aid | integer | system-generated unique ID of the account group
date | dateTime | date of the event in YYYY-mm-dd HH:MM:SS format
event | string | event type
ipAddress | string | source IP address of the user
resources | array | array of resources affected by the event
uid | integer | unique user ID of the user
user | string | the name and email address of the user

{.inline-code}Each object in a `resources` array contains the following fields

Field | Data Type | Notes
:------------|-------------|-------------|
name | string | name of the affected resource
type | string | type of resource affected. Can be "testName", "reportTitle", "userDisplayName", "alertRuleName", etc.


#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 21 Jun 2017 08:16:10 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 234
X-Organization-Rate-Limit-Reset: 1498033020
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-5```

#### Body

```{
    "auditEvents": [
        {
            "accountGroupName": "API Sandbox",
            "aid": 75,
            "date": "2017-06-02 18:08:06",
            "event": "Login failed",
            "ipAddress": "192.88.158.246",
            "resources": [],
            "uid": 245,
            "user": "API Sandbox User (noreply@thousandeyes.com)"
        },
        {
            "accountGroupName": "API Sandbox",
            "aid": 75,
            "date": "2017-05-02 13:53:31",
            "event": "Report created",
            "ipAddress": "192.88.158.246",
            "resources": [
                {
                    "type": "reportTitle",
                    "name": "My New Report"
                }
            ],
            "uid": 245,
            "user": "API Sandbox User (noreply@thousandeyes.com)"
        }
    ],
    "pages": {
        "current": 1
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
