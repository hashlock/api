---
parent_category: endpoint
parent_category_label: Endpoint Data

path: '{{ site.version_url_prefix_request }}/endpoint-data/networks'
title: 'Endpoint networks'
type: GET

sortorder: 22
category-sortorder: 20
layout: null
---

{.inline-code}Returns a list of all the networks from which endpoint agents performed user sessions.

### Optional (Querystring) Parameters

* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* no request body

#### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/endpoint-data/networks.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Response

{.inline-code}Sends back an object. `privateNetworks` parameter returns an array of networks.

{.inline-code}Each network object in `privateNetworks` array has following properties:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
networkId | string | n/a | network ID; each network occurrence has a unique ID
networkName | string | n/a | network name
localPrefix | string | n/a | local private address of the network
publicIpRange | string | n/a | public IP range of the network

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Sun, 09 Apr 2017 11:15:32 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 970
X-Organization-Rate-Limit-Remaining: 969
X-Organization-Rate-Limit-Reset: 1491736560
Strict-Transport-Security: max-age=31536000
X-Server-Name: 1-4```

#### Body

```{
    "privateNetworks": [
        {
            "networkId": "006c4fa7a054",
            "localPrefix": "10.5.51.0",
            "networkName": "10.5.51.0 (in 178.216.56.0/21)",
            "publicIpRange": "178.216.56.0-178.216.63.255"
        },
        {
            "networkId": "06e8270d2582",
            "localPrefix": "172.22.2.0",
            "networkName": "172.22.2.0 (in 188.230.129.0/24)",
            "publicIpRange": "188.230.129.0-188.230.129.255"
        }
    ]
}```

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
