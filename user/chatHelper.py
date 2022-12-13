from .models import *
def getUserNameofChat(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        name = User.objects.get(id=chatUserOne).full_name.split(' ')
        if len(name)>1:
            fullName=name[0]+'&nbsp;'+name[1]
            return fullName
        return User.objects.get(id=chatUserOne).full_name
        
    
    name=User.objects.get(id=chatUserTwo).full_name.split(' ')
    if len(name)>1:
        fullName=name[0]+'&nbsp;'+name[1]
        return fullName
    return User.objects.get(id=chatUserTwo).full_name


def getchatToUserID(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        return User.objects.get(id=chatUserOne).id
    return User.objects.get(id=chatUserTwo).id
def getchatImage(logeinUser,chatUserOne,chatUserTwo):
    if User.objects.get(id=chatUserOne) != logeinUser:
        return UserImage.objects.get(user=User.objects.get(id=chatUserOne))
    return UserImage.objects.get(user=User.objects.get(id=chatUserTwo))