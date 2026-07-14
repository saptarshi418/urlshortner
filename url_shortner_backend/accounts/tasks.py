from django.core.mail import BadHeaderError 
from time import sleep
from celery import shared_task
from templated_mail.mail import BaseEmailMessage



@shared_task
def send_otp_to_mail(email , otp, email_purpose):
    try:
        payload = {
             "email":email ,
             "otp": otp ,
             "purpose": email_purpose
            }
        print(payload)
        message = BaseEmailMessage(
            template_name='email_template/email.html',
            
            context={'data': payload}
        )
         
        

        message.send([email])

    except BadHeaderError:
        pass


@shared_task
def send_password_reset_email(context, to_email):
    message = BaseEmailMessage(
        template_name="email_template/pass_reset.html",
        context=context,
    )

    message.send([to_email])

