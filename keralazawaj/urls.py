from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('web.urls',namespace='web')),
    path('api/user/',include('user.urls',namespace='user')),
    path('api-auth/', include('rest_framework.urls')),
    path('official/',include('official.urls',namespace='official')),
    path('official/api/',include('officialapi.urls', namespace = 'officialapi')),

    path('tinymce/', include('tinymce.urls')),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Keralazawaj Administration"
admin.site.site_title = "Keralazawaj Admin Portal"
admin.site.index_title = "Welcome to Keralazawaj Admin Portal"
