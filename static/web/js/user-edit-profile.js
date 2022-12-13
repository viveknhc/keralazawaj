$(document).ready(function(){
    let searchParams = new URLSearchParams(window.location.search)
    let param = searchParams.get('lat')
    if (param == 'profile'){
        $("#form-1").hide();
        $("#form-2").hide();
        $("#viewProfilebox").show();
        
        $('#div-btn-2').css('background-color', '#D8F3DC');
        $('#div-btn-1').css('background-color', 'white');
    }
    else{
        $("#form-2").hide();
        $("#form-1").show();
        $("#viewProfilebox").hide();
    
        $('#div-btn-2').css('background-color', 'white');
        $('#div-btn-1').css('background-color', '#D8F3DC');
    }

    if ($(window).width() < 767){
      $('#about').attr('rows', 7);
    }
    else{
      $('#about textarea').attr('rows', 5);
  
    }
  });

$( document ).ready(function(){
    $("#msgDiv1").hide();
    $.ajax({
        url: "https://keralazawaj.com/api/user/check-login-user/",
        type:"GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
      
        success: function (response) {
            $.ajax({
                url: "https://keralazawaj.com/api/user/userProfileDetails/"+response['id']+"/",
                type: "GET",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader(
                    "Authorization",
                    "Token " + localStorage.getItem("token")
                  );
                },
               success: function (response) { 
                    $("#userImageId").val(response['id'])
                    $("#userImageId").attr('src',response.image_one['medium_square_crop'])
                    $("#userFullNameId").html(response.user['full_name'])
                    $("#userEditId").val(response.user['id'])
                    age = calculateAge(response.user['dob']) 
                    $("#userAgeId").html(age+"<sup> <i class='fas fa-heart'></i></sup>")
                    $("#userSatusId").html(response.user_profile['status']+"<sup> <i class='fas fa-heart'></i></sup>")
                    $("#userLocationId").html(response.user_location['current_locality'])
                    $("#about").html(response.user_location['about'])
                    $("#userAboutId").html(response.user_location['about'])
                    $("#userAbout-PhoneId").html(response.user_location['about'])
                    $('input[name=full_name]').val(response.user['full_name'])
                    $('input[name=dob]').val(response.user['dob'])
                    $("#userProfileId").val(response.user_profile['id'])
                    $('select[name=height]').val(response.user_profile['height'])
                    $('select[name=weight]').val(response.user_profile['weight'])
                    $('#id_community').val(response.user_profile['community'])
                    $('select[name=bodyType]').val(response.user_profile['bodyType'])
                    $('#ComplexionPref').val(response.user_profile['complexion'])
                    $('select[name=physical_status]').val(response.user_profile['physical_status'])
                    $('input[name=motherTongue]').val(response.user_profile['motherTongue'])
                    var values = response.user_profile['language_known'];
                    $('.filter-option-inner-inner').empty()
                    $.each(values.split(","), function(i,e){
                        $("#languageKnown option[value='" + e + "']").prop("selected", true);
                        $('.filter-option-inner-inner').append(e+',')
                    });

                    $('select[name=status]').val(response.user_profile['status'])
                    if(response.user_profile['status'] == 'Single'){
                        $('input[name=no_of_children]').prop('disabled', true)
                    }
                    else{
                        $('input[name=no_of_children]').prop('disabled', false)
                    }
                    $('select[name=perform_namaz]').val(response.user_profile['perform_namaz'])
                    $('select[name=readQuran]').val(response.user_profile['readQuran'])
                    $('select[name=fasting]').val(response.user_profile['fasting'])
                    $('select[name=islamic_services]').val(response.user_profile['islamic_services'])
                    $('select[name=smoking]').val(response.user_profile['smoking'])
                    $('select[name=drinking]').val(response.user_profile['drinking'])

                    $('input[name=native_locality]').val(response.user_location['native_locality'])
                    $('input[name=native_city]').val(response.user_location['native_city'])
                    $('input[name=home_name]').val(response.user_location['home_name'])
                    $('#userLocationId').val(response.user_location['id'])

                    $('input[name=current_locality]').val(response.user_location['current_locality'])
                    $('input[name=current_city]').val(response.user_location['current_city'])
                    $('input[name=current_home_name]').val(response.user_location['current_home_name'])
                    $('input[name=pincode]').val(response.user_location['pincode'])
                    $('textarea[name=about]').val(response.user_location['about'])


                    $('input[name=primary_number]').val(response.user_location['primary_number'])
                    $('input[name=secondary_number]').val(response.user_location['secondary_number'])
                    $('input[name=preffered_person]').val(response.user_location['preffered_person'])
                    $('select[name=relation]').val(response.user_location['relation'])
                    $('input[name=phone_number]').val(response.user_location['phone_number'])

                    $('select[name=highestEducation]').val(response.user_profession['highestEducation'])
                    $('select[name=Profession]').val(response.user_profession['profession'])
                    $('#Profession').val(response.user_profession['profession'])
                    $('select[name=working_with]').val(response.user_profession['working_with'])
                    $('select[name=working_as]').val(response.user_profession['working_as'])
                    $('input[name=annual_income]').val(response.user_profession['annual_income'])
                    $('#userProfessionId').val(response.user_profession['id'])

                    $('select[name=familyType]').val(response.user_family['familyType'])
                    $('select[name=family_status]').val(response.user_family['family_status'])
                    $('select[name=fatherOccupation]').val(response.user_family['fatherOccupation'])
                    $('select[name=motherOccupation]').val(response.user_family['motherOccupation'])
                    $('input[name=numberof_brothers]').val(response.user_family['numberof_brothers'])
                    $('input[name=numberof_sisters]').val(response.user_family['numberof_sisters'])
                    $('select[name=relegion]').val(response.user_family['relegion'])  
                    $('#userFamilyId').val(response.user_family['id'])

                    // ----------viewprofeile section---------------------------------

                    // $("#userImageId").attr('src',response.image_one['medium_square_crop'])
                    $("#userEditId").val(response.user['id'])

                    $("#viewFullname").html(response.user['full_name'])
                    $("#viewdob").html(response.user['dob'])
                    $("#viewHeight").html(response.user_profile['height'])
                    $("#viewWeight").html(response.user_profile['weight'])
                    $('#viewCommunity').html(response.user_profile['community'])
                    $('#viewBodytype').html(response.user_profile['bodyType'])
                    $('#viewComplexion').html(response.user_profile['complexion'])
                    $('#viewStatus').html(response.user_profile['status'])
                    if(response.user_profile['status'] == 'Single'){
                        $('#viewNumberOfChildren').prop('disabled', true)
                    }
                    else{
                        $('#viewNumberOfChildren').prop('disabled', false)
                    }
                    $('#viewPhysicalStatus').html(response.user_profile['physical_status'])
                    $('#viewMotherTongue').html(response.user_profile['motherTongue'])

                    
                    var values = response.user_profile['language_known'];
                    $('.filter-option-inner-inner').empty()
                    $.each(values.split(","), function(i,e){
                        $("#languageKnown option[value='" + e + "']").prop("selected", true);
                        $('.filter-option-inner-inner').append(e+',')
                    });

                    $('#viewperformNamaz').html(response.user_profile['perform_namaz'])
                    $('#viewReadingQuran').html(response.user_profile['readQuran'])
                    $('#viewFasting').html(response.user_profile['fasting'])
                    $('#viewIslamicService').html(response.user_profile['islamic_services'])
                    $('#viewSmoking').html(response.user_profile['smoking'])
                    $('#viewDrinking').html(response.user_profile['drinking'])

                    $('#viewNativeLocality').html(response.user_location['native_locality'])
                    $('#viewNativeCity').html(response.user_location['native_city'])
                    $('#viewNativeHome').html(response.user_location['home_name'])

                    $('#viewCurrentLocality').html(response.user_location['current_locality'])
                    $('#viewCurrentCity').html(response.user_location['current_city'])
                    $('#viewCurrentHome').html(response.user_location['current_home_name'])
                    $('#viewPincode').html(response.user_location['pincode'])
                    $('#viewPrimaryNumber').html(response.user_location['primary_number'])
                    $('#viewSecondaryNumber').html(response.user_location['secondary_number'])
                    $('#viewPrefferedPerson').html(response.user_location['preffered_person'])
                    $('#viewRelation').html(response.user_location['relation'])
                    $('#viewNumber').html(response.user_location['phone_number'])
                    
                    $('#viewHighestEducation').html(response.user_profession['highestEducation'])
                    $('#viewProfession').html(response.user_profession['profession'])
                    $('#viewWorkingWith').html(response.user_profession['working_with'])
                    $('#viewWorkinas').html(response.user_profession['working_as'])
                    $('#viewAnnualincome').html(response.user_profession['annual_income'])
                    
                    $('#viewFamilyType').html(response.user_family['familyType'])
                    $('#viewFamilyStatus').html(response.user_family['family_status'])
                    $('#viewFatherJob').html(response.user_family['fatherOccupation'])
                    $('#viewMotherJob').html(response.user_family['motherOccupation'])
                    $('#viewNumberofBrothers').html(response.user_family['numberof_brothers'])
                    $('#viewNumberofSisters').html(response.user_family['numberof_sisters'])
                    $('#viewReligionInterest').html(response.user_family['relegion'])
                    $('#viewLanguageKnown').html(response.user_profile['language_known'])

                    

                    $('#viewAbout').html(response.user_location['about'])
                }
            });
        },
        error:function(jqXHR,responseText){
        }
    });
});


