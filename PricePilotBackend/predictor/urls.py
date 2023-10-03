from django.urls import path
from .views import CarDataView, CarPricePredictionView

urlpatterns = [
    path('car_data/', CarDataView.as_view(), name='car_data'),
    path('predict_price/', CarPricePredictionView.as_view(), name='predict_price'),
]