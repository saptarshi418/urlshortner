from django.db import models
from django.conf import settings

# Create your models here.

class CompressUrl(models.Model):
    user =  models.ForeignKey(settings.AUTH_USER_MODEL , null=True , blank=True , on_delete=models.CASCADE , related_name='compress_urls')
    original_url = models.URLField()
    short_code = models.CharField(max_length=8 , unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    expiry_date = models.DateField()
    clicks_counts = models.PositiveIntegerField(default=0)
    max_clicks = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    user_request_speacial = models.BooleanField()
    is_edited = models.BooleanField(default=False)
    is_expiry_increased = models.BooleanField(default=False)
    expiry_increase_days = models.PositiveSmallIntegerField(default=0)

    class Meta:
        indexes=[
            models.Index(fields=["expiry_date"]),    #did indexing for the celery workrs
        ]    


    def __str__(self):
        return self.short_code
