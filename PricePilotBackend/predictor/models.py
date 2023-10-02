from djongo import models

class Car(models.Model):
    """
    Represents a car object with information about the car's brand, model, year, kilometers, and number of seats.
    """

    _id = models.ObjectIdField(default=None)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    year = models.PositiveIntegerField()
    origin = models.CharField(max_length=100, default='France')
    registration_date = models.DateField()
    technical_inspection = models.BooleanField(default=False)
    first_hand = models.BooleanField()
    mileage = models.FloatField()
    fuel_type = models.CharField(max_length=100)
    transmission = models.CharField(max_length=100)
    num_doors = models.PositiveIntegerField()
    num_seats = models.PositiveIntegerField()
    power = models.CharField(max_length=100)
    co2_emission = models.FloatField()
    length = models.FloatField()
    trunk_volume = models.FloatField()
    critair_rating = models.IntegerField()
    combined_consumption = models.CharField(max_length=100)

    def __str__(self):
        """
        Returns a string representation of the car object, including the brand, model, and year.
        """
        return f'{self.brand} {self.model} - {self.year}'
