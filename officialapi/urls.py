from re import A
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'official'
router = DefaultRouter()
router.register('collectprofiles',views.CollectProfileAdminViewset),
router.register('VerifiedProfiles',views.PendingVerfication)
router.register('Successstories',views.SuccessStoriesView)
router.register('testimonial',views.TestimonialView)

urlpatterns = [
    path('profile/',include(router.urls)),
    path('login/',views.CreateTokenView.as_view()),
    path('logout/',views.Logout.as_view()),
    path('check_login_user/',views.CheckLoginUser.as_view()),
    path('user-data/',views.Dashboard.as_view()),
    path('uncompleted-profiles/',views.UncompletesProfiles.as_view()),
]