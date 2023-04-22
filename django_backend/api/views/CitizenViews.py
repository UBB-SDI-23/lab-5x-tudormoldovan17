from django.db.models import Avg
from django.forms import model_to_dict
from django.http import Http404
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Citizen, City
from api.serializers import CitizensByAvgPopulationSerializer, CityCitizenSerializer, CitizenSerializer, \
    DynamicCitizenSerializer


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

