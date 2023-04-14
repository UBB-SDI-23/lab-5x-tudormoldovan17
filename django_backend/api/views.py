from django.db.models import Avg
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.forms.models import model_to_dict

from .models import City, Tourist, Country, Citizen
from .serializers import CitizenSerializer, CitySerializer, CountrySerializer, DynamicCitizenSerializer, DynamicCitySerializer, TouristSerializer, TouristCitySerializer, CitiesByAvgMoneySerializer, TouristsByAvgMoneySerialize, CountrySerializer2, CitiesByAvgPopulationSerializer, CitizensByAvgPopulationSerializer, CityCitizenSerializer


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = DynamicCitySerializer


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer2


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer2


class CitizenList(generics.ListCreateAPIView):
    queryset = Citizen.objects.all()
    serializer_class = DynamicCitizenSerializer


class CitizenDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Citizen.objects.all()
    serializer_class = CitizenSerializer


class MinimumWage(generics.ListAPIView):
    serializer_class = CitizenSerializer
    lookup_url_kwarg = "wage"

    def get_queryset(self):
        queryset = Citizen.objects.all()
        citizenWage = self.kwargs.get(self.lookup_url_kwarg)
        if citizenWage is not None:
            queryset = queryset.filter(citizenWage__gt=citizenWage)
        return queryset


class TouristList(generics.ListCreateAPIView):
    queryset = Tourist.objects.all()
    serializer_class = TouristSerializer


class TouristDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tourist.objects.all()
    serializer_class = TouristSerializer


class TouristCitiesList(APIView):
    def get_object(self, pk):
        try:
            return Country.objects.get(countryTourist_id=pk)
        except Tourist.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        countryTourists = Country.objects.all()
        countryTourists = countryTourists.filter(countryTourist_id=pk)

        serializer = TouristCitySerializer(countryTourists, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CountrySerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, pk, format=None):
        try:
            countryCity_id = request.data["countryCity"]
            countryTourist = Tourist.objects.get(id=pk)
            countryCity = City.objects.get(id=countryCity_id)
            country = Country(countryTourist=countryTourist, countryCity=countryCity)
            country.countryMoney = request.data.get("countryMoney")
            country.countryName = request.data.get("countryName")
            country.save()
            serializer = CountrySerializer2(country)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except (City.DoesNotExist, Tourist.DoesNotExist):
            return Response({"error" : "Invalid City or Tourist id"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    pass


class TouristsByAvgMoney(APIView):
    def get(self, request):
        queryset = Tourist.objects.annotate(avg_anynameMoney=Avg('touristCountry__countryMoney')).order_by('-avg_anynameMoney')
        serializer = TouristsByAvgMoneySerialize(queryset, many=True)
        return Response(serializer.data)


class CitiesByAvgMoney(APIView):
    def get(self, request):
        queryset = City.objects.annotate(avg_cityMoney=Avg('cityCitizen__citizenMoney')).order_by('-avg_citizenMoney')
        serializer = CitiesByAvgMoneySerializer(queryset, many=True)
        return Response(serializer.data)


class CitiesByAvgPopulation(APIView):
    def get(self, request):
        queryset = City.objects.annotate(avg_cityPopulation=Avg('cityCountry__countryPopulation')).order_by('-avg_countryPopulation')
        serializer = CitiesByAvgPopulationSerializer(queryset, many=True)
        return Response(serializer.data)


class CitizensByAvgPopulation(APIView):
    def get(self, request):
        queryset = Citizen.objects.annotate(avg_countryPopulation=Avg('citizenCity__cityCountry__countryPopulation')).order_by('-avg_countryPopulation')
        serializer = CitizensByAvgPopulationSerializer(queryset, many=True)
        return Response(serializer.data)


# class CitizensByAvgPopulation2(APIView):
#     def get(self, request):
#         queryset = Citizen.objects.annotate(avg_countryPopulation=Avg('citizenCity__cityCountry__countryPopulation')).order_by('-avg_countryPopulation')
#         serializer = CitizensByAvgPopulationSerializer(queryset, many=True)
#         return Response(serializer.data)


# not needed more
# class CountryFilterPopulation(generics.ListAPIView):
#     serializer_class = CountrySerializer2
#     lookup_url_kwarg = "population"
#
#     def get_queryset(self):
#         queryset = Country.objects.all()
#         countryPopulation = self.kwargs.get(self.lookup_url_kwarg)
#         if countryPopulation is not None:
#             queryset = queryset.filter(countryPopulation__gt=countryPopulation)
#         return queryset

class CitizenCityView(APIView):
    def get_object(self, pk):
        try:
            return City.objects.get(pk=pk)
        except City.DoesNotExist:
            raise Http404

    def get_citizen(self, pk):
        try:
            return Citizen.objects.get(pk=pk)
        except Citizen.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        city = self.get_object(pk)
        citizen_ids = request.data['list_of_ids']
        citizens = []
        for i in range(len(citizen_ids)):
            citizen = self.get_citizen(citizen_ids[i])
            citizen.citizenCity_id = pk
            citizen.save()
            citizens.append(citizen)

        serializer = CityCitizenSerializer(citizens[0], data=model_to_dict(citizens[0]))

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)











