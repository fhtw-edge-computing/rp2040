import socket
from network import STA_IF, WLAN

ssid = "fonira-sabic"
pwd = "17217115884945555452"

wlan = WLAN(STA_IF)
wlan.active(True)
wlan.connect(ssid, pwd)

while not wlan.isconnected():
    idle()
    
print(f"{ssid} connection succeeded!")
print(f"Wi-Fi connected {wlan.ifconfig()}")

print(f"AF_INET: {socket.AF_INET}")
print(f"AF_INET6: {socket.AF_INET6}")
print(f"SOCK_STREAM: {socket.SOCK_STREAM}")
print(f"SOCK_DGRAM: {socket.SOCK_DGRAM}")
print(f"SOCK_RAW: {socket.SOCK_RAW}")
print(f"SOL_SOCKET: {socket.SOL_SOCKET}")
print(f"SO_REUSEADDR: {socket.SO_REUSEADDR}")
print(f"SO_KEEPALIVE: {socket.SO_KEEPALIVE}")
print(f"SO_SNDTIMEO: {socket.SO_SNDTIMEO}")
print(f"SO_RCVTIMEO: {socket.SO_RCVTIMEO}")

host, port = "www.google.com", 80

# Resolve hostname and port to a list of address information
infos = socket.getaddrinfo(host, port, 0, 0, 0, 0)

# getaddrinfo returns 5-tuple containing:
#   (family, type, proto, canonname, sockaddr)
for info in infos:
  print(f"Family: {info[0]}, Type: {info[1]}")
  print(f"Protocol: {info[2]}, Canonical Name: {info[3]}")
  print(f"IP: {info[4][0]}, Port: {info[4][1]}")

#print(addr_info[0][-1])