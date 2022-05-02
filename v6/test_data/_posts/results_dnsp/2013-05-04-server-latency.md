---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/dnsp/server-latency/{testId}'
title: '(DNS+) Server latency'
type: GET

sortorder: 19
category-sortorder: 15
layout: null
---

Returns the server latency metrics from a global perspective for a specific nameserver, aggregated on a country basis.

### Optional (Querystring) Parameters

* `format=json|xml` (Optional) specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` (Optional) specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` (Optional) specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` (Required) the ID of the DNS+ Domain test you for wish to retrieve data
* `{testId}/{countryId}` (Optional) append `{countryId}` to return results only for that Country.  Wildcard `\*` is supported, to return a single global aggregate.
* `{testId}/{countryId}/network` (Optional) append `network` to obtain network-level data for a specific country.  Wildcard `\*` is not supported.
* There is no request body for this request.

### Response

For country-agnostic DNS+ measurements, aggregate values will be returned for each country with vantage points tested in the verification.  Data is grouped on a country basis; the first record returned is a \* record, which indicates rollup values for all countries in which vantage points were present.

To return aggregate data for a single country, append the two-digit (ISO-3166-1 alpha-2) country code to the request:

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dnsp/server-latency/{testId}/{countryId}.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

To return data aggregated at the network (autonomous system) level, append /network to the single-country request (as follows), and a list of networks will be shown, with aggregated information at the network level:

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dnsp/server-latency/{testId}/{countryId}/network.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
countryId | string | n/a | ISO-3166-1 alpha-2 country code
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
totalVantagePoints | integer | n/a | total number of vantage points used to run this test round
totalIsps | integer | n/a | number of ISPs with responding vantage points for this test round
latency | integer | milliseconds | average latency calculated to target DNS server
asn | int | n/a | autonomous system number (for data aggregated by network)
network | string | n/a | name of the network (for data aggregated by network)


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/dnsp/server-latency/5786.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Thu, 08 Nov 2013 07:32:48 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1493294160
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-2```

#### Body

```{
    "dnsp": {
        "serverLatency": [
            {
                "countryId": "*",
                "date": "2017-04-27 12:01:58",
                "latency": 105,
                "roundId": 1493294400,
                "totalIsps": 184,
                "totalVantagePoints": 292
            },
            {
                "countryId": "AR",
                "date": "2017-04-27 12:01:58",
                "latency": 261,
                "roundId": 1493294400,
                "totalIsps": 4,
                "totalVantagePoints": 5
            },
            ...
            ],
            "test": {
                "alertsEnabled": 0,
                "apiLinks": [...],
                "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
                "createdDate": "2013-04-15 20:50:14",
                "enabled": 1,
                "interval": 3600,
                "savedEvent": 0,
                "server": "pdns4.ultradns.org.",
                "testId": 5786,
                "testName": "pdns4.ultradns.org",
                "type": "dnsp-server"
            }
        },
        "pages": {
            "current": 1
        }
    }```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
