---
parent_category: endpoint_agents
parent_category_label: Endpoint Agents

path: '{{ site.version_url_prefix_request }}/endpoint-agents'
title: 'Listing all agents'
type: GET

sortorder: 1
category-sortorder: 19
layout: null
---

{.inline-code} Returns a list of all endpoint agents in a given account group.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `deleted=true|false` specifies if deleted agents should be returned too. By default it is false - only non-deleted agents are returned
* `agentName={agent_name}` returns only agents with a given name
* `computerName={computer_name}` returns only agents with a given computer name

### Request

* There is no request body for this request.

### Response

Sends back an array of endpoint agents. Account groups with a larger number of agents will have the response paginated - details about response pagination can be found [here][overview-pagination].

Each endpoint agent consists of the following fields:


Field           | Data Type | Notes
:---------------|-----------|---------------------|
agentId         | string    | unique ID of the Endpoint agent
agentName       | string    | display name of the agent
computerName    | string    | display name of the computer
osVersion       | string    | version of the OS computer is running
kernelVersion   | string    | version of the kernel computer is running
manufacturer    | string    | computer hardware manufacturer
model           | string    | computer hardware model
totalMemory     | string    | total memory (RAM) of the computer 
lastSeen        | datetime  | last time when agent checked-in
status          | string    | status of the Endpoint agent in ThousandEyes, set to "enabled" or "disabled"
deleted         | bool      | set to `true` if the Endpoint agent has been deleted, `false` otherwise
version         | string    | version of the Endpoint agent
createdTime     | datetime  | date and time when the Endpoint agent was installed
numberOfClients | integer   | the number of user accounts associated with the machine where the Endpoint agent is installed
publicIP        | string    | public IP of the Endpoint agent used for the most recent check-in
location        | object    | location of the Endpoint agent resolved during last check-in, see `location` object below for details
clients         | array     | the user accounts on the machine where the Endpoint agent is installed, see `client` below for details
agentType       | string    | type of the Endpoint agent, valid values are "enterprise" for Endpoint agent Enterprise, and "enterprise-pulse" for an Endpoint agent Pulse
proxyId         | integer   | proxyId if the agent is configured to use a proxy server
vpnProfiles     | object    | list of VPNs detected by the Endpoint Agent in its last check-in, see `vpnProfile` below for details

Each {.inline-code}`client` corresponds to one OS account and consists of the following fields:

Field               | Data Type | Notes
:-------------------|-----------|---------------------|
browserExtensions   | array     | if installed, details about endpoint browser extensions, see `browserExtensions` object below
userProfile         | object    | user profile containing a user name. The name is extracted from operating system account when endpoint agent is installed

{.inline-code}`location` object:

Field        | Data Type | Notes
:------------|-----------|------------------------------|
latitude     | double    | approximate GPS latitude of the Endpoint agent
longitude    | double    | approximate GPS longitude of the Endpoint agent
locationName | string    | geographic name of the Endpoint agent's location

{.inline-code}`browserExtensions` object:

Field       | Data Type | Notes
:-----------|------------|------------------------------|
browser     | string     | name of the browser where the extension is installed, "CHROME," "EDGE" or "IE"
profile     | string     | name of the browser profile where the extension is installed
version     | string     | endpoint agent browser extension version number
enabled     | bool       | flag indicating if the extension is "disabled" or "enabled" in the web browser
active      | bool       | flag indicating if there is communication between the extension and ThousandEyes portal
error       | string     | any errors encountered while getting extension status

{.inline-code}`vpnProfile` object:

Field                 | Data Type | Notes
:---------------------|-----------|------------------------------|
vpnType               | string    | name of the VPN provider, for example "CiscoAnyConnect", "ZscalerInternet"  
vpnGatewayAddress     | string    | IP address of the VPN gateway
vpnClientAddresses    | array     | list of private IP addresses that the VPN server assigned to the device
vpnClientNetworkRange | array     | list of private networks that the VPN server assigned to the device


### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-agents.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sat, 25 Aug 2018 17:03:50 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 237
X-Organization-Rate-Limit-Reset: 1535216640
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body

```{
    "pages": {
        "next": "https://api.thousandeyes.com/v6/endpoint-agents?pageId=cd9cf945-f66f-4945-b5fe-f7a9a2a97896"
    },
    "endpointAgents": [
        {
            "agentId": "5d0764ac-7e42-4ec8-a0d4-39fc53edccba",
            "agentName": "test-agent-1",
            "computerName": "windows machine",
            "osVersion": "Microsoft Windows 10 Enterprise",
            "kernelVersion": "10.0.18362",
            "manufacturer": "LENOVO",
            "model": "20HR000FUS",
            "status": "enabled",
            "deleted": false,
            "createdTime": "2017-06-29 22:05:36",
            "lastSeen": "2020-02-20 23:56:43",
            "version": "0.191.0",
            "publicIP": "13.227.74.44",
            "location": {
                "latitude": 51.51130676269531,
                "longitude": -0.271392822265625,
                "locationName": "London, England, UK"
            },
            "clients": [
                {
                    "userProfile": {
                        "userName": "pzielinski"
                    },
                    "browserExtensions": [
                        {
                            "browser": "CHROME",
                            "profile": "Profile 1",
                            "version": "1.11.0",
                            "installed": true,
                            "enabled": true,
                            "active": true
                        }
                    ]
                }
            ],
            "totalMemory": "16384 MB",
            "agentType": "enterprise",
            "vpnProfiles": [
                {
                   "vpnGatewayAddress": "18.64.79.52",
                   "vpnType": "CiscoAnyConnect",
                   "vpnClientAddresses": ["10.136.56.58"],
                   "vpnClientNetworkRange": ["10.136.32.0/19"]
                }
            ]
        },
        {
            "agentId": "36ebc26d-19fe-443d-a9bd-cf4ae8f021f0",
            "agentName": "test-agent-2",
            "computerName": "mac os",
            "osVersion": "Version 10.15.2 (Build 19C57)",
            "kernelVersion": "Darwin 19.2.0",
            "manufacturer": "Apple, Inc.",
            "model": "MacBookAir7,2",
            "status": "enabled",
            "deleted": false,
            "createdTime": "2017-06-29 22:05:36",
            "lastSeen": "2020-02-20 23:56:43",
            "version": "0.191.0",
            "publicIP": "13.227.74.43",
            "location": {
                "latitude": 51.51130676269531,
                "longitude": -0.271392822265625,
                "locationName": "London, England, UK"
            },
            "clients": [
                {
                    "userProfile": {
                        "userName": "pzielinski"
                    },
                    "browserExtensions": [
                        {
                            "browser": "CHROME",
                            "profile": "Profile 1",
                            "version": "1.11.0",
                            "installed": true,
                            "enabled": true,
                            "active": true
                        }
                    ]
                }
            ],
            "totalMemory": "16384 MB",
            "agentType": "enterprise",
            "vpnProfiles": [
                {
                   "vpnGatewayAddress": "18.64.79.52",
                   "vpnType": "CiscoAnyConnect",
                   "vpnClientAddresses": ["10.136.56.58"],
                   "vpnClientNetworkRange": ["10.136.32.0/19"]
                }
            ]
        },
        ...
    ]
}```

For more information on our response status codes, see the [response status codes documentation][overview-responsestatuscodes].
