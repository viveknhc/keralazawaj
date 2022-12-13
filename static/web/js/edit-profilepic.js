$(document).ready(function () {
    var user_id = $('#currentUserId').val();
    $.ajax({

        url: "https://keralazawaj.com/api/user/userProfileDetails/"+user_id+"/",
        type:"GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
            );
        },
        success:function(response){
            $("#div-image-upload-id1").attr('src', response.image_one['medium_square_crop'])
            $("#div-image-upload-id2").attr('src', response.image_two['medium_square_crop'])
            $("#div-image-upload-id3").attr('src', response.image_three['medium_square_crop'])
        }
    });
});

$(document).ready(function () {
    var user_id = $('#currentUserId').val();
    $("form").submit(function (e) {
      var formData = new FormData(e.target);
      $.ajax({
        url: "https://keralazawaj.com/api/user/userImage/"+user_id+"/",
        type:"PUT",
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " +localStorage.getItem("token")
          );
        },
      
        statusCode: {
          200: function() {
            window.location = "/user-profile/";
          },
        },
      });
      return false
    });
  });
  


  $(document).on("click", "#btnFormSubmit", function (event) {
    $("#propicUpload").submit();
  });
  
  $(document).ready(function(){
    $("[id=btnNotNow]").click(function () {
      $("#propicUpload").submit();
    });
  });
  
  $("document").ready(function () {
    $("#image_one").change(function () {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#div-image-upload-id1").attr("src", e.target.result);
          $("#div-image-upload-id1").removeClass("dyimg");
          $("#imgup-popup").show();
          $("[id=btnNotNow]").attr("id", "btnFormSubmit");
          $("[id=btnFormSubmit]").html("Submit");
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
  
  $("document").ready(function () {
    $("#image_two").change(function () {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#div-image-upload-id2").attr("src", e.target.result);
            $("#div-image-upload-id1").removeClass("dyimg");
            $("#div-image-upload-id2").removeClass("dyimg");
          };
          reader.readAsDataURL(this.files[0]);
        }
    });
  });
  
  $(document).ready(function () {
    $("#image_three").change(function () {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $("#div-image-upload-id3").attr("src", e.target.result);
          };
          reader.readAsDataURL(this.files[0]);
        } 
    });
  });