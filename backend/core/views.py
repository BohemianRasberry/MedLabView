from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework import generics 
from . serializers import ClassSerializers
from . models import *
from django.contrib.auth import authenticate, login

# Create your views here.

def base(request):
    csrf_token = "your_actual_csrf_token_here"  # Replace with the actual CSRF token

    context = {
        'csrf_token': csrf_token,
    }
    return render(request, 'core/login.html', context)

def login(request):
    context = {}
    return render(request, 'index.html', context)

def home(request):
    return HttpResponse("Hello world")

class ClinicView(generics.CreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClassSerializers
    