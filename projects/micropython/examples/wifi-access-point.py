from network import AP_IF, WLAN

# set SSID of the network
ssid = "SSID"
# set password of the network (must be 10 chars)
pwd = "1234567890"

host = "192.168.1.1"
subnetmask = "255.255.255.0"
gateway = host
dns = "8.8.8.8"


# create object of WLAN class
ap = WLAN(AP_IF)
# activate the Wi-Fi module
ap.active(True)

# configure the Wi-Fi access point
ap.config(essid=ssid, key=pwd, security=ap.WEP, channel=2)

ap.ifconfig((host, subnetmask, gateway, dns))
print(f"AP mode started. SSID: {ssid} IP: {ap.ifconfig()[0]}")
print(f"Interface Configuration: {ap.ifconfig()}")
