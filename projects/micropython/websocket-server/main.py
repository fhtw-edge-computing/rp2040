from usys import argv
from uasyncio import run

from wifi import connect
from websocket import run_websocket_server

argv.append("<<ssid>>")
argv.append("<<pwd>>")


async def main():
    if len(argv) == 2:
        connect(argv[0], argv[1])
        await run_websocket_server("127.0.0.1", 8000)

run(main())
