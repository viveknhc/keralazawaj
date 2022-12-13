from django.contrib import admin
from django.db import models
from .models import Story, Testimonial


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    pass