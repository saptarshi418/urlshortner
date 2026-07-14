from rest_framework import serializers
from .models import CompressUrl
from datetime import timedelta
from urlApp.services.codeGenerator import CodeGenerator
from django.utils import timezone
from django.db import transaction
import datetime


class CompressUrlSerializer(serializers.ModelSerializer):
    short_code = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    class Meta:
        model = CompressUrl
        fields = ['id','user','original_url' ,'short_code' , 'expiry_date']
        read_only_fields = ["user" , 'expiry_date']

    
    def create(self, validated_data):
        print(repr(validated_data.get("short_code")))
        request = self.context["request"]

        validated_data["user"] = request.user
        validated_data["expiry_date"] = timezone.now() + timedelta(days=30)
        validated_data['max_clicks'] = 0
        validated_data['user_request_speacial'] = False

        requested_code = validated_data.get("short_code")
        if requested_code :          #checks the requested code 

            if request.user.requested_code_count >= 2:
                raise serializers.ValidationError({'details':'Max requested code created.'})
            
            status, value = CodeGenerator.check_requested_code(requested_code)
            if not status:
                raise serializers.ValidationError(
                    {"short_code": value}
                )
            validated_data["short_code"] = value
            validated_data['user_request_speacial'] = True
            

        else:
            status, value = CodeGenerator.generate_short_code()     #this one is for normally generate the code 

            if not status:
                raise serializers.ValidationError(value)

            validated_data["short_code"] = value

        with transaction.atomic():
            url = CompressUrl.objects.create(**validated_data)     #for consistancy that either both happens or none happens 
            if validated_data['user_request_speacial']:
                request.user.requested_code_count += 1
                request.user.save(update_fields = ['requested_code_count'])

        return url


class UpdateUrlSerializers(serializers.ModelSerializer):
    original_url = serializers.URLField(required=False , allow_null = True)
    expiry_increase_days = serializers.IntegerField(required=False , allow_null = True , min_value=0 , max_value= 15 , )
    class Meta:
        model = CompressUrl
        fields = ['user','original_url', 'short_code','expiry_date' , 'expiry_increase_days']
        read_only_fields = ['user','short_code', 'expiry_date']

    def update(self, instance, validated_data):
        

        org_url = validated_data.get("original_url")
        exp_inc_days = validated_data.get("expiry_increase_days")

        if not instance.is_active or instance.expiry_date < timezone.now().date():
            raise serializers.ValidationError(
                "This URL has expired and cannot be edited."
            )

        if org_url is None and exp_inc_days is None :
            raise serializers.ValidationError('At least one field should be change .')

       
        if instance.is_edited :
            raise serializers.ValidationError("This URL has already been edited.")
        
        if org_url is not None:
            instance.original_url= org_url

        if exp_inc_days is not None :
            instance.expiry_increase_days = exp_inc_days
            instance.expiry_date= instance.expiry_date+timedelta(days=exp_inc_days)
        
        instance.is_edited = True
        instance.save()
        

        return instance
    
  

class AnnonymusCompressUrlSerializer(serializers.ModelSerializer):
    short_code = serializers.CharField(read_only=True)
    class Meta:
        model= CompressUrl
        fields = ['original_url' , "short_code"]
    
    def create(self, validated_data):
        validated_data["expiry_date"] = timezone.now() + timedelta(days=15)
        validated_data['max_clicks'] = 0
        validated_data['user_request_speacial'] = False
        status, value = CodeGenerator.generate_short_code()

        if not status:
            raise serializers.ValidationError(value)

        validated_data["short_code"] = value

        return CompressUrl.objects.create(**validated_data)



