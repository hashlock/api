---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/voice/sip-server/{testId}'
title: '(Voice) SIP server'
type: GET

sortorder: 20
category-sortorder: 15
layout: null
---

Returns voice SIP server metrics (response, invite, register time) from each agent, for each *roundId* in the requested window.  A **time frame** must be specified, or the current round of data will be returned.

### Optional (Querystring) Parameters

* `format=json|xml` (Optional) specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` (Optional) specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` (Optional) specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information

### Request

* `{testId}` (Required) the ID of the SIP Server test for which you wish to retrieve data
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | source agent unique Id, from `/agents` endpoint
agentName | string | n/a | display name of the source agent
authUser | string | n/a | username used for authentication with SIP server (for `SIP Server` tests only)
serverIp | string | n/a | target agent IP address
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
availability | float | % | availability of the service
connectTime | integer | milliseconds | time required to establish a TCP connection to the server, only available when TCP is configured as `protocol`
dnsTime | integer | milliseconds | time required to resolve DNS
inviteTime | integer | milliseconds | time to complete INVITE
numRedirects | integer | n/a | number of redirects
optionsRequest | string | n/a | entire OPTIONS request 
optionsResponse | string | n/a | entire OPTIONS response
registerTime | integer | milliseconds | time to complete REGISTER
responseCode | integer | n/a | SIP server response code
responseTime | integer | milliseconds | time to first byte
totalTime | integer | milliseconds | total time
waitTime | integer | milliseconds | time elapsed between completion of request and first byte of response
errorType | string | n/a | error type, `None` if there is no error
problemDetail | string | n/a | error details, if an error was encountered



### Example

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/voice/sip-server/1193489.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```HTTP/1.1 200 OK
Server: nginx
Date: Wed, 07 Nov 2018 15:59:16 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 229
X-Organization-Rate-Limit-Reset: 1541606400
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Server-Name: 1-2```

#### Body

