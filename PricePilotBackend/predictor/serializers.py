from rest_framework import serializers
from .models import CarBrand, Car, UserInput

class CarBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarBrand
        fields = '__all__'

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = '__all__'
