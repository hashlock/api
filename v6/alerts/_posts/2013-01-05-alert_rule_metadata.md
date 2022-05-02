---
parent_category: alerts
parent_category_label: Alerts & Notifications

title: 'Alert rule metadata'

sortorder: 5
category-sortorder: 45
layout: null
---

Alert rule fields are shown in the table below.  The table indicates whether the fields can rule creation, updates, or simply in returning data.  As a reminder, in order to create a new alert rule, the user attempting the creation must be in a role which includes the Edit Alert rules permission.

Fields are listed in the table below.

Where a field indicates n/a for both Alert rule creation and update, these fields are system-generated and read only, and displayed as part of test metadata.

Field | Creation | Update | Data Type | Accepts | Notes/Example
:------------|-------------|-------------|-------------|---------------|-----------|
alertType | required | required | string | Acceptable test types, verbose names. | Page Load, HTTP Server, End-to-End (Server), End-to-End (Agent), Voice, DNS+ Domain, DNS+ Server, DNS Server, DNS Trace, DNSSEC, Transactions, Web Transactions, BGP, Path Trace, FTP, SIP Server
ruleName | required | required | string | name of the alert rule | the name of the alert rule
default | optional | optional | bit | to set the rule as a default, set this value to 1.  | Defaults to 0
expression | required | required | string | Expression string should be a valid JSON string.  | See examples in the table below. Use examples found on the Alert Rule Detail endpoint.
notifications | optional | optional | object with notification properties | See notifications endpoint for examples | ```"notifications": { "email": { "message": "NA", "recipient": [ "noreply@thousandeyes.com" ] }, "thirdParty": [ { "integrationId": "sl-101", "integrationType": "SLACK" }, {"integrationId": "pgd-21","integrationType": "PAGER_DUTY"} ], "webhook": [ { "integrationId": "wb-201", "integrationType": "WEBHOOK" } ] },```
notifyOnClear | optional | optional | bit | set to 1 to trigger the notification when the alert clears.  | Defaults to 0.
testIds | optional | optional | array of integers | valid test Ids | `"testIds": [12345, 12346]`
minimumSources | optional\* | optional\* | integer | The minimum number of agents or monitors that must meet the specified criteria in order to trigger an alert | Either minimumSources or minimumSourcesPct must be specified in create calls
minimumSourcesPct | optional\* | optional\* | integer | The minimum percentage of agents or monitors that must meet the specified criteria in order to trigger an alert | Either minimumSources or minimumSourcesPct must be specified in create calls
roundsViolatingMode | optional | optional | string | `ANY` or `EXACT` | `EXACT` requires that the same agent(s) meet the threshold in consecutive rounds; default is `ANY`
roundsViolatingRequired | required | required | Integer | specifies the numerator (X value) of the "X of Y times" condition in an alert rule.  | Minimum value is 1, maximum value is 10. Must be less than or equal to `roundsViolatingOutOf`
roundsViolatingOutOf | required | required | Integer | specifies the divisor (Y value) of the "X of Y times" condition in an alert rule. | Minimum value is 1, maximum value is 10.
direction | optional | optional | string | For alertTypes `End-to-end (Agent)` and `Path Trace`, field must be set to a value from this list: \[TO_TARGET, FROM_TARGET, BIDIRECTIONAL\] | see accepts section
includeCoveredPrefixes | optional | optional | bit | set to 1 to include covered prefixes in the BGP alert rule.  Only applicable to BGP alert rules | Defaults to 1
severity | optional | optional | string | valid severity string | optional field with one of the following values: INFO, MAJOR, MINOR, CRITICAL for all alert types

#Expressions

{.inline-code}The following table outlines a list of expressions that can be used when creating or modifying alert rules. Multiple metrics can be combined in a single rule with logical "and" and logical "or" operators, using double-ampersand (`&&`) and double-pipe (`||`), respectively. When combining three or more metrics, a single operator type is allowed, i.e. both logical "and" and logical "or" operators cannot be used. Note that not all metrics can be combined into a single rule.

