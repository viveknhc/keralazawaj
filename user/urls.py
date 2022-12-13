from . import views
from django.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter


app_name = "user"

router = DefaultRouter()
router.register("userprofile", views.UserProfileViewSet)
router.register("userlocation", views.UserLocationViewSet)
router.register("userpreferences", views.PartnerPreferenceViewSet)
router.register("collectprofiles", views.CollectProfilesViewset)
router.register("userImage", views.UserImageViewSet)
router.register("userprofession", views.UserProfessionViewSet)
router.register("userfamily", views.UserFamilyViewSet)
router.register("user-edit", views.UpdateUserView)
router.register("userProfileDetails", views.CollectProfileDetails)
router.register("user-liked-you", views.CollectLikedYouProfileetails)
router.register("matched-profiles", views.CollectMatchedProfileetails)


urlpatterns = [
    path("", include(router.urls)),
    path("register/", views.RegisterViewList.as_view()),
    path("register/<int:pk>", views.RegisterDetailedView.as_view()),
    path("create/", views.CreateUserView.as_view(), name="create"),
    path("me/", views.ManageUserView.as_view(), name="me"),
    path("token/", views.CreateTokenView.as_view(), name="token"),
    path("user_details_complete_check/<int:pk>/", views.UserDetailsCompleteCheck.as_view()),
    path("check-partner-prefernce/", views.CheckPartnerPrefence.as_view(), name="check_partner_preference"),
    path("check-login-user/", views.LoginUserCheck.as_view()),
    path("get_user/", views.ViewUser.as_view()),
    path("user-like/", views.LikedProfilesView.as_view()),
    path("user-details-check/", views.UserDetailsCheck.as_view()),
    path("logout/", views.Logout.as_view()),
    path("send-mail/<str:email>/", views.SendMail.as_view()),
    path("getchats/", views.ChatView.as_view()),
    path("getMessages/", views.MessageView.as_view()),
    path("liked-count/", views.LikedCount.as_view()),
    path("check-login/", views.check_login.as_view()),
    path("check_email/<str:email>/", views.check_email.as_view()),
    path("check_password/<str:email>/<str:pasword>/", views.CheckPassword.as_view()),
    path("check-user-verify/", views.CheckUserVerify.as_view()),
    path("change-password/<str:email>/<str:pasword>/", views.ChangePassword.as_view()),
    path("user-pass/", views.PassedProfilesView.as_view()),
    path("user-pass-like/", views.get_liked_passed_ProfilesView.as_view()),
    path("refreshviewed/", views.DeletePassedDetailes.as_view()),
    # url for subscribeduser
    path("subscribed-users/", views.SubscribedUserView.as_view()),
    path("payment/", views.Payment.as_view()),
]
