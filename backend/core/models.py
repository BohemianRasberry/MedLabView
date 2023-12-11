from django.db import models, migrations

# Create your models here.
class Clinic(models.Model):
    patho = models.CharField(max_length=20, default="", unique=True)
    medtech = models.CharField(max_length=20, default="", unique=True)
    
class Patient(models.Model):
    SEX_CHOICES = (('F', 'Female'), ('M', 'Male'))
    patient_id = models.AutoField(primary_key=True)
    patient_firstname = models.CharField(max_length=50, unique=True)
    patient_familyname = models.CharField(max_length=50, unique=True)
    patient_age = models.IntegerField()
    pateint_sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    patient_birthday = models.DateField()
    patient_AMD = models.CharField(max_length=50)
    
class Pathologist(models.Model):
    pathologist_id = models.AutoField(primary_key=True)
    pathologist_name = models.CharField(max_length=50, unique=True)
    pathologist_prc_id = models.CharField(max_length=10, unique=True)
    
class Medtech(models.Model):
    medtech_id = models.AutoField(primary_key=True)
    medtech_name = models.CharField(max_length=50, unique=True)
    medtech_prc_id = models.CharField(max_length=10, unique=True)
    
class Specimen(models.Model):
    specimen_id = models.AutoField(primary_key=True)
    medtech_id = models.ForeignKey(Medtech, on_delete=models.CASCADE, null=True)
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True) 
    
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    test_code = models.IntegerField()
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True)
    pathologist_id = models.ForeignKey(Pathologist, on_delete=models.CASCADE, null=True)
    specimen_id = models.ForeignKey(Specimen, on_delete=models.CASCADE, null=True)
    datetime = models.DateTimeField()
    
class Complete_Blood_Count(models.Model):
    test_code = 1
    white_blood_cells = models.FloatField()
    red_blood_cells = models.FloatField()
    hematocrit = models.FloatField()
    hemaglobin = models.FloatField()
    mcv = models.FloatField()
    mch = models.FloatField()


    