from machine import Pin
import os
import socket
import network
import sys
import gc
gc.collect()

# Connect to Wi-Fi
# Add ssid and key by adding args and executing script:
# >>> import sys
# >>> sys.argv.append("<< ssid >>")
# >>> sys.argv.append("<< key  >>")
# >>> execfile("<< script.py >>")

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(sys.argv[0], sys.argv[1])

while wlan.isconnected() == False:
    pass

print("Wi-Fi Connected", wlan.ifconfig())

led = Pin(6, Pin.OUT)


def web_page():
    if led.value() == 1:
        gpio_state = "ON"
    else:
        gpio_state = "OFF"

    f = open("./index.html", "r")
    content = f.read()
    f.close()
    return content


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 80))
s.listen(5)

while True:
    conn, addr = s.accept()
    print("Got a connection from %s\n" % str(addr))
    request = conn.recv(1024)
    request = str(request)
    # print("Content = %s" % request)
    led_on = request.find("/?led=on")
    led_off = request.find("/?led=off")
    # print("DEBUG (led_on): ", led_on)
    # print("DEBUG (led_off): ", led_off)
    # if request.find("/index.html") == 6:
    #     print("loading index.html")
    # p = request.splitlines()
    # p = request.splitlines()[0]
    # print("Content = %s\n" % p)
    if led_on == 6:
        print("LED_ON\n")
        led.value(1)
    if led_off == 6:
        print("LED_OFF\n")
        led.value(0)
    # print("Debug (stat): ", os.stat(request))
    # if os.stat(request):
    #     print("File {} exists!\n" % request)
    # else:
    #     print("Cannot find file {}.\n" % request)
    # print("\nSearching file %s" % request)
    # try:
    #     print("\nFound file %s" % request)
    #     f = open(request, "r")
    #     response = f.read()
    # except OSError:
    #     print("404")
    #     response = web_page()

    response = web_page()
    conn.send("HTTP/1.1 200 OK\n")
    conn.send("Content-Type: text/html\n")
    conn.send("Connection: close\n\n")
    conn.sendall(response)
    conn.close()
