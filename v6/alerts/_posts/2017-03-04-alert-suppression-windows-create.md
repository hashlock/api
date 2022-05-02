---
parent_category: alerts
parent_category_label: Alerts & Notifications

path: '{{ site.version_url_prefix_request }}/alert-suppression-windows/new'
title: 'Creating an alert suppression window'
type: POST

sortorder: 53
category-sortorder: 45
layout: null
---

Creates a new alert suppression window in ThousandEyes, based on properties provided in the POST data.  In order to create a new alert suppression window, the user attempting the creation must be an Account Admin.

Regular users are blocked from using any of the POST-based methods.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* request body containing the following fields:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
alertSuppressionWindowName | string | n/a | name of the alert suppression window
enabled | bit | n/a | 0 for disabled, 1 for enabled
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

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/alert-suppression-windows/new.json \
  -d '{
    "alertSuppressionWindowName": "30 min asw created asw via API",
    "enabled": 1,
    "startDateTime": "2017-03-15 00:00:00",
    "timezone": "America/Los_Angeles",
    "duration": 1800,
    "repeat": {
      "type": "DAY"
    },
    "endRepeat": {
      "type": "NEVER"
    }
  }' \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2
```

### Response

If an alert suppression window is successfully created, an HTTP/201 CREATED response will be returned, and the alert suppression window detail will be returned.  See the example below:

#### Body

```{
    "alertSuppressionWindows": [
        {
            "alertSuppressionWindowId": 230,
            "alertSuppressionWindowName": "30 min asw created asw via API",
            "enabled": 1,
            "status": "INACTIVE",
            "tests": [],
            "startDateTime": "2017-03-15 07:00:00",
            "timezone": "America/Los_Angeles",
            "duration": 1800,
            "repeat": {
                "type": "DAY"
            },
            "endRepeat": {
                "type": "NEVER"
            }
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
