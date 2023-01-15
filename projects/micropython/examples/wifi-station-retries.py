from network import STA_IF, WLAN
from umachine import idle

# set SSID of the network to connect to
ssid = "SSID"
# set password of the network
pwd = "PWD"
# set maximal number of retries to connect
retries = 5

# create object of WLAN class
station = WLAN(STA_IF)
# activate the Wi-Fi module
station.active(True)

# (Re)try to connect to the network
for i in range(retries):
    try:
        station.connect(ssid, pwd)
        while not station.isconnected():
            # put device in low-power state
            # while waiting for connection
            idle()
    except OSError as e:
        print(e)
        pass
    if station.isconnected():
        break
    print(f"Connection attempt {i+1} failed. Retrying...")


if station.isconnected():
    print(f"{ssid} connection succeeded!")
    print(f"Wi-Fi connected {station.ifconfig()}")
else:
    print(f"Failed to connect to {ssid} after {retries} attempts.")
