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
    """
    API view that retrieves all car names from the database, extracts the brand and model information, and returns a list of distinct brand-model pairs to the client.
    """

    def get(self, request, format=None):
        """
        Retrieves all car names from the database, extracts the brand and model information, and returns a list of distinct brand-model pairs to the client.

        Args:
            request: The request object.
            format: The format of the response data (default: None).

        Returns:
            A response containing the list of distinct brand-model pairs.
        """
        car_names = filter(None, Car.objects.values_list("name", flat=True))

        brand_model_pairs = [
            {"brand": brand, "model": model}
            for brand, model in (
                name.split(" ", 1) if " " in name else (name, "") for name in car_names
            )
        ]

        unique_brand_model_pairs = []
        seen_pairs = set()
        for pair in brand_model_pairs:
            pair_tuple = tuple(pair.items())
            if pair_tuple not in seen_pairs:
                seen_pairs.add(pair_tuple)
                unique_brand_model_pairs.append(pair)

        return response.Response(unique_brand_model_pairs, status=status.HTTP_200_OK)
