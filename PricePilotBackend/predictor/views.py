from rest_framework import generics, views, status, response
from .models import Car
from .serializers import CarSerializer, UserInputSerializer


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
