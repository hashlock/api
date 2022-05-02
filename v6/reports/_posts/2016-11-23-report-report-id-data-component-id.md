---
parent_category: reports
parent_category_label: Reports
path: '{{ site.version_url_prefix_request }}/reports/{reportId}/{dataComponentId}'
title: 'Report data'
sortorder: 3
category-sortorder: 55
type: GET
layout: null
---
This endpoint returns actual metrics used in the generation of the reports shown. Unlike the metadata options, this endpoint accepts parameters for a time range shown in the data, which defaults to 7 days.

### Parameters
* `format=json|xml` optional, specifies the format of output requested. See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set. See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data. See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional, changes the account group context of the current request. If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error.
* `{reportId}` the ID of the report you're interested in.
* `{dataComponentId}` the ID of the data component for which to retrieve data.

### Request
* no request body

### Example
`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/reports/2/vlvb1.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response
Sends back a list of data elements associated with the report. The data components are aggregated by our services, then reported back in bins: each bin represents a point on the chart: the granularity of the points shown in the chart is based on the data range shown in the report. Bin sizes are based on the table below:

Report time range   |  Bin size
:-------------------|-------------|
 up to 1 day        |  5 minutes
1 day - 14 days    |   1 hour
15 days - 30 days   |   2 hours
31 days - 50 days   |   4 hours
51 days - 93 days   |   6 hours

If your data is grouped, a value will be shown for each data grouping for each bin.
Corresponding data is returned according to the following fields:

Field Name | Data Type | Notes
:----------|-----------|----------|
from | dateTime | the start of the data shown in the API output
to | dateTime | end of the data window shown in the API output
data.binId | integer | corresponds to the start time for the bin
data.count | integer | number of datapoints shown in the round
data.value | float | value of the datapoint
data.groups | array of group objects | this corresponds to how the data is labelled in the widget. Match the groupProperty and groupId to retrieve the label as represented in the widget.
groupLabelMaps | array of groupLabelMap objects | see groupLabelMap fields below
groupLabelMap.groupProperty | string | matches the groupProperty listed in the data.groups object
groupLabelMap.groupLabels | array of groupLabel objects | see individual fields below
groupLabel.groupId | string | lookup value of the group
groupLabel.groupLabel | string | value of the legend
binSize | integer | duration of each bin

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
    "from": "2017-04-25 14:00:00",
    "to": "2017-05-02 14:00:00",
    "reportDataComponentData": {
        "binSize": 3600,
        "data": [
            {
                "binId": 1492524000,
                "count": 5376,
                "value": 99.90699404761905
            },
            {
                "binId": 1493730000,
                "count": 5376,
                "value": 99.7953869047619
            }
        ],
        "groupLabelMaps":[
           {
              "groupProperty":"Tests",
              "groupLabels":[
                 {
                    "groupId":"29697",
                    "groupLabel":"http://jackli.design"
                 },
                 {
                    "groupId":"1580",
                    "groupLabel":"OLD Periodic Failure Example"
                 }
              ]
           }
        ],
    }
}```
For error responses, see the [response status codes documentation][overview-responsestatuscodes].
