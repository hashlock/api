---
parent_category: tests
parent_category_label: Tests

title: 'Test metadata'

sortorder: 4
category-sortorder: 10
layout: null
---

Test fields are shown in the tables below, organized by test type.  The table indicates whether the fields can be used in test creation, updates, or simply in returning data.  As a reminder, in order to create a new test, the user attempting the creation must be an Account Admin; Regular users are blocked from using any of the POST-based methods.

Fields are listed alphabetically by test type below.

Where a field indicates n/a for both Test Creation and Test Update, these fields are system-generated and read only, and displayed as part of test metadata.

## All Test Types
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
alertsEnabled | Optional | Optional | integer | 0 or 1 | choose 1 to enable alerts, or 0 to disable alerts.  Defaults to 1
alertRules | Optional | Optional | array of alert rule objects {"ruleId": ruleId} | see notes | get ruleId from `/alert-rules` endpoint.  If alertsEnabled is set to 1 and alertRules is not included in a creation/update query, applicable defaults will be used.  
apiLinks | n/a | n/a | array of apiLinks objects | array of apiLink objects, showing rel and href elements | Read only; self links to endpoint to pull test metadata, and data links to endpoint for test data
createdBy | n/a | n/a | string | Username (email@company.com) | read only
createdDate | n/a | n/a | string | YYYY-MM-DD HH:mm:ss formatted date | read only; shown in UTC
description | Optional | Optional | string | (any) | defaults to empty string
enabled | n/a | Optional | integer | 0 or 1 | choose 1 to enable the test, 0 to disable the test
groups | Optional | Optional | array of label objects (`"groups": [ { "name": "groupName", "groupId": groupId, "builtIn": 0}]`) | see notes | get groupId from `/groups`endpoint.
liveShare | n/a | n/a | integer | 0 or 1 | read only; indicates 1 for a test shared with your account group, 0 for a normal test (does not apply to DNS+ tests)
modifiedBy | n/a | n/a | string | Username (email@company.com) | read only
modifiedDate | n/a | n/a | string | YYYY-MM-DD HH:mm:ss formatted date | read only; shown in UTC
savedEvent | n/a | n/a | integer | 0 or 1 | read only; indicates 1 for a saved event, 0 for a normal test
sharedWithAccounts | Optional | Optional | array of account group objects (`"sharedWithAccounts": [{"aid": aid, "name": "AccountGroupName"}]`) | see notes | Test is shared with the listed accout groups. Get `aid` and `name` from [account-groups][account-group-list] endpoint.
testId | n/a | n/a | integer | unique ID of test | read only; each test is assigned a unique ID; this is used to access test data from other endpoints.
testName | Optional | Optional | string | (any) | Test name must be unique
type | n/a | n/a | string | type of test being queried | This is a read only value, as test type is implicit in the test creation url.

## Routing

### BGP (`bgp`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | Get monitorId from `/bgp-monitors` endpoint. If a public monitor is included in the `bgpMonitors` list on test creation/update, all public monitors will be assigned to the test, regardless of the setting specified in the `usePublicBgp` parameter.
includeCoveredPrefixes | Optional | Optional | integer | 0 or 1 | set to 1 to include queries for subprefixes detected under this prefix
prefix | Required | n/a | string | a.b.c.d/e | a.b.c.d is a network address, with the prefix length defined as e.  Prefixes can be any length from 8 to 24
usePublicBgp | Optional | Optional | integer | 0 or 1 | set to `1` to automatically add all available Public BGP Monitors


## Network

### Agent to Server (`agent-to-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
bandwidthMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure bandwidth.  Only applies to Enterprise Agents assigned to the test
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | get monitorId from `/bgp-monitors` endpoint.
interval | Required | Optional | integer | \[120, 300, 600, 900, 1800, 3600\] | value in seconds
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
port | Optional | n/a | integer | (1..65535) | if protocol is TCP, defaults to port 80.  Protocol and port (shown below) are mutually exclusive - if ICMP is selected and port is provided, the request will error.
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | n/a | string | `TCP` or `ICMP` | protocol and port (shown below) are mutually exclusive - if ICMP is selected and port is provided, the request will error; defaults to `TCP`
server | Required | n/a | string | (any) | target name or IP address


