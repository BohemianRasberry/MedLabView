from django.db import models, migrations

# Create your models here.
class Clinic(models.Model):
    patho = models.CharField(max_length=20, default="", unique=True)
    medtech = models.CharField(max_length=20, default="", unique=True)
    
class Patient(models.Model):
    SEX_CHOICES = (
        ('F', 'Female'), 
        ('M', 'Male'))
    #patient_id = models.AutoField(primary_key=True)
    patient_firstname = models.CharField(max_length=50, unique=True)
    patient_familyname = models.CharField(max_length=50, unique=True)
    patient_age = models.IntegerField()
    pateint_sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    patient_birthday = models.DateField()
    patient_AMD = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return f"{self.patient_firstname} {self.patient_familyname}"
    
class Pathologist(models.Model):
    #pathologist_id = models.AutoField(primary_key=True)
    pathologist_name = models.CharField(max_length=50, unique=True)
    pathologist_prc_id = models.CharField(max_length=10, unique=True)
    
    default_ptahologist_id = 1  # You can set any default value here
    

class Medtech(models.Model):
    #medtech_id = models.AutoField(primary_key=True)
    medtech_name = models.CharField(max_length=50, unique=True)
    medtech_prc_id = models.CharField(max_length=10, unique=True)

class Specimen(models.Model):
    #specimen_id = models.AutoField(primary_key=True)
    medtech_id = models.ForeignKey(Medtech, on_delete=models.SET_NULL, null=True)
    patient_id = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True) 
    
class Transaction(models.Model):
    #transaction_id = models.AutoField(primary_key=True)
    test_code = models.IntegerField(null=True)
    patient_id = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True)
    pathologist_id = models.ForeignKey(Pathologist, on_delete=models.SET_NULL, null=True)
    specimen_id = models.ForeignKey(Specimen, on_delete=models.SET_NULL, null=True)
    datetime = models.DateTimeField()
    
class Complete_Blood_Count(models.Model):
    test_code = 1
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    white_blood_cells = models.FloatField(default=0.0)
    red_blood_cells = models.FloatField(default=0.00)
    hematocrit = models.FloatField(default=0.0)
    hemaglobin = models.FloatField(default=0.0)
    mcv = models.FloatField(default=0.0)
    mch = models.FloatField(default=0.0)
    mchc = models.FloatField(default=0.0)
    platelet_count = models.FloatField(default=0.0)
    neutrophil = models.FloatField(default=0.0)
    lymphocyte = models.FloatField(default=0.0)
    eosinophil = models.FloatField(default=0.0)
    monocyte = models.FloatField(default=0.0)
    basophil = models.FloatField(default=0.0)
    
class BloodTyping(models.Model):
    test_code = 2
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    BLOOD_TYPES_CHOICES = (
        ('A', 'A'), 
        ('B', 'B'), 
        ('AB', 'AB'),
        ('O', 'O'))
    RH_FACTOR_CHOICES = (
        ('P', 'Positive'), 
        ('N', 'Negative'))
    blood_type = models.CharField(max_length=2, choices=BLOOD_TYPES_CHOICES)
    rh_factor = models.CharField(max_length=1, choices=RH_FACTOR_CHOICES)
    
class ESR(models.Model):
    test_code = 3
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    esr = models.FloatField(default=0.0)
    
class FBS(models.Model):
    test_code = 4
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    fbs = models.FloatField(default=0.0)
    
class Cholesterol(models.Model):
    test_code = 5
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    cholesterol = models.FloatField(default=0.0)
    
class Triglyceride(models.Model):
    test_code = 6
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    triglyceride = models.FloatField(default=0.0)
    
class HDL(models.Model):
    test_code = 7
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    hdl = models.FloatField(default=0.0)

class LDL(models.Model):
    test_code = 8
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ldl = models.FloatField(default=0.0)
    
class VLDL(models.Model):
    test_code = 9
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    vldl = models.FloatField(default=0.0)
    
class BUN(models.Model):
    test_code = 10
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    bun = models.FloatField(default=0.0)
    
class Creatine(models.Model):
    test_code = 11
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    creatine = models.FloatField(default=0.0)
    
class BUA(models.Model):
    test_code = 12
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    bua = models.FloatField(default=0.0)
    
class AST(models.Model):
    test_code = 13
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ast = models.FloatField(default=0.0)
    
class ALT(models.Model):
    test_code = 14
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    alt = models.FloatField(default=0.0)
    
class ALP(models.Model):
    test_code = 15
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    alp = models.FloatField(default=0.0)
    
class Sodium(models.Model):
    test_code = 16
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    sodium = models.FloatField(default=0.0)
    
class Potassium(models.Model):
    test_code = 17
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    potassium = models.FloatField(default=0.0)
    
class Calcium(models.Model):
    test_code = 18
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    calcium = models.FloatField(default=0.0)
    
class Urinalysis(models.Model):
    test_code = 19
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    color = models.CharField(max_length=20, default='')
    transparency = models.CharField(max_length=20, default='')
    #chemical_analysis
    glucose = models.FloatField(default=0.0)
    bilirubin = models.FloatField(default=0.0)
    ketone = models.FloatField(default=0.0)
    specific_gravity = models.FloatField(default=0.0)
    blood = models.FloatField(default=0.0)
    ascorbic_acid = models.FloatField(default=0.0)
    creatine = models.FloatField(default=0.0)
    ph_level = models.FloatField(default=0.0)
    protein = models.FloatField(default=0.0)
    urobilinogen = models.FloatField(default=0.0)
    nitrite = models.FloatField(default=0.0)
    leukocytes = models.FloatField(default=0.0)
    microalbumin = models.FloatField(default=0.0)
    calcium = models.FloatField(default=0.0)
    rbc = models.FloatField(default=0.0)
    wbc = models.FloatField(default=0.0)
    sec = models.FloatField(default=0.0)
    amorphous_urate = models.FloatField(default=0.0)
    mucus_threads = models.FloatField(default=0.0)
    bacteria = models.FloatField(default=0.0)

class Pregnancy_Test(models.Model):
    PREGNANCY_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    test_code = 20
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    pregnancy_result = models.CharField(max_length=8, choices=PREGNANCY_CHOICES)
    
class Fecalysis(models.Model):
    COLOR_CHOICES = (
        ('yellow', 'yellow'),
        ('brown', 'brown'),
        ('black', 'black')
    )
    CONSISTENCY_CHOICES = (
        ('formed', 'formed'),
        ('semi-formed', 'semi-formed'),
        ('watery', 'watery')
    )
    PRESENT_ABSENT = (
        ('present', 'present'),
        ('absent', 'absent')
    )
    test_code = 21
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    color_appearance = models.CharField(max_length=6, choices=COLOR_CHOICES)
    consistency = models.CharField(max_length=11, choices=CONSISTENCY_CHOICES)
    mucus = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    blood = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    #pus_cells
    #rbc
    ova = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    cyst = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    bacteria = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    other = models.CharField(max_length=50)
    
class FOBT(models.Model):
    FOBT_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    test_code = 22
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    fobt = models.CharField(max_length=8, choices=FOBT_CHOICES)
    
class ASO(models.Model):
    test_code = 23
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    aso = models.FloatField(default=0.0)
    
class Dengue_Antibody(models.Model):
    POSITIVE_NEGATIVE_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    test_code = 24
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    igm = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)
    igg = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)
    
class Dengue_Antigen(models.Model):
    POSITIVE_NEGATIVE_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    test_code = 25
    specimen_id = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ns1 = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)