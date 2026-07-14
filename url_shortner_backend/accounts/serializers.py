from rest_framework import serializers
from djoser.serializers import UserSerializer as BaseUserSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from django.core.cache import cache, caches
from .models import User
from .tasks import send_otp_to_mail
from urlshortner.otp_handler import OtpHandler
import redis

class RegisterUserSerializer(serializers.Serializer):
    first_name = serializers.CharField( max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone_number = PhoneNumberField()
    email = serializers.EmailField()
    password = serializers.CharField(max_length=50 , write_only =True)
    confirm_password = serializers.CharField(max_length=50 , write_only =True)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError('password and confirm password does not matched') 
        
        user = User.objects.filter(email = attrs['email']).first()
        if user and user.is_verified:
            raise serializers.ValidationError("Email is alrady registered")

        user = User.objects.filter(phone_number = attrs['phone_number']).first()
        if user and user.is_verified:
            raise serializers.ValidationError("Phone Number is alrady registered")

        return attrs
    
    def save(self, **kwargs):
        validated_data = self.validated_data.copy()

        validated_data.pop("confirm_password")
        password = validated_data.pop("password")
        email = validated_data['email']

        user = User(**validated_data)
        user.set_password(password)

        otp = OtpHandler.generate(email)

        send_otp_to_mail.delay(
            email=email,
            otp=otp,
            email_purpose="register"
        )                                                   #send this to celery wokers 
        
        registration_cache = caches['registration_cache']
        registration_cache.set(
            f"reg:{email}",
            {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone_number": str(user.phone_number),
                "password": user.password,   # already hashed
            },
            timeout=8 * 60,
        )                                                   # initally store in the 
        return validated_data
    

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length= 6)

    def validate(self, attrs):
        email = attrs['email']
        otp = attrs['otp']
        success, message = OtpHandler.verify(email , otp)

        if not success:
            raise serializers.ValidationError(message)
        return attrs

    def create(self, validated_data):

        email = validated_data['email']
        registration_cache = caches['registration_cache']
        user_data   = registration_cache.get(f'reg:{email}')

        if user_data is None:
            raise  serializers.ValidationError("Registration Data Expired. Try Again...")             
        
        user = User.objects.create_user(
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            email=user_data["email"],
            phone_number=user_data["phone_number"],
            
            is_verified = True
        )
        user.password =user_data["password"]
        user.save()

        registration_cache.delete(f"reg:{email}")

        return user
    

    

    

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['first_name', 'last_name','email' ,'phone_number']
