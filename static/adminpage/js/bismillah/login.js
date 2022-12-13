$("#loginAdminForm").validate({
    rules:{
        email:{
            required:true,
            email:true,
        },
        password:{
            required:true
        },
        messages:{
            email:{
                required:"This field is required",            
            },
            password:{
                required:"This field is required"
            }
        }
    },
    submitHandler: function (e){
        var email = $('input[name=email]').val();
        var password = $('input[name=password]').val();      
        var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
        data = {
            'email':email,
            'password':password,
            csrfmiddlewaretoken:csrftoken
        } 
        $.ajax({
            url:"https://keralazawaj.com/official/api/login/",
            type: "POST",
            data: data,
            statusCode: {
                400: function(response) {
                    $("#errorPtagId").html("Unable to authenticate with provided credentials")
                },
                200:function(response){
                    localStorage.setItem("admin_token",response['token']);
                    window.location="https://keralazawaj.com/official/dashboard/"
                }
            }
        });
    } 
});