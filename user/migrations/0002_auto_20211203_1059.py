# Generated by Django 3.2.8 on 2021-12-03 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='likedprofile',
            old_name='user',
            new_name='liked_by_user',
        ),
        migrations.RenameField(
            model_name='likedprofile',
            old_name='profile',
            new_name='liked_user',
        ),
        migrations.RemoveField(
            model_name='partnerpreference',
            name='Location',
        ),
        migrations.AddField(
            model_name='partnerpreference',
            name='location',
            field=models.CharField(choices=[('Kasaragod', 'Kasaragod'), ('Kannur', 'Kannur'), ('Kozhikode', 'Kozhikode'), ('Wayanad', 'Wayanad'), ('Malappuram', 'Malappuram'), ('Ernakulam', 'Ernakulam'), ('Alappuzha', 'Alappuzha'), ('Idukki', 'Idukki'), ('Kollam', 'Kollam'), ('Kottayam', 'Kottayam'), ('Palakkad', 'Palakkad'), ('Pathanamthitta', 'Pathanamthitta'), ('Thrissur', 'Thrissur'), ('Thiruvananthapuram', 'Thiruvananthapuram')], default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userfamily',
            name='family_status',
            field=models.CharField(choices=[('Rich', 'Rich'), ('Upper middle class', 'Upper middle class'), ('Middle class', 'Middle class'), ('Lower middle class', 'Lower middle class'), ('Poor', 'Poor')], max_length=200),
        ),
        migrations.AlterField(
            model_name='userfamily',
            name='relegion',
            field=models.CharField(choices=[('Very religious', 'Very religious'), ('religious', 'religious')], default='Islam', max_length=225),
        ),
    ]