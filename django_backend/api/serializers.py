from django.db.models import Avg
from rest_framework import serializers

from .models import City, Tourist, Country, Citizen


class TouristSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tourist
        fields = ('__all__')


class CitySerializer(serializers.ModelSerializer):

    def validate(self, data):
        if data['cityPopulation'] < 10000:
            raise serializers.ValidationError("cityPopulation should be > 10000, else it is a countryside")
        return data

    class Meta:
        model = City
        fields = ('__all__')


class CountrySerializer(serializers.ModelSerializer):
    countryCity = CitySerializer()
    countryTourist = TouristSerializer()

    class Meta:
        model = Country
        fields = ('__all__')


class CountrySerializer2(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('__all__')


class CitizenSerializer(serializers.ModelSerializer):
    citizenName = serializers.CharField(max_length=100)
    citizenAge = serializers.IntegerField()
    citizenMoney = serializers.IntegerField()
    citizenWage = serializers.IntegerField()
    citizenPhone = serializers.CharField(max_length=20)
    citizenCity = CitySerializer(read_only=True)

    def validate_city_id(self, value):
        filter = City.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("City doesn't exist!")
        return value

    class Meta:
        model = Citizen
        fields = ('__all__')


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class DynamicCitizenSerializer(DynamicFieldsModelSerializer):
    citizenCity_id = serializers.IntegerField()

    def validate_city_id(self, value):
        filter = City.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("City doesn't exist!")
        return value

    def validate(self, data):
        if len(data['citizenPhone']) != 10:
            raise serializers.ValidationError("citizenPhone must be exactly 10 digits!")
        return data

    class Meta:
        model = Citizen
        fields = ['id', 'citizenName', 'citizenAge', 'citizenMoney', 'citizenWage', 'citizenPhone', 'citizenCity_id']


class CitizenSerializerWithoutCity(serializers.ModelSerializer):
    class Meta:
        model = Citizen
        fields = ('id', 'citizenName', 'citizenAge', 'citizenMoney', 'citizenWage', 'citizenPhone')


class DynamicCitySerializer(DynamicFieldsModelSerializer):
    cityName = serializers.CharField(max_length=100)
    cityPopulation = serializers.IntegerField()
    cityArea = serializers.IntegerField()
    cityMoney = serializers.IntegerField()
    cityDescription = serializers.CharField(max_length=100)
    cityCitizen = CitizenSerializerWithoutCity(many=True, read_only=True)

    class Meta:
        model = City
        fields = ['cityName', 'cityPopulation', 'cityArea', 'cityMoney', 'cityDescription', 'cityCitizen']


class CitySerializer3(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('__all__')


class TouristCitySerializer(DynamicFieldsModelSerializer):
    cityId = serializers.IntegerField()
    countryName = serializers.CharField(max_length=200)
    cityCountry = CitySerializer3(many=True, read_only=True)
    touristCountry = TouristSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ['countryName', 'countryMoney', 'cityCountry', 'cityId', 'touristCountry']


class CitizenWageSerializer(serializers.ModelSerializer):
    avgWage = serializers.FloatField()

    class Meta:
        model = Citizen
        fields = ('id', 'citizenName', 'citizenAge', 'citizenMoney', 'citizenWage', 'citizenPhone', 'avgWage')


class CitiesByAvgMoneySerializer(serializers.ModelSerializer):
    avgMoney = serializers.FloatField()

    class Meta:
        model = City
        fields = ('id', 'cityName', 'cityPopulation', 'cityArea', 'cityMoney', 'cityDescription', 'avgMoney')


class TouristsByAvgMoneySerializer(serializers.ModelSerializer):
    avg_countryMoney = serializers.SerializerMethodField()

    class Meta:
        model = Tourist
        fields = ('id', 'touristName', 'touristAge', 'touristMoney', 'touristPhone', 'touristEmail', 'avg_countryMoney')

    def get_avg_countryMoney(self, obj):
        avg_money = obj.touristCountry.aggregate(Avg('countryMoney'))['countryMoney__avg']
        return avg_money if avg_money else 0


class CitizensByAvgPopulationSerializer(serializers.ModelSerializer):
    avg_countryPopulation = serializers.SerializerMethodField()

    class Meta:
        model = Citizen
        fields = ('id', 'citizenName', 'citizenAge', 'citizenMoney', 'citizenWage', 'citizenPhone', 'avg_countryPopulation')

    def get_avg_countryPopulation(self, obj):
        avg_pop = obj.citizenCity.cityCountry.aggregate(Avg('countryPopulation'))['countryPopulation__avg']
        return avg_pop if avg_pop else 0


class CitizenSerializer5(serializers.ModelSerializer):
    class Meta:
        model = Citizen
        fields = '__all__'


class CityCitizenSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Citizen
        fields = ['citizenCity_id']


class CountrySerializerWithCityAndWithoutTourist(serializers.ModelSerializer):
    countryName = serializers.CharField()
    countryCities = serializers.CharField()
    countryPopulation = serializers.IntegerField()
    countryMoney = serializers.IntegerField()
    countryDescription = serializers.CharField()
    countryCity = CitySerializer(read_only=True)

    class Meta:
        model = Country
        fields = ('id', 'countryName', 'countryCities', 'countryPopulation', 'countryMoney', 'countryDescription', 'countryCity')


class TouristDetailSerializer(DynamicFieldsModelSerializer):
    touristCountry = CountrySerializerWithCityAndWithoutTourist(many=True, read_only=True)

    class Meta:
        model = Tourist
        fields = ['id', 'touristName', 'touristAge', 'touristMoney', 'touristPhone', 'touristEmail', 'touristCountry']


class CountrySerializerWithTouristAndWithoutCity(serializers.ModelSerializer):
    countryName = serializers.CharField()
    countryCities = serializers.CharField()
    countryPopulation = serializers.IntegerField()
    countryMoney = serializers.IntegerField()
    countryDescription = serializers.CharField()
    countryTourist = CitySerializer(read_only=True)

    class Meta:
        model = Country
        fields = ('id', 'countryName', 'countryCities', 'countryPopulation', 'countryMoney', 'countryDescription', 'countryTourist')


class CityDetailSerializer(DynamicFieldsModelSerializer):
    cityCountry = CountrySerializerWithCityAndWithoutTourist(many=True, read_only=True)
    cityCitizen = CitizenSerializerWithoutCity(many=True, read_only=True)

    class Meta:
        model = City
        fields = ['id', 'cityName', 'cityPopulation', 'cityArea', 'cityMoney', 'cityDescription', 'cityCountry', 'cityCitizen']


class CitiesByAvgAgeSerializer(serializers.ModelSerializer):
    avg_citizenAge = serializers.FloatField()

    class Meta:
        model = City
        fields = ('id', 'cityName', 'cityPopulation', 'cityArea', 'cityMoney', 'cityDescription', 'avg_citizenAge')

    def get_avg_citizenAge(self, obj):
        avg_agee = obj.cityCitizen.aggregate(Avg('citizenAge'))['citizenAge__avg']
        return avg_agee if avg_agee else 0


class CitiesByAvgPopulationSerializer(serializers.ModelSerializer):
    avgPopulation = serializers.SerializerMethodField()

    class Meta:
        model = City
        fields = ('id', 'cityName', 'cityPopulation', 'cityArea', 'cityMoney', 'cityDescription', 'avgPopulation')

    def get_avg_population(self, obj):
        avg_pop = obj.cityCountry.aggregate(Avg('countryPopulation'))['countryPopulation__avg']
        return avg_pop if avg_pop else 0
