from django.http import Http404
from rest_framework import generics
from rest_framework.response import Response

from api.models import Tourist
from api.serializers import TouristSerializer, TouristDetailSerializer


class TouristList(generics.ListCreateAPIView):
    queryset = Tourist.objects.all()
    serializer_class = TouristSerializer


class TouristDetailView(generics.RetrieveUpdateDestroyAPIView):
    lookup_url_kwarg = "pk"
    serializer_class = TouristDetailSerializer

    def get_tourist(self, pk):
        try:
            return Tourist.objects.get(id=pk)
        except Tourist.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        tourist = self.get_tourist(pk)
        serializer = TouristDetailSerializer(tourist)
        print(serializer.data)
        return Response(serializer.data)
