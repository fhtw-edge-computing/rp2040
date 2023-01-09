import uhashlib as hashlib
import usocket as socket

import ustruct as struct
import base64

from http import parse_request


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


def parse_websocket_request(request: dict):
    """
    Parse the WebSocket request and return the WebSocket key and the rest of the request
    """
    # The WebSocket key is the value of the "Sec-WebSocket-Key" header in the request
    if "Sec-WebSocket-Key" in request["headers"]:
        return request["headers"]["Sec-WebSocket-Key"]
    raise ValueError("WebSocket request does not contain key")


def create_websocket_frame(data: bytes, opcode: int) -> bytes:
    """
    Create a WebSocket frame for the given data and opcode
    """
    # The first byte of the frame is the opcode
    # The second byte is a bitmask indicating whether the frame is the final fragment and whether it is masked
    # The third and fourth bytes are the length of the payload
    payload_length = len(data)
    # If the payload is less than 126 bytes, these two bytes encode the length directly
    if payload_length <= 125:
        frame_header = struct.pack("!B", opcode) + \
            struct.pack("!B", payload_length)
    # If the payload is more than 126 bytes, these two bytes are set to 126 and the next 8 bytes are the length
    elif payload_length <= 0xFFFF:
        frame_header = struct.pack("!B", opcode) + \
            struct.pack("!BH", 126, payload_length)
    else:
        frame_header = struct.pack("!B", opcode) + \
            struct.pack("!BQ", 127, payload_length)
    # The rest of the frame is the payload, followed by any masking key if necessary
    return frame_header + data


def send_websocket_frame(sock: socket.SocketType, data: bytes, opcode: int):
    """
    Send a WebSocket frame over the ggivengivengivengivengivengiveniven socket
    """
    frame = create_websocket_frame(data, opcode)
    sock.sendall(frame)


def receive_websocket_frame(sock: socket.SocketType):
    """
    Receive a WebSocket frame from the given socket
    Returns the data and the opcode of the frame
    """
    opcode_and_mask = sock.recv(
        2)  # The first two bytes of the frame are the opcode and the bitmask
    print(f"opcode & mask: {opcode_and_mask}")
    print(f"opcode & mask: {opcode_and_mask.decode()}")
    opcode, mask = struct.unpack("!BB", opcode_and_mask)
    # The next two bytes are the length of the payload
    payload_length_and_mask = sock.recv(2)
    payload_length, = struct.unpack("!B", payload_length_and_mask)

    # If the payload is less than 126 bytes, these two bytes encode the length directly
    if payload_length == 126:
        payload_length_bytes = sock.recv(2)
        payload_length, = struct.unpack("!H", payload_length_bytes)
    # If the payload is more than 126 bytes, these two bytes are set to 126 and the next 8 bytes are the length
    elif payload_length == 127:
        payload_length_bytes = sock.recv(8)
        payload_length, = struct.unpack("!Q", payload_length_bytes)

    if mask == 1:
        masking_key = sock.recv(4)
    else:
        masking_key = None

    # The rest of the frame is the payload, followed by any masking key if necessary
    payload = sock.recv(payload_length)
    if masking_key:
        payload = mask_websocket_data(masking_key, payload)

    return payload, opcode


def mask_websocket_data(masking_key: bytes, data: bytes) -> bytes:
    """
    Mask the WebSocket data using the given masking key
    """
    # The masking key is repeated to the length of the data
    # Each byte of the data is XOR'd with the corresponding byte of the masking key
    masking_key = masking_key * (len(data) // 4 + 1)
    masked_data = b''
    for a, b in zip(masking_key[:len(data)], data):
        masked_data += bytes([a ^ b])
    return masked_data


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

            # Echo messages back to the client
            # while True:
            #    data, opcode = receive_websocket_frame(conn)
            #    print(f"Data received: {data}")
            #    print(f"Data received: {data.decode('utf-8')}")
            #
            #    if opcode == 8: # Connection close
            #        break
            #
            #    send_websocket_frame(conn, data, opcode)

        finally:
            conn.close()
