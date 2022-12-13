
function calculateAge(dob) {
  var str = dob.split('-');
  var firstdate = new Date(str[0], str[1], str[2]);
  var today = new Date();
  var dayDiff = Math.ceil(today.getTime() - firstdate.getTime()) / (1000 * 60 * 60 * 24 * 365);
  var age = parseInt(dayDiff);
  return (age)
}

function genderbasedprofile(gender) {
  $.ajax({
    url: "https://keralazawaj.com/official/api/profile/collectprofiles/?gender=" + gender,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("admin_token")
      );
    },
    success: function (response) {
      const obj = JSON.parse(JSON.stringify(response))

      for (let i = 0; i < obj.length; i++) {
        age = calculateAge(obj[i].user["dob"])
        $('#UserDetailsDiv').append("<div class='col-md-3 col-lg-3 grid-margin stretch-card'>\
						<div class='card p-3'>\
            <a href='/official/view-profile/"+obj[i].id+"/'><img class='card-img-top rounded img-size mx-auto' src='"+ obj[i].image_one["medium_square_crop"] + "' alt='Card image cap'></a>\
							<div class='card-body'>\
								<div class=''>\
                                    <div class=' mt-xl-0 '>\
										<h6 class='text-success'>"+ obj[i].user_profile['bismID'] + "</h6>\
										<h6 class='mb-0'>"+ obj[i].user['full_name'] + "</h6> \
										<p class='text-muted mb-1 ph-num'> "+ obj[i].register["mobile_number"] + " </p>\
										<p class='text-muted mb-1 ph-num'>"+ obj[i].user["email"] + "</p>\
										<p class='mb-0 text-success font-weight-bold'>"+ age + "</p>\
										<p class='mb-0 text-success font-weight-bold'>"+ obj[i].user_profile["status"] + "</p>\
										<p class='mb-0 text-success font-weight-bold'>"+ obj[i].user_profession["highestEducation"] + "</p>\
										<p class='mb-0 text-success font-weight-bold'>"+ obj[i].user_profession["profession"] + "</p>\
										<p class='mb-0 text-success font-weight-bold'>"+ obj[i].user_location["current_locality"] + "</p>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>")
      }
    },
    error: function (jqXHR, responseText) {
      if (jqXHR.status == 403) {

      } else {
      }
    },
  });
}


$("#filterUser").keyup(function() {

  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(),
    count = 0;

  // Loop through the comment list
  $('#UserDetailsDiv div').each(function() {


    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).hide();  // MY CHANGE

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show(); // MY CHANGE
      count++;
    }

  });

});


$("#filterUserMartialStatus").change(function() {

  // Retrieve the input field text and reset the count to zero
  var filter = $(this).val(),
    count = 0;

  // Loop through the comment list
  $('#UserDetailsDiv div').each(function() {


    // If the list item does not contain the text phrase fade it out
    if ($(this).text().search(new RegExp(filter, "i")) < 0) {
      $(this).hide();  // MY CHANGE

      // Show the list item if the phrase matches and increase the count by 1
    } else {
      $(this).show(); // MY CHANGE
      count++;
    }

  });

});