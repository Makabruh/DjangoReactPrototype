from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import UserInfo
from . serializer import *

class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [{
            'userName': output.userName,
            'password': output.password,
            'userLevel': output.userLevel,
            'email': output.email
            }
            for output in UserInfo.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class UserRegistrationAPIView(APIView):
    def post(self, request):
        #post means that this method handles post requests to the url that calls this view
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid():
            #This if checks that the data is valid according to the serializer
            username = serializer.validated_data.get('userName')
            #Get the username from the data
            if UserInfo.objects.filter(userName=username).exists():
                #Check if the username is free against usernames in the database
                return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        #Failing at the if
        if serializer.is_valid():
            username = serializer.validated_data.get('userName')
            password = serializer.validated_data.get('password')
            console.log('here')
            user = authenticate(username=username, password=password)
            if user is not None:
                # User login is correct
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            else:
                # User login is incorrect
                return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            # Invalid serializer data
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
