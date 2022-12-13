
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.fields import DateTimeField
from django.forms import DurationField
from versatileimagefield.fields import VersatileImageField, PPOIField
from datetime import date
from tinymce.models import HTMLField

##CommitFlag
class Register(models.Model):
    PROFILE_CHOICES = (('Self', 'Self'),('Son', 'Son'),('Daughter', 'Daughter'),('Sister', 'Sister'),('Brother', 'Brother'),('Friend', 'Friend'),('Father', 'Father'),('Mother', 'Mother'))

    profile_for   = models.CharField(max_length=128,choices=PROFILE_CHOICES,default="personal")
    name          = models.CharField(max_length=128)
    mobile_number = models.CharField(max_length=128,unique=True)

    def __str__(self):
        return str(self.name)  
##CommitFlag
#commitFlag
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create Save a User"""
        if not email:
            raise ValueError('User must have a Email')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        if user:
            return user

    def create_superuser(self, email, password):
        """Create and Save a super User"""
        
        register = Register()
        register.profile_for='brother'
        register.name='Admin'
        register.mobile_number=email+'1234567891'
        register.save()

        user = self.model(email=email)
        user.set_password(password)
        user.dob=date.today()
        user.save(using=self.db)
        user.is_staff = True
        user.is_superuser = True
        user.register=register 
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """"Custom Model"""
    email     = models.EmailField(max_length=225, unique=True)
    full_name = models.CharField(max_length=225)
    dob       = models.DateField()
    is_active = models.BooleanField(default=True)
    is_staff  = models.BooleanField(default=False)
    register = models.OneToOneField(Register, on_delete = models.CASCADE,null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return str(self.email)

#commitFlag
class UserProfile(models.Model):
    """"user profile """
    COMMUNITY_CHOICES         = (('AMuslim','A Muslim'),('Sunni','Sunni'),('Sunni (EK)','Sunni (EK)'),('Sunni (AP)','Sunni (AP)'),('Salafi (KNM)','Salafi (KNM)'),('Salafi (Markaz dawa)','Salafi (Markaz dawa)'),('Salafi (Wisdom)','Salafi (Wisdom)'),('Jamayath Islam ','Jamayath Islam '),('Thableeg Jamath ','Thableeg Jamath '),('Maliki','Maliki'),('Hanafi','Hanafi'),('Sayyid','Sayyid'),('Soofism','Soofism'),('Other','Other'))
    COMPLEXION_CHOICES        = (('Fair skin','Fair skin'),('Extremely fair skin','Extremely fair skin'),('Black skin','Black skin'),('Medium skin','Medium skin'),('Olive skin','Olive skin'),('Brown skin','Brown skin'))
    STATUS_CHOICE             = (('Never Married','Never Married'),('Divorced','Divorced'),('Married','Married'),('Widow','Widow'))
    BODYTYPE_CHOICE           = (('slim','Slim'),('Muscular','Muscular'),('Fat',('Fat')),('Normal',('Normal')))
    PHYSICAL_CHOICE           = (('Sound/Normal','Sound/Normal'),('Blind','Blind'),('Physically Challenged','Physically Challenged'),('MentallyChallenged','Mentally Challenged'),('OtherDisabilities','Other Disabilities'))

    # HIGHESTEDUCATION_CHOICE   = (('Bachelordegree','Bachelor Degrees'),('Masterdegrees','Master Degrees'),('Highersecondary','Higher Secondary'), ('Highschool','High School'))
    GENDER_CHOICES            = (('Male', 'Male'),('Female', 'Female'),('Other', 'Other'))
    # PROFESSION                = (('Private','Private'),('GovtEmployee','Govt-Employee'),('Nri','Nri'),('Parttime','Part time'),('Fulltime','Full time'),('Homemaker','Home maker'),('Selfemployee','Self Employee'),('Retired','Retired'),('Kooli','Kooli'),('Farmer','Farmer'),('Business','Business'),('Others','Others'))
    READQURAN_CHOICES         = (('Always', 'Always'),('Sometimes', 'Sometimes'),('Only Friday', 'Only Friday'),('During Ramadan', 'During Ramadan'),('Never', 'Never'),('Prefer not to say', 'Prefer not to say'))
    ISLAMICSERVICES_CHOICES   = (('Yes', 'Yes'),('No', 'No'))
    PERFORMNAMAZ_CHOICES      = (('Always', 'Always'),('Sometimes', 'Sometimes'),('Never', 'Never'),('Prefer not to say', 'Prefer not to say'))
    SMOKING_CHOICES           = (('Yes','Yes'),('No','No'),('Occasionally','Occasionally'),('Addicted','Addicted'),('Social','Social'))
    FASTING_CHOICES           = (('Always', 'Always'),('Sometimes', 'Sometimes'),('Never', 'Never'),('Prefer not to say', 'Prefer not to say'),('Only in Ramadan','Only in Ramadan'))


    no_of_children            = models.IntegerField(null=True, blank=True)
    bismID                    = models.CharField(max_length=10,default='BISM1000')
    height                    = models.IntegerField()
    gender                    = models.CharField(max_length= 100,choices=GENDER_CHOICES,default="male")
    weight                    = models.IntegerField()
    community                 = models.CharField(max_length=225,choices=COMMUNITY_CHOICES,default="Shafi")
    status                    = models.CharField(max_length=225,choices=STATUS_CHOICE,default="Single")
    bodyType                  = models.CharField(max_length=225,choices=BODYTYPE_CHOICE,default="slim") 
    physical_status           = models.CharField(max_length=225,choices=PHYSICAL_CHOICE,default="slim")
    # highestEducation          = models.CharField(max_length=225,choices=HIGHESTEDUCATION_CHOICE,default="plustwo")
    # profession                = models.CharField(max_length=255,choices=PROFESSION,default='Private')
    motherTongue              = models.CharField(max_length=225)
    language_known            = models.CharField(max_length=225,null=True,blank=True)
    smoking                   = models.CharField(max_length=225,choices=SMOKING_CHOICES,null=True,blank=True)
    drinking                  = models.CharField(max_length=225,choices=SMOKING_CHOICES,null=True,blank=True)
    readQuran                 = models.CharField(max_length=225,choices=READQURAN_CHOICES,default="Yes")
    islamic_services          = models.CharField(max_length=225,choices=ISLAMICSERVICES_CHOICES,default="Yes")
    complexion                = models.CharField(max_length=225,choices=COMPLEXION_CHOICES,default='Medium skin')
    perform_namaz             = models.CharField(max_length=225,choices=PERFORMNAMAZ_CHOICES,default="Always")
    fasting                   = models.CharField(max_length=225,choices=FASTING_CHOICES,default="Always")

    user                      = models.OneToOneField(User, on_delete = models.CASCADE)
    register = models.OneToOneField(Register, on_delete = models.CASCADE)

    def __str__(self):
        return str(self.user)


class UserProfession(models.Model):
    HIGHESTEDUCATION_CHOICE   = (('Masters', 'Masters'),('Doctorate', 'Doctorate'),('Bachelors', 'Bachelors'),('Diploma', 'Diploma'),('ITI', 'ITI'),('Islamic Education', 'Islamic Education'),('High School', 'High School'),('Other', 'Other'))
    WORKING_WITH              = (('NotWorking','Not Working'),('PrivateSector','Private Sector'),('PublicSector','Public Sector'), ('CivilService','Civil Service'),('Defence','Defence'),('Business','Business'),('SelfEmployed','Self Employed'),('NRI','NRI'),('Other', 'Other'))
    WORKING_AS                = (('NotWorking','Not Working'),('Accountant','Accountant'),('CA','CA'), ('Secretary','Secretary'),('Doctor','Doctor'),('Nurse','Nurse'),('Marketingexecutive','Marketing Executive'),('HRM','HRM'),('Pharmacist','Pharmacist'),('Self employed','Self Employed'),('Parttime','Part Time'),('Professor','Professor'),('Teacher','Teacher'),('Softwaredeveloper','Software Developer'),('Graphicsdesigner','Graphics Designer'),('Administrator','Administrator'),('Business','Business'),('Driver','Driver'),('Coolie','Coolie'),('Farmer','Farmer'),('Consultant', 'Consultant'),('Sales Person','Sales Person'),('Tax Consultant','Tax Consultant'),('Bank Employee', 'Bank Employee'),('Engineer','Engineer'),('Trainer','Trainer'),('Service Advicer','Service Advicer'),('Electrician','Electrician'),('Plumber','Plumber'),('Mechanic','Mechanic'),('Chef','Chef'),('Other', 'Other'))


    highestEducation          = models.CharField(max_length=225,choices=HIGHESTEDUCATION_CHOICE,default="plustwo")
    profession                = models.CharField(max_length=255)
    working_with              = models.CharField(max_length=255,choices=WORKING_WITH,null=True,blank=True)
    working_as                = models.CharField(max_length=255,choices=WORKING_AS,null=True,blank=True)
    annual_income             = models.CharField(max_length=225,blank=True,null=True)

    user                      = models.OneToOneField(User, on_delete = models.CASCADE)
    register                  = models.OneToOneField(Register, on_delete = models.CASCADE)
    user_profile              = models.OneToOneField(UserProfile, on_delete = models.CASCADE)

    def __str__(self):
        return str(self.user)


class UserFamily(models.Model):
    FAMILYTYPE_CHOICES       = (('Nuclear Family','Nuclear Family'),('Joint Family','Joint Family'),('Extended Family','Extended Family'),('Other','Other'))
    RELEGION_CHOICES         = (('Very religious','Very religious'),('Religious',' Religious '),('Liberal','Liberal'),('Prefer not to say','Prefer not to say'),('Not religious','Not religious'))
    FATHEROCCUPATION_CHOICES = (('Private','Private'),('Self Employed','Self Employed'),('NRI','NRI'),('Home Maker','Home Maker'),('Govt Employee','Govt Employee'),('Retired','Retired'),('Buisness','Buisness'),('Coolie','Coolie'),('Farmer','Farmer'),('Business','Business'),('Driver','Driver'),('Doctor','Doctor'),('Pharmacist','Pharmacist'),('Engineer','Engineer'),('Advocate','Advocate'),('Defence','Defence'),('Police','Police'),('Civil Servant','Civil Servant'),('Teacher','Teacher'),('Accountant','Accountant'),('Administrator','Administrator'),('Consultant','Consultant'),('Sales','Sales'),('Marketing','Marketing'),('Bank Employee','Bank Employee'),('Electrician','Electrician'),('Plumber','Plumber'),('Mehanic','Mechanic'),('Chef','Chef'),('Other','Other'))
    MOTHEROCCUPATION_CHOICES = (('House Wife','House Wife'),('Private','Private'),('Self Employed','Self Employed'),('NRI','NRI'),('Home Maker','Home Maker'),('Govt Employee','Govt Employee'),('Retired','Retired'),('Buisness','Buisness'),('Coolie','Coolie'),('Farmer','Farmer'),('Business','Business'),('Driver','Driver'),('Doctor','Doctor'),('Pharmacist','Pharmacist'),('Engineer','Engineer'),('Advocate','Advocate'),('Defence','Defence'),('Police','Police'),('Civil Servant','Civil Servant'),('Teacher','Teacher'),('Accountant','Accountant'),('Administrator','Administrator'),('Consultant','Consultant'),('Sales','Sales'),('Marketing','Marketing'),('Bank Employee','Bank Employee'),('Electrician','Electrician'),('Plumber','Plumber'),('Mehanic','Mechanic'),('Chef','Chef'),('Other','Other'))
    FAMILYSTATUS_CHOICES     = (('Rich','Rich'),('Upper middle class','Upper middle class'),('Middle class','Middle class'),('Lower middle class','Lower middle class'),('Poor','Poor'))

    familyType               = models.CharField(max_length=225,choices=FAMILYTYPE_CHOICES,default="Nuclear Family",null=True,blank=True)
    relegion                 = models.CharField(max_length=225,choices= RELEGION_CHOICES,default='Islam')
    fatherOccupation         = models.CharField(max_length=225,choices=FATHEROCCUPATION_CHOICES,default='Private')
    motherOccupation         = models.CharField(max_length=225,choices=MOTHEROCCUPATION_CHOICES,default='House Wife')

    numberof_brothers        = models.IntegerField(null=True,blank=True)
    numberof_sisters         = models.IntegerField(null=True,blank=True)
    family_status            = models.CharField(max_length=200,choices=FAMILYSTATUS_CHOICES)
    
    user                     = models.OneToOneField(User, on_delete = models.CASCADE)
    register                 = models.OneToOneField(Register, on_delete = models.CASCADE)
    user_profile             = models.OneToOneField(UserProfile, on_delete = models.CASCADE)
    user_profession          = models.OneToOneField(UserProfession, on_delete = models.CASCADE)

    class Meta:
        verbose_name_plural =('User family details')

    def __str__(self):
        return str(self.user)
        

class UserLocation(models.Model):
    """"user location """
    RELATION_CHOICES = (('Parent', 'Parent'),('Brother', 'Brother'),('Self', 'Self'),('Sister', 'Sister'),('Friend', 'Friend'))
    
    current_home_name = models.CharField(max_length=255)
    current_city              = models.CharField(max_length=255)
    current_locality          = models.CharField(max_length=255)

    home_name                 = models.CharField(max_length=255)
    native_city               = models.CharField(max_length=255)
    native_locality           = models.CharField(max_length=255)

    primary_number            = models.CharField(max_length=255)
    secondary_number          = models.CharField(max_length=255,null=True,blank=True)
    preffered_person          = models.CharField(max_length=255,null=True,blank=True)
    relation                  = models.CharField(max_length=225,choices=RELATION_CHOICES,null=True,blank=True)
    phone_number              = models.CharField(max_length=128,null=True,blank=True)
    about                     = models.TextField()
    pincode                   = models.CharField(max_length=100)

    user                      = models.OneToOneField(User, on_delete = models.CASCADE)
    register                  = models.OneToOneField(Register, on_delete = models.CASCADE)
    user_profile              = models.OneToOneField(UserProfile, on_delete = models.CASCADE)
    user_profession           = models.OneToOneField(UserProfession, on_delete = models.CASCADE)
    user_family               = models.OneToOneField(UserFamily, on_delete = models.CASCADE)  

    def __str__(self):
        return str(self.user)


class UserImage(models.Model):
    """"user image """
    date                       = models.DateField(auto_now=True)
    image_one                  = VersatileImageField(upload_to = 'userimage',default='default.jpg',ppoi_field='image_one_ppoi',blank=True)
    image_one_ppoi = PPOIField()
    image_two                  = VersatileImageField(upload_to = 'userimage',default='default.jpg',ppoi_field='image_two_ppoi',blank =True)
    image_two_ppoi = PPOIField()
    image_three                = VersatileImageField(upload_to = 'userimage',default='default.jpg',ppoi_field='image_three_ppoi',blank =True) 
    image_three_ppoi = PPOIField()

    is_verified                = models.BooleanField(default=False)

    user                       = models.OneToOneField(User, on_delete = models.CASCADE)
    register                   = models.OneToOneField(Register, on_delete = models.CASCADE)
    user_profile               = models.OneToOneField(UserProfile, on_delete = models.CASCADE)
    user_location              = models.OneToOneField(UserLocation, on_delete = models.CASCADE)
    user_profession            = models.OneToOneField(UserProfession, on_delete = models.CASCADE)
    user_family                = models.OneToOneField(UserFamily, on_delete = models.CASCADE)  


    def __str__(self):
        return str(self.user)


class PartnerPreference(models.Model):
    """"partner preference """

    MARITAL_STATUS_CHOICES        = (('Never Married','Never Married'),('Divorced','Divorced'),('Married','Married'),('Widow','Widow'))
    COMPLEXION_CHOICES        = (('Fair skin','Fair skin'),('Extremely fair skin','Extremely fair skin'),('Black skin','Black skin'),('Medium skin','Medium skin'),('Olive skin','Olive skin'),('Brown skin','Brown skin'))
    PHYSICAL_CHOICE               = (('sound','Sound'),('challenged','Challenged'))
    HIGHESTEDUCATION_CHOICE       = (('Masters', 'Masters'),('Doctorate', 'Doctorate'),('Bachelors', 'Bachelors'),('Diploma', 'Diploma'),('ITI', 'ITI'),('Islamic Education', 'Islamic Education'),('High School', 'High School'),('Other', 'Other'))
    COMMUNITY_CHOICES         = (('AMuslim','A Muslim'),('Sunni','Sunni'),('Sunni (EK)','Sunni (EK)'),('Sunni (AP)','Sunni (AP)'),('Salafi (KNM)','Salafi (KNM)'),('Salafi (Markaz dawa)','Salafi (Markaz dawa)'),('Salafi (Wisdom)','Salafi (Wisdom)'),('Jamayath Islam ','Jamayath Islam '),('Thableeg Jamath ','Thableeg Jamath '),('Maliki','Maliki'),('Hanafi','Hanafi'),('Sayyid','Sayyid'),('Soofism','Soofism'),('Other','Other'))
    WORKING_AS               = (('NotWorking','Not Working'),('Accountant','Accountant'),('CA','CA'), ('Secretary','Secretary'),('Doctor','Doctor'),('Nurse','Nurse'),('Marketingexecutive','Marketing Executive'),('HRM','HRM'),('Pharmacist','Pharmacist'),('Self employed','Self Employed'),('Parttime','Part Time'),('Professor','Professor'),('Teacher','Teacher'),('Softwaredeveloper','Software Developer'),('Graphicsdesigner','Graphics Designer'),('Administrator','Administrator'),('Business','Business'),('Driver','Driver'),('Coolie','Coolie'),('Farmer','Farmer'),('Consultant', 'Consultant'),('Sales Person','Sales Person'),('Tax Consultant','Tax Consultant'),('Bank Employee', 'Bank Employee'),('Engineer','Engineer'),('Trainer','Trainer'),('Service Advicer','Service Advicer'),('Electrician','Electrician'),('Plumber','Plumber'),('Mechanic','Mechanic'),('Chef','Chef'),('Other','Other'))

    BODYTYPE_CHOICE           = (('slim','Slim'),('Muscular','Muscular'),('Fat','Fat'),('Normal','Normal'))
    LOCATION_CHOICES         =(('Kasaragod','Kasaragod'),('Kannur','Kannur'),('Kozhikode','Kozhikode'),('Wayanad','Wayanad'),('Malappuram','Malappuram'),('Ernakulam','Ernakulam'),('Alappuzha','Alappuzha'),('Idukki','Idukki'),('Kollam','Kollam'),('Kottayam','Kottayam'),('Palakkad','Palakkad'),('Pathanamthitta','Pathanamthitta'),('Thrissur','Thrissur'),('Thiruvananthapuram','Thiruvananthapuram'))

    age_from                      = models.IntegerField(null=True,blank=True)
    age_to                        = models.IntegerField(blank=True,null=True)
    marital_status                = models.CharField(max_length=225,choices=MARITAL_STATUS_CHOICES,null=True,blank=True)
    height_from                   = models.IntegerField(null=True,blank=True)
    height_to                     = models.IntegerField(null=True,blank=True)
    complexion                    = models.CharField(max_length=225,choices=COMPLEXION_CHOICES,null=True,blank=True)
    # physical_status               = models.CharField(max_length=225,choices=PHYSICAL_CHOICE,default="Kasaragod")
    highestEducation              = models.CharField(max_length=225,choices=HIGHESTEDUCATION_CHOICE,null=True,blank=True)
    profession                    = models.CharField(max_length=255,choices=WORKING_AS,null=True,blank=True)
    community                     = models.CharField(max_length=225,choices=COMMUNITY_CHOICES,null=True,blank=True)
    location                      = models.CharField(max_length=255,choices=LOCATION_CHOICES,null=True,blank=True)
    body_type                     = models.CharField(max_length=50,choices=BODYTYPE_CHOICE,blank=True,null=True)
    user                          = models.OneToOneField(User, on_delete = models.CASCADE,null=True,blank=True)
    register                      = models.OneToOneField(Register, on_delete = models.CASCADE,null=True,blank=True)
    user_profile                  = models.OneToOneField(UserProfile, on_delete = models.CASCADE,null=True,blank=True)
    user_location                 = models.OneToOneField(UserLocation, on_delete = models.CASCADE,null=True,blank=True)
    user_profession               = models.OneToOneField(UserProfession, on_delete = models.CASCADE,null=True,blank=True)
    user_family                   = models.OneToOneField(UserFamily, on_delete = models.CASCADE,null=True,blank=True)


    def __st__(self):
        return str(self.user)


class LikedProfile(models.Model):
    liked_by_user                          = models.ForeignKey(User,on_delete= models.CASCADE)
    liked_user                      = models.ForeignKey(UserProfile,on_delete= models.CASCADE)

class PassedProfile(models.Model):
    passed_by_user                   = models.ForeignKey(User,on_delete= models.CASCADE)
    passed_user                      = models.ForeignKey(UserProfile,on_delete= models.CASCADE)
   

class ViewedProfile(models.Model):
    user                          = models.ForeignKey(User,on_delete= models.CASCADE)
    profile                       = models.ForeignKey(UserProfile,on_delete= models.CASCADE)


class Chat(models.Model):
    roome_name    = models.CharField(max_length=128,unique=True)
    chat_user_one = models.IntegerField()
    chat_user_two = models.IntegerField()
    lastUpdated=models.DateTimeField(auto_now=True)

    def __st__(self):
        return str(self.roome_name)
    
    class Meta:
        unique_together = ('chat_user_one', 'chat_user_two',)
        ordering=['-lastUpdated']


class Message(models.Model):
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    message = models.TextField()
    time = models.TimeField(auto_now=True)

    class Meta:
        ordering=['-time']

    def __st__(self):
        return str(self.user)

# ==============

class Subscription(models.Model):

    DURATION_CHOICE_TYPE = (("month","month"),("days","days"))

    plan_title = models.CharField(max_length=128)
    content = HTMLField(blank=True,null=True)
    duration =  models.IntegerField()
    duration_type = models.CharField(max_length=50,choices=DURATION_CHOICE_TYPE)
    price =models.IntegerField()
    date = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.plan_title)


class SubscripedUser(models.Model):
    date = models.DateField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription,on_delete=models.PROTECT)
    subscription_end_date = models.DateField()
    razorpay_payment_id = models.TextField()
    razorpay_order_id = models.TextField()
    razorpay_signature = models.TextField()
    status = models.CharField(max_length=100, default="Open")
    amount = models.IntegerField()

    def __str__(self):
        return str(self.user)




