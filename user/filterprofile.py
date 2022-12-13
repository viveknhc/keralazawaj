from .models import *
def set_if_not_none(mapping, key, value):
    if value is not None and value !='':
        mapping[key] = value                    

sort_params = {}
def mandatoryfilter(user):
    usergender = UserProfile.objects.get(user=user).gender
    gender='Female'
    if usergender=='Female':
            gender='Male'
            
    set_if_not_none(sort_params, 'user_profile__gender', gender)
  
    return sort_params

def likedYouFilter(user):
    profile=UserProfile.objects.get(user=user)
    if LikedProfile.objects.filter(liked_user=profile).exists():
        likerecord=LikedProfile.objects.filter(liked_user=profile)
        users=[]
        for record in likerecord:
            users.append(record.liked_by_user)
        set_if_not_none(sort_params, 'user__in', users)
        return sort_params


## Matched Profile Filter ###

def MatchedFilter(user):
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
        set_if_not_none(sort_params, 'user__in', matched)
        return sort_params