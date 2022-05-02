---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/network-topology/{networkProbeId}'
title: 'Endpoint network topology details'
type: GET

sortorder: 7
category-sortorder: 20
layout: null
---

Returns details for a network topology probe

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* {networkProbeId} corresponds to the id of a network probe, see the Endpoint network topology list endpoint for a listing of network probes.
* no request body

#### Example

`$ curl https://api.thousandeyes.com{{site.version_url_prefix_request}}/endpoint-data/network-topology/00160:39c518560de9:1491651900:236e6f18.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Sends back detailed data of a network topology probe.

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
networkProbeId | string | n/a | network probe ID; each network probe occurrence has a unique ID
agentId | string | n/a | endpoint agent ID
roundId | integer | n/a | endpoint user session round ID
date | dateTime | yyyy-MM-dd hh:mm:ss | the date/time when network probe took place; all dates are UTC
target | string | n/a | IP of the target the network probe was performed against; this is typically a default gateway, proxy or VPN endpoint
coordinates | object | n/a | object contains approximate GPS location of the endpoint agent, based on endpoint agent's public IP address; `latitude` and `longitude` are numeric representations of GPS coordinates, `location` is a string representing named geographical location
icmpPing | object | n/a | contains number parameters representing results of a ping test performed against the target: `pktsSent`, `pktsReceived`, `minRtt`, `avgRtt`, `maxRtt` and `meanDevRtt`
networkProfile | object | n/a | contains basic network connectivity parameters, such as IP settings, DNS settings, NIC type, WiFi settings, Proxy settings; see Example for details
systemMetrics | object | n/a | contains system metrics such as CPU and physical memory usage

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
Date: Mon, 22 Mar 2017 18:03:02 GMT
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
    "networkProbes": [
        {
            "agentId": "236e6f18-9637-4a2f-b15f-7aa6a29c9fce",
            "coordinates": {
                "latitude": 46.0552778,
                "location": "Slovenia",
                "longitude": 14.5144444
            },
            "date": "2017-03-21 11:49:35",
            "icmpPing": {
                "avgRtt": 5,
                "maxRtt": 26,
                "meanDevRtt": 6,
                "minRtt": 0.9130859375,
                "pktsReceived": 9,
                "pktsSent": 10
            },
            "networkProbeId": "00160:39c518560de9:1491651900:236e6f18",
            "networkProfile": {
                "dnsServers": [
                    "10.20.10.1"
                ],
                "gateway": "10.20.10.1",
                "hardwareType": "Wireless",
                "interfaceName": "en0",
                "ipAddress": "10.20.10.13",
                "localPrefix": "10.20.10.0",
                "publicIpAddress": "84.255.241.1",
                "publicIpRange": "84.255.241.0-84.255.241.255",
                "subnetMask": "255.255.255.0",
                "type": "Ethernet",
                "wirelessProfile": {
                    "bssid": "4c:ba:ba:f4:fa:fa",
                    "channel": 11,
                    "noise": -98,
                    "phyMode": "802.11n",
                    "quality": 84,
                    "rssi": -58,
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
            "roundId": 1491651900,
            "target": "10.20.10.1"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
