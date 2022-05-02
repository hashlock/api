---
parent_category: endpoint_agents
parent_category_label: Endpoint Agents

path: '{{ site.version_url_prefix_request }}/endpoint-agents/transfer'
title: 'Transferring an agent'
type: POST

sortorder: 6
category-sortorder: 23
layout: null
---

{.inline-code} Triggers a process of transferring a list of agents.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information

### Request

The request's body should contain a list of agents in CSV format with the following columns (comma delimited):
* "machine_id" - agent id to be transferred
* "from_aid" - account id where the agent needs to be transferred from
* "to_aid" - account id where the agent needs to be transferred to

Example:
```
machine_id,from_aid,to_aid
5d0764ac-7e42-4ec8-a0d4-39fc53edccba,111,222
5d0764ac-7e42-4ec8-a0d4-39fc53edccba,333,222
```

Sending the above body will transfer two agents ("5d0764ac-7e42-4ec8-a0d4-39fc53edccba", "5d0764ac-7e42-4ec8-a0d4-39fc53edccba")
from accounts 111 and 333 into 222. The calling user needs to have 'write' permissions to all accounts submitted in the CSV.

The requests' media type should be 'text/csv' or 'text/plain':

```
Content-Type: text/plain
```

### Response

Returns an object confirming the number of agents to be transferred. Example:

```
{
    "endpointAgentsTransfer":
    {
        "machineCount": 2
    }
}
```

### Example

```$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-agents/transfer.json \
  -d $'machine_id,from_aid,to_aid\n5d0764ac-7e42-4ec8-a0d4-39fc53edccba,111,222\n5d0764ac-7e42-4ec8-a0d4-39fc53edccba,333,222' \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2 \
  -H 'content-type: text/csv'
```

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Fri, 18 Mar 2021 15:59:50 GMT
Content-Type: text/plain;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 237EndpointAgentTransferServiceTest
X-Organization-Rate-Limit-Reset: 1587744000
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-3```

#### Body


```
{
   "endpointAgentsTransfer":
    {
        "machineCount": 2
    }
}
```

For more information on our response status codes, see the [response status codes documentation][overview-responsestatuscodes].
