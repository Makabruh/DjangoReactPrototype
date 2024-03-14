from django.db import models

# Create your models here.
class React(models.Model):
    userName = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    userLevel = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