$("#userEditForm").submit(function(e){
    e.preventDefault();
    var user_id = $('#userProfileId').val()
    var user_location_id = $('#userLocationId').val()
    var user_Profession_id = $('#userProfessionId').val()
    var user_Family_id = $('#userFamilyId').val()
    var user_Details_id = $("#userEditId").val()
    var height = $('select[name=height]').val()
    var weight = $('select[name=weight]').val()
    var community = $('select[name=community]').val()
    var bodyType = $('select[name=bodyType]').val()
    var complexion = $('#ComplexionPref').val()
    var physical_status = $('select[name=physical_status]').val()
    var status = $('select[name=status]').val()
    var smoking = $('select[name=smoking]').val()
    var drinking = $('select[name=drinking]').val()
    var numberof_children = $('input[name=no_of_children]').val()
    var motherTongue = $('input[name=motherTongue]').val()

    var perform_namaz = $('select[name=perform_namaz]').val()
    var readQuran = $('select[name=readQuran]').val()
    var fasting = $('select[name=fasting]').val()
    var islamic_services = $('select[name=islamic_services]').val()

    
    var native_locality = $('input[name=native_locality]').val()
    var native_city = $('input[name=native_city]').val()
    var home_name = $('input[name=home_name]').val()

    var current_locality = $('input[name=current_locality]').val()
    var current_city = $('input[name=current_city]').val()
    var current_home_name = $('input[name=current_home_name]').val()
    var pincode = $('input[name=pincode]').val()
    var about = $('textarea[name=about]').val()

    var primary_number = $('input[name=primary_number]').val()
    var secondary_number = $('input[name=secondary_number]').val()
    var preffered_person = $('input[name=preffered_person]').val()
    var relation = $('select[name=relation]').val()
    var phone_number = $('input[name=phone_number]').val()

    var highestEducation = $('select[name=highestEducation]').val()
    var profession = $('select[name=Profession]').val()
    
    var working_with = $('select[name=working_with]').val()
    var working_as = $('select[name=working_as]').val()
    var annual_income = $('input[name=annual_income]').val()


    var familyType = $('select[name=familyType]').val()
    var family_status = $('select[name=family_status]').val()
    var fatherOccupation = $('select[name=fatherOccupation]').val()
    var motherOccupation = $('select[name=motherOccupation]').val()
    var numberof_brothers = $('input[name=numberof_brothers]').val()
    var numberof_sisters = $('input[name=numberof_sisters]').val()
    var relegion = $('select[name=relegion]').val();
    var language_known = $('#languageKnown').val();
    var full_name = $('input[name=full_name]').val();
    var dob = $('input[name=dob]').val();

    userProfileData = {
        'no_of_children':numberof_children,
        'height': height,
        'weight': weight,
        'community': community,
        'status': status,
        'bodyType': bodyType,
        'physical_status' : physical_status,
        'motherTongue' : motherTongue,
        'language_known' : language_known,
        'readQuran' : readQuran,
        'islamic_services' : islamic_services,
        'complexion' : complexion,
        'perform_namaz' : perform_namaz,
        'fasting' : fasting,
        'smoking' : smoking,
        'drinking' : drinking

    }
    $.ajax({
        url: "https://keralazawaj.com/api/user/userprofile/"+user_id+"/",
        type: "PUT",
        data: userProfileData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        statusCode: {
            200: function (response) {   
            },
        },
        error:function(jqXHR,responseText){
            alert(jqXHR,responseText)
        }
    });

    userLocationdataData = {
        'current_home_name':current_home_name,
        'current_city': current_city,
        'current_locality': current_locality,
        'home_name': home_name,
        'native_city': native_city,
        'native_locality': native_locality,
        'primary_number' : primary_number,
        'secondary_number' : secondary_number,
        'preffered_person' : preffered_person,
        'relation': relation,
        'phone_number' : phone_number,
        'pincode' : pincode,
        'about': about,
        
    }
    $.ajax({
        url: "https://keralazawaj.com/api/user/userlocation/"+user_location_id+"/",
        type: "PUT",
        data: userLocationdataData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        statusCode: {
            200: function (response) {   
            },
        },
        error:function(jqXHR,responseText){
            alert(jqXHR,responseText)
        }
    });
    userProfessionData = {
        'highestEducation':highestEducation,
        'profession': profession,
        'working_with': working_with,
        'working_as': working_as,
        'annual_income': annual_income,   
    }
   
    $.ajax({
        url: "https://keralazawaj.com/api/user/userprofession/"+user_Profession_id+"/",
        type: "PUT",
        data: userProfessionData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        statusCode: {
            200: function (response) {   
            },
        },
        error:function(jqXHR,responseText){
            alert(jqXHR,responseText)
        }
    });

    userFamilyData = {
        'familyType':familyType,
        'relegion': relegion,
        'fatherOccupation': fatherOccupation,
        'motherOccupation': motherOccupation,
        'numberof_brothers': numberof_brothers,   
        'numberof_sisters': numberof_sisters,
        'family_status': family_status,
    }
    
    $.ajax({
        url: "https://keralazawaj.com/api/user/userfamily/"+user_Family_id+"/",
        type: "PUT",
        data: userFamilyData,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        statusCode: {
            200: function (response) {   
            },
        },
        error:function(jqXHR,responseText){
            alert(jqXHR,responseText)
        }
    });

    user_data={
        "full_name":full_name,
        "dob":dob,
    }
    $.ajax({
        url: "https://keralazawaj.com/api/user/user-edit/"+user_Details_id+"/",
        type: "PUT",
        data: user_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        success:function(){
        $.ajax({ 
        url: "https://keralazawaj.com/api/user/check-login-user/",
        type:"GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
            );
        },
      
        success: function (response) {
            $.ajax({
                url: "https://keralazawaj.com/api/user/userProfileDetails/"+response['id']+"/",
                type: "GET",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader(
                    "Authorization",
                    "Token " + localStorage.getItem("token")
                  );
                },
               success: function (response) { 
                    $("#userImageId").val(response['id'])
                    $("#userImageId").attr('src',response.image_one['medium_square_crop'])
                    $("#userFullNameId").html(response.user['full_name'])
                    $("#userEditId").val(response.user['id'])
                    age = calculateAge(response.user['dob']) 
                    $("#userAgeId").html(age+"<sup> <i class='fas fa-heart'></i></sup>")
                    $("#userSatusId").html(response.user_profile['status']+"<sup> <i class='fas fa-heart'></i></sup>")
                    $("#userLocationId").html(response.user_location['current_locality'])
                    $("#about").html(response.user_location['about'])
                    $("#userAboutId").html(response.user_location['about'])
                    $("#userAbout-PhoneId").html(response.user_location['about'])
                    $('input[name=full_name]').val(response.user['full_name'])
                    $('input[name=dob]').val(response.user['dob'])
                    $("#userProfileId").val(response.user_profile['id'])
                    $('select[name=height]').val(response.user_profile['height'])
                    $('select[name=weight]').val(response.user_profile['weight'])
                    $('#id_community').val(response.user_profile['community'])
                    $('select[name=bodyType]').val(response.user_profile['bodyType'])
                    $('#ComplexionPref').val(response.user_profile['complexion'])
                    $('select[name=physical_status]').val(response.user_profile['physical_status'])
                    $('input[name=motherTongue]').val(response.user_profile['motherTongue'])
                    var values = response.user_profile['language_known'];
                    $('.filter-option-inner-inner').empty()
                    $.each(values.split(","), function(i,e){
                        $("#languageKnown option[value='" + e + "']").prop("selected", true);
                        $('.filter-option-inner-inner').append(e+',')
                    });

                    $('select[name=status]').val(response.user_profile['status'])
                    if(response.user_profile['status'] == 'Single'){
                        $('input[name=no_of_children]').prop('disabled', true)
                    }
                    else{
                        $('input[name=no_of_children]').prop('disabled', false)
                    }
                    $('select[name=perform_namaz]').val(response.user_profile['perform_namaz'])
                    $('select[name=readQuran]').val(response.user_profile['readQuran'])
                    $('select[name=fasting]').val(response.user_profile['fasting'])
                    $('select[name=islamic_services]').val(response.user_profile['islamic_services'])
                    $('select[name=smoking]').val(response.user_profile['smoking'])
                    $('select[name=drinking]').val(response.user_profile['drinking'])

                    $('input[name=native_locality]').val(response.user_location['native_locality'])
                    $('input[name=native_city]').val(response.user_location['native_city'])
                    $('input[name=home_name]').val(response.user_location['home_name'])
                    $('#userLocationId').val(response.user_location['id'])

                    $('input[name=current_locality]').val(response.user_location['current_locality'])
                    $('input[name=current_city]').val(response.user_location['current_city'])
                    $('input[name=current_home_name]').val(response.user_location['current_home_name'])
                    $('input[name=pincode]').val(response.user_location['pincode'])
                    $('textarea[name=about]').val(response.user_location['about'])


                    $('input[name=primary_number]').val(response.user_location['primary_number'])
                    $('input[name=secondary_number]').val(response.user_location['secondary_number'])
                    $('input[name=preffered_person]').val(response.user_location['preffered_person'])
                    $('select[name=relation]').val(response.user_location['relation'])
                    $('input[name=phone_number]').val(response.user_location['phone_number'])

                    $('select[name=highestEducation]').val(response.user_profession['highestEducation'])
                    $('select[name=Profession]').val(response.user_profession['profession'])
                    $('#Profession').val(response.user_profession['profession'])
                    $('select[name=working_with]').val(response.user_profession['working_with'])
                    $('select[name=working_as]').val(response.user_profession['working_as'])
                    $('input[name=annual_income]').val(response.user_profession['annual_income'])
                    $('#userProfessionId').val(response.user_profession['id'])

                    $('select[name=familyType]').val(response.user_family['familyType'])
                    $('select[name=family_status]').val(response.user_family['family_status'])
                    $('select[name=fatherOccupation]').val(response.user_family['fatherOccupation'])
                    $('select[name=motherOccupation]').val(response.user_family['motherOccupation'])
                    $('input[name=numberof_brothers]').val(response.user_family['numberof_brothers'])
                    $('input[name=numberof_sisters]').val(response.user_family['numberof_sisters'])
                    $('select[name=relegion]').val(response.user_family['relegion'])  
                    $('#userFamilyId').val(response.user_family['id'])

                    // ----------viewprofeile section---------------------------------

                    // $("#userImageId").attr('src',response.image_one['medium_square_crop'])
                    $("#userEditId").val(response.user['id'])

                    $("#viewFullname").html(response.user['full_name'])
                    $("#viewdob").html(response.user['dob'])
                    $("#viewHeight").html(response.user_profile['height'])
                    $("#viewWeight").html(response.user_profile['weight'])
                    $('#viewCommunity').html(response.user_profile['community'])
                    $('#viewBodytype').html(response.user_profile['bodyType'])
                    $('#viewComplexion').html(response.user_profile['complexion'])
                    $('#viewStatus').html(response.user_profile['status'])
                    if(response.user_profile['status'] == 'Single'){
                        $('#viewNumberOfChildren').prop('disabled', true)
                    }
                    else{
                        $('#viewNumberOfChildren').prop('disabled', false)
                    }
                    $('#viewPhysicalStatus').html(response.user_profile['physical_status'])
                    $('#viewMotherTongue').html(response.user_profile['motherTongue'])

                    
                    var values = response.user_profile['language_known'];
                    $('.filter-option-inner-inner').empty()
                    $.each(values.split(","), function(i,e){
                        $("#languageKnown option[value='" + e + "']").prop("selected", true);
                        $('.filter-option-inner-inner').append(e+',')
                    });

                    $('#viewperformNamaz').html(response.user_profile['perform_namaz'])
                    $('#viewReadingQuran').html(response.user_profile['readQuran'])
                    $('#viewFasting').html(response.user_profile['fasting'])
                    $('#viewIslamicService').html(response.user_profile['islamic_services'])
                    $('#viewSmoking').html(response.user_profile['smoking'])
                    $('#viewDrinking').html(response.user_profile['drinking'])

                    $('#viewNativeLocality').html(response.user_location['native_locality'])
                    $('#viewNativeCity').html(response.user_location['native_city'])
                    $('#viewNativeHome').html(response.user_location['home_name'])

                    $('#viewCurrentLocality').html(response.user_location['current_locality'])
                    $('#viewCurrentCity').html(response.user_location['current_city'])
                    $('#viewCurrentHome').html(response.user_location['current_home_name'])
                    $('#viewPincode').html(response.user_location['pincode'])
                    $('#viewPrimaryNumber').html(response.user_location['primary_number'])
                    $('#viewSecondaryNumber').html(response.user_location['secondary_number'])
                    $('#viewPrefferedPerson').html(response.user_location['preffered_person'])
                    $('#viewRelation').html(response.user_location['relation'])
                    $('#viewNumber').html(response.user_location['phone_number'])
                    
                    $('#viewHighestEducation').html(response.user_profession['highestEducation'])
                    $('#viewProfession').html(response.user_profession['profession'])
                    $('#viewWorkingWith').html(response.user_profession['working_with'])
                    $('#viewWorkinas').html(response.user_profession['working_as'])
                    $('#viewAnnualincome').html(response.user_profession['annual_income'])
                    
                    $('#viewFamilyType').html(response.user_family['familyType'])
                    $('#viewFamilyStatus').html(response.user_family['family_status'])
                    $('#viewFatherJob').html(response.user_family['fatherOccupation'])
                    $('#viewMotherJob').html(response.user_family['motherOccupation'])
                    $('#viewNumberofBrothers').html(response.user_family['numberof_brothers'])
                    $('#viewNumberofSisters').html(response.user_family['numberof_sisters'])
                    $('#viewReligionInterest').html(response.user_family['relegion'])
                    $('#viewLanguageKnown').html(response.user_profile['language_known'])

                    

                    $('#viewAbout').html(response.user_location['about'])
                }
            });
        },
        error:function(jqXHR,responseText){
        }
    });

        },
        statusCode: {
            200: function (response) {   
            },
        },
        error:function(jqXHR,responseText){
            alert(jqXHR,responseText)
        }
    });
    $("#msgDiv1").empty();
    $("#msgDiv1").show();
    $("#msgDiv1").append('Updated Successfully.')
    setTimeout(function () {
        $("#msgDiv1").hide();
        $("#msgDiv1").append('')
    }, 2500);

});

$("#status").change(function(){
    if($(this).val() == 'Single'){
        $('input[name=no_of_children]').prop('disabled', true)
    }
    else{
        $('input[name=no_of_children]').prop('disabled', false)
    }
});



$("#editImg").click(function(){
    var id = $("#userImageId").val();
    window.location = "/edit-profilepic/"+id+"/"
})