### Agent to Agent (`agent-to-agent`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | get monitorId from `/bgp-monitors` endpoint.
direction | Optional | Optional | string | \[TO_TARGET, FROM_TARGET, BIDIRECTIONAL\] | Direction of the test (affects how results are shown); defaults to `TO_TARGET`
dscp  | n/a | Read Only | string | [DSCP list][dscp-list] | dscp label
dscpId | Optional | Optional | integer | [DSCP list][dscp-list] | see list for acceptable values; defaults to 0
interval | Required | Optional | integer | \[120, 300, 600, 900, 1800, 3600\] | value in seconds
mss | Optional | Optional | integer | (30..1400) | Maximum Segment Size, in bytes.
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
port | Optional | Optional | integer | (1..65535) | defaults to port 49153
protocol | Optional | Optional | string | TCP or UDP | defaults to TCP
targetAgentId | Required | Optional | integer | pull from `/agents` endpoint | `agentId` of the target agent for the test
throughputMeasurements | Optional | Optional | integer | 0 or 1 | defaults to 0 (disabled), not allowed when source (or target) of the test is a cloud agent
throughputDuration | Optional | Optional | integer | (5000..30000) | defaults to 10000
throughputRate | Optional | Optional | integer | (0..1000) | for UDP only


## DNS

### DNS Server (`dns-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint
bandwidthMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure bandwidth.  Only applies to Enterprise Agents assigned to the test, and requires that networkMeasurements is set.  **We do not recommend setting this flag on DNS server tests**
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1 when networkMeasurements is set
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | get monitorId from `/bgp-monitors` endpoint.
dnsServers | Required | Optional | array of DNS Server objects {"serverName": "fqdn of server"} | | |
dnsTransportProtocol | Optional | Optional | string | `UDP` or `TCP` | transport protocol used for DNS requests; defaults to `UDP`
domain | Required | n/a | string | see notes | target record for test, suffixed by record type (ie, `www.thousandeyes.com CNAME`).  If no record type is specified, the test will default to an ANY record.
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
numPathTraces | Optional | Optional | integer | (1..10) | defaults to 1
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | Optional | string | `TCP` or `ICMP` | protocol used by dependent Network tests (End-to-end, Path Trace, PMTUD); defaults to `TCP`
recursiveQueries | Optional | Optional | integer | 0 or 1 | set to 1 to run query with RD (recursion desired) flag enabled


### DNS Trace (`dns-trace`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint
dnsTransportProtocol | Optional | Optional | string | `UDP` or `TCP` | transport protocol used for DNS requests; defaults to `UDP`
domain | Required | n/a | string | see notes | target record for test, suffixed by record type (ie, `www.thousandeyes.com CNAME`).  If no record type is specified, the test will default to an ANY record.
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds


### DNSSEC (`dns-dnssec`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.
domain | Required | n/a | string | see notes | target record for test, followed by record type (ie, `www.thousandeyes.com A`)
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds


## DNS+

### DNS+ Domain (`dnsp-domain`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
domain | Required | n/a | string | see notes | target record for test, followed by record type (ie, `www.thousandeyes.com A`)
interval | Required | Optional | integer | \[900, 1800, 3600\] | value in seconds


### DNS+ Server (`dnsp-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
interval | Required | Optional | integer | \[3600, 7200, 10800\] | value in seconds
server | Required | Read-only | string | see notes | fqdn of DNS resolver


## Web

