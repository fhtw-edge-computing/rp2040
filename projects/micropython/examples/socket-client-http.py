from network import STA_IF, WLAN
from usocket import getaddrinfo, socket, AF_INET, SOCK_STREAM

# Connect to a network
ssid = "SSID"
pwd = "PWD"
wlan = WLAN(STA_IF)
wlan.active(True)
wlan.connect(ssid, pwd)
while not wlan.isconnected():
    idle()
print(f"{ssid} connection succeeded!")
print(f"Wi-Fi connected {wlan.ifconfig()}")

# Set host and port
host, port = "www.google.com", 80

# Retrieve address and port via DNS
infos = getaddrinfo(host, port)

# Create a TCP/IP socket
sock = socket(AF_INET, SOCK_STREAM)

# Connect to first entry
print(f"Connecting to client {infos[0][-1]} ...")
sock.connect(infos[0][-1])

# Send HTTP GET request
request = "GET / HTTP/1.1\n\n"
print(f"Client: {request}")
sock.write(request)

# Receive HTTP response
response = sock.read(1024)

# Convert bytes to string and print first line
first_line = response.decode("utf-8").split("\n")[0]
print(f"Server: {first_line}")