from django.urls import path
from . views import *

urlpatterns = [
    #path("login/", login, name="front"), #Connects to the frontend
    path("login", login, name="login"),
    path("clinic/", ClinicView.as_view()),
    path("home/", home, name="home"),
    path("base/", base, name="base"),
    path("", index, name="index"),
    path("api/", api_data, name="api_data"),
    path("react/", ReactView.as_view(), name="react_app")
    
]