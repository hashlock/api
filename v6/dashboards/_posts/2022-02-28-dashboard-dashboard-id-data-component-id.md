---
parent_category: dashboards
parent_category_label: Dashboards
path: '{{ site.version_url_prefix_request }}/dashboards/{dashboardId}/{dataComponentId}'
title: 'Dashboard data'
sortorder: 3
category-sortorder: 55
type: GET
layout: null
---
This endpoint returns the raw data shown in a particular widget of a given dashboard.

### Parameters
* `format=json|xml` optional, specifies the format of output requested. See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set. See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data. See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional, changes the account group context of the current request. If an invalid account group ID is specified as a parameter, the response will come back as an HTTP/400 error.
* `{dashboardId}` the ID of the dashboard you're interested in.
* `{dataComponentId}` the ID of the data component for which to retrieve data.

### Request
* no request body

### Example
`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dashboards/2/vlvb1.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response
Sends back a list of data elements associated with the dashboard. For Report widgets refer to the Reports page in the documentation. For Dashboard widgets, the data is returned with the following fields:


Field Name | Data Type | Notes
:----------|-----------|----------|
from | dateTime | the start of the data shown in the API output
to | dateTime | end of the data window shown in the API output
dataComponentData | array of non-aggregated points | see below for Test Table, Alert Grid, Alert List and Agent Status


The fields returned in **dataComponentData** are dependent on the widget:


**Agent Status**

Field Name | Data Type | Notes
:----------|-----------|----------|
summary | object | object with a summary of how many agents are online, offline and disabled
agents | array | list of agents

Each agent in the agent status data response will contain these properties

Field Name | Data Type | Notes
:----------|-----------|----------|
agentId | string | ID of the agent
status | string | `ONLINE`, `OFFLINE` or `DISABLED`
ipInfo | object | information about the IP of the agent if `Enterprise` or operating system version for `Endpoint`
agentName | string | name of the agent
location | object | contains the latitude, longitude and locationName of the agent



**Alert List**

Field Name | Data Type | Notes
:----------|-----------|----------|
totalAlerts | integer | total number of alerts that were active within the timespan configured
activeAlerts | integer | number of the alerts that are still active
alerts | array | array of alerts

Each alert in the alert list data response will contain these properties

Field Name | Data Type | Notes
:----------|-----------|----------|
active | boolean | `true` or `false`
alertId | integer | id of the alert
testId | integer | id of the test
sourceId | integer | id of the agent, monitor or device producing the alert
sourceName | string | name of the agent, monitor or device producing the alert
alertRule | string | name of the alert rule that this alert belongs to
alertType | string | name of the alert type
startTime | string | date when the alert was first active
durationInSeconds | integer | number of seconds the alert was active. If it's still active, this number will increase every second.



**Alert Grid**

Field Name | Data Type | Notes
:----------|-----------|----------|
alertType | string | type of alerts: `Agent` or `BGP`
totalAlerts | integer | total number of alerts that were active in the last 24 hours
numActiveAlerts | integer | number of the alerts that are active
numClearedOrDisabledAlertsInLastDay | integer | number of alerts that were cleared or disabled in the last 24 hours
alerts | array | array of source alerts

Each source alert in the alert grid data response will contain these properties

Field Name | Data Type | Notes
:----------|-----------|----------|
isActive | boolean | `true` or `false`
alertId | integer | id of the alert
testId | integer | id of the test
prefixId | integer | id of the monitor prefix
sourceId | integer | id of the agent or monitor or device producing the alert
alertType | string | name of the alert type
startTime | string | date when the alert was first active
duration | integer | number of seconds the alert was active. Max is 24 hours
location | string | name of the location of the agent or monitor producing the alert



**Test Table**

This widget accepts the following query params to paginate the response:
* `rows={integer}` optional, the number of alerts in the response. The default value is 10.
* `page={integer}` optional, specifies the page number for the data response. The default value is 1.
* `sortProperty={string}` optional, specifies the property to sort by. The possible values are `alertStatus`, `testName` or `testType`. The ordering may differ from the web application. The default value is `alertStatus`.

Field Name | Data Type | Notes
:----------|-----------|----------|
tests | array | list of test

Each test in the test table data response will contain these properties

Field Name | Data Type | Notes
:----------|-----------|----------|
testId | integer | id of the test
testName | string | name of the test
target | string | target configured in the test
testType | string | type of test
alertStatus | integer | number of active alerts for the test
isShared | boolean | flag set to true if the test has been shared
graphlets | array | list of timeseries points for test metrics in the last 12 hours 

Each graphlet object will contain these properties

Field Name | Data Type | Notes
:----------|-----------|----------|
metric | string | name of the metric 
testId | integer | id of the test
points | array | list of `x` and `y` datapoints where `x` is the timestamp of the point and `y` is the value

#### Header
```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 02 Mar 2022 00:00:10 GMT
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

