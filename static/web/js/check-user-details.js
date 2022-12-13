$(document).ready(function(){
    return checkUser();
});

function checkUser(){
    if (localStorage.getItem("token") != null){
        $.ajax({
            url: "https://keralazawaj.com/api/user/user-details-check/",
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
              );
            },
            statusCode: {
                200: function(response) {
                  registerId = response['id']
                  if (response['id'] =! 0){
                    $.ajax({
                      url: "https://keralazawaj.com/api/user/user_details_complete_check/" + registerId + "/",
                      type: "GET",
                      success: function (response) {
                        if (response['user'] == true && response['userProfile'] == false && response['userLocation'] == false && response['userImage'] == false && response['userFamily'] == false && response['userProfession'] == false) {
                            window.location.href="https://keralazawaj.com/register/"+registerId
                        }
                      if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == true && response['userFamily'] == true && response['userProfession'] == true && response['userImage'] == false) {
                          window.location = "https://keralazawaj.com/pic-upload/";
                      }
                      if (response['user'] == false && response['userProfile'] == false && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                        window.location.href="https://keralazawaj.com/register/"+registerId
                      }
                      if (response['user'] == true && response['userProfile'] == false && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                         
                        window.location.href="https://keralazawaj.com/register/"+registerId
                      }
                      if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == false && response['userImage'] == false) {
                        window.location.href="https://keralazawaj.com/register/"+registerId
                      }
                      if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == false && response['userProfession'] == true && response['userImage'] == false) {
                        window.location.href="https://keralazawaj.com/register/"+registerId
                      }
                      if (response['user'] == true && response['userProfile'] == true && response['userLocation'] == false && response['userFamily'] == true && response['userProfession'] == true && response['userImage'] == false) {
                        window.location.href="https://keralazawaj.com/register/"+registerId
                      }

                      }
                    });
                  }
                  else{
                    window.location ="//"
                  }
                
                },
              },
          });
    }
    else{
      window.location.href = "/"
    }
}