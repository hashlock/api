---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-suppression-windows/{alertSuppressionWindowId}'
title: 'Alert suppression window detail'
type: GET

sortorder: 52
category-sortorder: 45
layout: null
---

Returns details for an alert suppression window configured in your account group.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* {alertSuppressionWindowId} corresponds to the id of an alertSuppressionWindow, see the alert suppression window list endpoint for a listing of alert suppression windows.
* No request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-suppression-windows/2411.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns an alert suppression window object's details, along with configured tests.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
alertSuppressionWindowId | integer | n/a | unique ID of the alert suppression window
alertSuppressionWindowName | string | n/a | name of the alert suppression window
enabled | bit | n/a | 0 for disabled, 1 for enabled
status | string | n/a | \[ACTIVE, INACTIVE, ENDED\], indicates the current status of the suppression window
tests | array of {"testId": testId} objects | n/a | List of tests assigned to the alert suppression window:  \[{"testId": 123}, {"testId": 456}\]
startDateTime | dateTime | yyyy-MM-dd hh:mm:ss  | the date/time when the alert suppression window will start.  
timezone | string | n/a | timezone name, in Area/Location format, as specified in the IANA TZDB.
duration | integer | seconds | number of seconds for which the suppression window will be active
repeat | repeat object | n/a | see repeat options found below
repeat.type | string | n/a | \[DAY, WEEK, MONTH, CUSTOM\]
repeat.intervalType | string | n/a | \[DAY, WEEK, MONTH\]
repeat.intervalLength | integer | n/a | number of intervalTypes to wait before reactivating the alert suppression window.
repeat.daysOfWeek | string | n/a | Specify which day of the week the alert suppression window needs to be activated for.  Only valid for intervalType = WEEK.  \[SUN, MON, TUE, WED, THU, FRI, SAT\]
endRepeat | repeat object | n/a | see endRepeat options found below
endRepeat.type | string | n/a | \[COUNT, NEVER, DATE\]
endRepeat.count | integer | n/a | end repeat after number of occurrences (only valid with COUNT type option)
endRepeat.date | date | yyyy-MM-dd | end repeat after specific date (only valid with DATE type option)

#### Body

```{
    "alertSuppressionWindows": [
        {
            "alertSuppressionWindowId": 2411,
            "alertSuppressionWindowName": "Monthly maintenance",
            "duration": 300,
            "enabled": 0,
            "endRepeat": {
                "type": "NEVER"
            },
            "repeat": {
                "type": "MONTH"
            },
            "startDateTime": "2017-07-01 05:00:00",
            "status": "INACTIVE",
            "tests": [    
                {
                    "alertsEnabled": 1,
                    "apiLinks": [...],
                    "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
                    "createdDate": "2012-06-28 20:44:05",
                    "domain": "thousandeyes.com ANY",
                    "enabled": 1,
                    "interval": 900,
                    "liveShare": 0,
                    "modifiedBy": "API Sandbox Admin (api.sandbox+admin@thousandeyes.com)",
                    "modifiedDate": "2017-06-19 18:53:39",
                    "savedEvent": 0,
                    "testId": 820,
                    "testName": "thousandeyes.com ANY",
                    "type": "dns-trace"
                },
                ...
            ],
            "timezone": "UTC"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
