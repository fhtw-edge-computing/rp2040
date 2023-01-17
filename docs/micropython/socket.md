<!-- https://docs.micropython.org/en/latest/esp8266/tutorial/network_tcp.html -->
<!-- https://docs.micropython.org/en/latest/library/socket.html -->

# Socket

A _network socket_ is a data structure representing an endpoint for sending and receiving data across a TCP/IP network.
A socket is composed of three values to identify an endpoint: transport protocol, IP address, and port number.

The MicroPython library `usocket` or `socket` provides two main objects, the function `getaddrinfo` and the class `socket`):

The function `getaddrinfo` translates the host/port argument into a sequence of 5-tuples that contain all the necessary arguments for creating a socket connected to that service.

```python
from usocket import getaddrinfo

host, port = "www.google.com", 80

# Resolve hostname and port to a list of address information
infos = getaddrinfo(host, port, af=0, type=0, proto=0, flags=0)

# getaddrinfo returns 5-tuple containing:
#   (family, type, proto, canonname, sockaddr)
for info in infos:
  print(f"Family: {info[0]}, Type: {info[1]}")
  print(f"Protocol: {info[2]}, Canonical Name: {info[3]}")
  print(f"IP: {info[4][0]}, Port: {info[4][1]}")
```

Class `socket` allows for creating an object representing and network endpoint to _send_ and _receive_ data.

```python
from usocket import socket, AF_INET, SOCK_STREAM

# Create a new socket (TCP, UDP)
endpoint = socket(AF_INET, SOCK_STREAM)
```

To create a socket, the _address family_ and _socket type_ need to be specified.

| Type (Value)   | Address Family                |
| :------------- | :---------------------------- |
| `AF_INET(2)`   | Internet Protocol v4 address. |
| `AF_INET6(10)` | Internet Protocol v6 address. |

| Type (Value)     |                                                                                                                                                                     |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SOCK_STREAM(1)` | Provides sequenced, reliable, bidirectional, connection-mode byte streams, and may provide a transmission mechanism for out-of-band data. Used for TCP connections. |
| `SOCK_DGRAM(2)`  | Provides datagrams, which are connectionless-mode, unreliable messages of fixed maximum length. Used for UDP connections.                                           |
| `SOCK_RAW(3)`    | Provides raw data for alternatives for TCP and UDP.                                                                                                                 |

<!-- SOCK_RAW: https://gist.github.com/davidlares/e841c0f9d9b31f3cd8859575d061c467 -->

This sets the addressing scheme of the network endpoint and specifies the transport protocol.

From this point on, clients and servers use different methods to establish a connection.
After connection, client and server communicate using `read()` and `write()` (see <<socket>>).

![Server/Client communication with socket API](/img/socket.svg "socket#Server/Client communication with Socket API")

<!--
| Type (Value)       | Description |
| :----------------- | :---------- |
| `SOL_SOCKET(4095)` |             |

`socket.socket.setsockopt` 

| Type                | Description                                                            |
| :------------------ | :--------------------------------------------------------------------- |
| `SO_REUSEADDR(4)`   | Reuse local socket, without waiting for its natural timeout to expire. |
| `SO_KEEPALIVE(8)`   |                                                                        |
| `SO_SNDTIMEO(4101)` |                                                                        |
| `SO_RCVTIMEO(4102)` |                                                                        |

* https://linux.die.net/man/7/socket
* 
-->

## Clients

Clients can use the `connect()` method to establish a connection to a server.

```python
from usocket import getaddrinfo, socket, AF_INET, SOCK_STREAM

# Connect to a network
# ...

# Set host and port
host, port = "www.google.com", 80

# Retrieve address and port via DNS
infos = getaddrinfo(host, port)

# Create a TCP/IP socket
sock = socket(AF_INET, SOCK_STREAM)

# Connect to first entry
sock.connect(infos[0][-1])
```

After that, the client can use `write()` and `read()` calls to communicate with the server over the socket.

::: details Click me to view the complete code

<<< @/../projects/micropython/examples/socket-client.py{python:line-numbers}

:::

`host` and `port` in this example, specifiy the URL or _domain name_ and _port_ of a HTTP server.

HTTP server use a rather simple request/response schema to communicate with clients.
To get a _response_ from the HTTP server, one has to send a _request_.

```python
# Send HTTP GET request
request = "GET / HTTP/1.1\n\n"
print(f"Client: {request}")
sock.write(request)

# Receive HTTP response
response = sock.read(1024)

# Convert bytes to string and print first line
first_line = response.decode("utf-8").split("\n")[0]
print(f"Server: {first_line}")
# prints: "Server: HTTP/1.1 200 OK"
```

::: details Click me to view the complete code

<<< @/../projects/micropython/examples/socket-client-http.py{python:line-numbers}

:::

## Servers

::: warning

:construction: Website is currently under construction :construction:

:::
