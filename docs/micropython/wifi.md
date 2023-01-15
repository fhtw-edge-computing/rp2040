# Wi-Fi

To connect your Arduino Nano RP2040 Connect to a WiFi network, you have two options:

* Station
* Access Point

## Wi-Fi Station

This example shows how to connect to a Wi-Fi network with the specified __SSID__ and __password__.

First, import the necessary modules, `STA_IF` and `WLAN`, from the `network` library, and the `idle` function from the `umachine` library.

```python
from network import STA_IF, WLAN
from umachine import idle
```

Then, set the *SSID* (`ssid`) and *password* (`pwd`) of the network you want to connect to.
You need to replace the Strings `"SSID"` and `"PWD"` with the SSID and password of your Wi-Fi network.


```python
# set SSID of the network to connect to
ssid = "SSID"
# set password of the network
pwd = "PWD"
```

Create an object of the `WLAN` class, which is used to control the Wi-Fi functionality of the device.
The `wlan.active(True)` function is used to activate the Wi-Fi module.

```python
# create object of WLAN class
wlan = WLAN(STA_IF)
# activate the Wi-Fi module
wlan.active(True)
# connect to specified network
wlan.connect(ssid, pwd)
```

It then attempts to connect to the specified network using the `connect()` method and provides the SSID and password as arguments.
The `while` loop is used to check if the connection is successful.
The `idle()` function is called within the loop, which is used to put the device in a low-power state while waiting for the connection to be established.

```python
while not wlan.isconnected():
    # put device in low-power state
    # while waiting for connection
    idle()
```

If the connection is successful, the code prints a message indicating that the connection to the SSID has succeeded and the IP address obtained by the device in the connected network.

```python
print(f"{ssid} connection succeeded!")
print(f"Wi-Fi connected {wlan.ifconfig()}")
```

Here is the complete code:

<<< @/../projects/micropython/examples/wifi-station.py{python:line-numbers}

### Challenge

Change the code to allow for several retries to connect to a Wi-Fi network before giving up.

Here's the solution:

::: details

<<< @/../projects/micropython/examples/wifi-station-retries.py{python:line-numbers}


:::

## Wi-Fi Access Point

Here is the complete code:

<<< @/../projects/micropython/examples/wifi-access-point.py{python:line-numbers}