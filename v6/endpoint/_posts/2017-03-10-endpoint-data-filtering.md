---
parent_category: endpoint
parent_category_label: Endpoint Data

title: 'Endpoint data filtering'

sortorder: 10
category-sortorder: 20
layout: null
---

{.inline-code}`/endpoint-data` API endpoints support optional filtering. Results from the following API endpoints:
* `/endpoint-data/user-sessions`
* `/endpoint-data/user-sessions/web`
* `/endpoint-data/user-sessions/network`
* `/endpoint-data/network-topology`

can be filtered by providing additional filters in form of POST JSON object.

## Request

Standard request to the endpoints supporting filtering is performed using the GET method. In order to apply filtering, request has to be done with POST method.

### Post Data

{.inline-code}When POSTing data to the endpoints, users can use provide filters as a JSON object containing `searchFilters` parameter. `searchFilters` is an array of searchFilter objects. Each searchFilter object must have the following parameters:

Field | Data Type | Notes
:------------|-------------|-------------|
key | string | parameter to be filtered
values | array | an array

When multiple searchFilter objects are provider, a logical AND is applied between the filters.

{.inline-code}When a searchFilter contains multiple `values`, a logical OR is applies between the filters

Search filter key can be any of the following:

Key | API endpoint | Notes
:------------|-------------|-------------|
location | all | location of the endpoint agent, i.e. `San Francisco Bay Area` or `Germany`
connection | all | network connection type; `Ethernet`, `Loopback` or `Wireless`
trigger | all | user session trigger; `auto` or `user`
platform | all | endpoint agent platform OS; `Mac` or `Windows`
gateway | all | endpoint agent default gateway IP address
proxyTarget | all | endpoint agent proxy IP address
vpnTarget | all | endpoint agent VPN endpoint IP address
agentId | all | endpoind agent ID, i.e. `3fde6422-f119-40e1-ae32-d08a1243c038`
networkId | all | network ID, i.e. `660b34109d12`
ssid | all | WiFi SSID
bssid | all | WiFi BSSID
domain | /user-sessions | web site **base** domain visited during the session, i.e. `thousandeyes.com`
visitedSite | /user-sessions | web site domain visited during the session, i.e. `app.thousandeyes.com`
destinationIp | /user-sessions | web site destination IP address
type | /network-topology | network topology type; `vpn`, `proxy` or `gateway`

### Example

Return all endpoint user sessions between 2017-04-08 00:00:00 and 20:00:00 UTC, performed from user agents on a WiFi connection AND visiting any sites from thousandeyes.com OR salesforce.com domains:

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/user-sessions.json?from=2017-04-08T00:00:00\&to=2017-04-08T20:00:00 \
  -d '{
    "searchFilters": [
      { "key": "connection", "values": ["Wireless"] },
      { "key": "domain", "values": ["thousandeyes.com","salesforce.com"] }
    ]
  }' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

Returns normal response, as documented by each API endpoint. If filter conditions match no objects in a given time period, returned main object array has no children elements.

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sun, 09 Apr 2017 10:00:04 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 600
X-Organization-Rate-Limit-Remaining: 599
X-Organization-Rate-Limit-Reset: 1491732060
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-3```

#### Body

```{
    "from": "2017-04-08 00:00:00",
    "pages": {
        "current": 1
    },
    "to": "2017-04-08 20:00:00",
    "userSessions": [
        {
            "agentId": "236e6f18-9637-4a2f-b15f-7aa6a29c9fce",
            "committed": "2017-04-08 11:49:38",
            "date": "2017-04-08 11:49:36",
            "numberOfPages": 3,
            "orgName": "Happy Network Services",
            "permalink": "https://app.thousandeyes.com/view/endpoint-agent/?roundId=1491652140&scenarioId=sessionDetails&binSize=300000&__aid=160",
            "port": 443,
            "protocol": "https",
            "roundId": 1491652140,
            "sourceAddr": "78.153.54.206",
            "userSessionId": "00160:1491652140:EDG4jXHI",
            "visitedSite": "success.thousandeyes.com"
        },
        {
            "agentId": "236e6f18-9637-4a2f-b15f-7aa6a29c9fce",
            "committed": "2017-04-08 11:53:29",
            "date": "2017-04-08 11:53:28",
            "numberOfPages": 1,
            "orgName": "Happy Network Services",
            "permalink": "https://app.thousandeyes.com/view/endpoint-agent/?roundId=1491652380&scenarioId=sessionDetails&binSize=300000&__aid=160",
            "port": 443,
            "protocol": "https",
            "roundId": 1491652380,
            "sourceAddr": "78.153.54.206",
            "userSessionId": "00160:1491652380:CEwYgJIF",
            "visitedSite": "app.thousandeyes.com"
        }
    ]
}```
