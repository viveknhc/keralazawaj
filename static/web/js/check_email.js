$(document).ready(function(){
    $("#alertBoxdiv").hide();
});

$("#emailCheckForm").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        messages: {
            email: {
                required: "This field is required",
                email: "Please enter a valid email"
            }
        }
    },
    submitHandler: function (form) {
        var email = $("#email").val();
        $("#alertBoxdiv").removeClass('alert alert-danger');
        $("#alertBoxdiv").addClass('alert alert-success');
        $("#alertBoxdiv").empty();
        $("#alertBoxdiv").append('sending... do not close this window');
        $("#alertBoxdiv").show();
        $.ajax({
            url: "https://keralazawaj.com/api/user/check_email/" +email+"/",
            type: "GEt",
            success: function (response) {
                if(response['msg'] == '0'){
                    $("#alertBoxdiv").removeClass('alert alert-success');
                    $("#alertBoxdiv").addClass('alert alert-danger');
                    $("#alertBoxdiv").empty();
                    $("#msgPtag").html('')
                    $("#alertBoxdiv").append('Please enter a valid email!');
                    $("#alertBoxdiv").show();
                }
                else{
                    $("#alertBoxdiv").removeClass('alert alert-danger');
                    $("#alertBoxdiv").addClass('alert alert-success');
                    $("#alertBoxdiv").empty();
                    $("#msgPtag").html('')
                    html = '<a href="/change_password/'+ email +'">' + 'Click here' + "</a><br/>";
                    $("#alertBoxdiv").append('New password has been sent to your email'+"&nbsp;"+html);
                    $("#alertBoxdiv").show();
                }
            }
        });
    }
})


$("#email").keyup(function(){
    $("#alertBoxdiv").hide();
});