##### Agent Status
```
{
   "to": "2022-03-02 00:04:48",
   "reportDataComponentData": {
       "summary": {
           "online": 0,
           "offline": 2,
           "disabled": 1
       },
       "agents": [
           {
               "agentId": "6522",
               "status": "OFFLINE",
               "ipInfo": {
                   "publicIp": "172.58.92.31",
                   "privateIp": "172.17.0.3"
               },
               "agentName": "0c3898000117",
               "location": {
                   "latitude": 37.77493,
                   "longitude": -122.41942,
                   "locationName": "San Francisco, California, US"
               }
           },
           ...
       ]
   }
}
```

##### Alert List
```
{
    "from": "2022-03-01 23:09:21",
    "to": "2022-03-02 00:09:21",
    "reportDataComponentData": {
        "totalAlerts": 2539,
        "activeAlerts": 2334,
        "alerts": [
            {
                "alertType": "Routing - BGP",
                "active": true,
                "isActive": true,
                "alertId": 6394171,
                "testId": 123266,
                "ruleId": 250,
                "alertSource": "BGP-Test",
                "alertRule": "Default BGP Alert Rule",
                "startTime": "2022-03-01 22:15:00",
                "durationInSeconds": 6861
            },
            ...
        ]
    }
}
```

##### Alert Grid
```
{
    "from": "2022-03-01 00:12:19",
    "to": "2022-03-02 00:12:19",
    "reportDataComponentData": {
        "alertType": "Agents",
        "alerts": [
            {
                "testId": 148688,
                "sourceId": "2163",
                "alertId": 6390633,
                "isActive": true,
                "alertType": "Http",
                "location": "Dallas, TX NAT",
                "startTime": "2022-03-01 23:30:00",
                "duration": 240
            },
            ...
        ],
        "totalAlerts": 362,
        "numActiveAlerts": 305,
        "numClearedOrDisabledAlertsInLastDay": 57
    }
}    
```

##### Test Table
```
{
    "from": "2022-03-01 12:14:45",
    "to": "2022-03-02 00:14:45",
    "pages": {
        "next": "https://api.thousandeyes.com/v6/dashboards/620b1511048612499a42ac98/vug1s.json?pageId=2",
        "current": 1
    },
    "reportDataComponentData": {
        "tests": [
            {
                "graphlets": [
                    {
                        "points": [
                            {
                                "x": 1646136000,
                                "y": 0
                            },
                            ...
                        ],
                        "metric": "Path Changes",
                        "testId": 123419
                    },
                    {
                        "points": [
                            {
                                "x": 1646136000,
                                "y": 95.83333333333334
                            },
                            ...
                        ],
                        "metric": "Reachability",
                        "testId": 123419
                    }
                ],
                "testId": 123419,
                "testName": "Bgp test 08/19/2020 only public monitors - 4",
                "target": "64.233.160.0/19",
                "testType": "Routing - BGP",
                "alertStatus": 296,
                "isShared": false
            },
            ...
        ]
    }
}                       
```
For error responses, see the [response status codes documentation][overview-responsestatuscodes].
