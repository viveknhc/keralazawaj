
$(document).ready(function () {
  $.ajax({
    url:"https://keralazawaj.com/api/user/user-liked-you/",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    success: function (response) {
      var data = [];
      data=[response]
      if(data.length != 0){
        
        const obj = JSON.parse(JSON.stringify(response));
        for(let i = 0; i < obj.length; i++){
            $('#likedprofiles').append("<div class='col-lg-4 col-sm-6 like-box-col my-3'>\
            <div class='card like-box-card'>\
                <a href='/view-profile/"+obj[i].id+"/'>\
                    <img class='card-img-top d-block mx-auto blur-img' src='"+obj[i].image_one['medium_square_crop']+"' alt='Card image cap'>\
                </a>\
                <div class='card-body text-center'>\
                    <a href='/view-profile/"+obj[i].id+"/'>"+obj[i].user_profile['bismID']+"</h5> </a>\
                    <p class='card-text'>"+obj[i].user_location['native_city']+"</p>\
                </div>\
            </div>\
        </div>")
        }
    }
    else{
      $("#likedprofiles").css('height', '100px');
    }
      }
  });
});
