from django.urls import path

from .views import CustomAuthToken, UserDetailAPIView

urlpatterns = [
    path('obtain-token/', CustomAuthToken.as_view(), name="obtain-auth-token"),
    path('user-detail/', UserDetailAPIView.as_view(), name="user-detail"),
]
