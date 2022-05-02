---
parent_category: overview
parent_category_label: Overview

title: 'Response formats'

sortorder: 4
category-sortorder: 1
layout: null
---

Current version of the ThousandEyes API allows output in the following formats:

* JSON (JavaScript Object Notation)
* XML (Extensible Markup Language) [Schema document can be downloaded here][xml-xsd]

It is possible to control the output of the API's results using the following options, in descending order of precedence.

In the event that multiple, conflicting formats are specified, the order of precedence is:

1. Request
2. Accept Header
3. Querystring Parameter.

### Append format to request

Appending either .xml or .json to the request will return the response in that type.

* to request a JSON response:

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests.json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

* to request an XML response:

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests.xml \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### Accept Header

Modifying the header to accept different response types is the approach which will be most effective for guaranteeing the response type.

* `Accept:application/json` will return the response in JSON
* `Accept:text/xml` will return the response in XML

`$ curl -H "Accept: application/json" https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

### QueryString Parameter

{.inline-code}Appending a `format` parameter to the end of a QueryString will change the response format. The parameter and values must be in lowercase.  Acceptable options:

* format=xml
* format=json

`$ curl https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests?format=json \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`
