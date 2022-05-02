---
parent_category: reports
parent_category_label: Reports
path: '{{ site.version_url_prefix_request }}/report-snapshots/{snapshotId}/{dataComponentId}'
title: 'Report snapshot data'
sortorder: 12
category-sortorder: 55
type: GET
layout: null
---
This endpoint returns actual metrics used in the generation of the report snapshot shown.

### Parameters
* `format=json|xml` optional, specifies the format of output requested. See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional, changes the account group context of the current request. If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error.
* `{snapshotId}` the ID of the report snapshot you're interested in.
* `{dataComponentId}` the ID of the data component for which to retrieve data.

### Request
* no request body

### Example
`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request}}/report-snapshots/60886ebb-2466-444d-bbd8-74d5ea1402d2/59089917755cb04ee9944e44.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response
Sends back a list of data elements associated with the report snapshot. The data components are aggregated by our services, then reported back in bins: each bin represents a point on the chart: the granularity of the points shown in the chart is based on the data range shown in the report snapshot. Bin sizes are based on the table below:

Report time range | Bin size
:---------------|----------|
 up to 1 day    | 5 minutes
1 day - 14 days | 1 hour
15 days - 30 days | 2 hours
31 days - 50 days | 4 hours
50 days - 93 days | 6 hours

If your data is grouped, a value will be shown for each data grouping for each bin.
Corresponding data is returned according to the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
from | dateTime | the start of the data shown in the API output
to | dateTime | end of the data window shown in the API output
reportDataComponentData | object | object represents report data component data
{.inline-code}`reportDataComponentData` object has the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
data.binId | integer | corresponds to the start time for the bin
data.count | integer | number of datapoints shown in the round
data.value | float | value of the datapoint
data.groups | array of group objects | this corresponds to how the data is labelled in the widget. Match the groupProperty and groupId o retrieve the label as represented in the widget.
groupLabelMaps | array of groupLabelMap objects | see groupLabelMap fields below
groupLabelMap.groupProperty | string | matches the groupProperty listed in the data.groups object
groupLabelMap.groupLabels | array of groupLabel objects | see individual fields below
groupLabel.groupId | integer | lookup value of the group
groupLabel.groupLabel | string | value of the legend
binSize | integer | duration of each bin

#### Header
```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 13 Apr 2017 14:29:51 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 969
X-Organization-Rate-Limit-Reset: 1492093800
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```
#### Body
```{
    "from": "2017-03-15 00:00:00",
    "to": "2017-03-22 00:00:00",
    "reportDataComponentData": {
        "binSize": 3600,
        "data": [
            {
                "binId": 1492002000,
                "count": 10042,
                "groups": [
                    {
                        "groupProperty": "Continents",
                        "groupValue": "APNIC"
                    }
                ],
                "value": 4236.95
            },
            {
                "binId": 1492002000,
                "count": 16112,
                "groups": [
                    {
                        "groupProperty": "Continents",
                        "groupValue": "ARIN"
                    }
                ],
                "value": 3801.1
            },
            ...
        ],
        "groupLabelMaps": []
    },
}```
For error responses, see the [response status codes documentation][overview-responsestatuscodes].
