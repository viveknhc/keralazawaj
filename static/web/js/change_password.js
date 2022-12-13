$(document).ready(function () {
    $("#alertBoxdiv").hide();
    $("#btnChangePassword").hide();
});

$("#btnVerify").click(function () {
    var password = $("#currentPassword").val();
    var email = $("#email").val();
    if (password == '') {
        $("#msgPtag").html('This filed is required.')
    }
    else {
        $.ajax({
            url: "https://keralazawaj.com/api/user/check_password/" + email + "/" + password + "/",
            type: "GET",
            success: function (response) {
                console.log(response)
                if (response['msg'] == '0') {
                    $("#alertBoxdiv").removeClass('alert alert-success');
                    $("#alertBoxdiv").addClass('alert alert-danger');
                    $("#alertBoxdiv").empty();
                    $("#msgPtag").html('')
                    $("#alertBoxdiv").append('password is invalid please check your email!');
                    $("#alertBoxdiv").show();
                }
                else {
                    $("#btnVerify").html('Verifying... ')
                    setTimeout(function () {
                        $("#btnVerify").hide();
                        $("#btnChangePassword").show();
                        $("#currentPassword").val('')
                    }, 2000);

                }
            }
        });
    }
});

$("#currentPassword").keyup(function () {
    $("#msgPtag").html('');
    $("#alertBoxdiv").hide();
    $("#alertBoxdiv").empty();

});

$('#btnChangePassword').click(function () {
    var email = $("#email").val();
    var password = $("#currentPassword").val();
    if (password == '') {
        $("#msgPtag").html('This filed is required.')
    }
    else {
        $.ajax({
            url: "https://keralazawaj.com/api/user/change-password/" + email + "/" + password + "/",
            type: "GET",
            statusCode: {
                200: function () {
                    $("#btnChangePassword").html('Updating.');
                    setTimeout(function () {
                        window.location = "/login/"
                    }, 2000);
                },
            },
        });
    }
});
