---
aside: true
---

# Features

For more details, refer to the official [Product Reference Manual](https://docs.arduino.cc/static/000ac72a5da192041f15cd4a8de8dda9/ABX00053-datasheet.pdf).

The Arduino Nano RP2040 Connect integrated ICs with the following features:

## U1: Raspberry Pi RP2040 Micrcontroller

* 133MHz 32bit Dual Core ARM® Cortex®-M0+
* 264kB on-chip SRAM
* Direct Memory Access (DMA) controller
* Support for up to 16MB of off-chip Flash memory via dedicated QSPI bus
* USB 1.1 controller and PHY, with host and device support
* 8 PIO state machines
* Programmable IO (PIO) for extended peripheral support
* 4 channel ADC with internal temperature sensor, 0.5 MSa/s, 12-bit conversion
* SWD Debugging
* 2 on-chip PLLs to generate USB and core clock
* 40nm process node
* Multiple low power mode support
* USB 1.1 Host/Device
* Internal Voltage Regulator to supply the core voltage
* Advanced High-performance Bus (AHB)/Advanced Peripheral Bus (APB)

## U2: U-blox® Nina W102 WiFi/Bluetooth Module

* 240MHz 32bit Dual Core Xtensa LX6
* 520kB on-chip SRAM
* 448 Kbyte ROM for booting and core functions
* 16 Mbit FLASH for code storage including hardware encryption to protect programs and data
* 1 kbit EFUSE (non- erasable memory) for MAC addresses, module configuration, Flash-
* Encryption, and Chip-ID
* IEEE 802.11b/g/n single-band 2.4 GHz WiFi operation
* Bluetooth 4.2
* Integated Planar Inverted-F Antenna (PIFA)
* 4x 12-bit ADC
* 3x I2C, SDIO, CAN, QSPI

## U4: Microchip® ATECC608A Crypto

* Cryptographic Co-Processor with Secure Hardware-Based Key Storage
* I2C, SWI
* Hardware Support for Symmetric Algorithms:
  * SHA-256 & HMAC Hash including off-chip context save/restore
  * AES-128: Encrypt/Decrypt, Galois Field Multiply for GCM
* Internal High-Quality NIST SP 800-90A/B/C Random Number Generator (RNG)
* Secure Boot Support:
  * Full ECDSA code signature validation, optional stored digest/signature
  * Optional communication key disablement prior to secure boot
  * Encryption/Authentication for messages to prevent on-board attacks

## U5: Memory

* AT25SF128A 16MB NOR Flash
* QSPI data transfer rate up to 532Mbps
* 100K program/erase cycles

## U6: Power

* Buck step-down converter

## U8: ST MP34DT06JTR MEMS Microphone

* AOP = 122.5 dBSPL
* 64 dB signal-to-noise ratio
* Omnidirectional sensitivity
* -26 dBFS ± 1 dB sensitivity

## U9: ST LSM6DSOXTR 6-axis IMU

* 3D Gyroscope
  * ±2/±4/±8/±16 g full scale
* 3D Accelerometer
  * ±125/±250/±500/±1000/±2000 dps full scale
* Advanced pedometer, step detector and step counter
* Significant Motion Detection, Tilt detection
* Standard interrupts: free-fall, wakeup, 6D/4D orientation, click and double-click
* Programmable finite state machine: accelerometer, gyroscope and external sensors
* Machine Learning Core
* Embedded temperature sensor