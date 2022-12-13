function passProfile(profId){
    var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
    data = {
        "passed_user" : profId,
        csrfmiddlewaretoken: csrftoken,
    }
    $.ajax({
        url: "https://keralazawaj.com/api/user/user-pass/",
        type: "POST",
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Token " + localStorage.getItem("token")
            );
          },

        statusCode: {
          200: function (response) {
            var userProfId = $("#userProfileIdHid").val();
            var chatUserId = $("#chatUserId").val();
           
          },
          208: function (response) {
            window.location = "register"+'/'+response['id'];
          },
          201: function (response) {        
            window.location = "register"+'/'+response['id'];
          },
          400:function (response) {
              alert("Bad Request")
            },
        },
      });
}