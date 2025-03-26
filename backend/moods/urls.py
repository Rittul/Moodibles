from django.urls import path
from .views import Registerview, Loginview,MoodView
urlpatterns = [
    path("register/",Registerview.as_view(),name="register"),
    path("login/",Loginview.as_view(),name="login"),
    path('mood/', MoodView.as_view(), name="mood"),
]
