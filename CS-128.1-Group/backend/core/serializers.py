from rest_framework import serializers
from . models import Clinic

class ClassSerializers(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = ('id', 'patho', 'medtech')