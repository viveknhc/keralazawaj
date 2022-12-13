$("#loginForm").validate({
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
            url:"https://keralazawaj.com/api/user/token/",
            type: "POST",
            data: data,
            statusCode: {
                400: function(response) {
                    $("#errorPtagId").html("Invalid Username or Password")
                },
                200:function(response){
                    localStorage.setItem("token",response['token']);
                    window.location="https://keralazawaj.com/dashboard/"
                }
            }
        });
    } 
});

$("#email").keyup(function(){
    $("#errorPtagId").html('')
})