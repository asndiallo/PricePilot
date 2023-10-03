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
        # Retrieve all car names from the database and remove None or empty names
        car_names = filter(None, Car.objects.values_list("name", flat=True))

        # Extract brand and model and create a list of distinct brand-model pairs
        brand_model_pairs = [
            {"brand": brand, "model": model}
            for brand, model in (
                name.split(" ", 1) if " " in name else (name, "") for name in car_names
            )
        ]

        # Use a set to filter out duplicates
        unique_brand_model_pairs = []
        seen_pairs = set()
        for pair in brand_model_pairs:
            # Convert dictionary to tuple for hashability
            pair_tuple = tuple(pair.items())
            if pair_tuple not in seen_pairs:
                seen_pairs.add(pair_tuple)
                unique_brand_model_pairs.append(pair)

        # Return the list of distinct brand-model pairs to the client
        return response.Response(unique_brand_model_pairs, status=status.HTTP_200_OK)
