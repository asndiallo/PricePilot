from rest_framework import generics
from .models import Car
from .serializers import CarSerializer


class CarDataView(generics.CreateAPIView):
    """
    A view in a Django REST Framework application that handles the creation of car objects.
    """

    serializer_class = CarSerializer
    queryset = Car.objects.all()
