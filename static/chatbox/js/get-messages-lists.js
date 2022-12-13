$(document).ready(function(){
  if ($(window).width() < 767){
    var id = GetURLParameter("id");
        if (id) {
          $.ajax({
            url: "https://keralazawaj.com/api/user/getchats/?chatuser=" + id,
            type: "GET",
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("token")
              );
            },
            statusCode: {
              400: function (response) {
              },
              200: function (response) {
                LoadChat(
                  response.id,
                  response.chatImage["image_one"]["medium_square_crop"],
                  response.chatName,
                  response.chat_To_user
                );
              },
            },
          });
        }
        else{
            $('#leftPanel').show()
            $('#messageView').hide()
        }
    
  }
})
function LoadChat(roomID, HeaderImage, HeaderName,chatToUser) {
  if ($(window).width() < 767){
    $('#leftPanel').hide()
    $('#messageView').show()
  }
  $("#roomID").val(roomID);
  $("#chatToUser").val(chatToUser);
  $.ajax({
    url: "https://keralazawaj.com/api/user/getMessages/?roomID=" + roomID,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    success: function (response) {
      $("#Messages").html("");
      $("#HeaderImage").html(
        `<img class="avatar-img" src="` + HeaderImage + `" alt="">`
      );
      $("#HeaderName").html(HeaderName);
      for (i = 0; i < response.length; i++) {
        var html = "";
        if (response[i].is_owner) {
          html =
            `<div class="message message-out">
              <a href="#" data-bs-toggle="modal" data-bs-target="#modal-profile" class="avatar avatar-responsive">
              <img class="avatar-img" src="` +
            response[i].chatImage["image_one"]["medium_square_crop"] +
            `" alt="">
              </a>
              
              <div class="message-inner">
              <div class="message-body">
              <div class="message-content">
              <div class="message-text">
              <p>` +
            response[i].message +
            `</p>
              </div>
              </div>
              </div>
              
              <div class="message-footer">
              <span class="extra-small text-muted">` +
            response[i].time_formated +
            `</span>
              </div>
              </div>
              </div>`;
        } else {
          html =
            `<div class="message">
            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-user-profile" class="avatar avatar-responsive">
            <img class="avatar-img" src="` +
            response[i].chatImage["image_one"]["medium_square_crop"] +
            `" alt="">
            </a>
            
            <div class="message-inner">
            <div class="message-body">
            <div class="message-content">
            <div class="message-text">
            <p>` +
            response[i].message +
            `</p>
            </div>
            </div>
            </div>
            
            <div class="message-footer">
            <span class="extra-small text-muted">` +
            response[i].time_formated +
            `</span>
            </div>
            </div>
            </div>`;
        }

        $("#Messages").append(html);
      }
    },
    error: function (jqXHR) {
      if (jqXHR.startPageIndextus == 404) {
      } else {
      }
    },
  });
}

$("#chatForm").submit(function(){
  var roomID = $("#roomID").val();
  var chatToUser = $("#chatToUser").val();
  var message = $("#messageText").val();
  if (message != "") {
    sendMessageToServer(roomID,message,chatToUser)
  }
  return false;
})

function sendMessageToServer(roomID, message,chatToUser) {
  
      data={
        "chat":roomID,
        "message":message,
      }
      $.ajax({
        url: "https://keralazawaj.com/api/user/getMessages/",
        type: "POST",
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        statusCode: {
          400: function (response) {
          },
          201: function (response) {
            window.location = "https://keralazawaj.com/chat-direct/?id=" + chatToUser;
          },
        },
        
      });
      return false;
    }




function showchatListmb(){
  $('#leftPanel').show()
  $('#messageView').hide()
}


