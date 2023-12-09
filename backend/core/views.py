from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics 
from . serializers import ClassSerializers
from . models import Clinic

# Create your views here.

def login(request):
    context = { }
    return render(request, 'index.html', context)

def home(request):
    return HttpResponse("Hello world")

class ClinicView(generics.CreateAPIView):
    queryset = Clinic.objects.all()
    serializer_class = ClassSerializers
    