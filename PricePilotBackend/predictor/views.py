from rest_framework import generics, views, status, response
from .models import Car
from .serializers import (
    CarSerializer,
    UserInputSerializer,
    CarNameSerializer,
    serializers,
)


class CarDataView(generics.CreateAPIView):
    """
    A Django REST Framework view that handles the creation of car objects.

    Attributes:
        serializer_class (class): The serializer class used for serializing and deserializing car objects.
        queryset (QuerySet): The queryset of car objects used for the view.
    """

    serializer_class = CarSerializer
    queryset = Car.objects.all()


class CarPricePredictionView(views.APIView):
    def post(self, request, format=None):
        # Deserialize the user input
        serializer = UserInputSerializer(data=request.data)
        if serializer.is_valid():
            # Process the input data and use your trained model to predict the car price
            # prediction = your_model.predict(serializer.validated_data)  # Use your actual prediction logic

            # For now, let's just assume a dummy prediction for demonstration
            prediction = 20000

            # Return the prediction to the client
            return response.Response(
                {"predicted_price": prediction}, status=status.HTTP_200_OK
            )

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarNameSerializer(serializers.ListSerializer):
    child = serializers.CharField()


class CarNameItemSerializer(serializers.Serializer):
    name = serializers.CharField()


class CarNameListView(views.APIView):
    def get(self, request, format=None):
        # Retrieve all car names from the database
        car_names = Car.objects.values_list("name", flat=True)

        # Serialize the car names using CarNameItemSerializer
        serializer = CarNameItemSerializer(
            data=[{"name": name} for name in car_names], many=True
        )

        if serializer.is_valid():
            # Return the serialized car names to the client
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return response.Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
