from rest_framework import generics
from .models import Car
from .serializers import CarSerializer


class CarDataView(generics.CreateAPIView):
    """
    A Django REST Framework view that handles the creation of car objects.

    Attributes:
        serializer_class (class): The serializer class used for serializing and deserializing car objects.
        queryset (QuerySet): The queryset of car objects used for the view.
    """

    serializer_class = CarSerializer
    queryset = Car.objects.all()
