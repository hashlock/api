---
parent_category: reports
parent_category_label: Reports

path: '{{ site.version_url_prefix_request }}/report-snapshots'
title: 'Report snapshots list'

sortorder: 10
category-sortorder: 55
type: GET

layout: null
---

{.inline-code}This endpoint returns a list of report snapshots configured in ThousandEyes in the context of the user's current account group. This endpoint requires the `View Reports` permission be assigned to the role of the user accessing this endpoint. Use this data to find a report snapshot in your account, which is then used in other endpoint to access aggregated data.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/report-snapshots.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back an array of report snapshots configured in the current account group. Each report snapshot object contains the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
snapshotId | string | unique ID of the report snapshot
snapshotName | string | name of the report snapshot
createdDate | dateTime | the date/time when report snapshot was created
scheduled | boolean | 1 if report snapshot was generated from a schedule
shared | boolean | 1 if report snapshot is shared
report | object | report this report snapshot is based upon
report.reportId | string | unique ID of the report
report.reportName | string | name of the report
report.builtIn | boolean | 1 for built-in reports, 0 for user-created reports
report.apiLinks | array of apiLink objects | a list of links which can be followed to pull more information
timespan.startDate | dateTime | the date/time of beginning of report snapshot
timespan.duration | integer | duration of report snapshot in seconds
permalink | string | link to report snapshot in ThousandEyes Application
apiLinks | array of apiLink objects | a list of links which can be followed to pull more information

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 13 Apr 2017 09:38:58 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1492076340
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "pages": {
        "current": 1
    },
    "reportSnapshots": [
        {
            "apiLinks": [...],
            "createdDate": "2017-05-02 14:42:49",
            "permalink": "https://app.thousandeyes.com/reports/snapshots/60886ebb-2466-444d-bbd8-74d5ea1402d2?__a=75",
            "report": {
                "apiLinks": [...],
                "builtIn": 1,
                "reportId": "2",
                "reportName": "ThousandEyes Built-in: HTTP Server"
            },
            "scheduled": 0,
            "shared": 0,
            "snapshotId": "60886ebb-2466-444d-bbd8-74d5ea1402d2",
            "snapshotName": "HTTP Server Report Snapshot",
            "timeSpan": {
                "duration": 604800,
                "startDate": "2017-03-15 00:00:00"
            }
        },
        ...
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
