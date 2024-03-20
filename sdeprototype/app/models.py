from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class UserInfoManager(BaseUserManager):
    def create_user(self, username, password=None):
        print("in the userinfomanager")
        if not username:
            raise ValueError('A username is required')
        if not password:
            raise ValueError('A password is required')
        user = self.model(username=username)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, username, password=None):
        if not username:
            raise ValueError('A username is required')
        if not password:
            raise ValueError('A password is required')
        user = self.create_user(username, password)
        user.is_superuser = True
        user.save()
        return user


class UserInfo(AbstractBaseUser, PermissionsMixin):
    #user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    userLevel = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    # Using this to check the makemigrations command - it is not working
    company = models.CharField(max_length=100)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = UserInfoManager()
    def __str__(self):
        return self.username

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