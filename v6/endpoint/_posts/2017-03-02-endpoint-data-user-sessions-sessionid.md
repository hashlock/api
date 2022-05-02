---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/{sessionId}'
title: 'Endpoint user session details'
type: GET

sortorder: 2
category-sortorder: 20
layout: null
---

Returns details for an endpoint user session

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* {sessionId} corresponds to the id of a endpoint user sessions, see the Endpoint user session list endpoint for a listing of endpoint user sessions.
* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/user-sessions/07625:1490529480:h3qJQTpl.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back detailed data of an endpoint user session.

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
browser | object | n/a | object contains two string parameters, `name` and `version` of the browser
coordinates | object | n/a | object contains approximate GPS location of the endpoint agent, based on endpoint agent's public IP address; `latitude` and `longitude` are numeric representations of GPS coordinates, `location` is a string representing named geographical location
pages | array | n/a | array of objects containing details about web pages visited during session; each object represents one visitage web page
network | object | n/a | object contains details about network profile and conditions during session

{.inline-code}Each page object in `pages` array has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
id | string | n/a | web page ID; page ID is unique only within an endpoint user session
title | string | n/a | web page title
startedDateTime | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when page load started; all dates are UTC
responseCode | integer | n/a | HTTP response code
pageTimings | object | n/a | object with two integer parameters returning the number of milliseconds to DOM Load (`onContentLoad`) and Page Load ( `onLoad`)

{.inline-code}`network` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
networkProfile | object | n/a | contains basic network connectivity parameters, such as IP settings, DNS settings, NIC type, WiFi settings, Proxy settings; see Example for details
systemMetrics | object | n/a | contains system metrics such as CPU and physical memory usage
gatewayPing | object | n/a | contains numeric parameters representing results of a ping test performed against the endpoint agent default gateway: `pktsSent`, `pktsReceived`, `minRtt`, `avgRtt`, `maxRtt`, `meanDevRtt`; contains only string `error` parameter if there is an error
ping | object | n/a | contains number parameters representing results of a ping test performed against the target website: `pktsSent`, `pktsReceived`, `minRtt`, `avgRtt`, `maxRtt`, `meanDevRtt`; contains only string `error` parameter if there is an error
traceroute | object | n/a | contains parameters representing results of a traceroute test performed against the target website: string parameter `destination` represents target IP address, `hops` is an array of hop objects; each hop object has parameters representing hop number (integer `hop`), delay in milliseconds (integer `delay`), hop IP address (string `ipAddress`) and rDNS name (string `name`). If hop IP address is in public IP space, network string `prefix` and integer `asn` are also provided. If hop is in MPLS network, `mpls` parameter provides array of MPLS flag strings. Contains only string `error` parameter if there is an error.
connect | object | n/a | object has one number parameter, `rtt`. `rtt` represents the number of milliseconds required to establish TCP connectivity with the target
icmpBlocked | boolean | n/a | Set to `true` if network target is blocking ICMP echo (ping) queries
errors | array | n/a | array of string representing possible network errors, i.e. "ping: Request timed out before getting response"

{.inline-code}`systemMetrics` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
startTimeMs | integer | milliseconds | time at which metrics collection started, as milliseconds since the Epoch
endTimeMs | integer | milliseconds | time at which metrics collection ended, as milliseconds since the Epoch
cpuUtilization | object | n/a | contains utilization of the system's processors over the monitored period
physicalMemoryUsedBytes | object | n/a | contains metrics about used physical memory
physicalMemoryTotalBytes | integer | bytes | total physical memory of the system

{.inline-code}`cpuUtilization` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
min | double | \[0.0-1.0\] | minimal value of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
max | double | \[0.0-1.0\] | maximal value of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
mean | double | \[0.0-1.0\] | mean of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
median | double | \[0.0-1.0\] | median of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
stdDev | double | \[0.0-1.0\] | standard deviation  of CPU usage sampled (in range of \[0.0-1.0\]) over the monitored period
count | integer | n/a | the number of collected samples over the monitored period

