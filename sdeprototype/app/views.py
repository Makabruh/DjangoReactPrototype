from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . models import UserInfo
from . serializer import *
from django.contrib.auth.hashers import check_password

from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAuthenticated

class ReactView(APIView):

    serializer_class = RegisterSerializer

    def get(self, request):
        output = [{
            'username': output.username,
            'password': output.password,
            'userLevel': output.userLevel,
            'email': output.email
            }
            for output in UserInfo.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class UserRegistrationAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    #This view only has a post method as it is registration by creating a user
    def post(self, request):
        #post means that this method handles post requests to the url that calls this view
        
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            #raise_exception=True inside the brackets
            #This if checks that the data is valid according to the serializer
            
            username = serializer.validated_data.get('username')
            #Get the username from the data
            password = serializer.validated_data.get('password')
            
            if UserInfo.objects.filter(username=username).exists():
                #Check if the username is free against usernames in the database
                return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
            
            #The password needs to be hashed when stored in order to authenticate on login
            hashed_password = make_password(password)
            serializer.validated_data['password'] = hashed_password

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    #Also accessed by anyone and uses session authentication
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        #Get the username from the payload
        username = request.data.get('username')
        browserAddress = True
        pastBrowserAddress = True
        # LOGIC - get the mac address or browser address - TODO
        # LOGIC - get the past address from the database / get all past addresses
        # Provided a browser address is found
        if browserAddress is not None:
            #Find the specific user object with that username
            user = UserInfo.objects.filter(username=username)
            #If there is a user
            if user is not None:
                #Instantiate the serializer
                serializer = LoginSerializer(data=request.data)
                #Check if the data is valid according to the serializer
                if serializer.is_valid(raise_exception=True):
                    #Check the current address - is it the same as the last login attempt
                    if (browserAddress == pastBrowserAddress):
                        # How would you be able to store a number against this ???
                        # I think it will have to be stored in the database
                        #Use the check_user function in the serializer
                        user = serializer.check_user(request.data)
                        #CSRF token ??
                        #responseData['csrf_token'] = get_token(request)
                        csrf_token = get_token(request)
                        return Response({"csrf_token": csrf_token}, status=status.HTTP_200_OK)
                    else:
                        #Set browser address as the new current address
                        #Use the check_user function in the serializer
                        user = serializer.check_user(request.data)
                        # Will need to be 2FA'd - TODO
                        #CSRF token ??
                        #responseData['csrf_token'] = get_token(request)
                        csrf_token = get_token(request)
                        return Response({"csrf_token": csrf_token}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Incorrect data format"}, status=status.HTTP_400_BAD_REQUEST)        
            else:
                return Response({"message": "Username not in database"}, status=status.HTTP_400_BAD_REQUEST)
        #If unable to find Mac Address or Browser Address
        else:
            return Response({"message": "No Browser Located"}, status=status.HTTP_400_BAD_REQUEST)
        
    
    

#From tutorial
class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
class QueryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        output = [{
            'username': output.username,
            'password': output.password,
            'userLevel': output.userLevel,
            'email': output.email
            }
            for output in UserInfo.objects.all()]
        return Response(output)
    
class QueryApprenticeView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        #Filter for users with userLevel 'Apprentice'
        users = UserInfo.objects.filter(userLevel='Apprentices')
        
        #Output dictionairy of only usernames
        output = [{'username': user.username} for user in users]
        
        return Response(output)
    
class QueryInput(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        print("Reached post")
        #Get userLevelInput from request data
        print(request.data)
        userLevelInput = request.data.get('userLevel')
        print(userLevelInput)
        
        #Filter users based on userLevelInput
        users = UserInfo.objects.filter(userLevel=userLevelInput)
        
        #Output dictionairy of only usernames
        output = [{'username': user.username} for user in users]
        
        return Response(output)
    
class UsernameCheck(APIView):
    #Also accessed by anyone and uses session authentication
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        #Get the username from the payload
        username = request.data.get('username')
        #Find the specific user object with that username
        user = UserInfo.objects.filter(username=username)
        #If there is a user
        if user is not None:
            return Response("Good good", status=status.HTTP_200_OK)
        else:
            return Response({"message": "Username not in database"}, status=status.HTTP_400_BAD_REQUEST)

class LockAccount(APIView):
    #If too many password attempts have been made, lock account
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        return Response(status=status.HTTP_200_OK)