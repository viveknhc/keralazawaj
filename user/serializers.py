from user.models import Chat
from user.models import LikedProfile
from user.models import Message
from user.models import PartnerPreference
from user.models import PassedProfile
from user.models import Register
from user.models import SubscripedUser
from user.models import UserFamily
from user.models import UserImage
from user.models import UserLocation
from user.models import UserProfession
from user.models import UserProfile

from .chatHelper import getchatImage
from .chatHelper import getchatToUserID
from .chatHelper import getUserNameofChat
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.utils.translation import gettext as _
from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = "__all__"

    # def create(self, validated_data):
    #     """Create a new user with encrypted password and return it"""
    #     return Register.objects.create(**validated_data)


# commitFlag
class UserGetSerilizer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "dob", "full_name")


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ("email", "password", "full_name", "dob", "register")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


# commitFlag
class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""

    email = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(request=self.context.get("request"), username=email, password=password)
        if not user:
            msg = _("Unable to authenticate with provided credentials")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


# commitFlag


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for User Properties"""

    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ("id", "user")


class UserLocationSerializer(serializers.ModelSerializer):
    """Serializer for User Properties"""

    class Meta:
        model = UserLocation
        fields = "__all__"
        read_only_fields = ("id", "register", "user_profile", "user", "user_profession", "user_family")


class UserImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    class Meta:
        model = UserImage
        image_one = VersatileImageFieldSerializer(max_length=None, sizes=[("medium_square_crop", "crop__400x400")], default="default.jpg")
        image_two = VersatileImageFieldSerializer(max_length=None, sizes=[("medium_square_crop", "crop__400x400")], default="default.jpg")
        image_three = VersatileImageFieldSerializer(max_length=None, sizes=[("medium_square_crop", "crop__400x400")], default="default.jpg")
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location", "user_profession", "user_family")


class UserImageForTwoImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_two = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location", "image_three")


class UserImageForOneImageSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location", "image_three", "image_two")


class UserImageSkipSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location", "image_three", "image_two", "image_one")


class PartnerPreferenceSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    class Meta:
        model = PartnerPreference
        fields = "__all__"
        read_only_fields = ("id",)


class UserProfessionSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    class Meta:
        model = UserProfession
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile")


class UserMinimaldataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("email", "dob")


class UserProfileMinimaldataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("id", "bismID", "status")


class UserLocationMinimaldataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = ("native_city", "about")


class UsertoDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "dob", "full_name")


class CollectUserToDashboardSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_two = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_three = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    user_profile = UserProfileMinimaldataSerializer(read_only=True)
    user_location = UserLocationMinimaldataSerializer(read_only=True)
    user = UsertoDashboardSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location")

    def get_is_liked(self, obj):
        request = self.context.get("request", None)
        if LikedProfile.objects.filter(liked_user_id=obj.user_profile.id, liked_by_user_id=request.user.id).exists():
            return True
        return False


class UserFamilySerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    class Meta:
        model = UserFamily
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_profession")


class UpdatePartnerPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerPreference
        fields = ("age_from", "age_to", "marital_status", "height_from", "height_to", "complexion", "community", "highestEducation", "profession", "Location", "body_type")


class GetPartnerPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerPreference
        fields = "__all__"


class CollectUserDetailedSerializer(serializers.ModelSerializer):
    """Serialize a User Properties"""

    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_two = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_three = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    user_profile = UserProfileSerializer(read_only=True)
    register = RegisterSerializer(read_only=True)
    user_location = UserLocationSerializer(read_only=True)
    user = UserGetSerilizer(read_only=True)
    user_profession = UserProfessionSerializer(read_only=True)
    user_family = UserFamilySerializer(read_only=True)
    user_preference = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location")

    def get_user_preference(self, obj):
        if PartnerPreference.objects.filter(user_id=obj.user.id).exists():
            queryset = PartnerPreference.objects.get(user_id=obj.user.id)
            return model_to_dict(queryset)
        return 0

    def get_is_liked(self, obj):
        request = self.context.get("request", None)
        if LikedProfile.objects.filter(liked_user_id=obj.user_profile.id, liked_by_user_id=request.user.id).exists():
            return True
        return False


class PartnerPrefenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerPreference
        fields = "__all__"
        read_only_fields = (
            "id",
            "user",
            "register",
            "user_profile",
            "user_location",
            "user_profession",
            "user_family",
            "age_from",
            "age_to",
            "marital_status",
            "height_from",
            "height_to",
            "complexion",
            "community",
            "highestEducation",
            "profession",
            "location",
            "body_type",
        )


class GetUserImageOne(serializers.ModelSerializer):
    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])

    class Meta:
        model = UserImage
        fields = ("image_one",)


# ========================user profiel edit================


class UserFamilyEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFamily
        exclude = ("user", "register", "user_profile", "user_profession")


class UserProfessionEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfession
        exclude = ("user", "register", "user_profile")


class UserProfileEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ("bismID", "gender", "user", "register")


class UserEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "full_name", "dob")
        read_only_fields = ("id", "email")


class UserLocationEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        exclude = ("user", "register", "user_profile", "user_profession", "user_family")


# =============user like serializer


class LikedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedProfile
        fields = "__all__"
        read_only_fields = ("liked_by_user",)


class PassedProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassedProfile
        fields = "__all__"
        read_only_fields = ("passed_by_user",)


# ==================user image change


class EditProfilePIcSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ("image_one", "image_two", "image_three")


# chat serializer


class ChatUserSerializer(serializers.ModelSerializer):
    chatImage = serializers.SerializerMethodField()
    chatTime = serializers.SerializerMethodField()
    chatName = serializers.SerializerMethodField()
    chat_To_user = serializers.SerializerMethodField()
    lastMessage = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ("id", "roome_name", "chat_user_one", "chat_user_two", "chatName", "chatImage", "chatTime", "lastMessage", "chat_To_user")
        read_only_fields = ("id", "chat_user_one", "roome_name")

    def get_chatImage(self, obj):
        request = self.context.get("request", None)
        if request:
            image = getchatImage(request.user, obj.chat_user_one, obj.chat_user_two)
            serializer = GetUserImageOne(image)
            return serializer.data

    def get_chatTime(self, obj):
        return obj.lastUpdated.strftime("%H:%M %p")

    def get_chat_To_user(self, obj):
        request = self.context.get("request", None)
        if request:
            return getchatToUserID(request.user, obj.chat_user_one, obj.chat_user_two)

    def get_chatName(self, obj):
        request = self.context.get("request", None)
        if request:
            return str(getUserNameofChat(request.user, obj.chat_user_one, obj.chat_user_two)).capitalize()

    def get_lastMessage(self, obj):
        request = self.context.get("request", None)
        messager = ""
        lastmessage = Message.objects.filter(chat=obj)
        if not lastmessage.exists():
            return ""
        lastmessage = lastmessage.first()
        if request:
            if lastmessage.user == request.user:
                messager = "You"
                return messager + " : " + lastmessage.message
            else:
                return lastmessage.message


class MessageSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    chatImage = serializers.SerializerMethodField()
    time_formated = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ("chat", "user", "message", "time_formated", "is_owner", "chatImage")
        read_only_fields = ("user",)

    def get_time_formated(self, obj):
        return obj.time.strftime("%H:%M %p")

    def get_is_owner(self, obj):
        request = self.context.get("request", None)
        if request:
            return request.user == obj.user

    def get_chatImage(self, obj):
        request = self.context.get("request", None)
        if request:
            image = UserImage.objects.get(user=obj.user)
            serializer = GetUserImageOne(image)
            return serializer.data


class CollectUserSkippedProfiles(serializers.ModelSerializer):
    """Serialize a User Properties"""

    image_one = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_two = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    image_three = VersatileImageFieldSerializer(sizes=[("medium_square_crop", "crop__400x400")])
    user_profile = UserProfileMinimaldataSerializer(read_only=True)
    user_location = UserLocationMinimaldataSerializer(read_only=True)
    user = UsertoDashboardSerializer(read_only=True)

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("id", "user", "register", "user_profile", "user_location")


# serializer for subscriped user


class SubscribedusersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscripedUser
        fields = "__all__"
        read_only_fields = ("user",)
