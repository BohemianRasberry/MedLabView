from django.apps import AppConfig

class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    #def ready(self):
    #    from .models import Medtech
    #    default_medtech_id = 1  # Set your default value
    #    Medtech.objects.filter(medtech_id__isnull=True).update(medtech_id=default_medtech_id)