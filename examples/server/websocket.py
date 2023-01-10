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
    print("Generating WebSocket handshake response...")
    magic_str = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
    key_bytes = str(key + magic_str).encode("utf-8")
    key_hash = hashlib.sha1(key_bytes).digest()
    # print(f"Key Hash: {key_hash}")
    key_hash_b64 = base64.b64encode(key_hash).decode('utf-8')
    # print(f"Key Hash b64: {key_hash_b64}")
    print("Completing WebSocket handshake...")
    return str(f"HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: {key_hash_b64}\r\n\r\n").encode("utf-8")


def parse_websocket_request(request: dict):
    """
    Parse the WebSocket request and return the WebSocket key and the rest of the request
    """
    # The WebSocket key is the value of the "Sec-WebSocket-Key" header in the request
    if "Sec-WebSocket-Key" in request["headers"]:
        return request["headers"]["Sec-WebSocket-Key"]
    raise ValueError("WebSocket request does not contain key")


def create_websocket_frame(data: bytes, opcode: int, fin=True) -> bytes:
    """
    Create a WebSocket frame for the given data and opcode
    """
    # The first byte of the frame is:
    #   - the FIN flag (1 bit)
    #   - RSV1, RSV2, and RSV3 (1 bit each)
    #   - the Opcode (4 bits)
    # The second byte is the payload length, it is a 7-bit field that specifies the length of the payload data
    # The third and fourth bytes are the length of the payload
    payload_length = len(data)
    fin_byte = 0b10000000 if fin else 0
    opcode_byte = opcode
    b1 = fin_byte | opcode_byte
    b2 = 0
    # If the payload is less than 126 bytes, these two bytes encode the length directly
    if payload_length <= 125:
        b2 = payload_length
    # If the payload is more than 126 bytes, these two bytes are set to 126 and the next 8 bytes are the length
    elif payload_length <= 0xFFFF:
        b2 = 126
    else:
        b2 = 127
    # The rest of the frame is the payload, followed by any masking key if necessary
    frame_header = bytes([b1, b2])
    if b2 == 126:
        frame_header += payload_length.to_bytes(2, "big")
    elif b2 == 127:
        frame_header += payload_length.to_bytes(8, "big")
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
    # The first byte of the frame is:
    #   - the FIN flag (1 bit)
    #   - RSV1, RSV2, and RSV3 (1 bit each)
    #   - the Opcode (4 bits)
    b1 = int.from_bytes(sock.recv(1), "big")
    # print(f"Byte 1 - Received: {b1:b}")

    fin = bool(b1 & 0b10000000)
    # print(f"FIN: {fin}")

    # Opcodes:
    #     `%x0` denotes a continuation frame
    #     `%x1` denotes a text frame
    #     `%x2` denotes a binary frame
    #     `%x3`-7 are reserved for further non-control frames
    #     `%x8` denotes a connection close
    #     `%x9` denotes a ping
    #     `%xA` denotes a pong
    #     `%xB`-F are reserved for further control frames
    opcode = b1 & 0b00001111
    # print(f"Opcode: {opcode}")

    # The second byte of the frame is
    #     the MASK flag (1 bit)
    #     the Payload Length (7 bit)
    b2 = int.from_bytes(sock.recv(1), "big")
    # print(f"Byte 2 - Received: {b2:b}")
    mask = bool(b2 & 0b10000000)
    # print(f"MASK: {mask}")
    payload_length = b2 & 0b01111111
    # print(f"Payload Length: {payload_length}")

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
    print(f"Listening on {host}:{port}")
    while True:
        conn, addr = sock.accept()
        print(f"Connect from {addr}")
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
            print(f"Key: {key}")
            response = create_websocket_handshake_response(key)
            print("\n== Response ==\n")
            print(response.decode('utf-8'))
            conn.sendall(response)

            # Echo messages back to the client
            while True:
                data, opcode = receive_websocket_frame(conn)
                print(f"Opcode: {opcode}")
                if opcode == 0x1:
                    print(f"Data received (Text): {data.decode('utf-8')}")
                elif opcode == 0x8:  # Connection close
                    break
                elif opcode == 0x9:  # Ping
                    print("Ping")
                elif opcode == 0xa:  # Pong
                    print("Pong")
                else:
                    print(f"Data received (Binary): {data}")

                send_websocket_frame(conn, data, opcode)

        finally:
            conn.close()
