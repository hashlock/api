---
parent_category: overview
parent_category_label: Overview

title: 'Authentication'

sortorder: 2
category-sortorder: 1
layout: null
---

The ThousandEyes API accepts Basic HTTP or OAuth bearer token as authentication methods.  This is specified using the HTTP request wrapper of your choice.  Both the Basic Authentication Token and the OAuth Bearer Token referenced here and throughout the developer reference are available from your [Account Settings > Users and Roles page][app-accountsettings] under the "Profile" tab, in the "User API Tokens" section.

The example below shows a standard request using cURL with basic authentication:

`$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/status \
  -u noreply@thousandeyes.com:g351mw5xqhvkmh1vq6zfm51c62wyzib2`

The following example leverages cURL presenting a bearer token:

`$ curl -i https://api.thousandeyes.com{{ site.version_url_prefix_request }}/tests.json \
--header "Authorization: Bearer d320dbc5-a3c9-4c57-b2dc-6d2b46dbee13"`

For basic authentication, the parameters can be provided programmatically using whichever HTTP request object is being used (most all support Basic HTTP authentication), or prepended to the target URL, in the following format:

`https://{email}:{authToken}@api.thousandeyes.com{{ site.version_url_prefix_request }}/`

{.inline-code}When providing the email address prepended to the URL, it must be URL-encoded to allow the request to proceed correctly.  The `@` symbol corresponds to `%40`.  See [UrlEncoding characters][external-urlencoding] for more information on properly formatting character strings.  When using cURL, using the `-u user:token` method is strongly recommended.

{.inline-code}For bearer token authentication, the parameter can only be read in the header in the form `Authorization: Bearer <token string>`

#Powershell Syntax

We've been asked by a number of people how to effectively create and leverage credentials against the API in Windows Powershell.  Effectively, base64 encoding the email:authtoken and setting an Authorization header will allow this to be done.  The following example takes two inputs and sets the required headers to work with the ThousandEyes API using basic authentication:

```[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$apiuser       = "noreply@thousandeyes.com"
$apipassword   = "g351mw5xqhvkmh1vq6zfm51c62wyzib2"
$authorization = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($apiuser + ":" + $apipassword))
$headers       = @{"accept"= "application/json"; "content-type"= "application/json"; "authorization"= "Basic " + $authorization}
$response      = Invoke-WebRequest https://api.thousandeyes.com{{ site.version_url_prefix_request }}/agents.json -Headers $headers
$response.content
```

When leveraging the bearer token, the token itself can be passed directly as a string:

```[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$apitoken = "d320dbc5-a3c9-4c57-b2dc-6d2b46dbee13"
$headers  = @{"accept"= "application/json"; "content-type"= "application/json"; "authorization"= "Bearer " + $apitoken}
$response = Invoke-WebRequest https://api.thousandeyes.com/{{ site.version_url_prefix_request }}/tests.json -Headers $headers
$response.content
```

NOTE: Both the Basic Authentication Token and the OAuth Bearer Token are available from your [account settings page][app-accountsettings] under the "Profile" tab, in the "User API Tokens" section.

#Account Lockout

Your account could be locked up due to a number of failed authentication attempts into the ThousandEyes application.

{.inline-code}If attempts to reach the API are returning an `401 UNAUTHORIZED` response code, but your credentials are correct, it is possible that your account is locked up. Try logging into the App, if your account is locked up, you will be required to reset your password.

#Source IP block

{.inline-code}When a 100 or more unauthorized requests (resulting in the `401 UNAUTHORIZED` response) are issued from a given source IP address within a minute, API server will start responding with the `429 TOO MANY REQUESTS` response code. Your API script should handle `401 UNAUTHORIZED` error and prevent further requests to avoid the source IP block.

For error responses, see the [response status codes documentation][overview-responsestatuscodes].
