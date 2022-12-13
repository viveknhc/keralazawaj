from datetime import datetime
import json
import re
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.core.exceptions import AppRegistryNotReady, ValidationError
from django.db.models.fields import CharField
from django.db.models.query import QuerySet
from django.db.utils import Error
from django.forms.models import model_to_dict
from django.http import Http404, request, response
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, mixins, serializers, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from dateutil.relativedelta import relativedelta
import string 
import random
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
# from bismillaDjango.web.views import register
from .models import (PartnerPreference, Register, User, UserFamily, UserImage, LikedProfile, PassedProfile,
                     UserLocation, UserProfession, UserProfile,Chat,Message,SubscripedUser)

from .serializers import (AuthTokenSerializer, ChatUserSerializer, CollectUserDetailedSerializer,
                          CollectUserToDashboardSerializer, EditProfilePIcSerializer, LikedProfileSerializer,
                          PartnerPrefenceSerializer, RegisterSerializer, PassedProfileSerializer, SubscribedusersSerializer,
                          UpdatePartnerPreferenceSerializer,
                          UserEditSerializer, UserFamilyEditSerializer,
                          UserFamilySerializer, UserImageForOneImageSerializer,
                          UserImageForTwoImageSerializer, UserImageSerializer,
                          UserImageSkipSerializer, UserLocationEditSerializer,
                          UserLocationSerializer, UserProfessionEditSerializer,
                          UserProfessionSerializer, UserProfileEditSerializer,
                          UserProfileSerializer, UserSerializer,GetUserImageOne,MessageSerializer,CollectUserSkippedProfiles)

from. import models
from django.db import IntegrityError
from django.http.response import (Http404, HttpResponse,
                                  HttpResponseNotAllowed, JsonResponse)
from django.utils.translation import gettext as _
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.response import Response

from .filterprofile import *

import razorpay


class RegisterViewList(APIView):
    """Regiter Create """
    queryset = Register.objects.all()
    serializer_class  = RegisterSerializer

    def post(self, request, format=None):   
        serializer = RegisterSerializer(data=request.data)
        queryset = Register.objects.filter(mobile_number = request.data['mobile_number'])
        if queryset.exists():
            data=Register.objects.get(mobile_number = request.data['mobile_number'])
            dataDict={'id':data.id,'profile_for':data.profile_for,'name':data.name,'mobile_number':data.mobile_number}
            return Response(dataDict, status=status.HTTP_208_ALREADY_REPORTED)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterDetailedView(APIView):
    """
    Retrive RegiterDetails for authenticated user
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Register.objects.get(pk=pk)
        except Register.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        register = self.get_object(pk)
        serializer = RegisterSerializer(register)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        register = self.get_object(pk)
        serializer = RegisterSerializer(register, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        self,request.user.auth_token.delete()
        return Response({'true':'msg'})

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES



class UserAttrViewSet(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.CreateModelMixin):
    """Base viewset for user owned recipe attributes"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)

class ViewUser(APIView):
    print("View User Function API --------- ")
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,format=None):
        instance = UserImage.objects.get(user_id = request.user.id)
        userImage = GetUserImageOne(instance, many= False)
        data ={
            'name':request.user.full_name,
            'image':userImage.data
        }
        return Response(data)
        
class UserProfileViewSet(viewsets.ModelViewSet):  
    """Manage User Profile in the database"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def perform_create(self, serializer):
        """Create a new object"""
        bismIDPstFix=1000+int(self.request.user.id)
        bismID='BISM'+str(bismIDPstFix)
        serializer.save(user=self.request.user,bismID=bismID)

    def update(self,request, *args, **kwargs,):
        print(self,request.POST)
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action =='update':
            return UserProfileEditSerializer

        if self.action =='retrive':
            return UserProfileSerializer

        return UserProfileSerializer


class UserFamilyViewSet(viewsets.ModelViewSet):
    """Manage ingredients in the database"""
    queryset = UserFamily.objects.all()
    serializer_class = UserFamilySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        """Create a new object"""
        LogedInUser = self.request.user
        serializer.save(user=self.request.user,register=LogedInUser.register,user_profile=LogedInUser.userprofile,user_profession=LogedInUser.userprofession)

    def update(self,request, *args, **kwargs,):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action =='update':
            return UserFamilyEditSerializer

        if self.action =='retrive':
            return UserFamilySerializer

        return UserFamilySerializer

class UserProfessionViewSet(viewsets.ModelViewSet):
    """Manage ingredients in the database"""
    queryset = UserProfession.objects.all()
    serializer_class = UserProfessionSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Create a new object"""
        LogedInUser = self.request.user
        serializer.save(user=self.request.user,register=LogedInUser.register,user_profile=LogedInUser.userprofile)

    def update(self,request, *args, **kwargs,):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action =='update':
            return UserProfessionEditSerializer

        if self.action =='retrive':
            return UserProfessionSerializer

        return UserProfessionSerializer
        


