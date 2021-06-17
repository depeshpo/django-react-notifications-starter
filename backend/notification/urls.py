from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet
from rest_framework.routers import DefaultRouter

from .views import NotificationViewSet

router = DefaultRouter()

router.register('devices', FCMDeviceAuthorizedViewSet)
router.register('', NotificationViewSet, basename="notifications")

urlpatterns = router.urls
