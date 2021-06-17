from .base import *

SECRET_KEY = 'django-insecure-_3rna)s^5=*g4i_%dw$8854r_+p*(rm#h36_d_-a10ijb2bndi'

DEBUG = True

ALLOWED_HOSTS = []

# FCM_DJANGO Config
FCM_DJANGO_SETTINGS = {
        "APP_VERBOSE_NAME": "React Notifications",
        "FCM_SERVER_KEY": "<your fcm server key>",
        "ONE_DEVICE_PER_USER": False,
        "DELETE_INACTIVE_DEVICES": True,
}

