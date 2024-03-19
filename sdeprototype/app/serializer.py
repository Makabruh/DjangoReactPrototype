from rest_framework import serializers
from . models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['userName', 'password', 'userLevel', 'email']

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['userName', 'password']