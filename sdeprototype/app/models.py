from django.db import models

# Create your models here.
class UserInfo(models.Model):
    # Maybe need to change 'userName' to 'username'
    userName = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    userLevel = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

class ApprenticeshipStandard(models.Model):
    standardName = models.CharField(max_length=300)
    standardReference = models.CharField(max_length=6)
    STANDARD_LEVEL_CHOICES = (
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
        ('5', '5'),
        ('6', '6'),
    )
    standardLevel = models.CharField(max_length=1, choices=STANDARD_LEVEL_CHOICES)