---
parent_category: reports
parent_category_label: Reports

path: '{{ site.version_url_prefix_request }}/report-snapshots/{snapshotId}'
title: 'Report snapshot detail'

sortorder: 11
category-sortorder: 55
type: GET

layout: null
---

{.inline-code}This endpoint returns a list of widgets configured in reports configured in ThousandEyes. Seed this endpoint with a reportId found from the /reports endpoint. This endpoint requires the `View Reports` permission be assigned to the role of the user accessing this endpoint.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{snapshotId}` the ID of the report snapshot you're interested in.

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/report-snapshots/60886ebb-2466-444d-bbd8-74d5ea1402d2.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns details information about report snapshot including the list and configuration of the widgets.

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
widgets | array | an array of widget objects

Each widget object has the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
title | string | widget title
type | string | widget type; `table`, `multi-metric-table`, `geomap`, `numbers`, `pie-chart`, `timeseries`, `stacked-areachart`, `box-and-whiskers`, ...
dataComponents | array | array of widget data components
embedUrl | string | if widget is marked as embedded, embedUrl is provided
Each widget is comprised of one or more data components, fields represented by the following table:

Field Name | Data Type | Notes
:----------|-----------|----------|
dataComponentId | string | unique ID of the data component
metric | string | the metric being tabulated in the report: defined by the layer, test type and metric.
measure | string | statistical measure shown, i.e. `Minimum`, `Maximum`, ...
groupBy | array | array of `groupBy` strings, i.e. `Tests`, `Agents`, ...
filters | array of filter objects | (optional) where the widget is filtered, filters property is shown. Each filter object represents one selected item and contains `filterProperty` and `filterValue` properties. `filterProperty` can be `Agents`, `Agent Groups`, `Tests`, `Monitors`, etc. `filterValue` holds the Id of the property, i.e. test, agent, monitor Id.
apiLinks | array of apiLink objects | a list of links which can be followed to pull more information

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 13 Apr 2017 09:41:13 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 969
X-Organization-Rate-Limit-Reset: 1492076520
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
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
            },
            "widgets": [
                {
                    "dataComponents": [
                        {
                            "apiLinks": [...],
                            "dataComponentId": "59089917755cb04ee9944e44",
                            "description": "Average Availability",
                            "groupBy": [],
                            "measure": "Mean",
                            "metric": "Web - HTTP Server \u2014 Availability"
                        },
                        {
                            "apiLinks": [...],
                            "dataComponentId": "59089ae6755cb04ee977703b",
                            "description": "Average Response Time",
                            "groupBy": [],
                            "measure": "Mean",
                            "metric": "Web - HTTP Server \u2014 Response Time"
                        },
                        ...
                    ],
                    "title": "HTTP Server Overview",
                    "type": "numbers"
                },
                {
                    "dataComponents": [
                        {
                            "apiLinks": [...],
                            "dataComponentId": "590897e4755cb04ee9776f5b",
                            "groupBy": [],
                            "measure": "Mean",
                            "metric": "Web - HTTP Server \u2014 Availability"
                        }
                    ],
                    "title": "Overall Average Availability",
                    "type": "timeseries"
                },
                ...
            ]
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
