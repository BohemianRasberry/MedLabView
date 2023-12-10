from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework import generics 
from . serializers import ClassSerializers
from . models import *
from django.contrib.auth import authenticate, login

# Create your views here.

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None: 
            login(request, user)
            return HttpResponse("This test works")
        else:
            messages.error(request, "There is no user with that password")
    
    context = { }
    return render(request, 'index.html', context)

def home(request):
    return HttpResponse("Hello world")

class ClinicView(generics.CreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClassSerializers
    