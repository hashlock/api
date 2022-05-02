---
parent_category: dashboards
parent_category_label: Dashboards

path: '{{ site.version_url_prefix_request }}/dashboards/{dashboardId}'
title: 'Dashboards detail'

sortorder: 2
category-sortorder: 55
type: GET

layout: null
---

{.inline-code}This endpoint returns a list of widgets configured in dashboards configured in ThousandEyes. Seed this endpoint with an id found from the /dashboards endpoint.

### Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `{dashboardId}` the ID of the dashboard you're interested in.

### Request

* no request body

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dashboards/620b1511048612499a42ac98.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns dashboard metadata information and associated widget list. Each widget will contain these properties in its configuration.


Field Name | Data Type | Notes
:----------|-----------|----------|
id | string | unique ID of the dashboard
name | string | title of the dashboard
isBuiltIn | boolean | true for built-in dashboards, false for user-created dashboards
createdBy | integer | ID of the user who created the dashboard, as returned by the `{{ site.version_url_prefix_request }}/users` API endpoint
modifiedBy | integer | ID of the user who last modified the dashboard, as returned by the `{{ site.version_url_prefix_request }}/users` API endpoint
modifiedDate | string | YYYY-MM-DD HH:mm:ss formatted date of last dashboard modification time, shown in UTC
apiLinks | array of apiLink objects | a list of links which can be followed to pull more information
widgets | array | an array of widget objects


The data returned for every widget will depend on the widget type. For Report widgets, refer to the Reports section of the documentation. Dashboard widgets will contain the following common properties:


Field Name | Data Type | Notes
:----------|-----------|----------|
title | string | widget title
type | string | widget type; `Agent Status`, `Alert List`, `Alert Grid`, `Test Table`
dataComponents | array | array of widget data components
embedUrl | string | if widget is marked as embedded, embedUrl is provided

Each dashboard widget is comprised of one or more data components, common fields represented by the following table:

Field Name | Data Type | Notes
:----------|-----------|----------|
dataComponentId | string | unique ID of the data component. Use this value to retrieve dataComponent values.
apiLinks | array of apiLink objects | a list of links which can be followed to pull more information


Each dashboard widget object will have some of these fields, depending on the widget type as they appear in the UI.


**Agent Status**

Field Name | Data Type | Notes
:----------|-----------|----------|
agents | string | type of agent: `Enterprise` or `Endpoint`
show | string | ownership of agents: `Owned Agents` or `All Assigned Agents`
filters | array of filter mappings | (optional) where the widget is filtered, filters property is shown. Each filter mapping will map a filter name to a list of filtered values. Filter properties can be `Agents`, `Agent Labels`, etc. The list for each key holds the IDs of the property, i.e. `agentId`s, `agentLabelId`s, etc. 


**Alert List**

Field Name | Data Type | Notes
:----------|-----------|----------|
alertTypes | array | list of alert types configured in the widget. An empty list means all alert types.
limitTo | integer | limit the number of alerts to be shown in the widget
activeWithin | object | timespan during which alerts had to be active to be shown in the widget
filters | array of filter mappings | (optional) where the widget is filtered, filters property is shown. Each filter mapping will map a filter name to a list of filtered values. Filter properties can be `Alert Rules`, `Monitors`, `Tests`, `Test Labels`, etc. The list for each key holds the IDs of the property, i.e. `agentId`s, `testId`s, etc. 


**Test Table** 

Field Name | Data Type | Notes
:----------|-----------|----------|
filter | object | multisearch filter (see below). Valid keys for filters: `Anything`, `Test Name`, `Target`, `Test ID`, `Test Type`, `Label ID`
exclude | object | multisearch filter (see below)
shouldExcludeAlertSuppressionWindows | boolean | true for excluding alert suppression windows 

**Alert Grid**

Field Name | Data Type | Notes
:----------|-----------|----------|
alertType | string | type of alert
filter | object | multisearch filter (see below). Valid keys for filters: `Anything`, `Test Name`, `Test Type`, `Agent Name`
exclude | object | multisearch filter (see below)

**Multi Search Filter** 

Field Name | Data Type | Notes
:----------|-----------|----------|
filters | list | list of object pairs with a `key` and a `value` as shown in the app.
type | string | string that defines the logical operator to be applied to filters: `all` or `any`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Tue, 01 Mar 2022 22:50:32 GMT
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
       "dashboards": [
           {
               "id": "620b1511048612499a42ac98",
               "name": "Dashboard Demo A",
               "isBuiltIn": false,
               "createdBy": 6825,
               "modifiedBy": 6825,
               "modifiedDate": "2022-03-01 22:31:30",
               "accountId": 11,
               "isPrivate": false,
               "isDefaultForUser": false,
               "isDefaultForAccount": false,
               "widgets": [
                   {
                       "type": "Agent Status",
                       "title": "Agent Status",
                       "dataComponents": [
                           {
                               "dataComponentId": "ayear",
                               "filters": [
                                   {
                                       "filterProperty": "Agents",
                                       "filterValue": "11119789"
                                   },
                                   {
                                       "filterProperty": "Agents",
                                       "filterValue": "6522"
                                   },
                                   {
                                       "filterProperty": "Agents",
                                       "filterValue": "6381"
                                   }
                               ],
                               "apiLinks": [...],
                               "agents": "Enterprise Agents",
                               "show": "Owned Agents"
                           }
                       ]
                   },
                   {
                       "type": "Alert Grid",
                       "title": "Alert Grid",
                       "dataComponents": [
                           {
                               "dataComponentId": "wvoqu",
                               "apiLinks": [...],
                               "alertType": "Agents",
                               "filter": {
                                   "filters": [
                                       {
                                           "value": "test",
                                           "key": "Anything"
                                       }
                                   ],
                                   "type": "all"
                               },
                               "exclude": {
                                   "filters": [],
                                   "type": "all"
                               }
                           }
                       ]
                   },
                   {
                       "type": "Tests",
                       "title": "Tests",
                       "dataComponents": [
                           {
                               "dataComponentId": "vug1s",
                               "apiLinks": [...],
                               "shouldExcludeAlertSuppressionWindows": false,
                               "filter": {
                                   "filters": [
                                       {
                                           "value": "test",
                                           "key": "Anything"
                                       }
                                   ],
                                   "type": "all"
                               },
                               "exclude": {
                                   "filters": [
                                       {
                                           "value": "Some String",
                                           "key": "Test Name"
                                       }
                                   ],
                                   "type": "all"
                               }
                           }
                       ]
                   },
                   {
                       "type": "Alert List",
                       "title": "Alert List",
                       "dataComponents": [
                           {
                               "dataComponentId": "wvcii",
                               "apiLinks": [...],
                               "alertTypes": [
                                   "Routing - BGP"
                               ],
                               "limitTo": 10,
                               "activeWithin": {
                                   "value": 1,
                                   "unit": "Hours"
                               }
                           }
                       ]
                   },
               ],
               "apiLinks": [...]
           }
       ]
   }```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