### HTTP Server (`http-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
authType | Optional | Optional | string | `NONE`, `BASIC`, `NTLM`, `KERBEROS` | HTTP Authentication type; defaults to `NONE`
bandwidthMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure bandwidth.  Only applies to Enterprise Agents assigned to the test, and requires that networkMeasurements is set.  
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1 when networkMeasurements is set
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | get monitorId from `/bgp-monitors` endpoint.
clientCertificate | Optional | Optional | string | see notes | String representation (containing newline characters) of client certificate, if used
contentRegex | Optional | Optional | string | [Regular Expressions][regexp-quickref] | This field does not require escaping
customHeaders | Optional | Optional | object containing header objects `"customHeaders": {"root": {"header1": "value1"},"domains": {"domain1.com": {"header2": "value2"}},"all": {"header3": "value3"}}` | any | use HTTP header values in this object
customHeaders.all | Optional | Optional | object containing headers `"all":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for all domains
customHeaders.domains | Optional | Optional | object containing domains mapped to header objects `"domains":{"example.com":{"header1":"value1","header2":"value2"}}` | any | use these HTTP headers for the specified domain(s)
customHeaders.root | Optional | Optional | object containing headers `"root":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for root server request
desiredStatusCode | Optional | Optional | string | A valid HTTP response code | Set to the value you're interested in retrieving.
downloadLimit | Optional | Optional | integer | any | specify maximum number of bytes to download from the target object
dnsOverride | Optional | Optional | string | IP address | IP address to use for DNS override
followRedirects | Optional | Optional | integer | 0 or 1 | set to 0 to not follow HTTP/301 or HTTP/302 redirect directives.  Default is 1
headers | Optional | Optional | array of header strings \["header: value", "header2: value"\] | any | use HTTP header values in this list
httpVersion | Optional | Optional | integer | \[1,2\] | 2 for default (prefer HTTP/2), 1 for HTTP/1.1 only
httpTargetTime | Optional | Optional | integer | (100..5000) | target time for HTTP server completion; specified in milliseconds
httpTimeLimit | Optional | Optional | integer | (5..60) | defaults to 5 seconds
interval | Required | Optional | integer | \[120, 300, 600, 900, 1800, 3600\] | value in seconds
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
password | Optional | Optional | string | see notes | password to be used for Basic/NTLM authentication
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
postBody | Optional | Optional | string | see notes | Enter the post body in this field.  No escaping is required.  If the post body is set to something other than empty, the requestMethod will be set to POST.
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | Optional | string | `TCP` or `ICMP` | protocol used by dependent Network tests (End-to-end, Path Trace, PMTUD); defaults to `TCP`
sslVersion | Read only | Read Only | string | corresponds to sslVersionId | Reflects the verbose ssl protocol version used by a test
sslVersionId | Optional | Optional | integer | \[0,3,4,5,6\] | 0 for auto, 3 for SSLv3, 4 for TLS v1.0, 5 for TLS v1.1, 6 for TLS v1.2
url | Required | n/a | string | see notes | target for the test
useNtlm | Optional | Optional | integer | 0 or 1 | choose 1 to use NTLM, 0 to use Basic Authentication.  Requires username/password to be set
userAgent | Optional | Optional | string | see notes | user-agent string to be provided during the test
username | Optional | Optional | string | see notes | username to be used for Basic/NTLM authentication
verifyCertificate | Optional | Optional | integer | 0 or 1 | set to 0 to ignore certificate errors (defaults to 1)


