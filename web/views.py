from user.forms import PartnerPreferenceForm
from user.forms import UserFamilyForm
from user.forms import UserProfileForm
from user.forms import userLocationForm
from user.forms import userProfessionFrom
from user.models import Subscription
from web.models import Story
from web.models import Testimonial

from django.shortcuts import render


def index(request):
    stories = Story.objects.all()
    testimonials = Testimonial.objects.all()
    context = {"stories": stories, "testimonials": testimonials}

    return render(request, "web/index.html", context)


def register(request, registerid):
    form = UserProfileForm
    userlocationform = userLocationForm
    context = {"register": registerid, "form": form, "user_form": userlocationform, "profession_form": userProfessionFrom, "family_form": UserFamilyForm}
    return render(request, "web/Register.html", context)


def login(request):
    context = {}
    return render(request, "web/login.html", context)


def profile_picupload(request):
    context = {}
    return render(request, "web/profile-picupload.html", context)


def edit_profilepic(request, id):
    print(id)
    context = {"id": id}
    return render(request, "web/edit-profile-pic.html", context)


def dashboard(request):
    context = {}
    return render(request, "web/dashboard.html", context)


def like(request):
    context = {}
    return render(request, "web/like.html", context)


def likes_premium(request):
    context = {}
    return render(request, "web/premium-likepage.html", context)


def matches(request):
    context = {}
    return render(request, "web/matches.html", context)


def matches_premium(request):
    context = {}
    return render(request, "web/premium-matchpage.html", context)


def user_profile(request):
    form = PartnerPreferenceForm
    professionform = userProfessionFrom
    locationform = userLocationForm
    userprofileForm = UserProfileForm
    familyForm = UserFamilyForm
    context = {"form": form, "professionform": professionform, "locationform": locationform, "userprofileForm": userprofileForm, "familyForm": familyForm}
    return render(request, "web/user-profile.html", context)


def view_profile(request, pk):
    context = {"pk": pk}
    return render(request, "web/view-profile.html", context)


def view_profile_premium(request):
    context = {}
    return render(request, "web/view-profile-premium.html", context)


def contact(request):
    context = {}
    return render(request, "web/contact.html", context)


def privacy(request):
    context = {}
    return render(request, "web/privacy.html", context)


def terms(request):
    context = {}
    return render(request, "web/terms.html", context)


def user_ajax(request):
    context = {}
    return render(request, "web/ajax.html", context)


def password_reset(request):
    context = {}
    return render(request, "web/password-reset.html", context)


def chat(request):
    context = {}
    return render(request, "web/chat.html", context)


# ---------for test--------


def chattwo(request):
    context = {}
    return render(request, "chatbox/index.html", context)


def chat_direct(request):
    context = {}
    return render(request, "chatbox/chat-direct.html", context)


def change_password(request, email):
    context = {"email": email}
    return render(request, "web/change-password.html", context)


def subscription_plans_view(request):
    subscriptions = Subscription.objects.all()
    context = {"subscriptions": subscriptions}
    return render(request, "web/subscription-plans-view.html", context)


def payment_view(request):
    return render(request, "web/payment.html")
