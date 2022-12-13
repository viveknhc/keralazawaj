function likeprofile(profId){
    
    var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
    data = {
        "liked_user" : profId,
        csrfmiddlewaretoken: csrftoken,
    }
    $.ajax({
        url: "https://keralazawaj.com/api/user/user-like/",
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
            if(response['msg'] == '0'){
              $('#likeDiv').empty();
              $('#likeDiv').append('<a type="button" id="btnLike" class="btn like-btn" onclick =likeprofile('+userProfId+')> <i class="fas fa-heart-circle"></i>Like</a>');
              $("#likeDiv").append('<button id="btnChat"  type="button" class="btn like-btn pass-btn" onclick=ChatWithUser('+chatUserId+')><i><img src="/static/web/images/icons/Chat 49x51.png" class="chat-icon-desk" ></i>Chat</button>')
              $('.mob-prof-like-part .lk-icon').css('color', '#039a00');
              $("#likeDivLi").empty();
              $("#likeDivLi").append('<button id="btnPass"  type="button" class="btn pass-btn passedButton"><i class="fas fa-times-circle close-btn-desktop"></i>Pass</button>')                                     
              $("#likeDivLi").append("<button id='btnLike' type='button' class='btn like-btn' onclick=likeprofile(" + userProfId + ")> <i class='fas fa-heart-circle'></i>Like</button>")
            }
            else{
              $('#likeDiv').empty();
              $('#likeDiv').append('<a type="button" id="btnLike" class="btn like-btn likedButton" onclick =likeprofile('+userProfId+')> <i class="fas fa-heart-circle hover-active"></i>Liked</a>');
              $("#likeDiv").append('<button id="btnChat"  type="button" class="btn like-btn pass-btn" onclick=ChatWithUser('+chatUserId+')><i><img src="/static/web/images/icons/Chat 49x51.png" class="chat-icon-desk" ></i>Chat</button>')
              $('.mob-prof-like-part .lk-icon').css('color', '#bc1758');
              $("#likeDivLi").empty();
              $("#likeDivLi").append('<button id="btnPass"  type="button" class="btn pass-btn passedButton"><i class="fas fa-times-circle close-btn-desktop"></i>Pass</button>')                                     
              $("#likeDivLi").append("<button id='btnLike' type='button' class='btn like-btn' onclick=(likeprofile(" + userProfId + "))> <i class='fas fa-heart-circle hover-active'></i>Liked</button>")
            }
            passProfile(profId)
          },
          208: function (response) {
            passProfile(profId)
            window.location = "register"+'/'+response['id'];
          },
          201: function (response) {  
            passProfile(profId)       
            window.location = "register"+'/'+response['id'];
          },
          400:function (response) {
              alert("Bad Request")
            },
        },
      });
}