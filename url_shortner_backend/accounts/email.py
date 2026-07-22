from djoser.email import PasswordResetEmail
from accounts.tasks import send_password_reset_email



class CustomPasswordResetEmail(PasswordResetEmail):     #custom mail send class 

    template_name = "email_template/pass_reset.html"   #redifned the template location

    def send(self, to, *args, **kwargs):
        context = self.get_context_data()

        payload = {
            "uid": context["uid"],
            "token": context["token"],
            "domain": context["domain"],
            "protocol": context["protocol"],
            "user_email": context["user"].email,
        }

        send_password_reset_email.delay(payload, to[0])