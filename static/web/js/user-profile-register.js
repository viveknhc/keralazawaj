
$(document).ready(function(){
  if ($(window).width() < 767){
    $('#about').attr('rows', 7);
  }
  else{
    $('#about textarea').attr('rows', 5);
  }
});
$(document).ready(function(){
  $("#noOfChildrenDiv").hide();
  $("#divId").hide();
  $("#div2Id").show();
  var id = $("#register").val();
  return userDetailsCompleteCheck(id)
});

// ################################### USER  DETAILS ###############################


$(document).ready(function(){
    $("#userDetailsForm").validate({
        rules: {
          full_name: {
            required: true,
          },
          dob: {
            required: true,
            date:true,
          },
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength : 3
          },
          conformPassword: {
            required: true,
            equalTo:"#password"
          },
          messages: {
            fullName: {
              required: "This filed is required",
            },
            dob: {
              required: "This field is required",
              date: "Invalid date format",
            },
            email:{
                required:"This field is required",
                email:"Invalid email address"
            },
            password:{
                required:"This field is required",
                minlength:"Password length must be atleast 3 characters"
            },
            conformPassword:{
              required:"This field is required",
              equalTo:"password mismatch"
          },
        
          },
        },
        submitHandler: function (form) {
            var datas = $(form).serializeArray();
            $.ajax({
              url: "https://keralazawaj.com/api/user/create/",
              type: "POST",
              data: datas,
              statusCode: {
              400: function (response) {
                $("#alertId").html('you have already registered please login..')
              },
             
              201: function (response) {
                var csrftoken = $('[name="csrfmiddlewaretoken"]').val();
                data = {
                  'email':$("#email").val(),
                  'password':$("#password").val(),
                  csrfmiddlewaretoken:csrftoken
                }
                $.ajax({
                  url: "https://keralazawaj.com/api/user/token/",
                  type: "POST",
                  data:data,
                  statusCode: {
                    200: function (response) {
                      localStorage.setItem("token", response['token']);
                      $("#userDetailsDiv").hide();
                      $("#userDetailsH4div").show();
                      $("#userDetailsH4div1").show();
                      $("#userProfileDetailsDiv").show();
                      var userEmail = $("#email").val();
                      $.ajax({
                        url: "https://keralazawaj.com/api/user/send-mail/"+userEmail+"/",
                        type: "GET",
                        statusCode: {
                          200: function (response) {
                          },
                        },
                      
                      })
                    },
                    400:function(response){
                      $("#alertId").html(response)
                    }
                
                  },
                
                })
              },             
              },
              // error:function(jqXHR,responseText){
              //   alert(jqXHR,responseText)
              // }
            });
        },
      });
});

// ################################### USER PROFILE DETAILS ###############################
$(document).ready(function(){
  $("#userProfileForm").validate({
      rules: {
        height: {
          required: true,
        },
        weight: {
          required: true,
        },
        no_of_children:{
          required:true,
        },
        community: {
          required: true,
        },
        status: {
          required: true,
        },
        bodyType:{
          required: true,
        },
        physical_status:{
          required:true,
        },
        motherTongue:{
          required:true,
        },
        readQuran:{
          required:true,
        },
        islamic_services:{
          required:true,  
        },
        complexion:{
          required:true,
        },
        perform_namaz:{
          required:true,
        },
        fasting:{
          required:true,  
        },
        messages: {
          height: {
            required: "This filed is required",
          },
          weight: {
            required: "This field is required",
          },
          noOfChildren:{
            required:"Please enter a valid number",
          },
          community:{
              required:"This field is required",
              email:"Invalid email address"
          },
          status:{
              required:"This field is required",
          },
          bodyType: {
            required: "This filed is required",
          },
          physical_status: {
            required: "This field is required",
            date: "Invalid date format",
          },
          motherTongue:{
              required:"This field is required",
          },
          readQuran:{
              required:"This field is required",
          },
          islamic_services: {
            required: "This field is required",
            date: "Invalid date format",
          },
          complexion:{
              required:"This field is required",
          },
          perform_namaz:{
              required:"This field is required",
          },
          fasting:{
            required:"Please enter a valid number",
          },
          
        },
      },
      
      submitHandler: function (form) {
          var language_known = $('#languageKnown').val();
          var datas = $(form).serializeArray();
          datas[datas.length] = { name: "language_known", value: language_known };      
          $.ajax({
            url:"https://keralazawaj.com/api/user/userprofile/",
            type: "POST",
            data: datas,
            beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " +localStorage.getItem("token")
              );
            },
            success:function(response){
              $("#userDetailsH4div").hide();
              $("#userProfileDetailsDiv").hide();
              $("#divProfesionH4Div").show();
              $("#divProfesionH4Div1").show();
              $("#divProfeesionForm").show();
              return scrollToProfessionFrom()
            },
            error: function (jqXHR,responseText) {
              // alert("Error:" + jqXHR.responseText); 
          },
          });
      },
    });
});

