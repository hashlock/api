---
parent_category: test_data
parent_category_label: Test Data

path: '{{ site.version_url_prefix_request }}/web/http-server/{testId}'
title: '(Web) HTTP server'
type: GET

sortorder: 6
category-sortorder: 15
layout: null
---

Returns response code, response and fetch times, TLS session details and component-level (DNS, Connect, Wait, Receive and Fetch) timing for the load of an object over HTTP.

### Optional (Querystring) Parameters

* `format=json|xml` optional, specifies the format of output requested.  See [Output Formats][overview-outputformats] for more information
* `window=[0-9]+[smhdw]?` specifies a window of time for the result set.  See [Time Ranges][overview-timerange] for more information.
* `from=YYYY-mm-ddTHH:MM:SS&to=YYYY-mm-ddTHH:MM:SS` specifies an explicit start (and optionally, end) for your range of data.  See [Time Ranges][overview-timerange] for more information.
* `aid={aid}` optional and requires the user to be assigned to the target account group, specifies the account group context of the request, obtained from the `/account-groups` endpoint.  Specifying this parameter without the user being assigned to the target account will result in an error response. See [Account group context][overview-accountcontext] for more information
* `headers=1` optional, will output request and response header information in output. Example below assumes headers=1 was specified as an optional parameter.
* `certificates=1` output list of certificates in the certificate chain. Example below includes certificates=1 as a parameter.

### Request

* `{testId}` the ID of the HTTP Server (or page load) test you wish to retrieve
* There is no request body for this request.

### Response

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
agentId | integer | n/a | unique ID of agent, from `/agents` endpoint
agentName | string | n/a | display name of the agent responding
countryId | string | n/a | ISO-3166-1 alpha-2 country code of the agent
date | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
roundId | long | seconds | epoch time (seconds) indicating the start time of the round
permalink | url | n/a | link to jump to this result in the front end
serverIp | string | n/a | IP address of destination server
responseCode | integer | n/a | code of HTTP response
numRedirects | integer | n/a | number of redirects
redirectTime | integer | milliseconds | cumulative redirect timing
dnsTime | integer | milliseconds | time required to resolve DNS
sslTime | integer | milliseconds | time to negotiate SSL/TLS
connectTime | integer | milliseconds | time required to establish a TCP connection to the server
waitTime | integer | milliseconds | time elapsed between completion of request and first byte of response
receiveTime | integer | milliseconds | elapsed time between first and last byte of response
wireSize | float | bytes | size of content, in bytes
responseTime | integer | milliseconds | time to first byte
throughput | integer | bytes per second | `wireSize` divided by `receiveTime`
totalTime | integer | milliseconds | response time + receive time
requestHeaders | string | n/a | crlf-delimited list of request headers in header: value format
responseHeaders | string | n/a | crlf-delimited list of response headers in header: value format
errorType | string | n/a | type of error encountered; corresponds to phase of connection
errorDetails | string | n/a | error details, if an error were encountered
sslCipher | string | n/a | cipher suite
sslVersion | string | n/a | TLS version
sslCerts | array of records | n/a | list of certificates in the chain

{.inline-code}If the optional parameter `certificates=1` is included in the request URL, the `sslCerts` field is added to the response and contains an array of objects each containing the following information:

Field | Data Type | Units | Notes
:------------|-------------|-------------|-------------|
daysUntilExpiry | integer | day | days until certificate expires, rounded down. 0 is shown if there are less than 24 hours remaining. Calculated when the test was executed.
fetchDateInValidCertDateRange | boolean | n/a | `true` when certificate fetch date is within the valid certificate date range, `false` otherwise
hasValidSigningCert | boolean | n/a | this field is implicitly `true`; it is output only when `false`. `false` indicates this certificate was missing a valid signing certificate in the chain. 
issuerName | string | n/a | certificate issuer
notValidAfter | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
notValidBefore | dateTime | n/a | yyyy-MM-dd hh:mm:ss, in UTC
subjectAltNames | array of strings | n/a | alternative name(s) of the certificate subject, extracted from the Subject Alternative Name (SAN) X.509 certificate extension, for example `example.com`, `www2.example.com`
subjectName | string | n/a | certificate's subject name - a value of the common name (CN) RDN from the certificate's `Subject` attribute, for example `www.example.com`

### Example

