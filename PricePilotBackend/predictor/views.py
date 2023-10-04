from rest_framework import generics, views, status, response
import os
from .models import Car
from .serializers import (
    CarSerializer,
    UserInputSerializer,
    serializers,
)
from .predictor import CarPricePredictor


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
    def __init__(self):
        # Get the directory of the current file (predictor.py)
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Load the model using an absolute path
        model_path = os.path.join(current_dir, "models/dummy_linear_regression_model.joblib")
        self.predictor = CarPricePredictor(model_path)

    def post(self, request, format=None):
        # Deserialize the user input
        serializer = UserInputSerializer(data=request.data)
        if serializer.is_valid():
            # Preprocess the input data
            preprocessed_input = self.predictor.preprocess_input(
                serializer.validated_data
            )
            # Predict the car price
            prediction = self.predictor.predict(preprocessed_input)
            # Post process the prediction
            post_process_prediction = self.predictor.post_process_prediction(prediction)

            # Return the prediction to the client
            return response.Response(
                {"predicted_price": post_process_prediction}, status=status.HTTP_200_OK
            )

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CarNameSerializer(serializers.ListSerializer):
    child = serializers.CharField()


class CarNameItemSerializer(serializers.Serializer):
    name = serializers.CharField()


class CarDataBulkView(generics.ListCreateAPIView):
    """
    A Django REST Framework view that handles the creation and list of car objects in bulk.

    Attributes:
        serializer_class (class): The serializer class used for serializing and deserializing car objects.
        queryset (QuerySet): The queryset of car objects used for the view.
    """

    serializer_class = CarSerializer
    queryset = Car.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


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
