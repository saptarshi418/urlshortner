
import random
from django.core.cache import cache , caches

class OtpHandler:
    otp_cache = caches['otp_cache']

    @staticmethod
    def generate(email):
        otp =str(random.randint(100000, 999999))
        
        
        OtpHandler.otp_cache.set(
            f'otp:{email}',
            otp,
            timeout= 7*60 
        )
        return otp 
    
    @staticmethod
    def verify(email , otp):
        stored_otp = OtpHandler.otp_cache.get(f"otp:{email}")
        
        if stored_otp is None:
            return False ,"OTP Expired"

        if str(otp) != stored_otp :
            return False , "Invalid OTP"
        
        OtpHandler.otp_cache.delete(f"otp:{email}")
        return True , "OTP Verified"
        
        
         
