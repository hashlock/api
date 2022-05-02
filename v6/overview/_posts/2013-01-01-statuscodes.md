---
parent_category: overview
parent_category_label: Overview

title: 'Response status codes'

sortorder: 6
category-sortorder: 1
layout: null
---

The following response status codes will be used for various endpoints around the ThousandEyes API.

Status Code | Definition | When you'll see it
:------------|:---------------|:-----------
200 | OK | Nearly every response
201 | CREATED | Using a `/new` endpoint (e.g. `/tests/{testType}/new`)
204 | NO CONTENT | Using a `/delete` endpoint (e.g. `/tests/{testType}/{testId}/delete`)
301 | MOVED PERMANENTLY | Requests accessing a nonexistent version of the API
400 | BAD REQUEST | Malformatted requests
401 | UNAUTHORIZED | Invalid credentials provided or account is locked
403 | FORBIDDEN | Insufficient permissions to execute request (ie, any POST method as a regular user)
404 | NOT FOUND | Attempting to access an endpoint that does not exist
405 | METHOD NOT ALLOWED | Wrong request type for target endpoint (ie, POSTing data to a GET endpoint)
406 | NOT ACCEPTABLE | Can be returned when the Content Type of the data returned does not match the Accept header of the request
415 | UNSUPPORTED MEDIA TYPE | Attempting to POST data in incorrect format
429 | TOO MANY REQUESTS | You have exceeded the max number of requests per 1-minute period
500 | INTERNAL SERVER ERROR | Contact [support][email-support-500error] if you see this error type
503 | SERVICE UNAVAILABLE | The ThousandEyes API is currently in maintenance mode.