{.inline-code}`physicalMemoryUsedBytes` object has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
min | double | bytes | minimal value of memory usage sampled over the monitored period
max | double | bytes | maximal value of memory usage sampled over the monitored period
mean | double | bytes | mean value of memory usage sampled over the monitored period
median | double | bytes | median value of memory usage sampled over the monitored period
stdDev | double | bytes | standard deviation of memory usage sampled over the monitored period
count | integer | n/a | the number of collected samples over the monitored period

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 22 Mar 2017 17:12:12 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 599
X-Organization-Rate-Limit-Reset: 1490642120
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "userSessions": [
        {
            "agentId": "3fde6422-f119-40e1-ae32-d08a1243c038",
            "browser": {
                "name": "Google Chrome",
                "version": "57.0.2987.98"
            },
            "committed": "2017-03-26 11:58:46",
            "coordinates": {
                "latitude": 46.0552778,
                "location": "Slovenia",
                "longitude": 14.5144444
            },
            "date": "2017-03-22 11:58:43",
            "network": {
                "connect": {
                    "rtt": 77.449
                },
                "errors": [],
                "gatewayPing": {
                    "avgRtt": 7,
                    "maxRtt": 66,
                    "meanDevRtt": 11,
                    "minRtt": 0.875,
                    "pktsReceived": 10,
                    "pktsSent": 10
                },
                "icmpBlocked": false,
                "networkProfile": {
                    "dnsServers": [
                        "8.8.8.8",
                        "8.8.4.4"
                    ],
                    "gateway": "10.0.0.1",
                    "hardwareType": "Wireless",
                    "interfaceName": "en0",
                    "ipAddress": "10.0.0.13",
                    "localPrefix": "10.0.0.0",
                    "proxyProfile": {
                        "method": "System",
                        "proxies": [
                            {
                                "bypass": "*.local;169.254/16",
                                "proxy": "<direct>"
                            }
                        ]
                    },
                    "publicIpAddress": "84.255.241.1",
                    "publicIpRange": "84.255.241.0-84.255.241.255",
                    "subnetMask": "255.255.255.0",
                    "type": "Ethernet",
                    "wirelessProfile": {
                        "bssid": "4c:ba:ba:f4:fa:fa",
                        "channel": 1,
                        "noise": -95,
                        "phyMode": "802.11n",
                        "quality": 100,
                        "rssi": -38,
                        "ssid": "Internet for the masses",
                        "txRate": 130,
                        "vendor": "Cisco"
                    }
                },
                "systemMetrics": {
                    "startTimeMs": 1581508857327,
                    "endTimeMs": 1581508867333,
                    "cpuUtilization": {
                        "min": 0.30859375,
                        "max": 0.5625,
                        "mean": 0.38931831001805056,
                        "median": 0.353515625,
                        "stdDev": 0.08389194281742307,
                        "count": 10
                    },
                    "physicalMemoryUsedBytes": {
                        "min": 1.2805128192E10,
                        "max": 1.2825530368E10,
                        "mean": 1.281914582109091E10,
                        "median": 1.2818219008E10,
                        "stdDev": 5741124.05691331,
                        "count": 11
                    },
                    "physicalMemoryTotalBytes": 17069891584
                }
                "ping": {
                    "avgRtt": 24,
                    "maxRtt": 116,
                    "meanDevRtt": 36,
                    "minRtt": 6.909912109375,
                    "pktsReceived": 10,
                    "pktsSent": 10
                },
                "traceroute": {
                    "destination": "13.32.22.232",
                    "hops": [
                        {
                            "delay": 1,
                            "hop": 1,
                            "ipAddress": "10.0.0.1",
                            "name": "router.local"
                        },
                        {
                            "asn": 34779,
                            "delay": 2,
                            "hop": 2,
                            "ipAddress": "89.210.0.1",
                            "name": "89-210-0-1.gw.t-2.net",
                            "prefix": "89.210.0.0/18"
                        },
                        {
                            "asn": 34779,
                            "delay": 2,
                            "hop": 3,
                            "ipAddress": "89.210.88.65",
                            "name": "89-210-88-65.access.t-2.net",
                            "prefix": "89.210.64.0/18"
                        },
                        {
                            "asn": 34779,
                            "delay": 3,
                            "hop": 4,
                            "ipAddress": "84.255.250.46",
                            "name": "84-255-250-46.core.t-2.net",
                            "prefix": "84.255.192.0/18"
                        },
                        {
                            "delay": 8,
                            "hop": 5,
                            "ipAddress": "52.95.218.66",
                            "name": "52.95.218.66"
                        },
                        {
                            "delay": 14,
                            "hop": 6,
                            "ipAddress": "52.93.38.116",
                            "mpls": [
                                "L=301472,E=0,S=1,T=1"
                            ],
                            "name": "52.93.38.116"
                        },
                        {
                            "delay": 7,
                            "hop": 7,
                            "ipAddress": "52.93.38.131",
                            "name": "52.93.38.131"
                        },
                        {
                            "delay": 7,
                            "hop": 8,
                            "ipAddress": "176.32.124.93",
                            "name": "176.32.124.93"
                        },
                        {
                            "asn": 16509,
                            "delay": 7,
                            "hop": 12,
                            "ipAddress": "13.32.22.232",
                            "name": "13.32.22.232",
                            "prefix": "13.32.20.0/22"
                        }
                    ]
                }
            },
            "numberOfPages": 2,
            "orgName": "T-2 Access Network",
            "pages": [
                {
                    "id": "page_1",
                    "pageTimings": {
                        "onContentLoad": 874,
                        "onLoad": 3492
                    },
                    "responseCode": 200,
                    "startedDateTime": "2017-03-26 11:58:54",
                    "title": "Network Performance Resources | ThousandEyes"
                },
                {
                    "id": "page_0",
                    "pageTimings": {
                        "onContentLoad": 1483,
                        "onLoad": 4569
                    },
                    "responseCode": 200,
                    "startedDateTime": "2017-03-26 11:58:43",
                    "title": "Network Intelligence Software | ThousandEyes"
                }
            ],
            "permalink": "https://app.thousandeyes.com/view/endpoint-agent/?roundId=1490529480&scenarioId=sessionDetails&binSize=300000&__aid=7625",
            "port": 443,
            "protocol": "https",
            "roundId": 1490529480,
            "sourceAddr": "84.255.241.1",
            "userSessionId": "07625:1490529480:h3qJQTpl",
            "visitedSite": "www.thousandeyes.com"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
