$(document).ready(function(){
    checkSubscripeduser()
  for (let i = 60; i < 261; i++) {
        $("#height").append('<option value="'+i+'">'+i +'cm'+'</option>')
        
        
      }
      for (let i = 30; i < 130; i++) {
        $("#weight").append('<option value="'+i+'">'+i +'kg'+'</option>')
        
      }
});

function calculateAge(dob) {
    var str = dob.split('-');
    var firstdate = new Date(str[0], str[1], str[2]);
    var today = new Date();
    var dayDiff = Math.ceil(today.getTime() - firstdate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    var age = parseInt(dayDiff);
    return (age)
}
function viewProfile(id) {
    window.location = "https://keralazawaj.com/view-profile/" + id + "/";
}

function userDetailsCompleteCheck(id) {
    $.ajax({
        url: "https://keralazawaj.com/api/user/user_details_complete_check/" + id + "/",
        type: "GET",
        success: function (response) {
            if (response['token'] != 0){
                localStorage.setItem("token", response['token']);
            }
            if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == true && response['userImage'] == true && response['userFamily'] == true && response['userProfession'] == true) {
                window.location = "https://keralazawaj.com/login/";
            }
            if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == true && response['userFamily'] == true && response['userProfession'] == true && response['userImage'] == false) {
                window.location = "https://keralazawaj.com/pic-upload/";
            }
            if (response['user'] == false && response['userProfile'] == false && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                $("#divProfesionH4Div").hide();
                $("#userDetailsH4div").hide();
                $("#userDetailsH4div1").hide();
                $("#userProfileDetailsDiv").hide();
                $("#divProfesionH4Div").hide();
                $("#divProfesionH4Div1").hide();
                $("#divProfeesionForm").hide();
                $("#familyH4Div").hide();
                $("#familyH4Div1").hide();
                $("#userFamilyFormDiv").hide();
                $("#userLocationAndConactDeatilsDiv").hide()
                $("#userLocationAndConactDeatilsH4").hide()
                $("#userLocationAndConactDeatilsH41").hide()
                $("#userLocationAndConactDeatilsDiv1").hide()
            }
            if (response['user'] == true && response['userProfile'] == false && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                $("#divProfesionH4Div").hide();
                $("#userDetailsDiv").hide();
                $("#userDetailsH4div").show();
                $("#userDetailsH4div1").show();
                $("#userProfileDetailsDiv").show();
                $("#divProfesionH4Div").hide();
                $("#divProfesionH4Div1").hide();
                $("#divProfeesionForm").hide();
                $("#familyH4Div").hide();
                $("#familyH4Div1").hide();
                $("#userFamilyFormDiv").hide();
                $("#userLocationAndConactDeatilsDiv").hide()
                $("#userLocationAndConactDeatilsH4").hide()
                $("#userLocationAndConactDeatilsH41").hide()
                $("#userLocationAndConactDeatilsDiv1").hide()
                
            }
            if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                $("#divProfesionH4Div").hide();
                $("#userDetailsDiv").hide();
                $("#userDetailsH4div").hide();
                $("#userDetailsH4div1").hide();
                $("#userProfileDetailsDiv").hide();
                $("#divProfesionH4Div").show();
                $("#divProfesionH4Div1").show();
                $("#divProfeesionForm").show();
                $("#familyH4Div").hide();
                $("#familyH4Div1").hide();
                $("#userFamilyFormDiv").hide();
                $("#userLocationAndConactDeatilsDiv").hide()
                $("#userLocationAndConactDeatilsH4").hide()
                $("#userLocationAndConactDeatilsH41").hide()
                $("#userLocationAndConactDeatilsDiv1").hide()
            }
            if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == true && response['userImage'] == false) {
                $("#divProfesionH4Div").hide();
                $("#userDetailsDiv").hide();
                $("#userDetailsH4div").hide();
                $("#userDetailsH4div1").hide();
                $("#userProfileDetailsDiv").hide();
                $("#divProfesionH4Div").hide();
                $("#divProfesionH4Div1").hide();
                $("#divProfeesionForm").hide();
                $("#familyH4Div").show();
                $("#familyH4Div1").show();
                $("#userFamilyFormDiv").show();
                $("#userLocationAndConactDeatilsDiv").hide()
                $("#userLocationAndConactDeatilsH4").hide()
                $("#userLocationAndConactDeatilsH41").hide()
                $("#userLocationAndConactDeatilsDiv1").hide()
            }
            if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == true && response['userProfession'] == true && response['userImage'] == false) {
                $("#divProfesionH4Div").hide();
                $("#userDetailsDiv").hide();
                $("#userDetailsH4div").hide();
                $("#userDetailsH4div1").hide();
                $("#userProfileDetailsDiv").hide();
                $("#divProfesionH4Div").hide();
                $("#divProfesionH4Div1").hide();
                $("#divProfeesionForm").hide();
                $("#familyH4Div").hide();
                $("#familyH4Div1").hide();
                $("#userFamilyFormDiv").hide();
                $("#userLocationAndConactDeatilsDiv").show()
                $("#userLocationAndConactDeatilsH4").show()
                $("#userLocationAndConactDeatilsH41").show()
                $("#userLocationAndConactDeatilsDiv1").show()
            }
            
        }
        });
}

function scrollToProfessionFrom(){
    $('html, body').animate({
        scrollTop: $("#divProfesionH4Div").offset().top
    }, 10);
       
}

function checkSubscripeduser(){
    $.ajax ({
        url:"/official/api/check-subscripeduser/",
        type:"GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Token " + localStorage.getItem("token")
            );
          },
        statusCode: {
            200: function(response) {
                console.log("This is the response from check-subscipeduser -- : ", response)
                if(response == 404){
                    $(".likes").attr("href" ,"/subscription-plans-view/")
                    $(".matches").attr("href" ,"/subscription-plans-view/")
                    $(".chats").attr("href" ,"/subscription-plans-view/")
                }
                else{
                    $(".likes").attr("href" ,"/like-premium/")
                    $(".matches").attr("href" ,"/matches-premium/")
                    $(".chats").attr("href" ,"/chat-direct/")
                }
            },
            404: function(response){
                
                // $("[id=premieumsubscrptn]").hide()
            }
        },
    });
}