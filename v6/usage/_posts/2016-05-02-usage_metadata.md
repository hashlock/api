---
parent_category: usage
parent_category_label: Usage

title: 'Usage metadata'

sortorder: 2
category-sortorder: 65

layout: null
---

{.inline-code}Usage metadata is used in the `/usage` endpoint.  Field types are shown in the table below, along with information about each field returned.

Fields are listed (as they appear in the data) in the table below.  Where a complex object is used, the field will be prefixed with the object name.

Object | Field | Data Type | Example | Notes
:------------|-------------|-------------|-------------|---------------|
quota | monthStart | dateTime | `"monthStart": "2016-04-28 17:00:00 PDT"` | Beginning of usage period in YYYY-mm-dd HH:MM:SS format.  As with other endpoints, dateTime values are shown in UTC.
quota | monthEnd | dateTime | `"monthEnd": "2016-04-28 17:00:00 PDT"` | End of usage period in YYYY-mm-dd HH:MM:SS format.  As with other endpoints, dateTime values are shown in UTC.
quota | cloudUnitsIncluded | integer | `"cloudUnitsIncluded": 4320000000` | Monthly number of cloud units allocated, as part of the contract.
quota | endpointAgentsIncluded | integer | `"endpointAgentsIncluded": 200` | Monthly number of endpoint agents allocated, as part of the contract.
quota | enterpriseAgentsIncluded | integer | `"enterpriseAgentsIncluded": 25` | Monthly number of enterprise agents allocated, as part of the contract. Returns non-zero value only for organizations with legacy billing.
n/a | cloudUnitsUsed | integer | `"cloudUnitsUsed": 8500489` | Number of cloud units consumed thus far in the usage period.
n/a | cloudUnitsProjected | integer | `"cloudUnitsProjected": 8500489` | Number of cloud units projected in the current usage period, based on units consumed to date and configuration of enabled tests.  This value is updated hourly.
n/a | cloudUnitsNextBillingPeriod | integer | `"cloudUnitsNextBillingPeriod": 8500489` | Number of cloud units projected in the upcoming usage period, based on configuration of enabled tests.  This value is updated hourly.
n/a | enterpriseUnitsUsed | integer | `"enterpriseUnitsUsed": 8500489` | Number of enterprise units consumed thus far in the usage period. Returns non-zero value only for organizations with metered billing.
n/a | enterpriseUnitsProjected | integer | `"enterpriseUnitsProjected": 8500489` | Number of enterprise units projected in the current usage period, based on units consumed to date and configuration of enabled tests.  This value is updated hourly. Returns non-zero value only for organizations with metered billing.
n/a | enterpriseUnitsNextBillingPeriod | integer | `"enterpriseUnitsNextBillingPeriod": 8500489` | Number of enterprise units projected in the upcoming usage period, based on configuration of enabled tests.  This value is updated hourly. Returns non-zero value only for organizations with metered billing.
n/a | endpointAgentsUsed | integer | `"endpointAgentsUsed": 42` | Number of endpoint agents used thus far in the current usage period.  This number is calculated by taking the maximum number of agents enabled for any one-hour period in the usage period.  Disabled agents are excluded from this calculation.
n/a | enterpriseAgentsUsed | integer | `"enterpriseAgentsUsed": 8` | Number of enterprise agents used thus far in the current usage period.  This number is calculated by taking the maximum number of agents enabled for any one-hour period in the usage period.  Disabled agents are excluded from this calculation.
n/a | tests | array of test objects | see individual fields | Test-by-test breakdown of unit consumption in the current monthly period; Each entry includes both current and projected usage.
test | aid | integer | `"aid": 1234` | Unique ID of the account group which owns the test
test | accountGroupName | string | `"accountGroupName": "Support"` | Name of the account group which owns the test
test | testId | integer | `"testId": 26030` | Unique ID of the test generating usage
test | testName | string | `"testName": "my test name"` | Name of the test generating usage
test | testType | string | `"testType": "Web - HTTP Server"` | Type of test generating usage.  Note that this is a friendly testType entry (so it shouldn't be parsed to discover the correct endpoint to query for configuration details).
test | cloudUnitsUsed | integer | `"cloudUnitsUsed": 8500489` | Number of cloud units consumed thus far by the test in the usage period.
test | cloudUnitsProjected | integer | `"cloudUnitsProjected": 253012` | Number of cloud units projected to be consumed by the test in the usage period, based on units consumed to date and configuration of the test.  This value is updated hourly. New tests have no `cloudUnitsProjected` parameter until projection is calculated.
n/a | endpointAgents | array of endpointAgent objects | see individual fields | Endpoint agents used by account group.
endpointAgent | aid | integer |  `"aid": 1234` | Unique ID of the account group owning the endpoint agents
endpointAgent | accountGroupName | string | `"accountGroupName": "sample account group name"`  | Name of the account group which owns the endpoint agents
endpointAgent | endpointAgentsUsed | integer | `"endpointAgentsUsed": 7` | Number of endpoint agents owned by the specific account group in the usage period.
n/a | enterpriseAgents | array of enterpriseAgent objects | see individual fields | Enterprise agents used by account group.
n/a | enterpriseAgentUnits | array of enterpriseAgentUnit objects | see individual fields | Agent-by-agent breakdown of enterprise units consumed in current monthly period; Each entry includes both current and projected usage. Returns non-zero value only for organizations with metered billing.
enterpriseAgent | aid | integer |  `"aid": 1234` | Unique ID of the account group owning the enterprise agents
enterpriseAgent | accountGroupName | string | `"accountGroupName": "sample account group name"`  | Name of the account group which owns the enterprise agents
enterpriseAgent | enterpriseAgentsUsed | integer | `"enterpriseAgentsUsed": 7` | Number of enterprise agents owned by the specific account group in the usage period.
