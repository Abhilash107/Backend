# Backend project Notes

# Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

#                   HTTP & HTTPS 


# HTTP is a protocol used for transferring hypertext requests and information on the World Wide Web.
# It is stateless, meaning each request/response pair is independent and unrelated to any previous requests/responses.
#  It typically operates over port 80.

#  HTTPS is an extension of HTTP that adds a layer of security by using SSL/TLS (Secure Sockets Layer/Transport Layer Security) protocols to encrypt data.
# HTTPS operates over port 443.


# Both HTTP and HTTPS are protocols used for transmitting data over the web, HTTPS provides an additional layer of security through encryption, making it the preferred choice for secure communication over the internet.
#                   HTTP HEADERS

# 1. Request Headers:

# User-Agent: Identifies the client making the request (usually the web browser).
# Accept: Indicates the media types that the client can understand.
# Host: Specifies the domain name of the server being requested.
# Cookie: Contains cookies previously sent by the server.
# Authorization: Contains credentials for authenticating the client with the server.
# Referer: Indicates the URL of the resource from which the current request originated.
# Cache-Control: Directives for caching mechanisms in both requests and responses.


# 2. Response Headers:

# Server: Provides information about the server software being used.
# Content-Type: Specifies the media type of the content sent in the response.
# Content-Length: Indicates the length of the response body in bytes.
# Set-Cookie: Instructs the client to store a cookie.
# Location: Used in redirections to specify the new location for the requested resource.
# Cache-Control: Directives for caching mechanisms in both requests and responses.
# Last-Modified: Indicates the date and time when the resource was last modified.

# 3. Repsentation headers
 
# Content-Encoding: Indicates the encoding format used to compress the response body. Common encodings include gzip and deflate.  Example: Content-Encoding: gzip 

# Content-Language: Specifies the natural language(s) of the intended audience for the representation. It is useful for content negotiation.Example: Content-Language: en-US 

# Content-Disposition: Provides instructions on how the content should be displayed or handled by the browser. It is often used for specifying file names when downloading files. Example: Content-Disposition: attachment; filename="example.pdf" 

# Content-Range: Indicates the range of bytes in the full representation of the resource being returned in the response. It's often used in responses with partial content (e.g., when downloading large files in chunks).             Example: Content-Range: bytes 0-1023/2048

# 4. Payload hedaers ==> data


#               CORS in HTTP
#  CORS-  (Cross-Origin Resource Sharing) is a mechanism that allows resources on a web page to be requested from another domain outside the domain from which the original resource originated. 

# 1. Access-Control-Allow-Origin: This header is included in the response from the server. It specifies which origins are allowed to access the resource. If the value of this header is "*", it means any origin is allowed. Otherwise, it specifies the exact origin that is allowed to access the resource.

# 2. Access-Control-Allow-Methods: Specifies the HTTP methods (e.g., GET, POST, PUT, DELETE) allowed when accessing the resource.

# 3. Access-Control-Allow-Headers: Specifies the headers allowed in the actual request

# 4. Access-Control-Allow-Credentials: Indicates whether the browser should include credentials (such as cookies or HTTP authentication) in cross-origin requests.

# 5. Access-Control-Expose-Headers:Specifies which headers can be exposed to the client in the response.


#                  HTTP Methods

# HTTP (Hypertext Transfer Protocol) defines several methods (also known as verbs) that indicate the desired action to be performed on a resource. 
# GET: Retrieves data from the server specified by the URL. The GET method should only retrieve data and should not have any other effect on the server.

# POST: Submits data to the server to create a new resource. Typically used for submitting form data or uploading files.

# PUT: Updates an existing resource on the server with the provided data. The entire resource is replaced with the new data sent in the request.

# DELETE: Deletes the specified resource from the server.

# PATCH: Partially updates an existing resource with the provided data. Unlike PUT, PATCH applies a partial update to the resource, meaning only the fields provided in the request are updated.

# HEAD: Similar to GET, but only retrieves the headers for the requested resource without the actual body. Useful for checking if a resource has been modified without downloading the entire content.

# OPTIONS: Retrieves the HTTP methods that the server supports for a specified URL. Also used to determine the communication options available for a target resource.

# TRACE: Echoes the received request back to the client, primarily for diagnostic purposes or debugging.

# CONNECT: Used by the client to establish a connection to a remote host over HTTP to enable TLS/SSL encrypted communication (HTTPS) through a proxy.
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 
# 













