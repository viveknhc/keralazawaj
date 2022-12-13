from django.db import models
from versatileimagefield.fields import VersatileImageField


class Story(models.Model):
    name = models.CharField(max_length=128)
    image = VersatileImageField(upload_to="Success Stories", blank=True)

    class Meta:
        verbose_name_plural = "Stories"

    def __str__(self):
        return str(self.name)


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    image = VersatileImageField(upload_to="Testimonial", blank=True)
    description = models.TextField()

    def __str__(self):
        return str(self.name)
