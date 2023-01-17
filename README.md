# Arduino RP2040 Connect

## Documentation

### Algolia

To update the search index of algolia run following command:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat ./docs/.vitepress/config/algolia.json | jq -r tostring)" algolia/docsearch-scraper
```

To run this command, you need following tools installed: `docker`, `jq`.
Additionally, create a file `.env` and specify following variables:

```bash
APPLICATION_ID=<APP_ID>
API_KEY=<API_KEY>
```

## Examples

## Useful Links

* [SVG Repo](https://www.svgrepo.com/)
* Algolia
  * [DocSearch configurations](https://github.com/algolia/docsearch-configs)
  * [Run your own](https://docsearch.algolia.com/docs/legacy/run-your-own)
  * [DocSearch scraper](https://github.com/algolia/docsearch-scraper)
  * [Vitepress template](https://docsearch.algolia.com/docs/templates#vitepress-template)
* Arduino
  * [ArduinoCloud](https://create.arduino.cc/)
  * [ArduinoIoTCloud](https://github.com/arduino-libraries/ArduinoIoTCloud)
  * [Arduino Cloud Provider Examples](https://github.com/arduino/ArduinoCloudProviderExamples)
  * [Nano RP2040 Connect](https://docs.arduino.cc/hardware/nano-rp2040-connect)
  * [BLE Device to Device with Nano RP2040 Connect](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-ble-device-to-device)
  * [Nano RP2040 Connect Cheat Sheet](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-01-technical-reference)
  * micropython
    * [MicroPython with Arduino](https://docs.arduino.cc/micropython/)
    * [MicroPython with Arduino Boards](https://docs.arduino.cc/learn/programming/arduino-and-python)
    * [Nano RP2040 Connect Python® API Guide](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-python-api)
    * [MicroPython documentation](https://docs.micropython.org/en/latest/)
  * openmv
    * [MicroPython documentation](https://docs.openmv.io/)
    * [Getting Started With the Nano RP2040 Connect and OpenMV](https://docs.arduino.cc/tutorials/nano-rp2040-connect/rp2040-openmv-setup)
