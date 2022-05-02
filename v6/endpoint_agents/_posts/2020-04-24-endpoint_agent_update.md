---
parent_category: endpoint_agents
parent_category_label: Endpoint Agents

path: '{{ site.version_url_prefix_request }}/endpoint-agents/{agent_id}'
title: 'Updating an agent'
type: POST

sortorder: 3
category-sortorder: 19
layout: null
---

{.inline-code} Updates a given agent with a new name.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{agent_id}` corresponds the unique ID of an endpoint agent, obtained from the `/endpoint-agents` endpoint
* Currently the only request body supported is to change the Agent Name, as follows:

```{
	"newAgentName":"new name"
}
```

### Response

Returns information about the updated agent. See [Listing all agents][endpoint-agents-listing] for details of each field.

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-agents/5d0764ac-7e42-4ec8-a0d4-39fc53edccba.json \
  -d '{"newAgentName":"new name"}' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Fri, 24 Apr 2020 15:59:50 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 237
X-Organization-Rate-Limit-Reset: 1587744000
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body


```{
    "endpointAgents": [
        {
            "agentId": "5d0764ac-7e42-4ec8-a0d4-39fc53edccba",
            "agentName": "new name",
            "computerName": "Windows machine",
            "osVersion": "Microsoft Windows 10 Enterprise",
            "kernelVersion": "10.0.18362",
            "manufacturer": "LENOVO",
            "model": "20HR000FUS",
            "lastSeen": "2020-02-20 23:56:43",
            "status": "enabled",
            "deleted": false,
            "version": "0.191.0",
            "createdTime": "2017-06-29 22:05:36",
            "numberOfClients": 3,
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
            "agentType": "enterprise"
        }
    ]
}
```

For more information on our response status codes, see the [response status codes documentation][overview-responsestatuscodes].
