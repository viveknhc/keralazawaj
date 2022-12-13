
$(document).ready(function(){
  $("#txtProfession").hide();
  $("#txtCommunity").hide();
  $("#txtHeight").hide();
  $("#txtEducation").hide();
  $("#txtMartialStatus").hide();
  $("#txtAgeRange").hide();
  $("#txtLocation").hide();
    userId = $("#userId").val();
    PageLoadandUrl("https://keralazawaj.com/api/user/collectprofiles/"+userId);
});

function PageLoadandUrl(url) {
    $.ajax({
      url: url+"/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("token")
        );
      },
      success: function (response) {
          if(response['is_liked'] == true){
            $("#likeDiv").append('<a id="btnLike" class="btn like-btn likedButton  " onclick =likeprofile('+response.user_profile['id']+')> <i class="fas fa-heart-circle hover-active"></i>Liked</a>')
            html = "<ul class='d-flex justify-content-center'>\
            <li class='btns-mob-li'>\
            <a id='btnLike' onclick=(likeprofile("+response.user_profile['id']+"))><i class='fas fa-heart-circle lk-icon'></i></a>\
            </li>\
            <li class='btns-mob-li'>\
            <a id='btnChat' onclick=ChatWithUser("+response.user['id']+")><img src='/static/web/images/icons/Chat 49x51.png' alt='missing'></a>\
            </li>\
            </ul>"
            $("#mob-like-button-div").append(html)
            $('.mob-prof-like-part .lk-icon').css('color', '#bc1758');
          }
          else{
            $("#likeDiv").append('<a type="button" id="btnLike" class="btn like-btn" onclick =likeprofile('+response.user_profile['id']+')> <i class="fas fa-heart-circle"></i><span class="like-title-desk">Like</span></a>')
            html = "<ul class='d-flex justify-content-center'>\
            <li class='btns-mob-li'>\
            <a id='btnLike' onclick=(likeprofile("+response.user_profile['id']+"))><i class='fas fa-heart-circle lk-icon'></i></a>\
            </li>\
            <li class='btns-mob-li'>\
            <a id='btnChat' onclick=ChatWithUser("+response.user['id']+")><img src='/static/web/images/icons/Chat 49x51.png' alt='missing'></a>\
            </li>\
            </ul>"
            $("#mob-like-button-div").append(html)         
          }
        
          $("#likeDiv").append('<button id="btnChat"  type="button" class="btn like-btn-2 passedButton2" onclick=ChatWithUser('+response.user['id']+')><i><img src="/static/web/images/icons/Chat 49x51.png" class="chat-icon-desk" ></i>Chat</button>')
          $("#chatUserId").val(response.user['id'])
          $("#userProfileIdHid").val(response.user_profile['id'])
          $("[id=userfullName]").html(response.user['full_name'])
          $("[id=bismiId]").html(response.user_profile['bismID'])
          age = calculateAge(response.user['dob']) 
          $("#userMartialStatus").html(response.user_profile['status'])
          $("#userLocation").html(response.user_location['current_locality'])
          $("#userAge").html(age)
          $("#userImageOne").attr('src', response.image_one['medium_square_crop'])
          $("#userImageTwo").attr('src', response.image_two['medium_square_crop'])
          $("#userImageThree").attr('src', response.image_three['medium_square_crop'])
          $("#usrNameMob").html(response.user_profile['full_name'])
          $("#usrMartialStatusMob").html(response.user_profile['status'])
          $("#usrLocationMob").html(response.user_location['current_locality'])
          $("#about").html(response.user_location['about'])
          $("#userHeight").html(response.user_profile['height']+' Cm')
          $("#userWieght").html(response.user_profile['weight']+' Kg')
          $("#community").html(response.user_profile['community'])
          $("#bodytype").html(response.user_profile['bodyType'])
          $("#complexion").html(response.user_profile['complexion'])
          $("#motherTongue").html(response.user_profile['motherTongue'])
          $("#physicalStatus").html(response.user_profile['physical_status'])
          $("#performNamaz").html(response.user_profile['perform_namaz'])
          $("#fasting").html(response.user_profile['fasting'])
          if ($(window).width() < 767) { 
          var array=response.user_profile['language_known'].split(",")
          var languageknown=''
          for(var i=0;i<array.length;i++){
            languageknown+=array[i]
            if(i%2==0)
              languageknown+='<br>'
            else
            languageknown+=','


          }
          $("#languageKnown").html(languageknown)}
          else {
            $("#languageKnown").html(response.user_profile['language_known'])
          }
          $("#smokingHabbit").html(response.user_profile['smoking'])
          $("#readingQuran").html(response.user_profile['readQuran'])
          $("#attendIslamicServices").html(response.user_profile['islamic_services'])
          $("#drinkingHabit").html(response.user_profile['drinking'])
          $("#highestEducation").html(response.user_profession['highestEducation'])
          $("#workingWith").html(response.user_profession['working_with'])
          $("#annualIncome").html(response.user_profession['annual_income'])
          $("#specialization").html(response.user_profession['profession'])
          $("#workingAs").html(response.user_profession['working_as'])
          $("#familyType").html(response.user_family['familyType'])
          $("#fathersJob").html(response.user_family['fatherOccupation'])
          $("#numberOfBrothers").html(response.user_family['numberof_brothers'])
          $("#relegion").html(response.user_family['relegion'])
          $("#familyStatus").html(response.user_family['family_status'])
          $("#mothersJob").html(response.user_family['motherOccupation'])
          $("#numberOfSisters").html(response.user_family['numberof_sisters'])
          $("#userSecondaryMobNumber").html(response.user_location['secondary_number'])
          if(response.user_preference != 0){
            if(response.user_preference['age_to'] != null && response.user_preference['age_from'] != null){
              $("#txtAgeRange").show();
              $("#ageRange").html(response.user_preference['age_from']+' Cm to '+response.user_preference['age_to']+' Cm')
            }
            else{
              if(response.user_preference['age_to'] != null){
                $("#txtAgeRange").show();
                $("#ageRange").html(response.user_preference['age_to']+'Cm')
              }
              if(response.user_preference['age_from'] != null){
                $("#txtAgeRange").show();
                $("#ageRange").html(response.user_preference['age_from']+'Cm')

              }
            }
            if(response.user_preference['marital_status'] != null){
              $("#txtMartialStatus").show();
              $("#prefmartialStatus").html(response.user_preference['marital_status'])
              if(response.user_preference['marital_status'] == ''){
                $("#txtMartialStatus").hide();
              }
            }
            if(response.user_preference['highestEducation'] != null){
              $("#txtEducation").show();
              $("#prefhighestEducation").html(response.user_preference['highestEducation'])
            }
            if(response.user_preference['Location'] != null){
              $("#txtLocation").show();
              $("#prefLocation").html(response.user_preference['Location'])
              if (response.user_preference['Location'] == ''){
                $("#txtLocation").hide();
              }
            }
            if(response.user_preference['height_from'] != null && response.user_preference['height_to'] != null){
              $("#txtHeight").show();
              $("#prefHeight").html(response.user_preference['height_from']+' Kg to '+response.user_preference['height_to']+' Kg')
            }
            else{
              if(response.user_preference['height_from'] != null){
                $("#txtHeight").show();
                $("#prefHeight").html(response.user_preference['height_from']+'Kg')
              }
              if(response.user_preference['height_to'] != null){
                $("#txtHeight").show();
                $("#prefHeight").html(response.user_preference['height_to']+'Kg')

              }
            }
            if(response.user_preference['community'] != null){
              $("#txtCommunity").show();
              $("#prefCommunity").html(response.user_preference['community'])
            }
            if(response.user_preference['profession'] != null){
              $("#txtProfession").show();
              $("#prefProfession").html(response.user_preference['profession'])
              if(response.user_preference['profession'] == ''){
                $("#txtProfession").hide();
              }
            }
          }
          else{
            $("#partnerPrefDivId").hide();
          }
          if(response.user_location['relation'] == 'Self'){ 
             $("#primaryTiltle").html('Primary Number'+"<br><span id='userPrimaryNumber'>"+response.user_location['primary_number']+"</span>")     
             $("#primaryTiltle").html('Primary Number'+"<br><span id='userPrimaryMobNumber'>"+response.user_location['primary_number']+"</span>")
           } 
           else{
            $("#primaryTiltle").html(response.user_location['relation']+"<br><span id='userPrimaryNumber'>"+response.user_location['phone_number']+"</span>")
            $("#primaryTiltle").html(response.user_location['relation']+"<br><span id='userPrimaryMobNumber'>"+response.user_location['phone_number']+"</span>")
           }       
           $("#userNativeAddress").html(response.user_location['home_name']+'(h)'+' ,'+response.user_location['native_city']+'<br>'+response.user_location['native_locality']) 
           $("#userCurrentAddress").html(response.user_location['current_home_name']+'(h)'+' ,'+response.user_location['current_city']+'<br>'+response.user_location['current_locality'])         
        },
      error: function (jqXHR) {
        if (jqXHR.startPageIndextus == 404) {
        } else {
        }
      },
    });
  }
