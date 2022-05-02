---
parent_category: agents
parent_category_label: Agents & Monitors

path: '{{ site.version_url_prefix_request }}/agents/{agentId}/add-to-cluster'
title: 'Agent cluster - Creating'
type: POST

sortorder: 41
category-sortorder: 40
layout: null
---

Converts a standalone Enterprise Agent (or multiple) to an Enterprise Agent cluster.

{.inline-code}This endpoint can only be used by users with the `Edit agents in account group` permission.


### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information


### Request

* `{agentId}` in the request URL corresponds to the unique ID of an Enterprise Agent that is being converted to a cluster

Request notes:

* `{agentId}` can be obtained from the `{{ site.version_url_prefix_request }}/agents` endpoint


#### POST Data

* The `agentId` present in the request URL must not be present in the POST body
* Each `agentId` must represent an agent of the `Enterprise` type (as shown by the `agentType` field in agent details)


#### Example - converting a single agent

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/64965/add-to-cluster.json \
  -d '[]' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`


#### Example - converting multiple agents

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/64965/add-to-cluster.json \
  -d '[
    70002,
    70003
    ]' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`


### Response

On successful cluster creation, the response will contain the following information:

* An HTTP/200 OK status
* The new cluster information will be provided in the response body
* Each cluster member will get a unique ID within a cluster, called `memberId`
* The `memberId` value is unrelated to the original `agentId` which was used in the request URL or POST body
* The cluster name will be taken from the agent whole `agentId` is present in the request URL


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
            "agentId": 64965,
            "agentName": "apidoc-cluster1",
            "agentType": "Enterprise Cluster",
            "clusterMembers": [
                {
                    "memberId": 80001,
                    "name": "apidoc-cluster1-agent1",
                    // ...
                },
                {
                    "memberId": 80002,
                    "name": "apidoc-cluster1-agent2",
                    // ...
                },
                {
                    "memberId": 80003,
                    "name": "apidoc-cluster1-agent3",
                    // ...
                }
            ],
            // ...
        }
    ]
}```

The example above is only showing contextually-relevant information.
Full response metadata information is available in the [agent details API endpoint description][agent-metadata].

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
