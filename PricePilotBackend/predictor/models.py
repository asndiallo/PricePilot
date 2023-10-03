from djongo import models


class Car(models.Model):
    """
    Represents a car object with information about the car's brand, model, year, kilometers, and number of seats.
    """

    _id = models.ObjectIdField(default=None)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    year = models.PositiveIntegerField()
    origin = models.BooleanField(default=0)
    registration_date = models.DateField()
    technical_inspection = models.BooleanField(default=0)
    first_hand = models.BooleanField()
    mileage = models.FloatField()
    fuel_type = models.PositiveBigIntegerField(default=0)
    transmission = models.PositiveBigIntegerField(default=0)
    num_doors = models.PositiveIntegerField()
    num_seats = models.PositiveIntegerField()
    power = models.PositiveIntegerField(default=0)
    co2_emission = models.FloatField()
    length = models.FloatField()
    critair_rating = models.IntegerField()
    combined_consumption = models.FloatField(default=0.0)

    def __str__(self):
        """
        Returns a string representation of the car object, including the brand, model, and year.
        """
        return f"{self.name} - {self.year}"
