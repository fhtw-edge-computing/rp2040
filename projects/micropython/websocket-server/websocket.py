import uhashlib as hashlib

import ustruct as struct
import binascii

import uasyncio as asyncio

from http import parse_request

clients = []
handlers = {}

OPCODE_TEXT = 0x1
OPCODE_BINARY = 0x2
OPCODE_CLOSE = 0x8
OPCODE_PING = 0x9
OPCODE_PONG = 0xa

DEBUG = 1


def parse_websocket_request(request: dict):
    """
    Parse the WebSocket request and return the WebSocket key and the rest of the request
    """
    # The WebSocket key is the value of the "Sec-WebSocket-Key" header in the request
    if "Sec-WebSocket-Key" in request["headers"]:
        return request["headers"]["Sec-WebSocket-Key"]
    raise ValueError("WebSocket request does not contain key")


def create_websocket_frame(data: bytes, opcode: int, fin: bool = True) -> bytes:
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


async def send_websocket_frame(writer: asyncio.StreamwWriter, data: bytes, opcode: int, fin: bool = True):
    """
    Send a WebSocket frame over the given socket
    """
    frame = create_websocket_frame(data, opcode, fin)
    await writer.awrite(frame)


async def receive_websocket_frame(reader: asyncio.StreamReader):
    """
    Receive a WebSocket frame from the given socket
    Returns the data and the opcode of the frame
    """
    # The first byte of the frame is:
    #   - the FIN flag (1 bit)
    #   - RSV1, RSV2, and RSV3 (1 bit each)
    #   - the Opcode (4 bits)
    b1 = int.from_bytes(await reader.readexactly(1), "big")
    fin = bool(b1 & 0b10000000)

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

    # The second byte of the frame is
    #     the MASK flag (1 bit)
    #     the Payload Length (7 bit)
    b2 = int.from_bytes(await reader.readexactly(1), "big")
    mask = bool(b2 & 0b10000000)
    payload_length = b2 & 0b01111111

    # If the payload is less than 126 bytes, these two bytes encode the length directly
    if payload_length == 126:
        payload_length_bytes = await reader.readexactly(2)
        payload_length, = struct.unpack("!H", payload_length_bytes)
    # If the payload is more than 126 bytes, these two bytes are set to 126 and the next 8 bytes are the length
    elif payload_length == 127:
        payload_length_bytes = await reader.readexactly(8)
        payload_length, = struct.unpack("!Q", payload_length_bytes)

    if mask == 1:
        masking_key = await reader.readexactly(4)
    else:
        masking_key = None

    # The rest of the frame is the payload, followed by any masking key if necessary
    payload = await reader.readexactly(payload_length)
    if masking_key:
        payload = mask_websocket_data(masking_key, payload)

    return payload, opcode, fin


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


async def cb_connect(receiver):
    pass


async def cb_message(msg, sender, receivers):
    pass


def generate_response_key(webkey):
    key = hashlib.sha1(webkey)
    key.update(b"258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    return binascii.b2a_base64(key.digest())[:-1]


def generate_handshake_response(key):
    # return str(f"HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: {key}\r\n\r\n").encode("utf-8")
    return b"""\
HTTP/1.1 101 Switching Protocols\r
Upgrade: websocket\r
Connection: Upgrade\r
Sec-WebSocket-Accept: """ + key + b"\r\n\r\n"


async def server_handshake(reader, writer, cb=cb_connect):
    req = await reader.read(1024)
    request = parse_request(req)
    key = parse_websocket_request(request)
    response_key = generate_response_key(key)
    response = generate_handshake_response(response_key)

    await writer.awrite(response)
    await cb(writer)


async def process_messages(reader, writer, cb=cb_message):
    while True:
        print(f"Processing messages ...")
        data, opcode, fin = await receive_websocket_frame(reader)
        print("Message received!")
        if opcode == OPCODE_TEXT or opcode == OPCODE_BINARY:
            msg = {"opcode": opcode, "data": data, "fin": fin}
            await cb(msg, writer, clients)
        elif opcode == OPCODE_CLOSE:
            break
        elif opcode == OPCODE_PING:
            opcode = OPCODE_PONG
            await send_websocket_frame(writer, data, opcode, fin)
        elif opcode == OPCODE_PONG:
            pass
        else:
            print(f"Unhandled opcode: {opcode}")


def handle_client(onConnect, onMessage):
    async def _handle_client(reader, writer):
        clients.append(writer)
        try:
            # Perform the WebSocket handshake
            await server_handshake(reader, writer, onConnect)
            # Process message
            # if complete:
            await process_messages(reader, writer, onMessage)
        finally:
            clients.remove(writer)
            await writer.aclose()
    return _handle_client


async def run_websocket_server(host: str, port: int, onConnect, onMessage):
    """
    Run a simple WebSocket server
    """
    # handlers[(host, port)] = handler
    server = await asyncio.start_server(handle_client(onConnect, onMessage), host, port)
    print(f"Listening on {host}:{port}")
    await server.wait_closed()
