from django.db.models import Avg
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import City
from api.paginations import LargeResultsSetPagination
from api.serializers import CitySerializer, DynamicCitySerializer, CitiesByAvgMoneySerializer, CitiesByAvgAgeSerializer, \
    CitiesByAvgPopulationSerializer, CityDetailSerializer


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    pagination_class = LargeResultsSetPagination


class CityDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CitySerializer

    def get_city(self, pk):
        try:
            return City.objects.get(id=pk)
        except City.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        city = self.get_city(pk)
        serializer = CitySerializer(City, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk, format=None):
        city = self.get_city(pk)
        serializer = CityDetailSerializer(city)

        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        city = self.get_city(pk)
        city.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

