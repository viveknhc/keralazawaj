
$(window).scroll(function() {    

  var scroll = $(window).scrollTop();

  if (scroll >= 200) {
      $("#navbar-scroll").addClass("main-nav-sticky");
  }else {
      $("#navbar-scroll").removeClass("main-nav-sticky");
  }
});

// ====================================show and hidden password ====================================//


function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function myFunctionConformPassword() {
  var x = document.getElementById("conformPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
// ================================================================================//


$("#btn-1").click(function (){
    event.preventDefault();
    $("#form-2").hide();
    $("#form-1").show();
    $("#viewProfilebox").hide();

    $('#div-btn-2').css('background-color', 'white');
    $('#div-btn-1').css('background-color', '#D8F3DC');
   
  });
  
  $("#btn-2").click(function (){
    event.preventDefault();
    $("#form-1").hide();
    $("#form-2").hide();
    $("#viewProfilebox").show();
    
    $('#div-btn-2').css('background-color', '#D8F3DC');
    $('#div-btn-1').css('background-color', 'white');
  
  
  });

  $("#userEditButton").click(function (){
    event.preventDefault();
    $("#viewProfilebox").hide();
    $("#form-2").show();
  });

  // ======================================mob-phone-user-prof =====================

  $(document).ready(function() {
    // Optimalisation: Store the references outside the event handler:
    $("#form-2").hide();
    $("#viewProfilebox").hide(); 


    var $window = $(window);
    var $pane = $('#pane1');

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize <= 768) {
          $("#education-details-phone-div1-id").hide();
          $("#education-details-phone-div2-id").hide();
          $("#location-details-phone-div1-id").hide();
          $("#location-details-phone-div2-id").hide();
          $("#edit-form-location-id").hide()
          $("#editProfessionId").hide()
          $("#editFamilyId").hide()

            //if the window is greater than 440px wide then turn on jScrollPane..
            $pane.jScrollPane({
               scrollbarWidth:15, 
               scrollbarMargin:52
            });
        }

        else if(windowsize > 768) {
          $("#education-details-phone-div1-id").show();
          $("#education-details-phone-div2-id").show();
          $("#location-details-phone-div1-id").show();
          $("#location-details-phone-div2-id").show();
          $("#edit-form-location-id").show()
          $("#editProfessionId").show()
          $("#editFamilyId").show()

        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

$("#education-details-phone-id").click(function() {

  event.preventDefault();
  $("#basic-forms-for-phone-id").hide();
  $("#education-details-phone-div1-id").show();
  $("#education-details-phone-div2-id").show();
  $("#location-details-phone-div1-id").hide();
  $("#location-details-phone-div2-id").hide();
});

$("#location-details-phone-id").click(function() {

  event.preventDefault();
  $("#basic-forms-for-phone-id").hide();
  $("#education-details-phone-div1-id").hide();
  $("#education-details-phone-div2-id").hide();
  $("#location-details-phone-div1-id").show();
  $("#location-details-phone-div2-id").show();


});
$("#basic-details-phone-id").click(function() {

  event.preventDefault();
  $("#basic-forms-for-phone-id").show();
  $("#education-details-phone-div1-id").hide();
  $("#education-details-phone-div2-id").hide();
  $("#location-details-phone-div1-id").hide();
  $("#location-details-phone-div2-id").hide();


});



$("#edit-form-btn-2").click(function() {
  event.preventDefault();

  $("#edit-form-location-id").show()
  $("#edit-form-personal-id").hide()
  $("#editProfessionId").hide()
  $("#editFamilyId").hide()
});

$("#edit-form-btn-1").click(function() {
  event.preventDefault();

  $("#edit-form-personal-id").show()
  $("#edit-form-location-id").hide()
  $("#editProfessionId").hide()
  $("#editFamilyId").hide()

});

$("#edit-form-btn-3").click(function() {
  event.preventDefault();

  $("#edit-form-personal-id").hide()
  $("#edit-form-location-id").hide()
  $("#editFamilyId").hide()
  $("#editProfessionId").show()

});

$("#edit-form-btn-4").click(function() {
  event.preventDefault();
  $("#edit-form-personal-id").hide()
  $("#edit-form-location-id").hide()
  $("#editProfessionId").hide()
  $("#editFamilyId").show()

});


// ====================================for dahbord nav underline change========================
$(document).ready(function(){

  var current = location.pathname;
    $('#nav li a').each(function(){
        var $this = $(this);
        // if the current path is like this link, make it active
        if($this.attr('href').indexOf(current) !== -1){
            $this.addClass('bismi-nav-link-underline');
        }
    })

  
});


$('#prmum-btn').click(function(){

});