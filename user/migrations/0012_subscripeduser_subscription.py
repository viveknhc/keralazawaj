# Generated by Django 3.2.8 on 2022-09-30 05:37

import django.db.models.deletion
import tinymce.models
from django.conf import settings
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [("user", "0011_passedprofile")]

    operations = [
        migrations.CreateModel(
            name="Subscription",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("plan_title", models.CharField(max_length=128)),
                ("content", tinymce.models.HTMLField(blank=True, null=True)),
                ("duration", models.IntegerField()),
                ("duration_type", models.CharField(choices=[("month", "month"), ("days", "days")], max_length=50)),
                ("price", models.IntegerField()),
                ("date", models.DateField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="SubscripedUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(auto_now=True)),
                ("subscription_end_date", models.DateField()),
                ("razorpay_payment_id", models.TextField()),
                ("razorpay_order_id", models.TextField()),
                ("razorpay_signature", models.TextField()),
                ("status", models.CharField(default="Open", max_length=100)),
                ("amount", models.IntegerField()),
                ("subscription", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to="user.subscription")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
