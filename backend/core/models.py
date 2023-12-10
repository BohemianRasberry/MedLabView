from django.db import models

# Create your models here.
class Clinic(models.Model):
    patho = models.CharField(max_length=20, default="", unique=True)
    medtech = models.CharField(max_length=20, default="", unique=True)
    
class Pathologist(models.Model):
    pathologist_name = models.CharField(max_length=50, unique=True)
    pathologist_prc_id = models.CharField(max_length=10, unique=True)
    

    