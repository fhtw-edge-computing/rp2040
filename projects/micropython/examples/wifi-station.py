from network import STA_IF, WLAN
from umachine import idle

# set SSID of the network to connect to
ssid = "SSID"
# set password of the network
pwd = "PWD"

# create object of WLAN class
station = WLAN(STA_IF)
# activate the Wi-Fi module
station.active(True)
# connect to specified network
station.connect(ssid, pwd)

while not station.isconnected():
    # put device in low-power state
    # while waiting for connection
    idle()

print(f"{ssid} connection succeeded!")
print(f"Wi-Fi connected {station.ifconfig()}")
