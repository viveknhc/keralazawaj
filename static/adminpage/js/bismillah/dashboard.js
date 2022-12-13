$(document).ready(function(){
    $.ajax({
        url: "https://keralazawaj.com/official/api/user-data/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            $("#todayReg").html(response['todays_registration'])
            $("#females").html(response['female'])
            $("#males").html(response['male'])
            $("#matches").html(response['total'])


        }
    });
});