#urlApp/tasks.py

from time import sleep
from celery import shared_task
from django.db import connection

@shared_task
def deactive_expire_url():

    with connection.cursor() as cursor:        
        cursor.execute("""
                UPDATE urlApp_compressurl
                SET is_active = FALSE WHERE is_active = TRUE  AND expiry_date <CURDATE();                      

            """ )