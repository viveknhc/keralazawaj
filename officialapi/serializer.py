from user.models import PartnerPreference
from user.models import UserFamily
from user.models import UserImage
from user.models import UserLocation
from user.models import UserProfession
from user.models import UserProfile
from user.serializers import RegisterSerializer
from user.serializers import UserFamilySerializer
from user.serializers import UserProfessionSerializer
from web.models import Story
from web.models import Testimonial

from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.forms.models import model_to_dict
from django.utils.translation import gettext as _
from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""

    email = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get("email")
        password = attrs.get("password")
        user = authenticate(request=self.context.get("request"), username=email, password=password)
        if user:
            if user.is_superuser:
                attrs["user"] = user
                return attrs
            else:
                msg = _("Unable to authenticate with provided credentials")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _("Unable to authenticate with provided credentials")
            raise serializers.ValidationError(msg, code="authorization")


class UserLocationSerilizer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = "__all__"


class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("dob", "email", "full_name", "id")


# class RegisterSerilizer(serializers.ModelSerializer):
#     class Meta:
#         model = Register
#         fileds = ('mobile_number',)


class UncompletedUser(serializers.ModelSerializer):
    register = RegisterSerializer(read_only=True)
    user_profile = serializers.SerializerMethodField()
    user_profession = serializers.SerializerMethodField()
    user_family = serializers.SerializerMethodField()
    user_location = serializers.SerializerMethodField()
    user_image = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ("id", "email", "full_name", "register", "dob", "user_profile", "user_profession", "user_family", "user_location", "user_image")
        read_only_fields = ("register",)

    def get_user_profile(self, obj):
        if UserProfile.objects.filter(user=obj.id).exists():
            return True
        return False

    def get_user_profession(self, obj):
        if UserProfession.objects.filter(user=obj.id).exists():
            return True
        return False

    def get_user_family(self, obj):
        if UserFamily.objects.filter(user=obj.id).exists():
            return True
        return False

    def get_user_location(self, obj):
        if UserLocation.objects.filter(user=obj.id).exists():
            return True
        return False

    def get_user_image(self, obj):
        if UserImage.objects.filter(user=obj.id).exists():
            return True
        return False


class UserProfessionSerilizer(serializers.ModelSerializer):
    class Meta:
        model = UserProfession
        fields = "__all__"


class UserProfileSerilizer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class UserVerificationSerializer(serializers.ModelSerializer):
    image_one = VersatileImageFieldSerializer(sizes=[("small_square_crop", "crop__100x100")])
    image_two = VersatileImageFieldSerializer(sizes=[("small_square_crop", "crop__100x100")])
    image_three = VersatileImageFieldSerializer(sizes=[("small_square_crop", "crop__100x100")])
    register = RegisterSerializer(read_only=True)
    user_location = UserLocationSerilizer(read_only=True)
    user_profession = UserProfessionSerializer(read_only=True)
    user_profile = UserProfileSerilizer(read_only=True)
    user = UserSerilizer(read_only=True)
    user_preference = serializers.SerializerMethodField()
    user_family = UserFamilySerializer(read_only=True)

    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("image_one", "image_two", "image_three", "user", "register", "user_profile", "user_location", "user_profession", "user_family")

    def get_user_preference(self, obj):
        if PartnerPreference.objects.filter(user_id=obj.user.id).exists():
            queryset = PartnerPreference.objects.get(user_id=obj.user.id)
            return model_to_dict(queryset)
        return 0


class UpdateUserVerification(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = "__all__"
        read_only_fields = ("image_one", "image_two", "image_three", "user", "register", "user_profile", "user_location", "user_profession", "user_family")


class SuccessStories(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(sizes=[("small_square_crop", "crop__50x50")])

    class Meta:
        model = Story
        fields = "__all__"


class EditSuccessStories(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = "__all__"


class Testimonal(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(sizes=[("small_square_crop", "crop__50x50")])

    class Meta:
        model = Testimonial
        fields = "__all__"


class EditTestimonal(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"