// ################################### USER PROFESSION FORM #############################

  $("#userProfessionForm").validate({

    rules:{
      highestEducation:{
        required:true,
      },
      profession:{
        required:true,
      },
      messages:{
        highestEducation:{
          required:"This field is required"
        },
        profession:{
          required:"This field is required"
        },
      }
    },
    submitHandler: function (form) {
      var data = $(form).serializeArray();
      $.ajax({
        url:"https://keralazawaj.com/api/user/userprofession/",
        type: "POST",
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " +localStorage.getItem("token")
          );
        },
        success:function(response){
          $("#divProfesionH4Div").hide();
          $("#divProfesionH4Div1").hide();
          $("#divProfeesionForm").hide();
          $("#familyH4Div").show();
          $("#familyH4Div1").show();
          $("#userFamilyFormDiv").show();
        },
        error: function (jqXHR,responseText) {
      },
      });
    }

  });
//  ################################## USER FAMILY FORM ##################################


$("#userFamilyForm").validate({

  rules:{
    familyType:{
      required:true,
    },
    relegion:{
      required:true,
    },
    fatherOccupation:{
      required:true,
    },
    motherOccupation:{
      required:true,
    },
    numberof_sisters:{
      required:true,
      digits:true,
    },
    numberof_brothers:{
      required:true,
      digits:true,
    },
    family_status:{
      required:true,
    },
  
    messages:{
      familyType:{
        required:"This field is required",
      },
      relegion:{
        required:"This field is required",
      },
      fatherOccupation:{
        required:"This field is required",
      },
      motherOccupation:{
        required:"This field is required",
      },
      numberof_sisters:{
        required:"This field is required",
      },
      numberof_brothers:{
        required:"This field is required",
      },
      family_status:{
        required:"This field is required",
      },
    
    }
  },
  submitHandler: function (form) {
    var data = $(form).serializeArray();
    $.ajax({
      url:"https://keralazawaj.com/api/user/userfamily/",
      type: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " +localStorage.getItem("token")
        );
      },
      error: function (jqXHR,responseText) {
    },
      success:function(response){
        $("#familyH4Div").hide();
        $("#familyH4Div1").hide();
        $("#userFamilyFormDiv").hide();
        $("#userLocationAndConactDeatilsDiv").show()
        $("#userLocationAndConactDeatilsH4").show()
        $("#userLocationAndConactDeatilsH41").show()
        $("#userLocationAndConactDeatilsDiv1").show()
      },
      error: function (jqXHR,responseText) {
        // alert("Error:" + jqXHR.responseText); 
    },
    });
  }

});

// ################################### USER LOCATION DETAILS ###############################

$(document).ready(function(){
  $("#userLocationForm").validate({
    rules:{
      native_city:{
        required:true,
      },
      native_locality:{
        required:true,
      },
      home_name:{
        required:true,
      },
      current_city:{
        required:true,
      },
      current_locality:{
        required:true,
      },
      current_home_name:{
        required:true,
      },
      primary_number:{
        required:true,
      },
      pincode:{
        required:true,
      },
      about:{
        required:true,
      },
      messages:{
        native_city:{
          required:"This field is required",
        },
        native_locality:{
          required:"This field is required",
        },
        home_name:{
          required:"This field is required",
        },
        current_city:{
          required:"This field is required",
        },
        current_locality:{
          required:"This field is required",
        },
        current_home_name:{
          required:"This field is required",
        },
        primary_number:{
          required:"This field is required",
        },
        pincode:{
          required:"This field is required",
        },
        about:{
          required:"This field is required",
        },
      },    
    },
    submitHandler: function (e){
      var data = $(e).serializeArray();
      $.ajax({
        url:"https://keralazawaj.com/api/user/userlocation/",
        type: "POST",
        data: data,
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " +localStorage.getItem("token")
          );
        },
        success:function(response){
          var id = $("#register").val();
          return userDetailsCompleteCheck(id)
        },
        error: function (jqXHR,responseText) {
          // alert("Error:" + jqXHR.responseText); 
      },  
      });
      return false; 
    }    
  });
});
// =======================================
$("#status").change(function(){
  if($(this).val() == 'Single'){
    $("#noOfChildrenDiv").hide();
    $("#divId").hide();
    $("#div2Id").show();


    $("#noOfChildren").val('0')
  }
  else{
    $("#noOfChildrenDiv").show();
    $("#divId").show();
    $("#div2Id").hide();
  }
  });
// =========================================
$("#chkCheckbox").change(function(){
  if($(this).prop('checked')){
    var nativCity = $("#nativeCity").val();
    var nativeLocality = $("#nativeLocality").val();
    var nativeHomeName = $("#nativeHomrName").val();
    $("#currentCity").val(nativCity)
    $("#currentLocality").val(nativeLocality)
    $("#currentHomeName").val(nativeHomeName)
  }
  else{
    $("#currentCity").val('')
    $("#currentLocality").val('')
    $("#currentHomeName").val('')
  }
});

