---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/user-sessions'
title: 'Endpoint user session list'
type: GET-POST

sortorder: 1
category-sortorder: 20
layout: null
---

{.inline-code}Returns a list of all endpoint user sessions. Sessions from the last round are provided unless an explicit start and end is provided with `from`, `to` or `window` optional parameters.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `page={pageNo}` this parameter is going to be deprecated - please rely on the URL in the `pages[next]` element included in the response. See [Pagination][overview-pagination] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Optional Filtering

{.inline-code}`/endpoint-data` endpoints support optional filtering. See [Endpoint Data Filtering][endpoint-data-filtering] for more information.

### Request

* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/user-sessions.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}Sends back an object. `userSessions` parameter returns an array of endpoint user sessions, either the latest sessions, or based on the time range specified.
Each entry represents an endpoint user session.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
userSessionId | string | n/a | endpoint user session ID; each endpoint user session occurrence has a unique ID
agentId | string | n/a | endpoint agent ID
roundId | integer | n/a | endpoint user session round ID
date | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when endpoint user session took place; all dates are UTC
committed | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when endpoint user session was committed to the controller; all dates are UTC
sourceAddr | string | n/a | public IP address of the endpoint agent during the session
orgName | string | n/a | name of the AS organization `sourceAddr` belongs to
visitedSite | string | n/a | domain used to visit target website
protocol | string | n/a | protocol used to visit target website
port | integer | n/a | port used to visit target website
numberOfPages | integer | n/a | number of web pages visited on target website
permalink | string | n/a | hyperlink to endpoint user session details in ThousandEyes Application

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 22 Mar 2017 13:41:02 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 599
X-Organization-Rate-Limit-Reset: 1490622120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "userSessions": [
        {
            "agentId": "3fde6422-f119-40e1-ae32-d08a1243c038",
            "committed": "2017-03-22 11:58:44",
            "date": "2017-03-22 11:58:42",
            "numberOfPages": 1,
            "orgName": "T-2 Access Network",
            "permalink": "https://app.thousandeyes.com/view/endpoint-agent/?roundId=1490529480&scenarioId=sessionDetails&binSize=300000&__aid=7625",
            "port": 80,
            "protocol": "http",
            "roundId": 1490529480,
            "sourceAddr": "84.255.241.1",
            "userSessionId": "07625:1490529480:aVDViw0i",
            "visitedSite": "thousandeyes.com"
        },
        {
            "agentId": "3fde6422-f119-40e1-ae32-d08a1243c038",
            "committed": "2017-03-22 11:58:46",
            "date": "2017-03-22 11:58:43",
            "numberOfPages": 2,
            "orgName": "T-2 Access Network",
            "permalink": "https://app.thousandeyes.com/view/endpoint-agent/?roundId=1490529480&scenarioId=sessionDetails&binSize=300000&__aid=7625",
            "port": 443,
            "protocol": "https",
            "roundId": 1490529480,
            "sourceAddr": "84.255.241.1",
            "userSessionId": "07625:1490529480:h3qJQTpl",
            "visitedSite": "www.thousandeyes.com"
        }
        [...]
    }
    "pages": {
        "current": 1
    }
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
