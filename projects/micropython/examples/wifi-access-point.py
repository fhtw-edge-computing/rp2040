from network import AP_IF, WLAN

# set SSID of the network
ssid = "SSID"
# set password of the network (must be 10 chars)
pwd = "1234567890"

# set the host IP address
host = "192.168.1.1"
# set the subnet mask
subnetmask = "255.255.255.0"
# set the gateway IP address
gateway = host
# set the DNS server IP address
dns = "8.8.8.8"


# create object of WLAN class
ap = WLAN(AP_IF)
# activate the Wi-Fi module
ap.active(True)

# configure the Wi-Fi access point
ap.config(essid=ssid, key=pwd, security=ap.WEP, channel=2)

# configure the IP address, subnet mask, gateway and DNS server
ap.ifconfig((host, subnetmask, gateway, dns))

print(f"AP mode started. SSID: {ssid}")
print(f"> IP: {ap.ifconfig()[0]}, Subnet: {ap.ifconfig()[1]}")
print(f"> Gateway: {ap.ifconfig()[2]}")
print(f"> DNS: {ap.ifconfig()[3]}")
