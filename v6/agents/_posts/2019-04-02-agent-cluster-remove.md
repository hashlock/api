---
parent_category: agents
parent_category_label: Agents & Monitors

path: '{{ site.version_url_prefix_request }}/agents/{agentId}/remove-from-cluster'
title: 'Agent cluster - Removing members'
type: POST

sortorder: 43
category-sortorder: 40
layout: null
---

Removes a member (or multiple members) from an Enterprise Agent cluster.

{.inline-code}This endpoint can only be used for Enterprise Agent *clusters*, and only by users with the `Edit agents in account group` permission.


### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information


### Request

* `{agentId}` in the request URL corresponds to the unique ID of an Enterprise Agent *cluster* from which agent(s) will being removed.

Request notes:

* `{agentId}` can be obtained from the `{{ site.version_url_prefix_request }}/agents` endpoint


#### POST Data

* One or multiple (comma-separated) `memberId` values representing agents that should be removed from the cluster, enclosed in square brackets.
* Cluster member IDs can be obtained from the `{{ site.version_url_prefix_request }}/agents` API endpoint (the `memberId` field inside the `clusterMembers` array).


#### Example - removing a single member

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/64965/remove-from-cluster.json \
  -d '[
    80001
    ]' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`


#### Example - removing multiple members

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/64965/remove-from-cluster.json \
  -d '[
    80002,
    80003
    ]' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`


### Response

On successful completion, the response will contain the following information:

* An HTTP/200 OK status
* The updated cluster information will be provided in the response body, unless all members are removed from the cluster
* Information about each removed member, now a standalone agent
* Each non-last member that has been removed from the cluster will get a new `agentId` value, unrelated to the `agentId` value the agent held before joining the cluster. The new `agentId` value is unrelated to the `memberId` value the agent held while it was a member of the cluster.
* If all members are removed from the cluster, the cluster itself is converted back to a standalone Enterprise Agent too. Such standalone agent inherits the old cluster's `agentId` value. The last `memberId` listed in the POST body will be the one to inherit the cluster's `agentId` value.


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
                }
            ],
            // ...
        },
        {
            "agentId": 91112,
            "agentName": "apidoc-cluster1-agent2",
            "agentType": "Enterprise",
            // ...
        },
        {
            "agentId": 91113,
            "agentName": "apidoc-cluster1-agent3",
            "agentType": "Enterprise",
            // ...
        }
    ]
}```

The example above is only showing contextually-relevant information.
Full response metadata information is available in the [agent details API endpoint description][agent-metadata].

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
