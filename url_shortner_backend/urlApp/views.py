from django.shortcuts import render , get_object_or_404, redirect
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView 
from .serializers import CompressUrlSerializer , AnnonymusCompressUrlSerializer , UpdateUrlSerializers
from .models import CompressUrl
from urlApp.services.rate_limiting import RateLimiter
from urlApp.services.get_ip import get_client_ip
from urlApp.services.redis_client import url_redis , redirect_userdata_redis


# Create your views here.


class CompressUrlViewset(ModelViewSet):
    http_method_names =[
        "get",
        "post",
        "patch",
        "delete",
        "head",
        "options",
    ]
    
    def get_permissions(self):  # only create allow for non auth user
        if self.action == "create":
            return [AllowAny()]

        return [IsAuthenticated()]
    

    def get_serializer_class(self):
        if self.action=="partial_update":
            return UpdateUrlSerializers

        if self.request.user.is_authenticated:
            return CompressUrlSerializer
        return AnnonymusCompressUrlSerializer
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return CompressUrl.objects.filter(user = self.request.user)
        return CompressUrl.objects.none()
    
    

    def create(self, request, *args, **kwargs):
        # ip = get_client_ip(request)
        if not self.request.user.is_authenticated:
            found , ip = get_client_ip(request)
            if not found:
                return Response({"detail": "Unable to verify request origin."}, status=status.HTTP_400_BAD_REQUEST)
            
        if self.request.user.is_authenticated:
            rate_remain = RateLimiter.allow_logged_user(request.user)
        else:
            rate_remain = RateLimiter.allow_anonymous(ip)
        
        if not rate_remain :
            return Response({'detalis':'Limit Exeeded...'} , status=status.HTTP_429_TOO_MANY_REQUESTS)

        return super().create(request, *args, **kwargs)
   


class UrlRedirectView(APIView):
    
    def get(self , request, short_code):

        #ratelimiting for redirect 
        found , user_ip = get_client_ip(request)
        if not found:
            return Response({"details":"user is not authorized"}, status=status.HTTP_400_BAD_REQUEST)
        user_key = f'redirectUser:{user_ip}'
        count= redirect_userdata_redis.incr(user_key)

        if count ==1:
            redirect_userdata_redis.expire(user_key , 60)

        if count >20:
            return Response({'details':"Rate Limit Exceeded. Try again later."} , status=status.HTTP_429_TOO_MANY_REQUESTS)


        #store recent url in redis cache
        key = f"short_code:{short_code}"
        redis_long_url = url_redis.get(key)
        if redis_long_url:
            return redirect(redis_long_url)
        
        data = get_object_or_404(
            CompressUrl,
            short_code=short_code,
            is_active = True
        )
        url_redis.set(key , data.original_url , ex=60*60*2)
        return redirect(data.original_url)
        

        

