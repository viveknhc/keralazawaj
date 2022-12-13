from datetime import date

from officialapi.serializer import EditSuccessStories
from officialapi.serializer import EditTestimonal
from officialapi.serializer import SuccessStories
from officialapi.serializer import Testimonal
from officialapi.serializer import UncompletedUser
from officialapi.serializer import UpdateUserVerification
from officialapi.serializer import UserVerificationSerializer
from user.models import UserImage
from user.serializers import CollectUserDetailedSerializer
from web.models import Story
from web.models import Testimonial

from . import serializer
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView


# Create your views here.


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""

    serializer_class = serializer.AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request, format=None):
        self, request.user.auth_token.delete()
        return Response({"true": "msg"})


class CollectProfileAdminViewset(viewsets.ModelViewSet):
    """Manage recipes in the database"""

    serializer_class = CollectUserDetailedSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        gender = self.request.query_params.get("gender")
        return self.queryset.filter(user_profile__gender=gender)

    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == "retrieve":
            print("ffff")
            return CollectUserDetailedSerializer

        return self.serializer_class

    def update(self, request, *args, **kwargs):
        print(self.request.POST)


class CheckLoginUser(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request):
        msg = ""
        user = get_user_model()
        userId = request.user.id
        checkUser = user.objects.get(id=userId)
        if checkUser.is_superuser:
            msg = True
        else:
            msg = False
        return Response({"msg": msg})


class PendingVerfication(viewsets.ModelViewSet):
    serializer_class = UserVerificationSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self):

        return self.queryset.all()

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == "update":
            return UpdateUserVerification

        return UserVerificationSerializer


class SuccessStoriesView(viewsets.ModelViewSet):
    serializer_class = SuccessStories
    queryset = Story.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self):
        return super().get_queryset()

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == "update":
            return EditSuccessStories

        return SuccessStories


class TestimonialView(viewsets.ModelViewSet):
    serializer_class = Testimonal
    queryset = Testimonial.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self):
        return super().get_queryset()

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action == "update":
            return EditTestimonal

        return Testimonal


class Dashboard(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request, format=None):
        male = UserImage.objects.filter(user_profile__gender="Male").prefetch_related("user_profile_set").count()
        female = UserImage.objects.filter(user_profile__gender="Female").prefetch_related("user_profile_set").count()
        todayRegistration = UserImage.objects.filter(date=str(date.today())).count()
        totalRegistration = UserImage.objects.all().count()
        data = {"male": male, "female": female, "total": totalRegistration, "todays_registration": todayRegistration}
        return Response(data)


class UncompletesProfiles(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request, format=None):
        userList = []
        regProfiles = UserImage.objects.all()
        for i in regProfiles:
            userList.append(i.user.id)
        totalProfiles = get_user_model().objects.filter(is_superuser=False).exclude(id__in=userList)
        serilizer = UncompletedUser(totalProfiles, many=True)
        return Response(serilizer.data)

    def delete(self, request, format=None):
        userId = request.POST["id"]
        get_user_model().objects.get(id=userId).delete()
        return Response({"msg": True})
