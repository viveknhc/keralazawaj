$(document).ready(function(){
  $("#msgDiv").hide();
  for (let i = 60; i < 261; i++) {
        $("#heightFrom").append('<option value="'+i+'">'+i +'cm'+'</option>')
        $("#userEditHeight").append('<option value="'+i+'">'+i +'cm'+'</option>')
        $("#heightTo").append('<option value="'+i+'">'+i +'cm'+'</option>')
      }
      for (let i = 30; i < 130; i++) {
        $("#userEditWeight").append('<option value="'+i+'">'+i +'kg'+'</option>')
        
      }
    return getUserPrefData()
});


var stats = 0;

function getUserPrefData(){
  $.ajax({
    url:"https://keralazawaj.com/api/user/check-partner-prefernce/",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " +localStorage.getItem("token")
      );
    },
    success:function(response){
      if(response['partnerpreference'] == true){
        stats = 1
        $("#partnerPrefernceTitleId").html('Edit Partner')
        $("#btnPartnrPrefSubmit").html('Edit & Submit')
        id = response['id']
        $.ajax({
          url:"https://keralazawaj.com/api/user/userpreferences/"+id+"/",
          type: "GET",
          beforeSend: function (xhr) {
              xhr.setRequestHeader(
                "Authorization",
                "Token " +localStorage.getItem("token")
              );
            },
          success:function(response){
            $('input[name=age_from]').val(response['age_from'])
            $('input[name=age_to]').val(response['age_to'])
            $('select[name=height_from]').val(response['height_from'])
            $('select[name=height_to]').val(response['height_to'])
            $('select[name=marital_status]').val(response['marital_status'])
            $('select[name=body_type]').val(response['body_type'])
            $("#ComplexionPreference").val(response['complexion'])
            $("#partnerPrefCommunity").val(response['community'])
            $('#partnerPrefhighestEducation').val(response['highestEducation'])
            $("#prefProfession").val(response['profession'])
            $('select[name=location]').val(response['location'])
            // alert($("#partnerPrefcommunity")).val()
          },
            error: function (jqXHR,responseText) {
              // alert("Error:" + jqXHR.responseText); 
          },   
      });
      }
      else{
        stats = 0
      }
    }
  });
}

$("#partnerPrfernceFormID").submit(function(e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  console.log(data)
  if (stats == 0){
    $.ajax({
      url:"https://keralazawaj.com/api/user/userpreferences/",
      type: "POST",
      data: data,
      beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " +localStorage.getItem("token")
          );
        },
      success:function(){
        $("#msgDiv").append('Saved Successfully.')
        $("#msgDiv").show();
        setTimeout(function () {
          $("#msgDiv").hide();
          $("#msgDiv").append('')
      }, 2500);
        stats = 1
      },
        error: function (jqXHR,responseText) {
          alert("Error:" + jqXHR.responseText); 
      },   
  });
  }
  else{
    $.ajax({
      url:"https://keralazawaj.com/api/user/check-partner-prefernce/",
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " +localStorage.getItem("token")
        );
      },
      success:function(response){
        userId = response['id']
        return updateUserPref(userId,data)
      }
    });
  } 
});

function updateUserPref(userId,data){
  $.ajax({
    url:"https://keralazawaj.com/api/user/userpreferences/"+userId+"/",
    type: "PUT",
    data: data,
    beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " +localStorage.getItem("token")
        );
      },
    success:function(){
      $("#msgDiv").empty()
      $("#msgDiv").append('Updated Successfully.')
      $("#msgDiv").show();
      setTimeout(function () {
        $("#msgDiv").hide();
        $("#msgDiv").append('')
    }, 2500);
    },
      error: function (jqXHR,responseText) {
        alert("Error:" + jqXHR.responseText); 
    },   
});
}