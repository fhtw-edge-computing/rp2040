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
sock.connect(infos[0][-1])