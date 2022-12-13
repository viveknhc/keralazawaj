from re import M
from django.contrib import admin
from django.db.models.base import Model
from .models import Register,User,UserLocation,UserProfile,UserImage,UserFamily, UserProfession,PartnerPreference,LikedProfile,Chat,Message,PassedProfile,Subscription,SubscripedUser

# Register your models here.
class RegiAdmin(admin.ModelAdmin):
    list_display=('id','mobile_number','name')
   
admin.site.register(Register,RegiAdmin)

class LikedAdmin(admin.ModelAdmin):
    list_display=('id','liked_user','liked_by_user')
class Prfile(admin.ModelAdmin):
    list_display = ['id','user']
class UserAdmin(admin.ModelAdmin):
    list_display=('id','email')
admin.site.register(User,UserAdmin)
admin.site.register(UserProfile,Prfile)
admin.site.register(UserLocation)
admin.site.register(LikedProfile,LikedAdmin)
class ImageAdmin(admin.ModelAdmin):
    list_display=('id','user')

admin.site.register(UserImage,ImageAdmin)

admin.site.register(UserProfession)
admin.site.register(UserFamily)
admin.site.register(PartnerPreference)
class ChatAdmin(admin.ModelAdmin):
    list_display=('id','lastUpdated','roome_name')
admin.site.register(Chat,ChatAdmin)
admin.site.register(Message)
admin.site.register(PassedProfile)
admin.site.register(Subscription)
admin.site.register(SubscripedUser)