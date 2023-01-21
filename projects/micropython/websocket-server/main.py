from usys import argv
from uasyncio import run

from wifi import connect
from websocket import run_websocket_server, send_websocket_frame, OPCODE_TEXT, OPCODE_BINARY
from sensors import read_sensors

import ujson

argv.append("<<ssid>>")
argv.append("<<pwd>>")


async def onMessage(msg, sender, receivers):
    if msg["opcode"] == OPCODE_BINARY:
        msg["data"] = msg["data"].decode("utf-8")

    if (msg["opcode"] == OPCODE_TEXT or msg["opcode"] == OPCODE_BINARY):
        print(f"Data received: {msg["data"]}")

    for receiver in receivers:
        await send_websocket_frame(receiver, msg["data"], msg["opcode"], msg["fin"])


async def onConnect(receiver):
    print(f"Connected! :)")
    sensors = read_sensors()
    await send_websocket_frame(receiver, ujson.dumps(sensors), 0x1)
    # msg = {"text": "Hello Client!"}
    # await send_websocket_frame(receiver, ujson.dumps(msg), 0x1)


async def main():
    if len(argv) == 2:
        connect(argv[0], argv[1])
        await run_websocket_server("0.0.0.0", 8000, onConnect, onMessage)

run(main())
