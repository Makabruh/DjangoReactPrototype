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
        data = request.data
        # These validations can be added when created in ./validations
        # assert validate_username(data)
        # assert validate_password(data)
        serializer = LoginSerializer(data=data)
        #If everything is fine, log them in
        if serializer.is_valid(raise_exception=True):
            print(data)
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


    # def post(self, request):
    #     #serializer = LoginSerializer(data=request.data)
    #     #username = request.data.get('userName')
    #     #password = request.data.get('password')
    #     username = "admin"
    #     password = "test"
            
    #     if not username:
    #         #Check if nothing has been entered in the username field
    #         return Response({"message": "Username cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
    #     #If the username already exists in the database
    #     if UserInfo.objects.filter(username=username).exists():
            
    #         #return Response({"message": "Username in database"}, status=status.HTTP_200_OK)
    #         print("Username present")
    #         #This is not going to work as we need to send it back to React that the user can enter another password

    #         passwordCount = 3
    #         #Check Password - 3 Tries
    #         print("First Password Check")
    #         #If the username exists, check the password
    #         #HERE WE NEED TO FIND THE ID for ID.PASSWORD
    #         if UserInfo.objects.filter(password=password).exists():
    #             #check_password(password, password)
    #             #If the password is correct
    #             print("Password Successful")
    #             return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    #         elif passwordCount > 0:
    #             #If the password is incorrect
    #             print("Password Not Successful")
    #             passwordCount = passwordCount - 1
    #             return Response({"message": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)
    #         else:
    #             #Password count has been reduced to 0 because of too many incorrect attempts
    #             print("Too many incorrect passwords")
    #             return Response({"message": "Too many incorrect passwords"}, status=status.HTTP_400_BAD_REQUEST)


    #     #If the username does not exist in the database
    #     else:
    #         return Response({"message": "Username cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

#From tutorial
class UserLogout(APIView):
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