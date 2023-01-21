from lsm6dsox import LSM6DSOX
from machine import Pin, I2C

imu = LSM6DSOX(I2C(0, scl=Pin(13), sda=Pin(12)))


def read_sensors():
    acceleration = imu.read_accel()
    gyroscope = imu.read_gyro()

    values = {}
    values["imu"] = {}
    values["imu"]["a"] = list(acceleration)
    values["imu"]["g"] = list(gyroscope)

    return values
