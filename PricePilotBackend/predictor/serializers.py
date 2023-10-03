from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    """
    Serializer class for converting Car model instances into JSON format and vice versa.
    Provides validation and deserialization of input data, and serialization of validated data into JSON.

    Example Usage:
    car = Car(name="Toyota Camry", price=25000, year=2020, origin="Japan", registration_date="2020-01-01", technical_inspection=True, first_hand=True, mileage=5000, fuel_type="Petrol", transmission="Automatic", num_doors=4, num_seats=5, power="150hp", co2_emission=120.5, length=4.8, trunk_volume=500, critair_rating=2, combined_consumption="7.5L/100km")
    serializer = CarSerializer(car)
    json_data = serializer.data
    print(json_data)
    deserialized_car = CarSerializer(data=json_data)
    if deserialized_car.is_valid():
        car_instance = deserialized_car.save()
        print(car_instance)

    Fields:
    - name: CharField representing the name of the car.
    - price: FloatField representing the price of the car.
    - year: IntegerField representing the year of the car.
    - origin: BooleanField representing the origin of the car.
    - registration_date: DateField representing the registration date of the car.
    - technical_inspection: BooleanField representing whether the car has passed the technical inspection.
    - first_hand: BooleanField representing whether the car is a first-hand car.
    - mileage: FloatField representing the mileage of the car.
    - fuel_type: IntegerField representing the fuel type of the car.
    - transmission: IntegerField representing the transmission type of the car.
    - num_doors: IntegerField representing the number of doors of the car.
    - num_seats: IntegerField representing the number of seats of the car.
    - power: IntegerField representing the power of the car.
    - co2_emission: FloatField representing the CO2 emission of the car.
    - length: FloatField representing the length of the car.
    - critair_rating: IntegerField representing the Crit'Air rating of the car.
    - combined_consumption: FloatField representing the combined fuel consumption of the car.
    """

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
            "critair_rating",
            "combined_consumption",
        ]


class UserInputSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.FloatField()
    year = serializers.IntegerField()
    origin = serializers.BooleanField()
    registration_date = serializers.DateField()
    technical_inspection = serializers.BooleanField()
    first_hand = serializers.BooleanField()
    mileage = serializers.FloatField()
    fuel_type = serializers.IntegerField()
    transmission = serializers.IntegerField()
    num_doors = serializers.IntegerField()
    num_seats = serializers.IntegerField()
    power = serializers.IntegerField()
    co2_emission = serializers.FloatField()
    length = serializers.FloatField()
    critair_rating = serializers.IntegerField()
    combined_consumption = serializers.FloatField()


class CarNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['name']