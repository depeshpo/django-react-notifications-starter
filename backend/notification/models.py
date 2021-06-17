from django.contrib.auth import get_user_model
from django.db import models

USER = get_user_model()


class Notification(models.Model):
    title = models.CharField(max_length=150)
    body = models.CharField(max_length=225)
    read = models.BooleanField(default=False)
    sender = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="notification_sender")
    receiver = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="notification_receiver")
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.title} sent to {self.receiver.username} by {self.sender.username}'
