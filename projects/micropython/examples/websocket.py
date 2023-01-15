from network import STA_IF, WLAN
from machine import idle
import usocket as socket
import uwebsocket
import sys

# Connect to Wi-Fi
# Add ssid and key by adding args and executing script:
# >>> import sys
# >>> sys.argv.append("<< ssid >>")
# >>> sys.argv.append("<< key  >>")
# >>> execfile("<< script.py >>")

HOST = "127.0.0.1"
PORT = 8000

wlan = WLAN(STA_IF)
wlan.active(True)
wlan.connect(sys.argv[0], sys.argv[1])
while not wlan.isconnected():
    idle()
print("%s connection succeeded!" % sys.argv[0])
print("Wi-Fi Connected", wlan.ifconfig())


# Create a socket and bind it to an adress and port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind([HOST, PORT])
s.listen(5)

# Accept an incoming connection
client, addr = s.accept()

# Create a WebSocket from the connection
ws = uwebsocket.websocket(client)

# Handle incoming messages
while True:
    msg = ws.read(600)
    if msg.decode() is "":
        break

    # Print the incoming message
    print(msg.decode())

    # Send a response
    # ws.write("Hello from MicroPython!")
