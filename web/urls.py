from . import views
from django.urls import path


app_name = "web"

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login, name="login"),
    path("register/<int:registerid>", views.register, name="register"),
    path("pic-upload/", views.profile_picupload, name="profile_picupload"),
    path("edit-profilepic/<str:id>/", views.edit_profilepic, name="edit_profilepic"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("like/", views.like, name="like"),
    path("like-premium/", views.likes_premium, name="likes_premium"),
    path("matches/", views.matches, name="matches"),
    path("matches-premium/", views.matches_premium, name="matches_premium"),
    path("view-profile/<str:pk>/", views.view_profile, name="view_profile"),
    path("view-profile-premium", views.view_profile_premium, name="view_profile_premium"),
    path("user-profile/", views.user_profile, name="user_profile"),
    path("contact/", views.contact, name="contact"),
    path("privacy/", views.privacy, name="privacy"),
    path("terms&condition/", views.terms, name="terms"),
    path("password_reset/", views.password_reset, name="password_reset"),
    path("chat/", views.chat, name="chat"),
    path("user-ajax", views.user_ajax, name="user_ajax"),
    path("chat-two/", views.chattwo, name="chat_two"),
    path("chat-direct/", views.chat_direct, name="chat_direct"),
    path("change_password/<str:email>/", views.change_password, name="change_password"),
    # --------------
    path("subscription-plans-view/", views.subscription_plans_view, name="subscription_plans_view"),
    path("payment-view/", views.payment_view, name="payment_view"),
]
