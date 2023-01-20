from usys import argv
from uasyncio import run

from wifi import connect
from websocket import run_websocket_server, send_websocket_frame, OPCODE_TEXT, OPCODE_BINARY

import ujson

argv.append("<<ssid>>")
argv.append("<<pwd>>")


async def onMessage(opcode, data, fin, sender, receivers):
    if opcode == OPCODE_BINARY:
        data = data.decode("utf-8")

    if (opcode == OPCODE_TEXT or opcode == OPCODE_BINARY):
        print(f"Data received: {data}")

    for receiver in receivers:
        await send_websocket_frame(receiver, data, opcode, fin)


async def onConnect(receiver):
    print(f"Connected! :)")
    msg = {"text": "Hello Client!"}
    await send_websocket_frame(receiver, ujson.dumps(msg), 0x1)


async def main():
    if len(argv) == 2:
        connect(argv[0], argv[1])
        await run_websocket_server("0.0.0.0", 8000, onConnect, onMessage)

run(main())
