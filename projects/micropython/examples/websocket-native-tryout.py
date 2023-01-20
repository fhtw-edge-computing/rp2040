from usys import argv
from uasyncio import run

from wifi import connect
# from websocket import run_websocket_server
import usocket
import uwebsocket
from http import parse_request
import websocket_helper

argv.append("fonira-sabic")
argv.append("17217115884945555452")

# https://github.com/micropython/micropython-infineon/blob/master/esp8266/scripts/webrepl.py
# https: // python.hotexamples.com/examples/websocket_helper/-/server_handshake/python-server_handshake-function-examples.html

# First working (~) example
# async def main():
#     if len(argv) == 2:
#         connect(argv[0], argv[1])
#         s = usocket.socket(usocket.AF_INET, usocket.SOCK_STREAM)
#         host, port = "0.0.0.0", 8000
#         s.bind((host, port))
#         s.listen(1)
#         print(f"Listening on {host}:{port}")

#         while True:
#             conn, addr = s.accept()
#             print(conn)
#             # ws = uwebsocket.websocket(conn, True)
#             # print(f"Received: {ws.read()}")
#             websocket_helper.server_handshake(conn)
#             while True:
#                 print(f"Reading line ...")
#                 ws = uwebsocket.websocket(conn)
#                 line = ws.read(20)
#                 # line = conn.recv(1024)
#                 # line = ws.readline().decode("utf-8")
#                 print(f"Received: {line}")
#             # wsh = websocket_helper.server_handshake(s)
#             # print(f"WebSocket: {ws}, WebSocketHelper: {wsh}")
#             # conn, addr = sock.accept()
#             # print(f"Connect from {addr}")
#             # req = conn.recv(1024)
#             # request = parse_request(req)


async def main():
    if len(argv) == 2:
        connect(argv[0], argv[1])
        s = usocket.socket(usocket.AF_INET, usocket.SOCK_STREAM)
        host, port = "0.0.0.0", 8000
        s.bind((host, port))
        s.listen(1)
        # s.setsockopt(usocket.SOL_SOCKET, 20, accept_handler)
        print(f"Listening on {host}:{port}")
        while True:
            cl, remote_addr = s.accept()
            print("\nWebREPL connection from:", remote_addr)

            cl.setblocking(False)
            websocket_helper.server_handshake(cl)
            ws = uwebsocket.websocket(cl, True)
            cl.setblocking(True)
            # cl.setblocking(False)

            while True:
                print(f"Reading line ...")
                line = ws.read(5)
                print(f"Received: {line}")
        # while True:
        #     conn, addr = s.accept()
        #     print(conn)
        #     websocket_helper.server_handshake(conn)
        #     while True:
        #         print(f"Reading line ...")
        #         ws = uwebsocket.websocket(conn)
        #         line = ws.read(20)
        #         print(f"Received: {line}")


def accept_handler(listen_sock):
    cl, remote_addr = listen_sock.accept()
    print("\nWebREPL connection from:", remote_addr)

    websocket_helper.server_handshake(cl)
    ws = uwebsocket.websocket(cl, True)
    cl.setblocking(False)

    while True:
        line = ws.read(20)
        print(f"Received: {line}")


run(main())
