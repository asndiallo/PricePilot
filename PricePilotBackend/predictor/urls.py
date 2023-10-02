from django.urls import path
from .views import CarDataView

urlpatterns = [
    path('cars_data/', CarDataView.as_view(), name='car_data'),
]