from django.db import models, migrations

# Create your models here.
class Clinic(models.Model):
    patho = models.CharField(max_length=20, default="", unique=True)
    medtech = models.CharField(max_length=20, default="", unique=True)
    
'''class Patient(models.Model):
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
        return f"{self.patient_firstname} {self.patient_familyname}"'''
        
class Patient(models.Model):
    patientid = models.CharField(max_length=20, primary_key=True, default=1)
    patientlastname = models.CharField(max_length=100, null=True)
    patientfirstname = models.CharField(max_length=100, null=True)
    patientmiddlename = models.CharField(max_length=100, blank=True, null=True)
    dateofbirth = models.DateField()
    sex = models.CharField(max_length=8, choices=[('Male', 'Male'), ('Female', 'Female')], default='Male')
    age = models.IntegerField()
    requesting_physician = models.CharField(max_length=100, default='DefaultPhysicianName')

    def __str__(self):
        return f"{self.patientid} - {self.patientlastname}, {self.patientfirstname}"
    
class Pathologist(models.Model):
    pathoid = models.CharField(max_length=20, primary_key=True, default=1)
    pathoname = models.CharField(max_length=100, default='Patho Name')
    prcid = models.CharField(max_length=20, default=1)

    def __str__(self):
        return f"{self.pathoid} - {self.pathoname}"
    

class Medtech(models.Model):
    medtechid = models.CharField(max_length=20, primary_key=True, default=1)
    medtechname = models.CharField(max_length=100, default='Medtech Name')
    prcid = models.CharField(max_length=20, default=1)

    def __str__(self):
        return f"{self.medtechid} - {self.medtechname}"

class Specimen(models.Model):
    #specimen_id = models.AutoField(primary_key=True)
    specimenid = models.CharField(max_length=20, primary_key=True, default=1)
    patientid = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, to_field='patientid')
    medtechid = models.ForeignKey(Medtech, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"{self.specimenid} - {self.patientid}"
    
class Transaction(models.Model):
    transactionid = models.CharField(max_length=20, primary_key=True, default=1)
    patientid = models.ForeignKey(Patient, on_delete=models.SET_NULL, null=True, to_field='patientid')
    testid = models.CharField(max_length=20, default=1)
    testcode = models.CharField(max_length=3, default=1)
    specimenid = models.ForeignKey(Specimen, on_delete=models.SET_NULL, null=True, to_field='specimenid')
    pathoid = models.ForeignKey(Pathologist, on_delete=models.SET_NULL, null=True, to_field='pathoid')
    datetime = models.CharField(max_length=20, default=1)
    
class Complete_Blood_Count(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=1)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    whitebloodcells = models.FloatField(default=0.0)
    redbloodcells = models.FloatField(default=0.00)
    hematocrit = models.FloatField(default=0.0)
    hemaglobin = models.FloatField(default=0.0)
    mcv = models.FloatField(default=0.0)
    mch = models.FloatField(default=0.0)
    mchc = models.FloatField(default=0.0)
    plateletcount = models.FloatField(default=0.0)
    rdw = models.FloatField(default=0.0)
    neutrophil = models.FloatField(default=0.0)
    lymphocyte = models.FloatField(default=0.0)
    eosinophil = models.FloatField(default=0.0)
    monocyte = models.FloatField(default=0.0)
    basophil = models.FloatField(default=0.0)
    
class BloodTyping(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=2)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    BLOOD_TYPES_CHOICES = (
        ('A', 'A'), 
        ('B', 'B'), 
        ('AB', 'AB'),
        ('O', 'O'))
    RH_FACTOR_CHOICES = (
        ('Positive', 'Positive'), 
        ('Negative', 'Negative'))
    bloodgroup = models.CharField(max_length=2, choices=BLOOD_TYPES_CHOICES)
    rhfactor = models.CharField(max_length=8, choices=RH_FACTOR_CHOICES, default='Positve')
    
class ESR(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=3)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    esr = models.FloatField(default=0.0)
    
class FBS(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=4)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    fbs = models.FloatField(default=0.0)
    
class Cholesterol(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=5)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    cholesterol = models.FloatField(default=0.0)
    
class Triglyceride(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=6)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    triglyceride = models.FloatField(default=0.0)
    
class HDL(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=7)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    hdl = models.FloatField(default=0.0)

class LDL(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=8)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ldl = models.FloatField(default=0.0)
    
class VLDL(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=9)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    vldl = models.FloatField(default=0.0)
    
class BUN(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=10)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    bun = models.FloatField(default=0.0)
    
class Creatine(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=11)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    creatine = models.FloatField(default=0.0)
    
class BUA(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=12)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    bua = models.FloatField(default=0.0)
    
class AST(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=13)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ast = models.FloatField(default=0.0)
    
class ALT(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=14)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    alt = models.FloatField(default=0.0)
    
class ALP(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=15)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    alp = models.FloatField(default=0.0)
    
class Sodium(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=16)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    sodium = models.FloatField(default=0.0)
    
class Potassium(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=17)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    potassium = models.FloatField(default=0.0)
    
class Calcium(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=18)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    calcium = models.FloatField(default=0.0)
    
class Urinalysis(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=19)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    color = models.CharField(max_length=20, default='')
    transparency = models.CharField(max_length=20, default='')
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
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=20)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
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
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=21)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    color_appearance = models.CharField(max_length=6, choices=COLOR_CHOICES)
    consistency = models.CharField(max_length=11, choices=CONSISTENCY_CHOICES)
    mucus = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    blood = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    pus_cells = models.FloatField(default=0.0)
    rbc = models.FloatField(default=0.0)
    ova = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    cyst = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    bacteria = models.CharField(max_length=7, choices=PRESENT_ABSENT)
    other = models.CharField(max_length=50, null=True)
    
class FOBT(models.Model):
    FOBT_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=22)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    fobt = models.CharField(max_length=8, choices=FOBT_CHOICES)
    
class ASO(models.Model):
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=23)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    aso = models.FloatField(default=0.0)
    
class Dengue_Antibody(models.Model):
    POSITIVE_NEGATIVE_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=24)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    igm = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)
    igg = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)
    
class Dengue_Antigen(models.Model):
    POSITIVE_NEGATIVE_CHOICES = (
        ('Positive', 'Positive'),
        ('Negative', 'Negative'))
    testid = models.CharField(max_length=20, primary_key=True, default=1)
    testcode = models.CharField(max_length=3, default=25)
    specimenid = models.ForeignKey(Transaction, on_delete=models.SET_NULL, null=True)
    ns1 = models.CharField(max_length=8, choices=POSITIVE_NEGATIVE_CHOICES)