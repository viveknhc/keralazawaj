$(document).ready(function () {
  $.ajax({
    url: "https://keralazawaj.com/api/user/getchats/",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    success: function (response) {
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
      else if ($(window).width() > 767) {
        LoadChat(
          response[0].id,
          response[0].chatImage["image_one"]["medium_square_crop"],
          response[0].chatName,response[0].chat_To_user
        );
        }
      
      for (i = 0; i < response.length; i++) {
        var html =
          "<a onclick=LoadChat('" +
          response[i].id +
          "','" +
          response[i].chatImage["image_one"]["medium_square_crop"] +
          "','" +
          response[i].chatName +
           "','" +
          response[i].chat_To_user +
          "') class='card border-0 text-reset'>\
            <div class='card-body'>\
            <div class='row gx-5'>\
            <div class='col-auto'>\
            <div class='avatar'>\
            <img src='" +
          response[i].chatImage["image_one"]["medium_square_crop"] +
          "' alt='#' class='avatar-img'>\
            </div>\
            </div>\
            <div class='col'>\
            <div class='d-flex align-items-center mb-3'>\
            <h5 class='me-auto mb-0'>" +
          response[i].chatName +
          "</h5>\
            <span class='text-muted extra-small ms-2'>" +
          response[i].chatTime +
          "</span>\
            </div>\
            <div class='d-flex align-items-center'>\
            <div class='line-clamp me-auto'>\
           " +
          response[i].lastMessage +
          "\
            </div>\
            </div>\
            </div>\
            </div>\
            </div>\
            </a>";
        $("#ChatList").append(html);
      }
    },
    error: function (jqXHR) {
      if (jqXHR.startPageIndextus == 404) {
      } else {
      }
    },
  });
});

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
  return false;
}
