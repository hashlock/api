---
parent_category: overview
parent_category_label: Overview

title: 'API change summary'

sortorder: 11
category-sortorder: 1
layout: null
---

The following list documents a running list of changes to version 6 of the ThousandEyes API.  Each release date is linked to the specific release notes for that release, for which Authentication is required.  For details related to other versions of the ThousandEyes API, see the links on the left sidebar.

#APIv6
[Dec 08, 2021][releasenotes-20211208]

* (added) Added two new Admin APIs for obtaining & updating usage quotas

[June 23, 2021][releasenotes-20210623]

* (updated) Added documentation to indicate that `/v6/snapshots` cannot be used to create snapshots of Endpoint Agent scheduled tests.

[April 6, 2021][releasenotes-20210406]

* (added) Added a new Endpoint API for transferring agents.

[January 6, 2021][releasenotes-20210106]

* (added) `networkProtocol`, `tcpProbeMode` and `pathtraceInSession` fields added to Endpoint tests. 

[September 3, 2020][releasenotes-20200903]

* (removed) `voice-call` test type is removed. 

[July 10, 2020][releasenotes-20200710]

* (added) `agent-to-agent` test type now supports `pathTraceMode`

[April 28, 2020][releasenotes-20200428]

* (added) `/endpoint-agents` endpoint now supports `publicIP`, `location`, `proxy`, `agentType`, `totalMemory`, and `clients` fields.
* (added) `/endpoint-agents` endpoint allows to update an agent name.

[April 14, 2020][releasenotes-20200414]

* (added) `web-transactions` test type now supports `followRedirects` field
* (added) `/alert-rules` endpoints now support `roundsViolatingMode` field.
* (added) `/endpoint-agents` endpoint now supports `createdTime`, `lastSeen` and `version` fields.


[March 17, 2020][releasenotes-20200317]

* (added) `/tests` endpoint now supports `pathTraceMode` field.

[January 08, 2020][releasenotes-20200108]

* (added) `/usage` endpoint now supports `EnterpriseAgentUnits` field.
* (added) `/tests` endpoints now support `dnsTransportProtocol` field.
* (removed) Device Layer licenses and usage fields from Usage metadata page as Device layer functionality is now included as a feature of the Enterprise Agent and licenses are no longer required.

[October, 03 2019][releasenotes-20191003]

* (added) write endpoints for alert rules, including `/alert-rules/new`, `alert-rules/{ruleId}/update`, and `alert-rules/{ruleId}/delete`
* (added) new metadata page for alert rules

[August 20, 2019][releasenotes-20190820]

* (added) `/alert-rules` and `/alert-rules/{ruleId}`endpoints now support `minimumSourcesPct` field

[August 6, 2019][releasenotes-20190806]

* (added) `/usage` endpoint now supports `enterpriseUnitsUsed`, `enterpriseUnitsProjected` and `enterpriseUnitsNextBillingPeriod` fields
* (added) `/alert-rules` endpoint now supports `direction` field
* (added) `/alert-rules` field `expression` value format has changed, from human-readable to suitable as a value for `expression` when writing to the endpoint (upcoming feature)
* (added) `/alerts` field `ruleExpression` value format has changed (in the same manner as described above)

[July 23, 2019][releasenotes-20190723]

* (added) `/agents` and `/agents/{agentId}` endpoints now support `targetForTests` field
* (added) `/usage` endpoint now returns unit usage projection for the upcoming billing period via the `cloudUnitsNextBillingPeriod` field
* (added) `/audit/user-events/search` endpoint now returns resource data associated with the searched-for event

[April 30, 2019][releasenotes-20190430]

* (added) `/tests` and `/tests/{testId}` endpoints now support `description` field
* (added) `/usage` endpoint now returns device and Endpoint Agent licensing information in `devicesIncluded`, `devicesUsed`, `endpointAgentsIncluded` and `endpointAgentsUsed` fields
* (added) `/agents` and `/agents/{agentId}` endpoints now return `OS_END_OF_INSTALLATION_SUPPORT` and `OS_END_OF_SUPPORT` information

