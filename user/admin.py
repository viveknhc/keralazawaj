from .models import Chat
from .models import LikedProfile
from .models import Message
from .models import PartnerPreference
from .models import PassedProfile
from .models import Register
from .models import SubscripedUser
from .models import Subscription
from .models import User
from .models import UserFamily
from .models import UserImage
from .models import UserLocation
from .models import UserProfession
from .models import UserProfile
from django.contrib import admin


# Register your models here.
class RegiAdmin(admin.ModelAdmin):
    list_display = ("id", "mobile_number", "name")


admin.site.register(Register, RegiAdmin)


class LikedAdmin(admin.ModelAdmin):
    list_display = ("id", "liked_user", "liked_by_user")


class Prfile(admin.ModelAdmin):
    list_display = ["id", "user"]


class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "email")


admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, Prfile)
admin.site.register(UserLocation)
admin.site.register(LikedProfile, LikedAdmin)


class ImageAdmin(admin.ModelAdmin):
    list_display = ("id", "user")


admin.site.register(UserImage, ImageAdmin)

admin.site.register(UserProfession)
admin.site.register(UserFamily)
admin.site.register(PartnerPreference)


class ChatAdmin(admin.ModelAdmin):
    list_display = ("id", "lastUpdated", "roome_name")


admin.site.register(Chat, ChatAdmin)
admin.site.register(Message)
admin.site.register(PassedProfile)
admin.site.register(Subscription)
admin.site.register(SubscripedUser)
