from rest_framework import views, status, response
from .models import Car
from .serializers import CarSerializer


class CarDataView(views.APIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def post(self, request, format=None):
        # Assuming request.data contains the data to be stored
        data = request.data

        # Serialize the data
        serializer = CarSerializer(data=data, many=True)

        if serializer.is_valid():
            # Save the data to the database
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)

        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
