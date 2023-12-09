from django.urls import path
from .views import *

urlpatterns = [
    path("", login, name="front"), #Connects to the frontend
    path("home", ClinicView.as_view()),
]