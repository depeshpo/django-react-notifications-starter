from django.contrib.auth import get_user_model
from fcm_django.models import FCMDevice
from rest_framework.decorators import action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models import Notification

USER = get_user_model()


def create_notification(request, title, body):
    valid_users_for_notification = USER.objects.exclude(id=request.user.id)
    for user in valid_users_for_notification:
        Notification.objects.create(
            title=title,
            body=body,
            sender=request.user,
            receiver=user,
        )


def send_push_notification(request, title, body):
    devices = FCMDevice.objects.exclude(user=request.user)
    message_dict = dict(
        title="Notification Title",
        body="Notification body example from localhost",
        # icon=None,
        # data=None,
        # sound=None,
        # badge=None,
        # extra_notification_kwargs=None,
        # api_key=None,
    )
    devices.send_message(**message_dict)


def send_notification(request, title, body):
    create_notification(request, title, body)
    send_push_notification(request, title, body)


class NotificationViewSet(GenericViewSet):
    pagination_class = LimitOffsetPagination

    def get_permissions(self):
        if self.action == 'send':
            self.permission_classes = [IsAdminUser]
        return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        if self.action == 'notifications':
            return Notification.objects.filter(receiver=self.request.user)
        return Notification.objects.none()  # fallback

    @action(detail=False, methods=['post'], url_path="permission")
    def can_send_notification(self, request, *args, **kwargs):
        return Response({
            'can_send_notification': True if request.user.is_staff else False
        })

    @action(detail=False, methods=['post'], url_path="send")
    def send_notification(self, request, *args, **kwargs):
        if not FCMDevice.objects.exclude(user=request.user).exists():
            return Response({
                "detail": "No devices found to send notification"
            })

        # make this process async to make request/response fast
        notification_title = "Notification Title"
        notification_body = "Notification body example from localhost"
        send_notification(request, notification_title, notification_body)
        return Response({
            "detail": "Notification sent successfully"
        })

    @action(detail=False, methods=['get'], url_path="")
    def notifications(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
