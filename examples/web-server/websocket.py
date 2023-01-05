from network import STA_IF, WLAN
from machine import idle
import hashlib
import base64
import usocket as socket
import sys

def parse_request(request_bytes: bytes) -> dict:
    # Split the request string into individual lines
    request_str = request_bytes.decode("utf-8")
    lines = request_str.split("\n")

    # Parse the request line
    request_line = lines[0].split()
    method = request_line[0]
    url = request_line[1]
    version = request_line[2]

    # Parse the headers
    headers = {}
    for line in lines[1:]:
        # If the line is empty, we have reached the end of the headers
        if not line.strip():
            break
        # Otherwise, split the line into a key and value
        key, value = line.split(":", 1)
        headers[key.strip()] = value.strip()

    return {
        'method': method,
        'url': url,
        'version': version,
        'headers': headers,
    }


def create_websocket_handshake_response(key: str) -> bytes:
    """
    Create a WebSocket handshake response given the WebSocket key from the request
    """
    # The response consists of a hash of the key, followed by the magic string 258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    magic_str = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    key_bytes = str(key + magic_str).encode("utf-8")
    key_hash = hashlib.sha1(key_bytes).digest()
    print("Key Hash: {}".format(key_hash))
    key_hash_b64 = base64.b64encode(key_hash).decode('utf-8')
    print("Key Hash b64: {}".format(key_hash_b64))
    return "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: {}\r\n\r\n".format(key_hash_b64).encode("utf-8")

# def parse_websocket_request(request: dict) -> Tuple[str, str]:


def parse_websocket_request(request: dict):
    """
    Parse the WebSocket request and return the WebSocket key and the rest of the request
    """
    # The WebSocket key is the value of the "Sec-WebSocket-Key" header in the request
    if "Sec-WebSocket-Key" in request["headers"]:
        return request["headers"]["Sec-WebSocket-Key"]
    raise ValueError("WebSocket request does not contain key")


def connect_wifi(ssid: str, pwd: str):
    wlan = WLAN(STA_IF)
    wlan.active(True)
    wlan.connect(ssid, pwd)
    while not wlan.isconnected():
        idle()
    print("{} connection succeeded!".format(ssid))
    print("Wi-Fi connected {}".format(wlan.ifconfig()))


def run_websocket_server(host: str, port: int):
    sock = socket.socket()
    sock.bind((host, port))
    sock.listen(1)
    print("Listening on {}:{}".format(host, port))
    while True:
        conn, addr = sock.accept()
        print("Connect from {}".format(addr))
        try:
            #req = conn.recv(1024).decode()
            #print("\n== Received ==\n")
            # print(req)

            #request = parse_request(req)
            #print("\n== Parse ==\n")
            # print(request)

            # Perform the WebSocket handshake
            req = conn.recv(1024)
            request = parse_request(req)
            print("\n== Parse ==\n")
            print(request)
            key = parse_websocket_request(request)
            print("Key: {}".format(key))
            response = create_websocket_handshake_response(key)
            print("\n== Response ==\n")
            print(response.decode('utf-8'))
            conn.sendall(response)

        finally:
            conn.close()

# Add ssid and key by adding args and executing script:
# >>> import sys
# >>> sys.argv.append("<< ssid >>")
# >>> sys.argv.append("<< key  >>")
# >>> execfile("<< script.py >>")
if len(sys.argv) == 2:
    connect_wifi(sys.argv[0], sys.argv[1])
    run_websocket_server("127.0.0.1", 8000)