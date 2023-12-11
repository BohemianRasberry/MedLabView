from django.db import models

# Create your models here.
class Clinic(models.Model):
    patho = models.CharField(max_length=20, default="", unique=True)
    medtech = models.CharField(max_length=20, default="", unique=True)
    
class Pathologist(models.Model):
    #pathologist_id = models.Model(max_length=20, primary_key = True)
    pathologist_name = models.CharField(max_length=50, unique=True)
    pathologist_prc_id = models.CharField(max_length=10, unique=True)
    
class Medtech(models.Model):
    #medtech_id = models.Model(max_length=20, primary_key = True)
    medtech_name = models.CharField(max_length=50, unique=True)
    medtech_prc_id = models.CharField(max_length=10, unique=True)
    
class Transaction(models.Model):
    datetime = models.DateTimeField()
    
#class Specimen(models.Model):
    #specimen_id = models.Model(max_length=20, primary_key = True)
    #medtech_id = models.ForeignKey()

    