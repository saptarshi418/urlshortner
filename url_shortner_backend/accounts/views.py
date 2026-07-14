from django.shortcuts import render
from rest_framework import status , generics , viewsets
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.generics import CreateAPIView

from .models import *
from .serializers import *

# Create your views here.

class RegisterViewSet(CreateAPIView):
    serializer_class = RegisterUserSerializer

class VerifyOtpViewSet(APIView):

    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "OTP verified successfully"},
            status=status.HTTP_200_OK,
        )