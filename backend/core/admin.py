from django.contrib import admin
from . models import *

# Register your models here.

admin.site.register(Pathologist)
admin.site.register(Medtech)
admin.site.register(Transaction)
admin.site.register(Specimen)
admin.site.register(Patient)
admin.site.register(Complete_Blood_Count)