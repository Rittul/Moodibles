from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializer import UserSerializer,MoodSerializer
from django.db.models import Avg, Count
from .models import Mood

class Registerview(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    
    
class Loginview(APIView):
    permission_classes=[permissions.AllowAny]
    
    def post(self,req):
        # print("Request Data:", req.data)
        username=req.data.get("username")
        password=req.data.get("password")
        user=User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh=RefreshToken.for_user(user)
            return Response({"refresh": str(refresh),"access": str(refresh.access_token)})
        return Response({"error": "Invalid credentials"},status=400)
    
    
class MoodView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print("Received data:", request.data)  # Log incoming data

        serializer = MoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            print("Mood saved successfully:", serializer.data)
            return Response(serializer.data, status=201)

        print("Validation errors:", serializer.errors)  # Log validation errors
        return Response(serializer.errors, status=400)

    def get(self, request):
        moods = Mood.objects.filter(user=request.user).order_by('-timestamp')
        serializer = MoodSerializer(moods, many=True)
        return Response(serializer.data)