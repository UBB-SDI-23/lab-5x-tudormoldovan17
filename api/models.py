from django.db import models
import uuid
# Create your models here.


class City(models.Model):
    cityName = models.CharField(max_length=100)
    cityPopulation = models.IntegerField()
    cityArea = models.IntegerField()
    cityMoney = models.IntegerField()
    cityDescription = models.CharField(max_length=100)

    def __str__(self):
        return self.cityName


class Tourist(models.Model):
    touristName = models.CharField(max_length=100)
    touristAge = models.IntegerField()
    touristMoney = models.IntegerField()
    touristPhone = models.CharField(max_length=20)
    touristEmail = models.CharField(max_length=50)

    def __str__(self):
        return self.touristName


class Country(models.Model):
    countryName = models.CharField(max_length=100, unique=True)
    countryCities = models.CharField(max_length=100)
    countryPopulation = models.IntegerField()
    countryMoney = models.IntegerField()
    countryDescription = models.CharField(max_length=100)
    countryTourist = models.ForeignKey(Tourist, on_delete=models.CASCADE, related_name="touristCountry")
    countryCity = models.ForeignKey(City, on_delete=models.CASCADE, related_name="cityCountry")

    def __str__(self):
        return self.countryName


class Citizen(models.Model):
    citizenCity = models.ForeignKey(City, on_delete=models.CASCADE, related_name="cityCitizen")
    citizenName = models.CharField(max_length=100)
    citizenAge = models.IntegerField()
    citizenMoney = models.IntegerField()
    citizenWage = models.IntegerField()
    citizenPhone = models.CharField(max_length=20)

    def __str__(self):
        return self.citizenName
