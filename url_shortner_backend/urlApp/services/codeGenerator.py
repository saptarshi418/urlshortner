import string
import random
import re
from urlApp.models import CompressUrl

class CodeGenerator():

    @staticmethod
    def generate_short_code():
        chars = string.ascii_letters + string.digits  #  total_char ^ 6 times 
        

        loop_count = 0
        while True:
            code = ''.join(random.choices(chars,k =6))
            saved_code = CompressUrl.objects.filter(short_code =code ).exists()
            loop_count+=1

            if not saved_code :
                return True , code 
            if loop_count >= 800:
                return False , "Code Check Exceeded. Try after some time ."

    @staticmethod
    def check_requested_code(requested_code):
            requested_code = requested_code.strip()
            
            if not re.fullmatch(r"[A-Za-z0-9]{4,6}", requested_code):   #validate data only that allowed chars 
                return False, "Invalid short code."
            

            saved_code = CompressUrl.objects.filter(short_code =requested_code ).exists()
            if saved_code :
                return False , "The code is already taken."
            
            return True , requested_code

        
            
 
            
  