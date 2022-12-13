# Generated by Django 3.2.8 on 2021-12-26 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_auto_20211223_1203'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partnerpreference',
            name='marital_status',
            field=models.CharField(blank=True, choices=[('Never Married', 'Never Married'), ('Divorced', 'Divorced'), ('Married', 'Married'), ('Widow', 'Widow')], max_length=225, null=True),
        ),
        migrations.AlterField(
            model_name='partnerpreference',
            name='profession',
            field=models.CharField(blank=True, choices=[('NotWorking', 'Not Working'), ('Accountant', 'Accountant'), ('CA', 'CA'), ('Secretary', 'Secretary'), ('Doctor', 'Doctor'), ('Nurse', 'Nurse'), ('Marketingexecutive', 'Marketing Executive'), ('HRM', 'HRM'), ('Pharmacist', 'Pharmacist'), ('Self employed', 'Self Employed'), ('Parttime', 'Part Time'), ('Professor', 'Professor'), ('Teacher', 'Teacher'), ('Softwaredeveloper', 'Software Developer'), ('Graphicsdesigner', 'Graphics Designer'), ('Administrator', 'Administrator'), ('Business', 'Business'), ('Driver', 'Driver'), ('Coolie', 'Coolie'), ('Farmer', 'Farmer'), ('Consultant', 'Consultant'), ('Sales Person', 'Sales Person'), ('Tax Consultant', 'Tax Consultant'), ('Bank Employee', 'Bank Employee'), ('Engineer', 'Engineer'), ('Trainer', 'Trainer'), ('Service Advicer', 'Service Advicer'), ('Electrician', 'Electrician'), ('Plumber', 'Plumber'), ('Mechanic', 'Mechanic'), ('Chef', 'Chef'), ('Other', 'Other')], max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='userfamily',
            name='fatherOccupation',
            field=models.CharField(choices=[('Private', 'Private'), ('Self Employed', 'Self Employed'), ('NRI', 'NRI'), ('Home Maker', 'Home Maker'), ('Govt Employee', 'Govt Employee'), ('Retired', 'Retired'), ('Buisness', 'Buisness'), ('Coolie', 'Coolie'), ('Farmer', 'Farmer'), ('Business', 'Business'), ('Driver', 'Driver'), ('Doctor', 'Doctor'), ('Pharmacist', 'Pharmacist'), ('Engineer', 'Engineer'), ('Advocate', 'Advocate'), ('Defence', 'Defence'), ('Police', 'Police'), ('Civil Servant', 'Civil Servant'), ('Teacher', 'Teacher'), ('Accountant', 'Accountant'), ('Administrator', 'Administrator'), ('Consultant', 'Consultant'), ('Sales', 'Sales'), ('Marketing', 'Marketing'), ('Bank Employee', 'Bank Employee'), ('Electrician', 'Electrician'), ('Plumber', 'Plumber'), ('Mehanic', 'Mechanic'), ('Chef', 'Chef'), ('Other', 'Other')], default='Private', max_length=225),
        ),
        migrations.AlterField(
            model_name='userfamily',
            name='motherOccupation',
            field=models.CharField(choices=[('House Wife', 'House Wife'), ('Private', 'Private'), ('Self Employed', 'Self Employed'), ('NRI', 'NRI'), ('Home Maker', 'Home Maker'), ('Govt Employee', 'Govt Employee'), ('Retired', 'Retired'), ('Buisness', 'Buisness'), ('Coolie', 'Coolie'), ('Farmer', 'Farmer'), ('Business', 'Business'), ('Driver', 'Driver'), ('Doctor', 'Doctor'), ('Pharmacist', 'Pharmacist'), ('Engineer', 'Engineer'), ('Advocate', 'Advocate'), ('Defence', 'Defence'), ('Police', 'Police'), ('Civil Servant', 'Civil Servant'), ('Teacher', 'Teacher'), ('Accountant', 'Accountant'), ('Administrator', 'Administrator'), ('Consultant', 'Consultant'), ('Sales', 'Sales'), ('Marketing', 'Marketing'), ('Bank Employee', 'Bank Employee'), ('Electrician', 'Electrician'), ('Plumber', 'Plumber'), ('Mehanic', 'Mechanic'), ('Chef', 'Chef'), ('Other', 'Other')], default='House Wife', max_length=225),
        ),
        migrations.AlterField(
            model_name='userfamily',
            name='relegion',
            field=models.CharField(choices=[('Very religious', 'Very religious'), ('Religious', ' Religious '), ('Liberal', 'Liberal'), ('Prefer not to say', 'Prefer not to say'), ('Not religious', 'Not religious')], default='Islam', max_length=225),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='physical_status',
            field=models.CharField(choices=[('Sound/Normal', 'Sound/Normal'), ('Blind', 'Blind'), ('Physically Challenged', 'Physically Challenged'), ('MentallyChallenged', 'Mentally Challenged'), ('OtherDisabilities', 'Other Disabilities')], default='slim', max_length=225),
        ),
    ]
