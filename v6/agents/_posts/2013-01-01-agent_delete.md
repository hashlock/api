---
parent_category: agents
parent_category_label: Agents & Monitors

path: '{{ site.version_url_prefix_request }}/agents/{agentId}/delete'
title: 'Deleting an Agent'
type: POST

sortorder: 35
category-sortorder: 40
layout: null
---

Deletes an Enterprise Agent from ThousandEyes.  Note: this feature can only be used on Enterprise Agents.

Important notes related to agent removal:
* if an agent is deleted, the modification date for tests using that agent at the time it was deleted will be changed.
* If a deleted agent is the final remaining agent on a test, then the test will be disabled when the agent is removed.

{.inline-code}Important note: if an agent is removed, it must be re-initialized to use the same machine again in different context.  Virtual Appliances can be updated using the Reset State button in the Advanced tab of the agent management interface.  Users running packaged versions of Linux will need to remove `/var/lib/te-agent/\*.sqlite` in order to reinitialize an agent.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{agentId}` corresponds the unique ID of an enterprise agent, obtained from the `/agents` endpoint

### Post Data

{.inline-code}When POSTing data to the `/agents/{agentId}/delete` endpoint, users should specify an empty POST body.

### Example

```$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents/966/delete.json \
  -d '' \
  -H "Content-Type: application/json" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2```

### Response

If an agent is successfully deleted, an HTTP/204 No Content response will be returned, and an empty JSON response will be in the body of the response.

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

* The body of a delete request will be empty.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