class UserLocationViewSet(viewsets.ModelViewSet):
    """Manage ingredients in the database"""
    queryset = UserLocation.objects.all()
    serializer_class = UserLocationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        """Create a new object"""
        LogedInUser = self.request.user
        serializer.save(user=self.request.user,register=LogedInUser.register,user_profile=LogedInUser.userprofile,user_profession=LogedInUser.userprofession,user_family = LogedInUser.userfamily)

    def update(self,request, *args, **kwargs,):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action =='update':
            return UserLocationEditSerializer
        if self.action =='retrive':
            return UserLocationSerializer
        return UserLocationSerializer


class UserImageViewSet(viewsets.ModelViewSet):
    """Manage tags in the database"""
    queryset = UserImage.objects.all()
    serializer_class = UserImageSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Create a new object"""
        LogedInUser = self.request.user
        serializer.save(user=self.request.user,register=LogedInUser.register,user_profile=LogedInUser.userprofile,user_location = LogedInUser.userlocation,user_profession=LogedInUser.userprofession,user_family=LogedInUser.userfamily)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action =='update':
            return EditProfilePIcSerializer

        return UserImageSerializer    

class CollectProfileDetails(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = CollectUserToDashboardSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.all()
        
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            
            return CollectUserDetailedSerializer

        return self.serializer_class


class CollectProfilesViewset(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = CollectUserToDashboardSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):

        user = self.request.user
        usergender = UserProfile.objects.get(user=user).gender
        gender='Female'
        if usergender=='Female':
                gender='Male'
        
        PassedProfiles = PassedProfile.objects.filter(passed_by_user=self.request.user)
        listofprofiles=[]
        listofViewedProfilesID=[]
        if PassedProfiles.exists():
            for passsed in PassedProfiles:
                listofprofiles.append(UserImage.objects.get(user_profile=passsed.passed_user))
            listofViewedProfilesID=[]
            for viewed in listofprofiles:
                listofViewedProfilesID.append(viewed.id)

        
        return self.queryset.filter(user_profile__gender= gender).exclude(id__in=listofViewedProfilesID)

    
    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return CollectUserDetailedSerializer
        return self.serializer_class


class CollectProfileDetails(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = CollectUserToDashboardSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.all()
        
    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            
            return CollectUserDetailedSerializer

        return self.serializer_class


class LoginUserCheck(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        queryset = UserImage.objects.get(user_id=request.user.id)
        data={
            'id':queryset.id
            }
        return Response(data)

    
class UserDetailsCompleteCheck(APIView):
    def get(self, request, pk, format=None):
        userId = ''
        tokenkey = ''
        user = get_user_model().objects.filter(register_id = pk)
        userProfile = UserProfile.objects.filter(register_id = pk)
        userLocation = UserLocation.objects.filter(register_id = pk)
        userFamily = UserFamily.objects.filter(register_id = pk)
        userProfession = UserProfession.objects.filter(register_id = pk)
        userImage = UserImage.objects.filter(register_id = pk)
        if len(user) > 0:
            for i in user:
                token = Token.objects.get(user = i.id)
                tokenkey = token.key
        else:
            tokenkey = 0
        responsedict={
            'user':user.exists(),
            'userProfile':userProfile.exists(),
            'userLocation':userLocation.exists(),
            'userImage':userImage.exists(),
            'userFamily':userFamily.exists(),
            'userProfession':userProfession.exists(),
            'token':tokenkey
        }
        return Response(responsedict)

class UserDetailsCheck(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request,format=None):
        pk = request.user.id
        regiserId = ''
        user = get_user_model().objects.get(id  = pk)
        if user:
            regiserId = user.register.id
        else:
            regiserId = '0'
        responsedict={
            'id':regiserId,
        }
        return Response(responsedict)


class PartnerPreferenceViewSet(viewsets.ModelViewSet):
    """Manage tags in the database"""
    queryset = PartnerPreference.objects.all()
    serializer_class = PartnerPrefenceSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,) 

    def get_queryset(self):
        return self.queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        """Create a new object"""
        LogedInUser = self.request.user
        if PartnerPreference.objects.filter(user_id=self.request.user).exists():
            raise serializers.ValidationError()
        else:
            serializer.save(user=self.request.user,register=LogedInUser.register,user_profile=LogedInUser.userprofile,user_location = LogedInUser.userlocation,user_family=LogedInUser.userfamily,user_profession=LogedInUser.userprofession)

    def update(self,request, *args, **kwargs,):
        return super().update(request, *args, **kwargs)
    
    def get_serializer_class(self):
        if self.action == 'update':
            return UpdatePartnerPreferenceSerializer
        return PartnerPrefenceSerializer



class CheckPartnerPrefence(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user = request.user
        querysetId = ''
        queryset = PartnerPreference.objects.filter(user=user)
        if queryset.exists():
            querysetIdGet = PartnerPreference.objects.get(user=user)
            if querysetIdGet:
                querysetId = querysetIdGet.id
            else:
                querysetId = 0 
        return Response({
            'partnerpreference':queryset.exists(),
            'id':querysetId
        })


class UpdateUserView(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserEditSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,) 

    def get_queryset(self):
        return self.queryset

    def update(self,request, *args, **kwargs,):
        print(self,request.POST)
        return super().update(request, *args, **kwargs)


# ---------------user like view--------------
class LikedProfilesView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    List all Likeprodiles, or create a new snippet.
    """
    def get(self, request, format=None):
        LikedProfiles = LikedProfile.objects.all()
        serializer =LikedProfileSerializer(LikedProfiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        msg = ''
        liked_by_user = self.request.user
        user =UserProfile.objects.get(id=request.data['liked_user'])
        data=LikedProfile()
        if LikedProfile.objects.filter(liked_by_user = liked_by_user,liked_user = user).exists():
            LikedProfile.objects.filter(liked_by_user = liked_by_user,liked_user = user).delete()
            msg = '0'
            return Response({'msg':msg})
        else:
            data.liked_by_user=liked_by_user
            data.liked_user=user
            data.save()
            serializer =LikedProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                msg = '1'
            return Response({'msg':msg})


# ------------passed profile-------
class PassedProfilesView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    List all Likeprodiles, or create a new snippet.
    """
    def get(self, request, format=None):
        PassedProfiles = PassedProfile.objects.all()
        serializer =PassedProfileSerializer(PassedProfiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.POST)
        msg = ''
        passed_by_user = self.request.user
        user =UserProfile.objects.get(id=request.data['passed_user'])
        data=PassedProfile()
        if PassedProfile.objects.filter(passed_by_user = passed_by_user,passed_user = user).exists():
            PassedProfile.objects.filter(passed_by_user = passed_by_user,passed_user = user).delete()
            msg = '0'
            return Response({'msg':msg})
        else:
            data.passed_by_user=passed_by_user
            data.passed_user=user
            data.save()
            serializer =PassedProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                msg = '1'
            return Response({'msg':msg})

class get_liked_passed_ProfilesView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    """
    List all Likeprodiles, or create a new snippet.
    """
    def get(self, request, format=None):
        PassedProfiles = PassedProfile.objects.filter(passed_by_user=self.request.user)
        likedprofiles = LikedProfile.objects.filter(liked_by_user=self.request.user)

        def obj_dict(obj):
            return obj.__dict__
        listofprofiles=[]
        if PassedProfiles.exists():
            for passsed in PassedProfiles:
                listofprofiles.append(UserImage.objects.get(user_profile=passsed.passed_user))
        if likedprofiles.exists():
            for liked in likedprofiles:
                listofprofiles.append(UserImage.objects.get(user_profile=liked.liked_user))
        serializer=CollectUserSkippedProfiles(listofprofiles,many=True)
        return Response(serializer.data)

#collect profile who like you========
class CollectLikedYouProfileetails(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = CollectUserToDashboardSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        sortParam=likedYouFilter(user)
        if sortParam:
            return self.queryset.filter(**sortParam)
        self.queryset=UserImage.objects.none()
        return self.queryset.all()

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            
            return CollectUserDetailedSerializer

        return self.serializer_class


#collect MAtched profile ========  
class CollectMatchedProfileetails(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    serializer_class = CollectUserToDashboardSerializer
    queryset = UserImage.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):

        user = self.request.user
        sortParam=MatchedFilter(user)
        if sortParam:
            return self.queryset.filter(**sortParam)
        self.queryset=UserImage.objects.none()
        return self.queryset.all()

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            
            return CollectUserDetailedSerializer

        return self.serializer_class


class SendMail(APIView):
    def get(self,request,email,format=None):
        subject = 'Kerala zawaj'
        message = "Welcome, You have registered successfully"
        to = [email]
        email_from = settings.EMAIL_HOST_USER
        send_mail(subject, message, email_from, to)


class check_login(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request,format=None):
        return Response({'msg':'1'})

# ====== chat view section===

class ChatView(generics.ListCreateAPIView):
    serializer_class = ChatUserSerializer
    queryset = Chat.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user=self.request.user
        ##Return ChatName
        if self.request.query_params.get('chatuser'):
            id=self.request.query_params.get('chatuser')
            if Chat.objects.filter(chat_user_one=user.id,chat_user_two=id).exists():
                chats=Chat.objects.get(chat_user_one=user.id,chat_user_two=id)
                queryset = chats
                serializer = ChatUserSerializer(queryset,context={'request': request})
                return Response(serializer.data)
            if Chat.objects.filter(chat_user_one=id,chat_user_two=user.id).exists():
                chats=Chat.objects.get(chat_user_one=id,chat_user_two=user.id)
                queryset = chats
                serializer = ChatUserSerializer(queryset,context={'request': request})
                return Response(serializer.data)
            raise Http404

        chats = Chat.objects.filter(Q(chat_user_one=self.request.user.id) | Q(chat_user_two =self.request.user.id))
        queryset = chats
        serializer = ChatUserSerializer(queryset, many=True,context={'request': request})
        return Response(serializer.data)

    def perform_create(self, serializer):
        chatUserOne=self.request.user.id
        chatUserTwo=self.request.POST['chat_user_two']
        UserOneBID=UserProfile.objects.get(user__id=chatUserOne).bismID
        UserTwoBID=UserProfile.objects.get(user__id=chatUserTwo).bismID
        roomName=UserOneBID+UserTwoBID
        serializer.save(roome_name=roomName,chat_user_one=chatUserOne)

class LikedCount(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,format=None):
        user = request.user
        userProfileId = UserProfile.objects.get(user = user)
        getCount = LikedProfile.objects.filter(liked_user= userProfileId.id).count()
        matched=[]
        users=[]
        profile=UserProfile.objects.get(user=user)
        if LikedProfile.objects.filter(liked_by_user=user).exists():
            mylikerecord=LikedProfile.objects.filter(liked_by_user=user)
            for record in mylikerecord:
                users.append(record.liked_user.user)
            if LikedProfile.objects.filter(liked_user=profile,liked_by_user__in=users).exists():
                mathchedlikerecord=LikedProfile.objects.filter(liked_user=profile,liked_by_user__in=users)
                for machedrecord in mathchedlikerecord:
                    matched.append(machedrecord.liked_by_user)
        return Response({'count':getCount,'matched_count':len(matched)})

class MessageView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        roomID=self.request.query_params.get('roomID')
        if Chat.objects.filter(id=roomID).exists():
            chat=Chat.objects.get(id=roomID)
            Messages = Message.objects.filter(chat=chat)
            queryset = Messages
            serializer = MessageSerializer(queryset, many=True,context={'request': request})
            return Response(serializer.data)
        raise Http404

    def perform_create(self, serializer):
        chatID=self.request.POST['chat']
        chat=Chat.objects.get(id=chatID)
        chat.lastUpdated=datetime.now()
        chat.save()
        serializer.save(user=self.request.user)

class CheckUserVerify(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request,format=None):
        msg = ''
        user = request.user
        checkUser = UserImage.objects.filter(user = user)
        for i in checkUser:
            if i.is_verified == True:
                msg = True
            else:
                msg = False
        return JsonResponse({'msg':msg})

class check_email(APIView):
    def get(self,request,email,format=None):
        msg = ''
        checkEmail = get_user_model().objects.filter(email = email)
        if checkEmail.exists():
            try:
                createPassword = get_user_model().objects.get(email = email)
                randomNumber = ''.join(random.choice('AFG4548JKFSH235BFHDS237823') for _ in range(6))
                createPassword.set_password(randomNumber)
                createPassword.save()
                newPassword = randomNumber
                msg = '1'
                subject = 'Kerala zawaj'
                message = " New Password:"+str(newPassword)+" "+"click this link"+" "+" "+"http://127.0.0.1:8000/change_password/"+email+"/"
                to = [email]
                email_from = settings.EMAIL_HOST_USER
                send_mail(subject,message,email_from, to)
            except:
                pass    
        else:
            msg='0'
        return JsonResponse({'msg':msg})

class CheckPassword(APIView):
    def get(self,request,email,pasword,format=None):
        msg = ''
        pas = pasword
        check_user_exists = get_user_model()
        check_user_exists = authenticate(email=email, password=pas)
        if check_user_exists is None:
            msg = '0'
        else:
            msg = '1'
        return JsonResponse({'msg':msg})

class ChangePassword(APIView):
    def get(self,request,email,pasword,format=None):
        try:
            createPassword = get_user_model().objects.get(email = email)
            createPassword.set_password(pasword)
            createPassword.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            pass


class DeletePassedDetailes(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request,format=None):
        PassedProfile.objects.filter(passed_by_user=self.request.user).delete()
        return Response({"msg":"Success"})


class Payment(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self,request,format=None):
        subscriptionid = self.request.query_params.get('subscription')
       
        if Subscription.objects.filter(id=subscriptionid).exists():
            subscriptiondata=Subscription.objects.get(id=subscriptionid)
            amount = subscriptiondata.price
            duration = subscriptiondata.duration
            start_date = subscriptiondata.date
            end_date = start_date + relativedelta(months=duration)
            client = razorpay.Client(auth=(('rzp_test_eKEgcDtu6x5aa9'),('V2TAZL6jP2IV4ogEqIQhW8ld')))
            payment = client.order.create(
                {
                    "amount": amount * 100, 
                    "currency": "INR", 
                    "payment_capture": "0"
                }
            )
            user = request.user

            print("--------", payment["id"], end_date)

            order = SubscripedUser.objects.create(
                amount=amount, 
                razorpay_order_id=payment['id'],
                user =user,
                subscription = subscriptiondata,
                subscription_end_date= end_date
                )

            serializer = SubscribedusersSerializer(order)

            data = {
                "payment": payment,
                "order": serializer.data
            }
            return Response(data,status.HTTP_200_OK)
        else:
            print("error")
            data = {
                "payment": status.HTTP_404_NOT_FOUND,
                # "order": serializer.data
            }
            return Response(data)


#views for subscribeduser
class SubscribedUserView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,) 

    def post(self, request, format=None):

        print("This is data from Backend : ", self.request.POST.keys())

        ord_id = ""
        raz_pay_id = ""
        raz_signature = ""
        
    # res.keys() will give us list of keys in res
        for key in self.request.POST.keys():
            if key == 'razorpay_order_id':
                ord_id =  self.request.POST[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id =  self.request.POST[key]
            elif key == 'razorpay_signature':
                raz_signature =  self.request.POST[key]

        print("These are the details : ", ord_id, raz_pay_id, raz_signature)

        # get order by payment_id which we've created earlier with isPaid=False
        # order = SubscripedUser()
        order = SubscripedUser.objects.get(razorpay_order_id=ord_id)

        order.razorpay_order_id=ord_id
        order.razorpay_payment_id= raz_pay_id
        order.razorpay_signature= raz_signature
        order.user= self.request.user

        # we will pass this whole data in razorpay client to verify the payment
        data = {
            'razorpay_order_id': ord_id,
            'razorpay_payment_id': raz_pay_id,
            'razorpay_signature': raz_signature,
            'user':self.request.user
        }
        
        rupees = (
            SubscripedUser.objects.get(
                razorpay_order_id=ord_id
            ).amount
            * 100
        )

        client = razorpay.Client(auth=(('rzp_test_eKEgcDtu6x5aa9'),('V2TAZL6jP2IV4ogEqIQhW8ld')))

        # checking if the transaction is valid or not by passing above data dictionary in 
        # razorpay client if it is "valid" then check will return None
        check = client.utility.verify_payment_signature(data)

        if check is True:
            amount = rupees
            test = client.payment.capture(raz_pay_id, amount)
            order.status = "Paid"
            order.save()
            res_data = {
                'message': 'payment successfully received!'
            }
            return Response(res_data)
        else:
            print("Payment Failed")
            return Response({'error': 'Something went wrong'})

        # print(self.request.data)
        # serializer = SubscribedusersSerializer(data=self.request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(status.HTTP_200_OK)
        # else:
        #     print(serializer.errors)
        #     return Response(serializer.errors)

   