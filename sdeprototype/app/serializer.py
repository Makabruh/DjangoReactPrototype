from rest_framework import serializers
from . models import *
from django.contrib.auth import get_user_model, authenticate

#UserModel = get_user_model()
#You could use this instead of the self-made UserInfo model

class RegisterSerializer(serializers.ModelSerializer):
    # The serializer for creating a user
    class Meta:
        model = UserInfo
        fields = ['username', 'password', 'userLevel', 'email']
    # def create(self, clean_data):
    #     user_obj = UserInfo.objects.create_user(username='username', password='password')
    #     print("post first user_obj")
    #     user_obj.email = clean_data['email']
    #     user_obj.userLevel = clean_data['userLevel']
    #     user_obj.save()
    #     return user_obj

class LoginSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = UserInfo
    #     fields = ['username', 'password']

    # The serializer for logging in a user
    username = serializers.CharField()
    password = serializers.CharField()
    
    class Meta:
        model = UserInfo
        fields = ['username', 'password']

    def check_user(self, clean_data):
        username = clean_data.get('username')
        password = clean_data.get('password')
        #Failing at the authenticate stage - error 'AnonymousUser' object has no attribute '_meta'
        # This authenticate statement is returning null/none which means that this passes in to the login function
        user = authenticate(username=username, password=password)
        #clean_data['password']
        if not user:
            print("User not found")
            #raise ValidationError('User not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['username']