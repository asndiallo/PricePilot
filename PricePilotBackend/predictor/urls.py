from django.urls import path
from .views import CarBrandListCreateView, CarListCreateView, UserInputListCreateView

urlpatterns = [
    path('carbrands/', CarBrandListCreateView.as_view(), name='carbrand-list-create'),
    path('cars/', CarListCreateView.as_view(), name='car-list-create'),
    path('userinputs/', UserInputListCreateView.as_view(), name='userinput-list-create'),
]