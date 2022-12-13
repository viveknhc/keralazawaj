$(document).ready(function () {
  $("#imgup-popup").hide();
});

$("document").ready(function () {
  $("#image_one").change(function () {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#div-image-upload-id1").attr("src", e.target.result);
        $("#div-image-upload-id1").removeClass("dyimg");
        $("[id=btnNotNow]").attr("id", "btnFormSubmit");
        $("[id=btnFormSubmit]").html("Submit");
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
});

$("document").ready(function () {
  $("#image_two").change(function () {
    var imageOne = $("#image_one").val();
    if (imageOne == "") {
      $("#div-image-upload-id1").addClass("dyimg");
      $("#image_two").val("");
      $("#image_three").val("");
    } else {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#div-image-upload-id2").attr("src", e.target.result);
          $("#div-image-upload-id1").removeClass("dyimg");
          $("#div-image-upload-id2").removeClass("dyimg");
        };
        reader.readAsDataURL(this.files[0]);
      }
    }
  });
});

$(document).ready(function () {
  $("#image_three").change(function () {
    var img1 = $("#image_one").val();
    var img2 = $("#image_two").val();
    if (img1 == "") {
      $("#div-image-upload-id1").addClass("dyimg");
    } else if (img2 == "") {
      $("#div-image-upload-id2").addClass("dyimg");
    } else {
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#div-image-upload-id3").attr("src", e.target.result);
          $("#div-image-upload-id2").addClass("dyimg");
          $("#div-image-upload-id1").addClass("dyimg");
          $("#div-image-upload-id2").removeClass("dyimg");
          $("#div-image-upload-id1").removeClass("dyimg");
        };
        reader.readAsDataURL(this.files[0]);
      }
    }
  });
});


$(document).ready(function () {
  $("form").submit(function (e) {
    var formData = new FormData(e.target);
    $.ajax({
      url: "https://keralazawaj.com/api/user/userImage/",
      type:"POST",
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
          $("#imgup-popup").show();
          $("#fileUploadDiv").hide();
          $('.btn mob-skip-button').hide();
          $('[id=btnFormSubmit]').hide();
          $('[id=btnNotNow]').hide();
        
        },
      },
      statusCode: {
        400: function() {
          window.location = "/dashboard/";
        },
      },
      statusCode: {
        201: function() {
          $("#imgup-popup").show();
          $("#hideDIvonpopup").hide();
          console.log("heee")
          $("#fileUploadDiv").hide();
          $('.btn mob-skip-button').hide();
          $('[id=btnFormSubmit]').hide();
          $('[id=btnNotNow]').hide();


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


$("#btnViewProfile").click(function(){
  window.location = "/dashboard/";
});