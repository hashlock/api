---
parent_category: agents
parent_category_label: Agents & Monitors

path: '{{ site.version_url_prefix_request }}/agents/{agentId}/update'
title: 'Updating an agent'
type: POST

sortorder: 30
category-sortorder: 40
layout: null
---

Updates Enterprise Agent details.  Users can update the agent parameters specified under Post Data section.

This endpoint can only be used for Enterprise Agents, and only for users in a role that permits modification of Enterprise Agents.

Important notes related to agent modification on tests:
* if an agent is removed from a test, the modification date for tests using that agent at the time it was removed will be changed.  
* If an agent is removed from an entire account group, then all tests using this agent in the removed account group will be updated to reflect the removed agent.  
* If a removed agent is the final remaining agent on a test, then the test will be disabled when the agent is removed.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{agentId}` corresponds the unique ID of an enterprise agent, obtained from the `/agents` endpoint

### Post Data

{.inline-code}When POSTing data to the `/agents/{agentId}/update` endpoint, users can update the following fields:

* `agentName` string representation of an agent.  No two agents can have the same display name.
* `enabled` boolean representation of agent state. `0` to disable the agent, `1` to enable the agent.
* `accountGroups` an array of accountGroup objects containing only an aid value, in the format { aid: integer }.  See `/accounts` to pull a list of account IDs
* `tests` an array of test objects containing only a testId value in the format { testId: integer }.  See `/tests` to pull a list of tests available in the current account context.
* `ipv6Policy` string representation of the IP version policy. Can be `FORCE_IPV4`, `PREFER_IPV6` or `FORCE_IPV6`.
* `verifySslCertificates` boolean representation of Verify SSL certificates state. `0` to disable, `1` to enable.
* `keepBrowserCache` boolean representation of Keep browser cache state. `0` to disable, `1` to enable.
* `targetForTests` string representation of target IP address or domain name, representing test destination when agent is acting as a test target in an agent-to-agent test

### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/966/update.json \
  -d '{
    "agentName": "my updated agent name",
    "accountGroups": [
      {"aid": 315},
      {"aid": 362}
    ],
    "tests": [
      {"testId": 12065}
      {"testId": 817},
    ],
    "targetForTests":"1.2.3.4"
  }' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

If an agent is successfully edited, an HTTP/200 OK response will be returned, and the agent's assigned accounts / tests will change; the newly updated agent data will be returned.  See the example below:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | unique ID of agent
agentName | string | n/a | display name of the agent
location | string | n/a | location of the agent
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
prefix | string | n/a | Network prefix, expressed in CIDR format
verifySslCertificates | boolean | n/a | `1` for enabled, `0` for disabled
keepBrowserCache | boolean | n/a | `1` for enabled, `0` for disabled
utilization | integer | percentage | shows overall utilization percentage
ipv6Policy | string | n/a | IP version policy, can be `FORCE_IPV4`, `PREFER_IPV6` or `FORCE_IPV6`
ipAddresses | array | n/a | array of `ipAddress` entries
groups | array | n/a | array of label objects - see Labels for more information.
enabled | boolean | n/a | `1` for enabled, `0` for disabled
accountGroups | array | n/a | list of account groups to which the agent is assigned, expressed in the same format as `/account-groups` endpoint
tests | array | n/a | list of tests assigned to the agent, expressed in the same format as `/tests` endpoint
network | string | n/a | name of the autonomous system in which the Agent is found
agentType | string | n/a | either `Cloud` or `Enterprise`, shows the type of agent
lastSeen | dateTime | n/a | `yyyy-MM-dd hh:mm:ss`, expressed in UTC
agentState | string | n/a | either `Online` or `Offline`
targetForTests | string | n/a | target IP address or domain name representing test destination when agent is acting as a test target in an agent-to-agent test

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Mon, 09 May 2016 16:04:24 GMT
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
    "agents": [
        {
            "agentId": 966,
            "agentName": "ubuntu1404-x64",
            "location": "San Francisco Bay Area",
            "countryId": "US",
            "prefix": "50.128.0.0/9",
            "utilization": 1,
            "ipv6Policy": "FORCE_IPV4",
            "network": "Comcast Cable Communications, Inc. (AS 7922)",
            "agentType": "Enterprise",
            "lastSeen": "2015-05-14 23:18:00",
            "agentState": "Online",
            "verifySslCertificates": 1,
            "keepBrowserCache": 1,
            "targetForTests": "1.1.1.1",
            "ipAddresses": [
                "192.168.1.223"
            ],
            "publicIpAddresses": [
                "50.184.189.59"
            ],
            "enabled": 1,
            "accountGroups": [
                {
                    "aid": 315,
                    "accountGroupName": "Documentation"
                },
                {
                    "aid": 362,
                    "accountGroupName": "Enterprise Agents Dashboard"
                }
            ],
            "tests": [
                {
                    "createdDate": "2015-02-03 21:55:13",
                    "modifiedDate": "2015-05-14 23:18:03",
                    "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
                    "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
                    "enabled": 1,
                    "savedEvent": 0,
                    "testId": 12065,
                    "testName": "My Google DNS test",
                    "type": "dns-server",
                    "interval": 300,
                    "domain": "google.com A",
                    "networkMeasurements": 1,
                    "mtuMeasurements": 1,
                    "bandwidthMeasurements": 0,
                    "bgpMeasurements": 1,
                    "alertsEnabled": 0,
                    "liveShare": 0,
                    "recursiveQueries": 0,
                    "dnsServers": [
                        {
                            "serverId": 130,
                            "serverName": "ns2.google.com."
                        }
                    ],
                    "apiLinks": [...]
                },                
                {
                    "enabled": 1,
                    "testId": 817,
                    "savedEvent": 0,
                    "liveShare": 0,
                    "testName": "http://www.thousandeyes.com",
                    "type": "http-server",
                    "interval": 900,
                    "url": "http://www.thousandeyes.com",
                    "networkMeasurements": 1,
                    "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
                    "modifiedBy": "API Sandbox User (noreply@thousandeyes.com)",
                    "createdDate": "2012-06-28 19:33:12",
                    "modifiedDate": "2015-05-14 23:18:03",
                    "apiLinks": [...]
                }
            ]
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
