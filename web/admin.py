from .models import Story
from .models import Testimonial
from django.contrib import admin


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    pass