For more information on metrics please refer to [How alerts work][alerts-howalertswork] for more information on supported metrics.

Alert type | Metric | Operator | Data type | Example | Notes
:------------|-------------|-------------|-------------|---------------|---------------|
HTTP Server | responseCode |  \[<, <=, ==, !=, >=, >\] | Integer | `((responseCode >= 400))` | HTTP response code returned by the test 
HTTP Server | dnsTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((dnsTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | connectTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((connectTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | sslTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((sslTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | waitTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((waitTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | receiveTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((receiveTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | totalTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((totalTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | responseTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((responseTime >= 500 ms))` | ensure that you set units in the expression
HTTP Server | errorType | \[=, !=\] | \[None, SSL, DNS, Connect\] | `((errorType != "None"))` | errorType is specified as a string from list of valid error types.  Double-quote enclose.
HTTP Server | clientSslAlertCode | \[==, !=\] | Integer | `((clientSslAlertCode != 40))` | SSL error code
HTTP Server | serverSslAlertCode | \[==, !=\] | Integer | `((serverSslAlertCode != 40))` | SSL error code
HTTP Server | throughput | \[<, <=, ==, !=, >=, >\] | Integer + units | `((throughput >= 100 kbps))` | ensure that you set units in the expression.
HTTP Server | responseHeaders | \[=~, !~\] | [Regular expression][[regexp-quickref] | `((responseHeaders =~ /"\\wFoo\//))` | Text match for response headers
HTTP Server | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /google/))` | Problem detail (???)
HTTP Server | redirectCount | \[<, <=, ==, !=, >=, >\] | Integer | `((redirectCount >= 2))` | Number of redirects from the target page
HTTP Server | wireSize |  \[<, <=, ==, !=, >=, >\] | Float | `((wireSize > 1024.0 kB))` | ensure that you set units in the expression
FTP Server | ftpReplyCode | \[<, <=, ==, !=, >=, >\] | Integer | `((ftpReplyCode >= 400))` | FTP reply code
FTP Server | dnsTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((dnsTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | connectTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((connectTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | sslTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((sslTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | negotiationTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((negotiationTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | waitTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((waitTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | transferTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((transferTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | totalTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((totalTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | responseTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((responseTime >= 500 ms))` | ensure that you set units in the expression
FTP Server | ftpErrorType | \[=, !=\] | \[None, SSL, DNS, Connect\] | `((ftpErrorType != "None"))` | errorType is specified as a string from list of valid error types.  Double-quote enclose.
FTP Server | throughput | \[<, <=, ==, !=, >=, >\] | Integer + units | `((throughput >= 100 kbps))` | ensure that you set units in the expression.
Network | loss | \[<, <=, ==, !=, >=, >\] | Integer + % | `((loss >= 10%))` | set loss threshold in percent
Network | avgLatency | \[<, <=, ==, !=, >=, >\] | Integer + units |  `((avgLatency >= 100 ms))` | ensure that you set units in the expression
Network | jitter | \[<, <=, ==, !=, >=, >\] | Integer + units | `((jitter >= 15 ms))` | ensure that you set units in expression
Network | availBwCs | \[<, <=, ==, !=, >=, >\] | Integer + units | `((availBwCs >= 10 Mbps))` | ensure that you set units in expression
Network | capCs | \[<, <=, ==, !=, >=, >\] | Integer + units | `((capCs >= 10 Mbps))` | ensure that you set units in expression
All | locationId | \[in, !in\] | list | `[(locationId !in {"1", "2"})`] | locationId reflects the agentId for agent-based tests, and monitorId for BGP-based tests
Page Load | pageLoaded | n/a | n/a | `((!pageLoaded))` | use !pageLoaded to trigger an alert when the page doesn't load
Page Load | pageLoadHasError | \[\==\] | boolean | `((pageLoadHasError == true))` | fire when the page load has a component error
Page Load | pageLoadTimedOut | \[==\] | boolean | `((pageLoadTimedOut == true))` | fire when page load times out
Page Load | timeToFirstByte | \[<, <=, ==, !=, >=, >\] | Integer + units | `((timeToFirstByte >= 100 ms))` | ensure that you set units in the expression
Page Load | onContentLoadTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((onContentLoadTime >= 100 ms))` | ensure that you set units in the expression.  This reflects the DOM Load value in the page load.
Page Load | onLoadTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((onLoadTime >= 100 ms))` | ensure that you set units in the expression.  This metric reflects page load time.
Page Load | errorCount | \[<, <=, ==, !=, >=, >\] | Integer | `((errorCount >= 2))` | number of component errors
Page Load | components | see notes | see notes | see notes | wrap component-specific criteria in a set of parentheses
Page Load | domain | \[in, !in\] | list of strings | `((components((domain !in {"*.facebook.com"}))))` | must be wrapped by components(), applies at the component level
Page Load | totalTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((totalTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | blockedTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((totalTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | dnsTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((dnsTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | connectTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((connectTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | waitTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((waitTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | receiveTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((receiveTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | sslTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((components((sslTime >= 100 ms))))` | must be wrapped by components(), applies at the component level
Page Load | componentLoaded | \[==, !=\] | bit | `((components((componentLoaded == 0))))` | must be wrapped by components(), applies at the component level
Page Load | wireSize |  \[<, <=, ==, !=, >=, >\] | float + units | `((wireSize > 1024.0 kB))` | ensure you set units as part of the expression
Transactions | probDetail | \[=~, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
Transactions | duration |  \[<, <=, ==, !=, >=, >\] | Integer + units | `((duration >= 100 ms))` | ensure you set units as part of the expression
Transactions | completion | \[<, <=, ==, !=, >=, >\] | Integer + % | `((completion >= 98%))` | ensure you add the % symbol as part of the expression
Transactions | stepsCompleted | \[<, <=, ==, !=, >=, >\] | Integer | `((stepsCompleted <= 3))` | Number of steps completed
Transactions | steps | see notes | see notes | see notes | wrap step-specific criteria in a set of parentheses, use array position to identify a specific step.  Note that array is zero-based, so step 1 is `steps[0]()`.
Transactions | stepDuration | \[<, <=, ==, !=, >=, >\] | Integer + units | `((steps[1]((stepDuration >= 100 ms))))` | see note above re: use of steps\[\]
Transactions | pagesCompleted | \[<, <=, ==, !=, >=, >\] | Integer | `((stepsCompleted <= 3))` | Number of pages completed
Transactions | pages | see notes | see notes | see notes | wrap page-specific criteria in a set of parentheses, use array position to identify a specific page.  Note that array is zero-based, so page 1 is `pages[0]()`.
Transactions | pageDuration | \[<, <=, ==, !=, >=, >\] | Integer + units | `((pages[1]((pageDuration >= 100 ms))))` | see note above re: use of pages\[\]
Web Transactions | assertError | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] |  `((assertError =~ /foo/))` | Assert Error 
Web Transactions | duration |  \[<, <=, ==, !=, >=, >\] | Integer + units | `((duration >= 100 ms))` | ensure you set units as part of the expression
Web Transactions | markerDuration |  \[<, <=, ==, !=, >=, >\] | String + Integer + units | `((marker[((markerName == "Marker1"))]((markerDuration >= 100 ms))))` | ensure you set units as part of the expression
Web Transactions | onContentLoadTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((webPages((onContentLoadTime <= 100 ms))))` | DOM load time. Ensure you set units as part of the expression
Web Transactions | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
Web Transactions | txCompletionFinished | \[==\] | boolean | `((txCompletionFinished == true))` | Transaction completed
Web Transactions | txCompletionHasError | \[==\] | boolean | `((txCompletionHasError  == true))` | Transaction completed with errors
Web Transactions | txCompletionHasInternalError | \[==\] | boolean | `((txCompletionHasInternalError  == true))` | Transaction completed with internal errors
Web Transactions | txCompletionTimedOut | \[==\] | boolean | `((txCompletionTimedOut  == true))` | Transaction completed due to reaching timeout value
Web Transactions | webTxOnLoadTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((webPages((webTxOnLoadTime >= 100 ms))))` | Page load time. Ensure that you set units in the expression
Web Transactions | webTxResponseTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((webPages((webTxResponseTime >= 100 ms))))` | Response time. Ensure that you set units in the expression
Web Transactions | webTxPageLoadError | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((webPages((webTxPageLoadError =~ /foo/))))` | Page load error received
DNS Server | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
DNS Server | delay | \[<, <=, ==, !=, >=, >\] | Integer + units | `((delay >= 100 ms))` | ensure you set units as part of the expression
DNS Server | mapData | \[in, !in\] | list | `((mapData !in {"10.0.0.0/8"}))` | list can reflect IP addresses, CIDR blocks, or strings.  Wildcards are supported for domains
DNS Trace | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
DNS Trace | mapData | \[in, !in\] | list | `((mapData !in {"10.0.0.0/8"}))` | list can reflect IP addresses, CIDR blocks, or strings.  Wildcards are supported for domains
DNSSEC | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
Voice | mos | \[<, <=, ==, !=, >=, >\] | Float | `((mos >= 2.75))` | note: mean opinion scores do not have units
Voice | loss | \[<, <=, ==, !=, >=, >\] | Integer + % | `((loss >= 10%))` | set loss threshold in percent
Voice | latency | \[<, <=, ==, !=, >=, >\] | Integer + units |  `((latency >= 100 ms))` | ensure that you set units in the expression
Voice | pdv | \[<, <=, ==, !=, >=, >\] | Integer + units | `((pdv >= 15 ms))` | ensure that you set units in expression
Voice | loss | \[<, <=, ==, !=, >=, >\] | Integer + % | `((loss >= 10%))` | set loss threshold in percent
Voice | discards | \[<, <=, ==, !=, >=, >\] | Integer + % | `((discards >= 10%))` | set discard threshold in percent
Voice | dscp | \[==, !=\] | Integer | `((dscp != 26))` | set DSCP value received by target agent
Voice | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
SIP Server | sipResponseCode | \[<, <=, ==, !=, >=, >\] | Integer | `((sipResponseCode >= 400))` | reflects response code to SIP register
SIP Server | sipErrorType | \[==, !=\] | string | `((sipErrorType != "None"))` | SIP error type (dns, connect, register, invite, options, none)
SIP Server | dnsTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((dnsTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | connectTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((connectTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | registerTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((registerTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | inviteTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((inviteTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | optionsTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((optionsTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | waitTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((waitTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | responseTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((responseTime >= 100 ms))` | ensure you set units as part of the expression
SIP Server | totalTime | \[<, <=, ==, !=, >=, >\] | Integer + units | `((totalTime >= 100 ms))` | ensure you set units as part of the expression
Agent to Agent | loss | \[<, <=, ==, !=, >=, >\] | Integer + % | `((loss >= 10%))` | set loss threshold in percent
Agent to Agent | latency | \[<, <=, ==, !=, >=, >\] | Integer + units |  `((latency >= 100 ms))` | ensure that you set units in the expression
Agent to Agent | jitter | \[<, <=, ==, !=, >=, >\] | Integer + units | `((jitter >= 15 ms))` | ensure that you set units in expression
Agent to Agent | throughput | \[<, <=, ==, !=, >=, >\] | Integer + units | `((throughput >= 10 Mbps))` | ensure that you set units in expression
Agent to Agent | probDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem detail
Agent to Agent | dscp | \[==, !=\] | Integer | `((dscp != 26))` | set DSCP value received by target agent
Agent to Agent | bothWaysLoss | \[<, <=, ==, !=, >=, >\] | Integer + % | `((bothWaysLoss >= 10%))` | set loss threshold in percent
Agent to Agent | bothWaysLatency | \[<, <=, ==, !=, >=, >\] | Integer + units |  `((bothWaysLatency >= 100 ms))` | ensure that you set units in the expression
Agent to Agent | bothWaysJitter | \[<, <=, ==, !=, >=, >\] | Integer + units | `((bothWaysJitter >= 15 ms))` | ensure that you set units in expression
Agent to Agent | bothWaysThroughput | \[<, <=, ==, !=, >=, >\] | Integer + units | `((bothWaysThroughput >= 10 Mbps))` | ensure that you set units in expression
Agent to Agent | bothWaysProbDetail | \[=~, !=, !~\] | [Regular expression][[regexp-quickref] | `((probDetail =~ /foo/))` | Problem details
Path Trace | serverIP | \[in, !in\] | list | `((serverIp !in {"20.0.0.1", "10.0.0.0/8"}))` | IP address of target server
Path Trace | mss | \[<, <=, ==, !=, >=, >\] | Integer + units | `((mss >= 1460 B))` | ensure you set units as part of the expression
Path Trace | pathMtu | \[<, <=, ==, !=, >=, >\] | Integer + units | `((pathMtu >= 1500 B))` | ensure you set units as part of the expression
Path Trace | pathLength | \[<, <=, ==, !=, >=, >\] | Integer | `((pathLength >= 15))` | total length of the path from source to target
Path Trace | isTerminal | \[==\] | Boolean | `((isTerminal == true))` | Value is set to true in the event that the path trace does not reach the destination
Path Trace | hops | see notes | see notes | see notes | wrap hop-specific criteria in a set of parentheses, use array position to indicate hop number.  To test any hop, use hops without specifying an array.  Use negative numbers to test hops from target.
Path Trace | noHops | see notes | see notes | see notes | wrap hop-specific criteria in a set of parentheses, use array position to indicate hop number.  No hops indicates the opposite of hops().
Path Trace | mpls | \[==\] | null | `((hops((mpls != null))))` | use in conjunction with hops() or nohops()
Path Trace | dscp | \[==, !=\] | Integer | `((dscp != 26))` | set DSCP value received by target agent.  use in conjunction with hops() or nohops()
Path Trace | ip | \[in, !in\] | list | `((hops[-1]((ip !in {"20.0.0.1", "10.0.0.0/8"}))))` | use in conjunction with hops() or nohops().  example shows last hop before destination.
Path Trace | asn | \[in, !in\] | list | `((hops((asn !in {1111, 65536}))))` | use in conjunction with hops() or nohops().
Path Trace | rdns | \[in, !in\] | list | `((hops((rdns !in {"*.facebook.com", "*.google.com"}))))` | use in conjunction with hops() or nohops().
BGP | reachability | \[<, <=, ==, !=, >=, >\] | Integer + % | `((reachability <= 90%))` | ensure you set percentage as part of the expression
BGP | changes | \[<, <=, ==, !=, >=, >\] | Float | `((changes >= 1.1))` | ensure you set percentage as part of the expression
BGP | prefixLengthIPv4 | \[<, <=, ==, !=, >=, >\] | Integer | `((prefixLengthIPv4 >= 23))` | typically used in compound statements where covered prefixes are monitored
BGP | prefixLengthIPv6 | \[<, <=, ==, !=, >=, >\] | Integer | `((prefixLengthIPv4 >= 47))` | typically used in compound statements where covered prefixes are monitored
BGP | prefix | \[in, !in\] | list | `((prefix !in {"10.0.0.0/18"}))` | typically used in compound statements where covered prefixes are monitored
BGP | subprefix | \[in, !in\] | list | `((subprefix !in {"10.1.0.0/24"}))` | typically used in compound statements where covered prefixes are monitored
BGP | bgpHops | see notes | see notes | see notes | an array representing AS Path for BGP monitors.  Use array index to identify hops from origin, use negative array index to identify hops from monitor, or no index to represent the entire array.
BGP | noBgpHops | see notes | see notes | see notes | an array representing AS Path for BGP monitors.  Use array index to identify hops from origin, use negative array index to identify hops from monitor, or no index to represent the entire array.
BGP | asn | \[in, !in\] | list | `((bgpHops[1]((asn in {6}))))` | use in conjunction with bgpHops() or noBgpHops()