[April 02, 2019][releasenotes-20190402]

* (added) Enterprise Agent cluster management endpoints: `/agents/{agentId}/add-to-cluster` and `/agents/{agentId}/remove-from-cluster`
* (added) `/reports/{reportId}` endpoint now returns `createdBy`, `modifiedBy` and `modifiedDate` fields

[March 19, 2019][releasenotes-20190319]

* (modified) Running instant Agent to Agent, RTP Stream and Voice Call tests is now supported

[March 6, 2019][releasenotes-20190306]

* (added) `/tests` detailed endpoint has new parameter: `numPathTraces`

[November 27, 2018][releasenotes-20181127]

* (modified) Agent to Agent tests created with the API now default to port 49153

November 20, 2018

* (added) Test metadata returns sharedWithAccounts element. This element shows all the Accounts Groups where a particular test is shared.

[November 13, 2018][releasenotes-20181113]

* (added) Endpoints `/agents` and `/agents/{agentId}` now return `hostname` field

[October 23, 2018][releasenotes-20181023]

* (added) Snapshot creation endpoint: `/snapshot`

[August 29, 2018][releasenotes-20180829]

* (added) Endpoint Scheduled tests endpoints added
* (added) Endpoint Scheduled test data endpoints added

[August 15, 2018][releasenotes-20180815]

* (modified) The way pagination returns the pages element has changed. The `previous` property was removed from pages element and the `next` property now uses `lastRoundId` URL parameter instead of `page` for the pagination

[August 01, 2018][releasenotes-20180801]

* (modified) Starting August 28th, 2018, it is  possible to use Cloud Agents for Instant tests.

[July 18, 2018][releasenotes-20180718]

* (added) `/agents` and `/agents/{agentId}` includes `errorDetails` parameter when an Enterpirse Agent or Cluster Member present at least one error.
* (added) Endpoints `/agents` and `/agents/{agentId}` now return `hostname` field

[July 03, 2018][releasenotes-20180703]

* (added) `/agents` endpoint now accepts a new  querystring parameter: `agentTypes=CLOUD|ENTERPRISE|ENTERPRISE_CLUSTER`

[May 23, 2018][releasenotes-20180523]

* (added) `/tests` detailed endpoint has new parameter: `probeMode`
* (added) Endpoint `/account-groups` now returns `organizationName` field

[May 09, 2018][releasenotes-20180509]

* (added) HTTP Server and Page Load tests have a new parameter: `httpVersion`

[April 25, 2018][releasenotes-20180425]
* (added) SIP Server and Voice Call tests to `/tests` endpoints.
* (added) `/voice/sip-server` endpoint now provides SIP server layer test data for both SIP Server and Voice Call tests.
* (changed) `/voice/metrics` endpoint has been renamed to `/voice/rtp-stream`, all requests to the old endpoint will be redirected with `HTTP 301`. `/voice/rtp-stream` endpoint now provides RTP stream layer test data for both RTP Stream and Voice Call tests.

[March 28, 2018][releasenotes-20180328]

* (added) For tests which included TCP-based Network Measurements (under the Advanced Settings tab of the test configuration) you can now pick `TCP` or `ICMP` as a `protocol` when creating or editing tests.

[January 31, 2018][releasenotes-20180131]
* We are deprecating the use of TLS 1.0 in ThousandEyes infrastructure. After tonight, clients which use only TLS 1.0 will not be able to access the API. If your client program or script is returning errors such as `The underlying connection was closed: An unexpected error occurred on a send.`, `EOF occurred in violation of protocol` or `Connection reset by peer`, you need to either upgrade your SSL libraries or ensure you are not enforcing the use of TLS 1.0.
* (added) When creating or updating a test that uses BGP monitoring, use the new `usePublicBgp` parameter set to `1` to automatically add all available Public BGP Monitors. You can continue to use the `bgpMonitors` option to assign Private BGP Monitors.
* (changed) If a public monitor is included in the `bgpMonitors` list, all public monitors will be assigned to the test, regardless of the setting specified in the `usePublicBgp` parameter.