`$ curl "https://api.thousandeyes.com{{ site.version_url_prefix_request }}/web/http-server/817.json?headers=1&certificates=1" \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

#### Header

```
HTTP/1.1 200 OK
Date: Mon, 04 May 2020 17:09:30 GMT
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
X-Server-Name: ddg8s
Cache-Control: no-store
X-Organization-Rate-Limit-Limit: 240
X-Organization-Rate-Limit-Remaining: 239
X-Organization-Rate-Limit-Reset: 1588612200
Strict-Transport-Security: max-age=15724800; includeSubDomains
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
```

#### Body

```
{
    "pages": {
        "current": 1
    },
    "web": {
        "httpServer": [
            {
                "agentId": 53279,
                "agentName": "San Jose, CA (CenturyLink)",
                "connectTime": 2,
                "countryId": "US",
                "date": "2020-05-04 16:15:14",
                "dnsTime": 0,
                "errorType": "None",
                "numRedirects": 1,
                "permalink": "https://app.thousandeyes.com/web/http-server?__a=75&testId=817&roundId=1588608900&agentId=53279",
                "receiveTime": 1,
                "redirectTime": 10,
                "requestHeaders": "GET / HTTP/1.1\r\nHost: www.thousandeyes.com\r\nUser-Agent: curl/7.58.0-DEV\r\nAccept: */*\r\nAccept-Encoding: deflate, gzip\r\nX-ThousandEyes-Agent: yes\r\n",
                "responseCode": 200,
                "responseHeaders": "HTTP/1.1 200 OK\r\nContent-Type: text/html;charset=UTF-8\r\nContent-Length: 9993\r\nConnection: keep-alive\r\nDate: Mon, 04 May 2020 16:13:00 GMT\r\nServer: Apache\r\nContent-Language: en-US\r\nContent-Encoding: gzip\r\nX-Frame-Options: sameorigin\r\nCache-Control: max-age=600, must-revalidate\r\nStrict-Transport-Security: max-age=31536000\r\nX-Content-Type-Options: nosniff\r\nX-XSS-Protection: 1; mode=block\r\nVary: Accept-Encoding\r\nX-Cache: Hit from cloudfront\r\nVia: 1.1 7ba3caf71ae7a52dd411d1a543e80cd8.cloudfront.net (CloudFront)\r\nX-Amz-Cf-Pop: SFO5-C3\r\nX-Amz-Cf-Id: w4h42tkoJD-rEpkRDZUvnQBmy26GVGe6pUsuRr1Dphf7oajYbjXaOA==\r\nAge: 132\r\n",
                "responseTime": 14,
                "roundId": 1588608900,
                "serverIp": "99.84.230.17",
                "sslCerts": [
                    {
                        "daysUntilExpiry": 7,
                        "fetchDateInValidCertDateRange": true,
                        "issuerName": "DigiCert SHA2 Extended Validation Server CA",
                        "notValidAfter": "2020-05-12 12:00:00",
                        "notValidBefore": "2018-03-27 00:00:00",
                        "subjectAltNames": [
                            "www.thousandeyes.com",
                            "thousandeyes.com"
                        ],
                        "subjectName": "www.thousandeyes.com"
                    },
                    {
                        "daysUntilExpiry": 3092,
                        "fetchDateInValidCertDateRange": true,
                        "issuerName": "DigiCert High Assurance EV Root CA",
                        "notValidAfter": "2028-10-22 12:00:00",
                        "notValidBefore": "2013-10-22 12:00:00",
                        "subjectName": "DigiCert SHA2 Extended Validation Server CA"
                    },
                    {
                        "daysUntilExpiry": 4206,
                        "fetchDateInValidCertDateRange": true,
                        "issuerName": "DigiCert High Assurance EV Root CA",
                        "notValidAfter": "2031-11-10 00:00:00",
                        "notValidBefore": "2006-11-10 00:00:00",
                        "subjectName": "DigiCert High Assurance EV Root CA"
                    }
                ],
                "sslCipher": "ECDHE-RSA-AES128-GCM-SHA256",
                "sslTime": 9,
                "sslVersion": "TLSv1.2",
                "totalTime": 15,
                "waitTime": 3,
                "wireSize": 9993           
        ],
        "test": {
            "alertsEnabled": 1,
            "apiLinks": [
                {
                    "href": "https://api.thousandeyes.com/v6/tests/817",
                    "rel": "self"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/web/http-server/817",
                    "rel": "data"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/net/metrics/817",
                    "rel": "data"
                },
                {
                    "href": "https://api.thousandeyes.com/v6/net/path-vis/817",
                    "rel": "data"
                }
            ],
            "authType": "NONE",
            "bandwidthMeasurements": 0,
            "bgpMeasurements": 0,
            "contentRegex": "",
            "createdBy": "API Sandbox User (noreply@thousandeyes.com)",
            "createdDate": "2012-06-28 19:33:12",
            "enabled": 1,
            "followRedirects": 1,
            "httpTargetTime": 1000,
            "httpTimeLimit": 5,
            "httpVersion": 2,
            "interval": 900,
            "ipv6Policy": "USE_AGENT_POLICY",
            "liveShare": 0,
            "modifiedBy": "ThousandEyes (support@thousandeyes.com)",
            "modifiedDate": "2019-01-17 12:38:09",
            "mtuMeasurements": 1,
            "networkMeasurements": 1,
            "numPathTraces": 3,
            "pathTraceMode": "classic",
            "probeMode": "AUTO",
            "protocol": "TCP",
            "savedEvent": 0,
            "sslVersion": "Auto",
            "sslVersionId": 0,
            "testId": 817,
            "testName": "http://www.thousandeyes.com",
            "type": "http-server",
            "url": "http://www.thousandeyes.com",
            "useNtlm": 0,
            "usePublicBgp": 1,
            "verifyCertificate": 1
        }
    }
}
```

For more information on our HTTP response status codes, see the [response status codes documentation][overview-responsestatuscodes].
