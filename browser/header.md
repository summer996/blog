### client

- Accept:请求头用于告知（服务端）客户端可以处理的内容类型，同时服务端使用`content-type`告诉客户端它的选择
- Accept-Charset: 请求头用来告知（服务器）客户端可以处理的字符集类型，同时服务端使用`content-type`告诉客户端它的选择
- Accept-Encoding：用来告知（服务端）客户端能够理解的内容编码方式，然后通过内容协商的方式，服务端会选择客户端提议的一个方式，并使用`content-encoding`告知客户端服务端的选择
- Accept-Language：用来告知(服务端)客户端可以理解的自然语言，以及优先选择的区域方言，借助内容协商机制，服务器可以从诸多选项中选择一个，并且用`content-language`来告知客户端，服务端的选择
  -Access-Control-Request-Headers：用于预请求中，通知服务端在真正的请求中会使用哪些请求头

### service

- Accept-Patch：用来告知（客户端）服务器所能理解的媒体类型
- Accept-Ranges：告知（客户端）服务器支持范围请求，当浏览器发现该字段时，可以尝试中断了的下载，而不是重新开始
- Access-Control-Allow-Credentials：表示是否可以将请求到的响应暴露给页面，`true`可以，`false`不可以,客户端必须带 credentials 才能 cors 请求成功
- Access-Control-Allow-Methods：应答的是预请求中，客户端提供的方法，表示客户端可以支持的请求方法，
- Access-Control-Allow-Origin：表示该响应的资源是否可以被`request header origin`共享
- Access-Control-Expose-Headers：列出了哪些 header 字段可以作为响应的一部分暴露给外部（就是我们可以在 response 看见），默认情况下，只有七种可以暴露给外部
  - cache-control
  - content-language
  - content-length
  - content-type
  - expires
  - last-modified
  - pragma
  - 因此如果想要客户端访问到其他的首部信息，可以将他们在 access-control-expose-header 里面列出来，例如 Access-Control-Expose-Headers：Authorization，那这个字段就会被展示出来
- Access-Control-Max-Age：表示预请求返回的结果（即 Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 提供的信息） 可以被缓存多久。

- Access-Control-Allow-Headers：表示服务端可以支持的头，但是一般都不这样展示，而是这样，例如

```
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

```
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```