[January 10, 2018][releasenotes-20180110]

* APIv4 has been deprecated. All queries to version 4 (`https://api.thousandeyes.com/v4/`) will receive a `HTTP 301` redirect to the oldest supported API version (currently version 5).

[November 8, 2017][releasenotes-20171108]
* (added) `/report-snapshots` endpoint has new parameters: `shared` and `timeSpan`
* (changed) `/alert-rules` detailed endpoint `notes` and `recipient` parameters moved under `notifications.email`, `notes` renamed to `message`

[October 12, 2017][releasenotes-20171012]
* (added) `/dns/trace` endpoint has new parameters: `failedQueries` and `finalServerQueried`
* (added) `/net/path-vis` endpoint has new parameters: `sourceIp` and `sourcePrefix`

[September 27, 2017][releasenotes-20170927]
* (added) APIv6 is now default version. All queries without explicit version (`https://api.thousandeyes.com/` instead of `https://api.thousandeyes.com/v5/`) will receive version 6 response.
* 90-day countdown for APIv4 deprecation begins with a target date of December 26, 2017.  Please refer to the [versioning][overview-versioning] page for details.
* (added) Agent endpoints `agentState` parameter now has a third state: `Disabled`

[July 7, 2017][releasenotes-20170707]

* (added) Activity Log endpoint: `/audit/user-events/search`

[June 6, 2017][releasenotes-20170606]
* (added) Agent Detail endpoint now provides Enterprise Cluster utilization
* (announced) destructive change freeze for APIv6 - after today's release, no future changes will result in a destructive change to the schema.
* (revised announcement) 90-day countdown for APIv6 moving to default begins June 7, 2017, with a target date of September 13, 2017.  Please refer to the [versioning][overview-versioning] page for details.

[April 26, 2017][releasenotes-20170426]
* (added) Agent Notification Rules endpoint: `/agent-notification-rules`
* (added) Agent Notification Rule Detail endpoint: `/agent-notification-rules/{ruleId}`
* (announced) target date for change of current API version is May 24, 2017.  Current version will be changed from v5 to v6, and 90-day clock for APIv4 has started.

[April 12, 2017][releasenotes-20170412]
* (changed) alert rules endpoint changed: removed recipients from this endpoint in favor of adding `/alert-rules/{ruleId}` endpoint, which lists alert recipients of all types, including Slack, PagerDuty and generic webhooks
* (added) Alert rule detail endpoint: `/alert-rules/{ruleId}`
* (added) Alert Suppression Window list `/alert-suppression-windows`
* (added) Alert Suppression Window detail `/alert-suppression-windows/{alertSuppressionWindowId}`
* (added) Alert Suppression Window creation `/alert-suppression-windows/new`
* (added) Alert Suppression Window deletion `/alert-suppression-windows/{alertSuppressionWindowId}/delete` endpoint
* (added) Alert Suppression Window modification `/alert-suppression-windows/{alertSuppressionWindowId}/update` endpoint
* (added) integrations list endpoint `/integrations`
* (added) Endpoint user session list `/endpoint-data/user-sessions`
* (added) Endpoint user session details `/endpoint-data/user-sessions/{sessionId}`
* (added) Endpoint web page list `/endpoint-data/user-sessions/{sessionId}/web`
* (added) Endpoint web page details `/endpoint-data/user-sessions/{sessionId}/page/{pageId}`
* (added) Endpoint network sessions list `/endpoint-data/user-sessions/{sessionId}/network`
* (added) Endpoint network topology list `/endpoint-data/network-topology`
* (added) Endpoint network topology detail `/endpoint-data/network-topology/{networkProbeId}`
* (added) Endpoint agent list `/endpoint-agents/`
* (added) Endpoint agent details `/endpoint-agents/{agentId}`
* (added) Endpoint networks `/endpoint-data/networks`
* (added) several report snapshot list `/report-snapshots`
* (added) several report snapshot detail `/report-snapshots/{snapshotId}`
* (added) several report snapshot data `/report-snapshots/{snapshotId}/{dataComponentId}`
* (added) several report snapshot deletion `/report-snapshots/{snapshotId}/delete`
* (changed) removed BETA badge from reports endpoints (no longer in beta)

