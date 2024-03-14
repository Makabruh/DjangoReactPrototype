from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import UserInfo
from . serializer import ReactSerializer

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