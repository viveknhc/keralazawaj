from django.shortcuts import render


def admin_login(request):
    context = {"is_admin_login": True}
    return render(request, "adminpage/loginadmin.html", context)


def stories(request):
    context = {"is_stories": True}
    return render(request, "adminpage/stories.html", context)


def testimonial(request):
    context = {"is_testimonial": True}
    return render(request, "adminpage/testimonial.html", context)


def admin_dashboard(request):
    context = {"is_admin_dashboard": True}
    return render(request, "adminpage/index.html", context)


def pending_verification(request):
    context = {"is_admin_dashboard": True}
    return render(request, "adminpage/verification-pending.html", context)


def verified_user(request):
    context = {"is_verified_user": True}
    return render(request, "adminpage/verified-user.html", context)


def males(request):
    context = {"is_males": True}
    return render(request, "adminpage/males.html", context)


def females(request):
    context = {"is_females": True}
    return render(request, "adminpage/females.html", context)


def view_profile(request, pk):
    context = {"pk": pk}
    return render(request, "adminpage/view-profile.html", context)


def uncompleted_profiles(request):
    context = {"is_uncompleted_profiles": True}
    return render(request, "adminpage/uncompleted-profles.html", context)


def subscription_plans(request):
    context = {"is_subscription_plans": True}
    return render(request, "adminpage/subscription-plan.html", context)
