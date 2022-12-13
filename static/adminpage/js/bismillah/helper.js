$(document).ready(function(){
  if (localStorage.getItem("admin_token")== null){
    window.location="/official/"
  }
  else{
    $.ajax({
      url: "https://keralazawaj.com/official/api/check_login_user/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("admin_token")
        );
      },
      statusCode: {
          401:function() {
            window.location="/official/"
          },
          200:function(response){
            if((response) == false){
              window.location ="/official/"
            }   
          }
      },
      error: function(jqXHR, textStatus, responseText) {
        },
  });
  }
});

$("#logout").click(function(){
    $.ajax({
        url: "https://keralazawaj.com/official/api/logout/",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        statusCode: {
            403: function(response) {
            },
            200:function(response){                
            },
        },
        success:function(){
            localStorage.removeItem("admin_token")
            window.location="/official/"
        }
    });
});
