from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = [
            "name",
            "price",
            "year",
            "origin",
            "registration_date",
            "technical_inspection",
            "first_hand",
            "mileage",
            "fuel_type",
            "transmission",
            "num_doors",
            "num_seats",
            "power",
            "co2_emission",
            "length",
            "trunk_volume",
            "critair_rating",
            "combined_consumption",
        ]
