---
parent_category: reports
parent_category_label: Reports

path: '{{ site.version_url_prefix_request }}/reports/{reportId}'
title: 'Report detail'

sortorder: 2
category-sortorder: 55
type: GET

layout: null
---

{.inline-code}This endpoint returns a list of widgets configured in reports configured in ThousandEyes. Seed this endpoint with a reportId found from the /reports endpoint. This endpoint requires the `View Reports` permission be assigned to the role of the user accessing this endpoint.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{reportId}` the ID of the report you're interested in.

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/reports/590ca0db90b0357f7e8ae1ad.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns report metadata information and associated widget list. Each widget will show a list of data components shown in the widget. Each data component includes a metric, measure, and grouping information, as well as details around any embeddings which exist for the widget:

Field Name | Data Type | Notes
:----------|-----------|----------|
reportId | string | unique ID of the report
reportName | string | name of the report
createdBy | integer | ID of the user who created the report, as returned by the `{{ site.version_url_prefix_request }}/users` API endpoint
modifiedBy | integer | ID of the user who last modified the report, as returned by the `{{ site.version_url_prefix_request }}/users` API endpoint
modifiedDate | string | YYYY-MM-DD HH:mm:ss formatted date of last report modification time, shown in UTC
builtIn | boolean | 1 for built-in reports, 0 for user-created reports
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
dataComponentId | string | unique ID of the data component. Use this value to retrieve dataComponent values.
metric | string | the metric being tabulated in the report: defined by the layer, test type and metric.
measure | string | statistical measure shown, i.e. `Minimum`, `Maximum`, ...
groupBy | array of groupBy objects | array of `groupBy` strings, i.e. `Tests`, `Agents`, ...
filters | array of filter objects | (optional) where the widget is filtered, filters property is shown. Each filter object represents one selected item and contains `filterProperty` and `filterValue` properties. `filterProperty` can be `Agents`, `Agent Groups`, `Tests`, `Monitors`, etc. `filterValue` holds the Id of the property, i.e. test, agent, monitor Id.
fixedTimeSpan | number | (optional) where widget timespan is different from report's timespan, this parameter is set to number of seconds in the timespan


#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 21 Nov 2016 16:04:24 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 968
X-Organization-Rate-Limit-Reset: 1492076520
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "reports": [
        {
            "apiLinks": [...],
            "builtIn": 1,
            "reportId": "2",
            "reportName": "ThousandEyes Built-in: HTTP Server",
            "widgets": [
                {
                    "dataComponents": [
                        {
                            "apiLinks": [...],
                            "dataComponentId": "vlvb1",
                            "description": "Average Availability",
                            "groupBy": [],
                            "measure": "Mean",
                            "metric": "Web - HTTP Server \u2014 Availability"
                        },
                        {
                            "apiLinks": [...],
                            "dataComponentId": "dyivi",
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
                            "apiLinks": [
                                {
                                    "href": "https://api.thousandeyes.com/v6/reports/590ca0db90b0357f7e8ae1ad/ynubv",
                                    "rel": "data"
                                }
                            ],
                            "dataComponentId": "ynubv",
                            "filters": [
                                {
                                    "filterProperty": "Tests",
                                    "filterValue": "817"
                                },
                                {
                                    "filterProperty": "Tests",
                                    "filterValue": "818"
                                }
                            ],
                            "groupBy": [
                                "Agents"
                            ],
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
