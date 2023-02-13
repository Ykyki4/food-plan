from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import TagView

router = DefaultRouter()

router.register(r'tags', TagView, 'tag')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('api/', include(router.urls))
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
