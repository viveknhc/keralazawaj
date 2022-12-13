
$(document).ready(function () {
  $("#registerForm").validate({
    // initialize the plugin
    rules: {
      profileFor: {
        required: true,
      },
      fullName: {
        required: true,
      },
      mobileNumber: {
        required: true,
        minlength: 10,
      },
      messages: {
        profileFor: "This field is required",
        fullName: {
          required: "This filed is required",
        },
        mobileNumber: {
          required: "This field is required",
          minlength: "Username must be 5 characters long",
        },
      },
    },

    submitHandler: function (form) {
      userName = $("#fullName").val();
      profileFor = $("#profileFor").val();
      mobileNumber = $("#mobileNumber").val();
      var csrftoken = $('[name="csrfmiddlewaretoken"]').val();

      (data = {
        profile_for: profileFor,
        name: userName,
        mobile_number: mobileNumber,
        csrfmiddlewaretoken: csrftoken,
      }),
        $.ajax({
          url: "https://keralazawaj.com/api/user/register/",
          type: "POST",
          data: data,

          statusCode: {
            208: function (response) {
              window.location = "register"+'/'+response['id'];
            },
            201: function (response) {
              window.location = "register"+'/'+response['id'];
            },
            400:function (response) {
                // alert("Bad Request")
              },
          },
        });
    },
  });
});

$("#mobileNumber").keyup(function () {
  $("#errorId").html("");
});
