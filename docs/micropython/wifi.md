# Wi-Fi

To connect your Arduino Nano RP2040 Connect to a WiFi network, you have two options:

* Station
* Access Point

![Station/Access Point mode](/img/wifi.svg "wifi#Station/Access Point mode")


## Station

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

::: details Click me to view the complete code

<<< @/../projects/micropython/examples/wifi-station.py{python:line-numbers}

:::

For more details, please refer to the [Nano RP2040 Connect Python® API Guide](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-python-api#wireless).

### Challenge

Change the code to allow for several retries to connect to a Wi-Fi network before giving up.

::: details Click me to view the complete solution

<<< @/../projects/micropython/examples/wifi-station-retries.py{python:line-numbers}

:::

## Access Point

::: warning FIXME: `dns` apparently not set.

:construction: Website is currently under construction :construction:

:::

This example shows how to create a Wi-Fi network with the specified __SSID__ and __password__.

First, import the necessary modules, `AP_IF` and `WLAN`, from the `network` library.

```python
from network import AP_IF, WLAN
```

The code sets the SSID and password of the network in the variables ssid and pwd respectively. Then it sets the host IP address, subnet mask, gateway, and DNS server for the access point.

```python
# set SSID of the network
ssid = "SSID"
# set password of the network (must be 10 chars)
pwd = "1234567890"

# set the host IP address
host = "192.168.1.1"
# set the subnet mask
subnetmask = "255.255.255.0"
# set the gateway IP address
gateway = host
# set the DNS server IP address
dns = "8.8.8.8"
```

Create an object of the `WLAN` class, which is used to control the Wi-Fi functionality of the device.
Then, activate the Wi-Fi module by calling `ap.active(True)`.

```python
# create object of WLAN class
ap = WLAN(AP_IF)
# activate the Wi-Fi module
ap.active(True)
```

The `ap.config()` function configures the access point using the specified `essid`, `key`, `security` and `channel` as arguments.
In this case, the security is set to `WEP`, and the channel is set to `2`.

```python
# configure the Wi-Fi access point
ap.config(essid=ssid, key=pwd, security=ap.WEP, channel=2)
```

Then, the ifconfig() method is used to configure the IP address, subnet mask, gateway, and DNS server.

```python
# configure the IP address, subnet mask, gateway and DNS server
ap.ifconfig((host, subnetmask, gateway, dns))
```

Finally, the code prints the **SSID** and the **interface configuration** of the access point.

```python
print(f"AP mode started. SSID: {ssid}")
print(f"> IP: {ap.ifconfig()[0]}, Subnet: {ap.ifconfig()[1]}")
print(f"> Gateway: {ap.ifconfig()[2]}")
print(f"> DNS: {ap.ifconfig()[3]}")
```

It is worth noting that, WEP security type is considered weak and it is not recommended to use it as it has been broken long time ago. It is preferable to use WPA2 or WPA3 for security purposes.

::: details Click me to view the complete code

<<< @/../projects/micropython/examples/wifi-access-point.py{python:line-numbers}

:::

For more details, please refer to the [Nano RP2040 Connect Python® API Guide](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-python-api#wi-fi-ap-mode).