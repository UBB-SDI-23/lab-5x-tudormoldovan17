from django.contrib import admin
from .models import Country, City, Citizen, Tourist
# Register your models here.


admin.site.register(City)
admin.site.register(Country)
admin.site.register(Citizen)
admin.site.register(Tourist)
