from djongo import models

class CarBrand(models.Model):
    """
    Represents a car brand.

    Fields:
    - name: A character field with a maximum length of 100 characters. It stores the name of the car brand.
    """

    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)

    def __str__(self):
        """
        Returns the name of the car brand.
        """
        return self.name

class Car(models.Model):
    """
    Represents a car object with information about the car's brand, model, year, kilometers, and number of seats.
    """

    _id = models.ObjectIdField()
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    kilometers = models.FloatField()
    num_seats = models.PositiveIntegerField()

    def __str__(self):
        """
        Returns a string representation of the car object, including the brand, model, and year.
        """
        return f'{self.brand} {self.model} - {self.year}'

class UserInput(models.Model):
    """
    Represents user input for a car, including the brand, model, year, kilometers, and number of seats.
    """

    _id = models.ObjectIdField()
    brand = models.ForeignKey(CarBrand, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    kilometers = models.FloatField()
    num_seats = models.PositiveIntegerField()

    def __str__(self):
        """
        Returns a string representation of the user input, including the brand, model, and year.
        """
        return f'User Input: {self.brand} {self.model} - {self.year}'
