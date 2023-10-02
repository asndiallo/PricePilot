from rest_framework import generics
from .models import CarBrand, Car, UserInput
from .serializers import CarBrandSerializer, CarSerializer, UserInputSerializer

class CarBrandListCreateView(generics.ListCreateAPIView):
    queryset = CarBrand.objects.all()
    serializer_class = CarBrandSerializer

class CarListCreateView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class UserInputListCreateView(generics.ListCreateAPIView):
    queryset = UserInput.objects.all()
    serializer_class = UserInputSerializer
