from django.urls import path, re_path
from . views import *
from django.views.generic import TemplateView
from django.contrib.staticfiles.views import serve

urlpatterns = [
    #path("login/", login, name="front"), #Connects to the frontend
    path('login/', TemplateView.as_view(template_name='index.html'), name='login'),
    path("clinic/", ClinicView.as_view()),
    path("home/", home, name="home"),
    path("base/", base, name="base"),
    #path("", index, name="index"),
    path("api/", api_data, name="api_data"),
    path("", TemplateView.as_view(template_name='index.html'), name="home"),
    re_path(r'^(?!static/).*$', TemplateView.as_view(template_name='index.html')),  # Handle other paths
    
]