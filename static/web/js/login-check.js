$(document).ready(function() {
    $.ajax({
        url : 'https://keralazawaj.com/api/user/check-login/',
        type : 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Token " + localStorage.getItem("token")
            );
          },
        statusCode: {
            401: function(response) {
                window.location = "https://keralazawaj.com/login/"
            },
        },

    });
});