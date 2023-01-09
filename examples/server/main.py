from usys import argv
from wifi import connect

from websocket import run_websocket_server

if len(argv) == 2:
    connect(argv[0], argv[1])
    run_websocket_server("127.0.0.1", 8000)