```{
    "pages": {
        "current": 1,
    },
    "voice": {
        "sipMetrics": [
            {
                "agentId": 9765,
                "agentName": "Oakland, CA (Cogent)",
                "availability": 100.0,
                "connectTime": 5,
                "countryId": "US",
                "date": "2020-08-29 19:08:02",
                "dnsTime": 2,
                "errorType": "None",
                "numRedirects": 0,
                "optionsRequest": "OPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 38.140.61.68:55431;branch=z9hG4bKRTzPzMoVh0;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=cGaJDNKQFE\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: oO9WaL3av8@38.140.61.68\r\nCSeq: 3 OPTIONS\r\nContact: <sip:6054@38.140.61.68:55431;transport=tcp>\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n\nOPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 38.140.61.68:55431;branch=z9hG4bKRTzPzMoVh0;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=cGaJDNKQFE\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: oO9WaL3av8@38.140.61.68\r\nCSeq: 4 OPTIONS\r\nContact: <sip:6054@38.140.61.68:55431;transport=tcp>\r\nAuthorization: Digest username=\"al6054\", realm=\"asterisk\", nonce=\"1598728080/4e3bef2c789bdfa45ce9123221e08c8f\", uri=\"sip:6054@voice.sfo2.notarealco.com\", response=\"83c538a39ff766cf75ffd1d62317b442\", algorithm=MD5, cnonce=\"0a4f113b\", opaque=\"748ffa241d840721\", qop=auth, nc=00000001\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n",
                "optionsResponse": "SIP/2.0 401 Unauthorized\r\nVia: SIP/2.0/TCP 38.140.61.68:55431;rport=55431;received=38.140.61.68;branch=z9hG4bKRTzPzMoVh0\r\nCall-ID: oO9WaL3av8@38.140.61.68\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=cGaJDNKQFE\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKRTzPzMoVh0\r\nCSeq: 3 OPTIONS\r\nWWW-Authenticate: Digest  realm=\"asterisk\",nonce=\"1598728080/4e3bef2c789bdfa45ce9123221e08c8f\",opaque=\"748ffa241d840721\",algorithm=md5,qop=\"auth\"\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n\nSIP/2.0 200 OK\r\nVia: SIP/2.0/TCP 38.140.61.68:55431;rport=55431;received=38.140.61.68;branch=z9hG4bKRTzPzMoVh0\r\nCall-ID: oO9WaL3av8@38.140.61.68\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=cGaJDNKQFE\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKRTzPzMoVh0\r\nCSeq: 4 OPTIONS\r\nAccept: application/xpidf+xml, application/cpim-pidf+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/sdp, message/sipfrag;version=2.0\r\nAllow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, MESSAGE, REFER\r\nSupported: 100rel, timer, replaces, norefersub\r\nAccept-Encoding: text/plain\r\nAccept-Language: en\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n",
                "optionsTime": 13,
                "permalink": "https://app.thousandeyes.com/view/tests?__a=143292&testId=1085470&roundId=1598728080&agentId=9765",
                "registerTime": 21,
                "responseCode": 200,
                "responseTime": 12,
                "roundId": 1598728080,
                "serverIp": "167.71.124.37",
                "totalTime": 40,
                "waitTime": 5
            },
            {
                "agentId": 14410,
                "agentName": "San Francisco, CA",
                "availability": 100.0,
                "connectTime": 2,
                "countryId": "US",
                "date": "2020-08-29 19:08:42",
                "dnsTime": 1,
                "errorType": "None",
                "numRedirects": 0,
                "optionsRequest": "OPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 64.124.218.217:50485;branch=z9hG4bKchgijI4leu;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=Ab2otkvbE3\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: MAzmInmtZ9@64.124.218.217\r\nCSeq: 3 OPTIONS\r\nContact: <sip:6054@64.124.218.217:50485;transport=tcp>\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n\nOPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 64.124.218.217:50485;branch=z9hG4bKchgijI4leu;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=Ab2otkvbE3\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: MAzmInmtZ9@64.124.218.217\r\nCSeq: 4 OPTIONS\r\nContact: <sip:6054@64.124.218.217:50485;transport=tcp>\r\nAuthorization: Digest username=\"al6054\", realm=\"asterisk\", nonce=\"1598728120/1212c598815ef6f2f393d0f4345ef299\", uri=\"sip:6054@voice.sfo2.notarealco.com\", response=\"4e1b35c54707a30aba4122ef570160a7\", algorithm=MD5, cnonce=\"0a4f113b\", opaque=\"5d52c6d072961833\", qop=auth, nc=00000001\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n",
                "optionsResponse": "SIP/2.0 401 Unauthorized\r\nVia: SIP/2.0/TCP 64.124.218.217:50485;rport=50485;received=64.124.218.217;branch=z9hG4bKchgijI4leu\r\nCall-ID: MAzmInmtZ9@64.124.218.217\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=Ab2otkvbE3\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKchgijI4leu\r\nCSeq: 3 OPTIONS\r\nWWW-Authenticate: Digest  realm=\"asterisk\",nonce=\"1598728120/1212c598815ef6f2f393d0f4345ef299\",opaque=\"5d52c6d072961833\",algorithm=md5,qop=\"auth\"\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n\nSIP/2.0 200 OK\r\nVia: SIP/2.0/TCP 64.124.218.217:50485;rport=50485;received=64.124.218.217;branch=z9hG4bKchgijI4leu\r\nCall-ID: MAzmInmtZ9@64.124.218.217\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=Ab2otkvbE3\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKchgijI4leu\r\nCSeq: 4 OPTIONS\r\nAccept: application/xpidf+xml, application/cpim-pidf+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/sdp, message/sipfrag;version=2.0\r\nAllow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, MESSAGE, REFER\r\nSupported: 100rel, timer, replaces, norefersub\r\nAccept-Encoding: text/plain\r\nAccept-Language: en\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n",
                "optionsTime": 4,
                "permalink": "https://app.thousandeyes.com/view/tests?__a=143292&testId=1085470&roundId=1598728080&agentId=14410",
                "registerTime": 5,
                "responseCode": 200,
                "responseTime": 4,
                "roundId": 1598728080,
                "serverIp": "167.71.124.37",
                "totalTime": 12,
                "waitTime": 2
            },
            {
                "agentId": 34,
                "agentName": "Los Angeles, CA",
                "availability": 100.0,
                "connectTime": 10,
                "countryId": "US",
                "date": "2020-08-29 19:09:22",
                "dnsTime": 0,
                "errorType": "None",
                "numRedirects": 0,
                "optionsRequest": "OPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 207.198.106.63:39761;branch=z9hG4bKoAOdZ8LOci;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=XwmtVtDf0o\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: C3KxflK1BY@207.198.106.63\r\nCSeq: 3 OPTIONS\r\nContact: <sip:6054@207.198.106.63:39761;transport=tcp>\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n\nOPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 207.198.106.63:39761;branch=z9hG4bKoAOdZ8LOci;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=XwmtVtDf0o\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: C3KxflK1BY@207.198.106.63\r\nCSeq: 4 OPTIONS\r\nContact: <sip:6054@207.198.106.63:39761;transport=tcp>\r\nAuthorization: Digest username=\"al6054\", realm=\"asterisk\", nonce=\"1598728160/5adc416287c7b55492e3fe24196b7fbb\", uri=\"sip:6054@voice.sfo2.notarealco.com\", response=\"0c20df6f8f4d9a4f0791698f775849df\", algorithm=MD5, cnonce=\"0a4f113b\", opaque=\"341652ef4bac9172\", qop=auth, nc=00000001\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n",
                "optionsResponse": "SIP/2.0 401 Unauthorized\r\nVia: SIP/2.0/TCP 207.198.106.63:39761;rport=39761;received=207.198.106.63;branch=z9hG4bKoAOdZ8LOci\r\nCall-ID: C3KxflK1BY@207.198.106.63\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=XwmtVtDf0o\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKoAOdZ8LOci\r\nCSeq: 3 OPTIONS\r\nWWW-Authenticate: Digest  realm=\"asterisk\",nonce=\"1598728160/5adc416287c7b55492e3fe24196b7fbb\",opaque=\"341652ef4bac9172\",algorithm=md5,qop=\"auth\"\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n\nSIP/2.0 200 OK\r\nVia: SIP/2.0/TCP 207.198.106.63:39761;rport=39761;received=207.198.106.63;branch=z9hG4bKoAOdZ8LOci\r\nCall-ID: C3KxflK1BY@207.198.106.63\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=XwmtVtDf0o\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKoAOdZ8LOci\r\nCSeq: 4 OPTIONS\r\nAccept: application/xpidf+xml, application/cpim-pidf+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/sdp, message/sipfrag;version=2.0\r\nAllow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, MESSAGE, REFER\r\nSupported: 100rel, timer, replaces, norefersub\r\nAccept-Encoding: text/plain\r\nAccept-Language: en\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n",
                "optionsTime": 22,
                "permalink": "https://app.thousandeyes.com/view/tests?__a=143292&testId=1085470&roundId=1598728080&agentId=34",
                "registerTime": 22,
                "responseCode": 200,
                "responseTime": 21,
                "roundId": 1598728080,
                "serverIp": "167.71.124.37",
                "totalTime": 55,
                "waitTime": 11
            },
            {
                "agentId": 9765,
                "agentName": "Oakland, CA (Cogent)",
                "availability": 100.0,
                "connectTime": 5,
                "countryId": "US",
                "date": "2020-08-29 19:10:02",
                "dnsTime": 0,
                "errorType": "None",
                "numRedirects": 0,
                "optionsRequest": "OPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 38.140.61.68:53461;branch=z9hG4bKuxJ6plLJ3b;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=JaVFIlZEC7\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: POvr7pS79I@38.140.61.68\r\nCSeq: 3 OPTIONS\r\nContact: <sip:6054@38.140.61.68:53461;transport=tcp>\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n\nOPTIONS sip:6054@voice.sfo2.notarealco.com SIP/2.0\r\nVia: SIP/2.0/TCP 38.140.61.68:53461;branch=z9hG4bKuxJ6plLJ3b;rport\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=JaVFIlZEC7\r\nTo: <sip:6054@voice.sfo2.notarealco.com>\r\nCall-ID: POvr7pS79I@38.140.61.68\r\nCSeq: 4 OPTIONS\r\nContact: <sip:6054@38.140.61.68:53461;transport=tcp>\r\nAuthorization: Digest username=\"al6054\", realm=\"asterisk\", nonce=\"1598728200/dc62d2a240e6a5b6437eb3a6b88678ed\", uri=\"sip:6054@voice.sfo2.notarealco.com\", response=\"6e9b9cc6f5e03239236c58d420c5b47a\", algorithm=MD5, cnonce=\"0a4f113b\", opaque=\"57e5825f493be8b6\", qop=auth, nc=00000001\r\nUser-Agent: ThousandEyes Test Call\r\nAllow: INVITE, ACK, CANCEL, BYE\r\nSupported: outbound, path\r\nMax-Forwards: 70\r\nExpires: 60\r\nContent-Length: 0\r\n\r\n",
                "optionsResponse": "SIP/2.0 401 Unauthorized\r\nVia: SIP/2.0/TCP 38.140.61.68:53461;rport=53461;received=38.140.61.68;branch=z9hG4bKuxJ6plLJ3b\r\nCall-ID: POvr7pS79I@38.140.61.68\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=JaVFIlZEC7\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKuxJ6plLJ3b\r\nCSeq: 3 OPTIONS\r\nWWW-Authenticate: Digest  realm=\"asterisk\",nonce=\"1598728200/dc62d2a240e6a5b6437eb3a6b88678ed\",opaque=\"57e5825f493be8b6\",algorithm=md5,qop=\"auth\"\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n\nSIP/2.0 200 OK\r\nVia: SIP/2.0/TCP 38.140.61.68:53461;rport=53461;received=38.140.61.68;branch=z9hG4bKuxJ6plLJ3b\r\nCall-ID: POvr7pS79I@38.140.61.68\r\nFrom: <sip:6054@voice.sfo2.notarealco.com>;tag=JaVFIlZEC7\r\nTo: <sip:6054@voice.sfo2.notarealco.com>;tag=z9hG4bKuxJ6plLJ3b\r\nCSeq: 4 OPTIONS\r\nAccept: application/xpidf+xml, application/cpim-pidf+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/simple-message-summary, application/pidf+xml, application/dialog-info+xml, application/sdp, message/sipfrag;version=2.0\r\nAllow: OPTIONS, REGISTER, SUBSCRIBE, NOTIFY, PUBLISH, INVITE, ACK, BYE, CANCEL, UPDATE, PRACK, MESSAGE, REFER\r\nSupported: 100rel, timer, replaces, norefersub\r\nAccept-Encoding: text/plain\r\nAccept-Language: en\r\nServer: Asterisk PBX 16.4.0\r\nContent-Length:  0\r\n\r\n",
                "optionsTime": 13,
                "permalink": "https://app.thousandeyes.com/view/tests?__a=143292&testId=1085470&roundId=1598728200&agentId=9765",
                "registerTime": 19,
                "responseCode": 200,
                "responseTime": 14,
                "roundId": 1598728200,
                "serverIp": "167.71.124.37",
                "totalTime": 38,
                "waitTime": 8
                        }
        ],            
        "test": {
            "alertsEnabled": 0,
            "apiLinks": [...],
            "authUser": "al6054",
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 1,
            "createdBy": "ThousandEyes (noreply@thousandeyes.com)",
            "createdDate": "2019-09-12 01:57:54",
            "enabled": 1,
            "interval": 120,
            "ipv6Policy": "USE_AGENT_POLICY",
            "liveShare": 0,
            "modifiedBy": "ThousandEyes (noreply@thousandeyes.com)",
            "modifiedDate": "2020-06-30 04:19:25",
            "mtuMeasurements": 1,
            "networkMeasurements": 1,
            "numPathTraces": 3,
            "optionsRegex": "",
            "pathTraceMode": "classic",
            "port": 6061,
            "probeMode": "AUTO",
            "protocol": "TCP",
            "registerEnabled": 1,
            "savedEvent": 0,
            "server": "voice.sfo2.notarealco.com:6061",
            "sipProxy": "",
            "sipRegistrar": "voice.sfo2.notarealco.com",
            "sipTargetTime": 1000,
            "sipTimeLimit": 5,
            "testId": 1085470,
            "testName": "SIP - IPv4 - TCP: voice.sfo2.notarealco.com - ext 6054",
            "type": "sip-server",
            "usePublicBgp": 1,
            "user": "6054"
        }
    }
}```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