### Page Load (`page-load`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint
authType | Optional | Optional | string | `NONE`, `BASIC`, `NTLM`, `KERBEROS` | HTTP Authentication type; defaults to `NONE`
bandwidthMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure bandwidth.  Only applies to Enterprise Agents assigned to the test, and requires that networkMeasurements is set
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1 when networkMeasurements is set
bgpMonitors | Optional | Optional | array of BGP Monitor objects {"monitorId": monitorId} | see notes | get monitorId from `/bgp-monitors` endpoint.
customHeaders | Optional | Optional | object containing header objects `"customHeaders": {"root": {"header1": "value1"},"domains": {"domain1.com": {"header2": "value2"}},"all": {"header3": "value3"}}` | any | use HTTP header values in this object
customHeaders.all | Optional | Optional | object containing headers `"all":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for all domains
customHeaders.domains | Optional | Optional | object containing domains mapped to header objects `"domains":{"example.com":{"header1":"value1","header2":"value2"}}` | any | use these HTTP headers for the specified domain(s)
customHeaders.root | Optional | Optional | object containing headers `"root":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for root server request
httpInterval | Required | Optional | integer | \[120, 300, 600, 900, 1800, 3600\] | Cannot be larger than the interval value; defaults to the same value as interval
httpTargetTime | Optional | Optional | integer | (100..5000) | target time for HTTP server completion; specified in milliseconds
httpTimeLimit | Optional | Optional | integer | (5..60) | defaults to 5 seconds
httpVersion | Optional | Optional | integer | \[1,2\] | 2 for default (prefer HTTP/2), 1 for HTTP/1.1 only
includeHeaders | Optional | Optional | integer | 0 or 1 | set to 1 to capture response headers for objects loaded by the test.  Default is 1.
interval | Required | Optional | integer | \[120, 300, 600, 900, 1800, 3600\] | value in seconds
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
pageLoadTargetTime | Optional | Optional | integer | (1..30) |  target time for Page Load completion; specified in seconds; cannot exceed pageLoadTimeLimit value
pageLoadTimeLimit | Optional | Optional | integer | (5..MIN(0.25 * interval, 60) | must be larger than httpTimeLimit; defaults to 10 seconds
password | Optional | Optional | string | see notes | password to be used for Basic/NTLM authentication
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | Optional | string | `TCP` or `ICMP` | protocol used by dependent Network tests (End-to-end, Path Trace, PMTUD); defaults to `TCP`
sslVersion | Read only | Read Only | string | corresponds to sslVersionId | Reflects the verbose ssl protocol version used by a test
sslVersionId | Optional | Optional | integer | \[0,3,4,5,6\] | 0 for auto, 3 for SSLv3, 4 for TLS v1.0, 5 for TLS v1.1, 6 for TLS v1.2
subinterval | Optional | Optional | integer | \[60, 120, 300, 600, 900, 1200, 1800, 3600\] or `null` | subinterval for round-robin testing (in seconds). Must be less than or equal to `interval` and must evenly divide `interval`; default is `null`, which disables round-robin
url | Required | n/a | string | see notes | target for the test
useNtlm | Optional | Optional | integer | 0 or 1 | choose 1 to use NTLM, 0 to use Basic Authentication.  Requires username/password to be set
userAgent | Optional | Optional | string | see notes | user-agent string to be provided during the test
username | Optional | Optional | string | see notes | username to be used for Basic/NTLM authentication
verifyCertificate | Optional | Optional | integer | 0 or 1 | set to 0 to ignore certificate errors (defaults to 1)


### Transaction (`transactions`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.  
authType | Optional | Optional | string | `NONE`, `BASIC`, `KERBEROS` | HTTP Authentication type; defaults to `NONE`
customHeaders | Optional | Optional | object containing header objects `"customHeaders": {"root": {"header1": "value1"},"domains": {"domain1.com": {"header2": "value2"}},"all": {"header3": "value3"}}` | any | use HTTP header values in this object
customHeaders.all | Optional | Optional | object containing headers `"all":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for all domains
customHeaders.domains | Optional | Optional | object containing domains mapped to header objects `"domains":{"example.com":{"header1":"value1","header2":"value2"}}` | any | use these HTTP headers for the specified domain(s)
customHeaders.root | Optional | Optional | object containing headers `"root":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for root server request
endStep | Optional | Optional | integer | Transaction step number to end the transaction timer - this is based on the zero-indexed `stepNum` field specified in `transactionSteps`.  | If omitted, the transaction will end at the last step in the transaction script
includeHeaders | Optional | Optional | integer | 0 or 1 | set to 1 to capture response headers for objects loaded by the test.  Default is 1.
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds
password | Optional | Optional | string | see notes | password to be used for Basic/NTLM authentication
startStep | Optional | Optional | integer | Transaction step number to begin the transaction timer - this is based on the zero-indexed `stepNum` field specified in `transactionSteps`.  | If omitted, the transaction will start at step 0 of the transaction script
subinterval | Optional | Optional | integer | \[60, 120, 300, 600, 900, 1200, 1800, 3600\] or `null` | subinterval for round-robin testing (in seconds). Must be less than or equal to `interval` and must evenly divide `interval`; default is `null`, which disables round-robin
targetTime | Optional | Optional | integer | (1..60) | target time for completion, defaults to 50% of time limit; specified in seconds
timeLimit | Optional | Optional | integer | (5..MIN(0.25 * interval, 180)) | time limit for transaction; defaults to 30s
userAgent | Optional | Optional | string | see notes | user-agent string to be provided during the test
username | Optional | Optional | string | see notes | username to be used for Basic/NTLM authentication
url | Required | Read Only | string | see notes | target for the test
transactionScript | Optional (see notes) | Optional (see notes) | string | see notes | HTML version of a transaction script.  Quotes must be escaped (precede `"` characters with `\`).  To obtain a transaction script for upload, click the Export as file option from the ThousandEyes Recorder.  Note that this field is write-only and can only be used on test creation.
transactionSteps | Optional (see notes) | Optional (see notes) | array of `transactionStep` objects. | see `transactionSteps.<field>` values below | Either `transactionSteps` or `transactionScript` is required to be specified.  If `transactionSteps` is specified, then this value will override any `transactionScript` field supplied in the call
transactionSteps.stepNum | Required | Optional | integer | Zero-indexed step number.  | Steps must be provided sequentially, and must start at zero
transactionSteps.stepName | Required | Optional | string | see notes | name for the step
transactionSteps.command | Required | Optional | string | see notes | command for the step
transactionSteps.target | Required | Optional | string | see notes | target for the step
transactionSteps.value | Optional | Optional | string | see notes | if a value field is required as part of the transaction step (for example, a waitForCondition command), specify the value in this field.  If no value is required, omit the value field.


### Web Transaction (`web-transactions`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects {"agentId": agentId} | see notes | get agentId from `/agents` endpoint.
authType | Optional | Optional | string | `NONE`, `BASIC`, `KERBEROS`, `NTLM` | HTTP Authentication type; defaults to `NONE`
bandwidthMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure bandwidth; defaults to 0.  Only applies to Enterprise Agents assigned to the test, and requires that networkMeasurements is set.
contentRegex | Optional | Optional | string | [Regular Expressions][regexp-quickref] | Verify content using a regular expression. This field does not require escaping
credentials | Optional | Optional | array of credentialId integers `{"credentials":[credentialId1,credentialId2,...]}` | see notes | get credentialId from /credentials endpoint
customHeaders | Optional | Optional | object containing header objects `"customHeaders": {"root": {"header1": "value1"},"domains": {"domain1.com": {"header2": "value2"}},"all": {"header3": "value3"}}` | any | use HTTP header values in this object
customHeaders.all | Optional | Optional | object containing headers `"all":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for all domains
customHeaders.domains | Optional | Optional | object containing domains mapped to header objects `"domains":{"example.com":{"header1":"value1","header2":"value2"}}` | any | use these HTTP headers for the specified domain(s)
customHeaders.root | Optional | Optional | object containing headers `"root":{"header1":"value1","header2":"value2"}` | any | use these HTTP headers for root server request
desiredStatusCode | Optional | Optional | string | A valid HTTP response code | Set to the value you're interested in retrieving.
followRedirects | Optional | Optional | integer | 0 or 1 | set to 0 to not follow HTTP/301 or HTTP/302 redirect directives.  Default is 1
httpTargetTime | Optional | Optional | integer | (100..5000) | target time for HTTP server completion; specified in milliseconds
httpTimeLimit | Optional | Optional | integer | (5..60) | defaults to 5 seconds
httpVersion | Optional | Optional | integer | \[1,2\] | 2 for default (prefer HTTP/2), 1 for HTTP/1.1 only
includeHeaders | Optional | Optional | integer | 0 or 1 | set to 1 to capture response headers for objects loaded by the test.  Default is 1.
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
password | Optional | Optional | string | see notes | password to be used for NTLM or Basic authentication
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | Optional | string | `TCP` or `ICMP` | protocol used by dependent Network tests (End-to-end, Path Trace, PMTUD); defaults to `TCP`
sslVersionId | Optional | Optional | integer | \[0,3,4,5,6\] | 0 for auto, 3 for SSLv3, 4 for TLS v1.0, 5 for TLS v1.1, 6 for TLS v1.2
subinterval | Optional | Optional | integer | \[60, 120, 300, 600, 900, 1200, 1800, 3600\] or `null` | subinterval for round-robin testing (in seconds). Must be less than or equal to `interval` and must evenly divide `interval`; default is `null`, which disables round-robin
targetTime | Optional | Optional | integer | (1..60) | target time for completion, defaults to 50% of time limit; specified in seconds
timeLimit | Optional | Optional | integer | (5..MIN(0.25 * interval, 180)) | time limit for transaction; defaults to 30s
transactionScript | Required | Optional (see notes) | string | see notes | JavaScript of a web transaction test. Quotes must be escaped (precede `"` characters with `\` ).
url | Required | Read Only | string | see notes | target for the test
useNtlm | Optional | Optional | integer | 0 or 1 | choose 1 to use NTLM Authentication, or choose 0 to use Basic Authentication. Requires `username` and `password` to be set. If `authType` is specified, it will override this setting.
userAgent | Optional | Optional | string | see notes | user-agent string to be provided during the test
username | Optional | Optional | string | see notes | username to be used for NTLM or Basic authentication
verifyCertificate | Optional | Optional | integer | 0 or 1 | set to 0 to ignore certificate errors (defaults to 1)


### FTP Server (`ftp-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects `{"agentId": agentId}` | see notes | get `agentId` from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1 when networkMeasurements is set
downloadLimit | Optional | Optional | integer | any | specify maximum number of bytes to download from the target object
ftpTargetTime | Optional | Optional | integer | (1000..6000) | target time for operation completion; specified in milliseconds.
ftpTimeLimit | Optional | Optional | integer | (10..60) | Set the time limit for the test (in seconds).  FTP tests default to 10s.
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds.
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
password | Required | Optional | string | see notes | password to be used to authenticate with the destination server.
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
probeMode | Optional | Optional | string | `AUTO`, `SACK` or `SYN` | probe mode used by End-to-end Network Test; only valid if `protocol` is set to `TCP`; defaults to `AUTO`
protocol | Optional | Optional | string | `TCP` or `ICMP` | protocol used by dependent Network tests (End-to-end, Path Trace, PMTUD); defaults to `TCP`
requestType | Required | Optional | string | \[Download, Upload, List\] | Set the type of activity for the test.
url | Required | Optional | string | see notes | url of site being tested.  Based on the request type, may be a fully qualified domain + file name (for download), a path on an FTP Server (for list and upload types)
useActiveFtp | Optional | Optional | 0 or 1 | see notes | explicitly set the flag to use active FTP.  Tests are set to use passive FTP by default
useExplicitFtps | Optional | Optional | 0 or 1 | see notes | use explicit FTPS (ftp over SSL).  By default, tests will autodetect when it is appropriate to use FTPS.
username | Required | Optional | string | see notes | username to be used to authenticate with the destination server


## Voice

### SIP Server (`sip-server`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects `{"agentId": agentId}` | see notes | get `agentId` from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
authUser | Optional | Optional | string | see notes | username for authentication with SIP server
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable bgp measurements, 0 to disable; defaults to 1 when networkMeasurements is set
mtuMeasurements | Optional | Optional | integer | 0 or 1 | set to 1 to measure MTU sizes on network from agents to the target
networkMeasurements | Optional | Optional | integer | 0 or 1 | choose 1 to enable network measurements, 0 to disable;  defaults to 1
optionsRegex | Optional | Optional | string | [Regular Expressions][regexp-quickref] | this field does not require escaping
password | Optional | Optional | string | see notes | password for authentication with SIP server
pathTraceMode | Optional | Optional | string | `classic` or `inSession` | choose `inSession` to perform the path trace within a TCP session; defaults to `classic`
port | Required | Optional | integer | (1024..65535) | port number for the chosen `protocol`
protocol | Optional | Optional | string | `TCP`, `TLS` or `UDP` | transport layer for SIP communication, defaults to `TCP`
registerEnabled | Optional | Optional | integer | 0 or 1 | 1 to perform SIP registration on the test target with the SIP REGISTER command, defaults to 0
sipRegistrar | Required | Optional | string | see notes | SIP server to be tested, specified by domain name or IP address
sipTargetTime | Optional | Optional | integer | (100..5000) | target time for test completion; specified in milliseconds
sipTimeLimit | Optional | Optional | integer | (5..10) | defaults to 5 seconds
targetSipCredentials | Required | Optional | object | see notes | target SIP server parameters
targetSipCredentials.authUser | Optional | Optional | string | see notes | username for authentication with SIP server
targetSipCredentials.password | Optional | Optional | string | see notes | password for authentication with SIP server
targetSipCredentials.port | Required | Optional | integer | (1024..65535) | port number for the chosen `protocol`
targetSipCredentials.protocol | Optional | Optional | string | `TCP`, `TLS` or `UDP` | transport layer for SIP communication, defaults to `TCP`
targetSipCredentials.sipRegistrar | Required | Optional | string | see notes | SIP server to be tested, specified by domain name or IP address
targetSipCredentials.user | Optional | Optional | string | see notes | username for SIP registration; should be unique within a ThousandEyes Account Group
user | Optional | Optional | string | see notes | username for SIP registration; should be unique within a ThousandEyes Account Group


### RTP Stream (`voice`)
Field | Test Creation | Test Update | Data Type | Acceptable Values | Notes
:------------|-------------|-------------|---------------|-----------|--------------|
agents | Required | Optional | array of agent objects `{"agentId": agentId}` | see notes | get `agentId` from `/agents` endpoint.
agents.sourceIpAddress | Optional | Optional | string | see notes | IP address from `ipAddresses` of [Agent Details][agent-details] for interface selection.
bgpMeasurements | Optional | Optional | integer | 0 or 1 | choose 0 to disable bgp measurements; defaults to 1
codec | n/a | Read Only | string | see notes | codec label
codecId | Optional | Optional | integer | [Voice codec list][voip-codec-list] | see list for acceptable values; defaults to 0
dscp | n/a | Read Only | string | see notes | dscp label
dscpId | Optional | Optional | integer | [DSCP list][dscp-list] | see list for acceptable values; defaults to 46
duration | Optional | Optional | integer | (5..30) | duration of the test (in seconds); defaults to 5
interval | Required | Optional | integer | \[300, 600, 900, 1800, 3600\] | value in seconds
jitterBuffer | Optional | Optional | integer | (0..150) | de-jitter buffer size (in seconds); defaults to 40
numPathTraces | Optional | Optional | integer | (3..10) | defaults to 3
targetAgentId | Required | Optional | integer | pull from `/agents` endpoint | `agentId` of the target agent for the test
