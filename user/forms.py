from django import forms
from django.utils.translation import ugettext_lazy as _
from .models import User, UserProfile,UserLocation,UserProfession,UserFamily,PartnerPreference
from django.forms.widgets import SelectMultiple, TextInput, Textarea, EmailInput, CheckboxInput,URLInput, Select, NumberInput, RadioSelect, FileInput


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = '__all__'
        widgets = {
            'status':Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'status','id': 'status'}),
            'community': Select(attrs={'class': 'required form-control reg-form-select-input fr valid','name': 'community'}),
            'gender': Select(attrs={'class': 'required form-control reg-form-select-input fr valid','name': 'gender'}),
            'bodyType': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'bodyType'}),
            'physical_status': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'physical_status'}),
            'complexion':Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'complexion'}),
            'motherTongue': TextInput(attrs={'class': 'required form-control reg-form-select-input fr','name': 'motherTongue'}),
            'language_known': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'language_known'}),

            'smoking': Select(attrs={'class': 'form-control reg-form-select-input fr','name': 'smoking','selected':'select'}),
            'drinking': Select(attrs={'class': 'form-control reg-form-select-input fr','name': 'drinking'}),
            'readQuran': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'readQuran'}),
            'islamic_services': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'islamic_services'}),

            'perform_namaz': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'perform_namaz'}),
            'fasting': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'fasting'}),
            
             }

             


class userLocationForm(forms.ModelForm):
    class Meta:
        model = UserLocation
        exclude = '__all__'
        widgets = {
            'relation':Select(attrs={'class':'form-control reg-form-select-input fr','name': 'relation','id': 'relation'})
        }

class userProfessionFrom(forms.ModelForm):
    class Meta:
        model = UserProfession
        exclude = '__all__'
        widgets = {
            'highestEducation':Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'highestEducation','id': 'highestEducation'}),
            # 'profession': Select(attrs={'class': 'required form-control reg-form-select-input fr valid','name': 'profession'}),
            'working_with': Select(attrs={'class': 'form-control reg-form-select-input fr valid','name': 'working_with'}),
            'working_as': Select(attrs={'class': 'form-control reg-form-select-input fr','name': 'working_as'}),
        }

class UserFamilyForm(forms.ModelForm):
    class Meta:
        model = UserFamily
        exclude = '__all__'
        widgets = {
            'familyType':Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'familyType','id': 'familyType'}),
            'relegion': Select(attrs={'class': 'required form-control reg-form-select-input fr valid','name': 'relegion'}),
            'fatherOccupation': Select(attrs={'class': 'required form-control reg-form-select-input fr valid','name': 'fatherOccupation'}),
            'motherOccupation': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'motherOccupation'}),
            'family_status': Select(attrs={'class': 'required form-control reg-form-select-input fr','name': 'family_status','id':'family_status'}),
        }


class PartnerPreferenceForm(forms.ModelForm):
    class Meta:
        model = PartnerPreference
        exclude = '__all__'
        widgets = {
            'marital_status':Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'marital_status','id': 'marital_status'}),
            'complexion': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'marital_status','id': 'ComplexionPref'}),
            'highestEducation': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'highestEducation','id': 'highestEducation'}),
            'profession': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'profession','id': 'prefProfession'}), 
            'body_type': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'body_type','id': 'body_type'}),
            'community': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner','name': 'community','id': 'community'}),
            'location': Select(attrs={'class': 'required form-control usr-profile-select-input fr-in-partner ','name': 'location','id': 'location'}),
        }


