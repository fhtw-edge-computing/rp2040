from network import STA_IF, WLAN
from umachine import idle


def connect(ssid: str, pwd: str):
    wlan = WLAN(STA_IF)
    wlan.active(True)
    wlan.connect(ssid, pwd)
    while not wlan.isconnected():
        idle()
    print("{} connection succeeded!".format(ssid))
    print("Wi-Fi connected {}".format(wlan.ifconfig()))