[March 15, 2017][releasenotes-20170315]
* (added) Instant Tests 2.0 documentation is [now available](https://developer.thousandeyes.com/v6/instant)  
* (added) documentation for FTP server tests to `/web/ftp-server/{testId}`
* (fixed) some metadata in table listed in the Transaction Detail endpoint was offset by a column.

[November 23, 2016][releasenotes-20161123]
* (added) `/reports` endpoint
* (added) `/reports/{reportId}` endpoint
* (added) `/reports/{reportId}/{dataComponentId}` endpoint
* (fixed) problems with setting advanced options on some test creation endpoints
* (added) `pingPayloadSize` field added to network tests
* (added) `lastLogin` field to `/users` endpoint
* (added) `dateRegistered` field to `/users` endpoint
* (added) oAuth support for API queries: see [Authentication](https://developer.thousandeyes.com/v6/#/authentication) for more details.

[August 31, 2016][releasenotes-20160831]
* (added) `/tests/ftp-server` endpoint added (filter all tests on FTP server tests)
* (added) `/web/ftp-server/{testId}` endpoint added (return results for FTP server tests)
* (added) `X-Organization-Rate-Limit-Limit`, `X-Organization-Rate-Limit-Remaining`, and `X-Organization-Rate-Limit-Reset` headers added to requests to handle rate limit control
* (added) `followRedirects` (boolean) element to HTTP Server tests

[July 20, 2016][releasenotes-20160720]
* (changed) added no-cache directive to responses from the ThousandEyes API to prevent content from being cached on proxy servers
* (added) `dnsOverride`, `clientCertificate` `desiredStatusCode` advanced options for HTTP Server test setting endpoints

[July 6, 2016][releasenotes-20160706]
* (changed) moved `type` attribute of XML representation of alerts endpoint to a child element.
* (changed) `fetchTime` in HTTP Server results endpoint changed to `totalTime`
* (added) implemented burst limit for instant test API calls
* (changed) calling `/net/path-vis/{testId}` and `/net/path-vis/{testId}/{agentId}/{roundId}` for agent to agent tests with direction parameter of BIDIRECTIONAL will now throw an error (http/400 status code)
* (added) agent `hostname` to `/agents` and `/agents/{agentId}` endpoints
* (changed) `roundsBeforeTrigger` field has been removed from alert rules, and replaced with `roundsViolatingRequired` and `roundsViolatingOutOf`, respectively.

[June 8, 2016][releasenotes-20160608]
* (added) countryID field to `/net/metrics` endpoint
* (added) errorDetails field to `/net/metrics` endpoint
* (fixed) changed default behavior when querying `/net/metrics` and `/net/path-vis` endpoints for agent to agent tests.  In the case of bidirectional tests, the `/net/metrics` endpoint will return aggregate information for both directions - specifying a direction as a querystring parameter `direction=[FROM_TARGET | TO_TARGET]` will return that direction's metrics specifically.  For the `/net/path-vis` endpoint, each direction must be queried independently.  Specifying an invalid direction will result in an error response.

[May 25, 2016][releasenotes-20160525]
* Preview for APIv6 launched
* (changed) Accounts are now shown as account-groups.  The `/accounts` endpoint has been replaced with `/account-groups`
* (changed) Network tests have been replaced with agent-to-server tests, and agent-to-agent tests.  This is now reflected under the type field for tests
* (added) `/tests/agent-to-server` endpoint
* (added) `/tests/agent-to-agent` endpoint
* (removed) `/tests/network` endpoint
* (added) direction parameter to results endpoints (`net/metrics`, `net/path-vis`) for agent-to-agent tests
* (added) Account Group, Role, and User management endpoints
* (added) Usage endpoint
