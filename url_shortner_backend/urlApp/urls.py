from django.urls import path , include
from rest_framework.routers import DefaultRouter
from .views import CompressUrlViewset , UrlRedirectView


router = DefaultRouter()

router.register(
    "urls",
    CompressUrlViewset,
    basename="urls"
)

urlpatterns = []    
urlpatterns += router.urls

urlpatterns += [
    path('<str:short_code>/',UrlRedirectView.as_view() ),
]

