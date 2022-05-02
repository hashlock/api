---
parent_category: overview
parent_category_label: Overview

title: 'Change policy'

sortorder: 10
category-sortorder: 1
layout: null
---

ThousandEyes may modify the attributes and resources available to the API and our policies related to access and use of the API from time to time without advance notice. ThousandEyes will use commercially reasonable efforts to notify you of any modifications to the API or policies through notifications or posts on the ThousandEyes Customer Success Center.  ThousandEyes also tracks deprecation of attributes of the API on the ThousandEyes API page, located on this site.

ThousandEyes will provide an update to the version of the API in circumstances where the structure of the API output substantively changes, format is modified, or code is deprecated.

### Version Support

Support for the current and prior version of the ThousandEyes API will be provided at all times.  Attempts to access the ThousandEyes API with no version specified will result in the current version being used.  Attempts to access a deprecated version of the API will result in a response from the oldest supported version of the API.

#### WARNING ####

Version 6 is presently the current release. Version 4 will be deprecated effective Dec 26th, 2017. Based on our support statement, we support the following releases, accessible at the endpoint root specified:

* version 7 (preview, subject to change without notice): `https://api.thousandeyes.com/v7/`
* version 6 (current): `https://api.thousandeyes.com/v6/`, `https://api.thousandeyes.com/`
* version 5 (current-1): `https://api.thousandeyes.com/v5/`

### Support Notice

New versions of the API will be released with a notification made available on our Developer reference site, and will be available using a version-specific endpoint call for a period of 90 days. After this 90-day period, the new version of the API will become the current version, and the oldest version of the API will be deprecated.

This means that the following timeline applies:

* Upon release of new API version v(X), for first 90 days:
  * Current version: v(X-1)
  * Supported versions: v(X-2)-v(X)
* After 90 days post-release of new API version
  * Current version: v(X)
  * Supported versions: v(X-1)-v(X)
