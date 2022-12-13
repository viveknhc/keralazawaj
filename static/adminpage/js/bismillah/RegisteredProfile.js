$(document).ready(function () {
    $.ajax({
        url: "https://keralazawaj.com/official/api/profile/VerifiedProfiles/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            console.log(response)
            var data = [];
            data = response
            $.each(data, function (i) {
                divId = $("#RegisteredUsersdiv")
                html = ''
                html += '<div id=div' + data[i].id + ' class="col-md-4 grid-margin stretch-card">'
                html += '<div class="card">'
                html += '<div class="checkbox-off text-right pt-3 px-4">'
                html += '</div>'
                html += '<div class="card-body">'
                html += '<div class="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">'
                html += '<img src=' + data[i].image_one['small_square_crop'] + ' class="img-lg rounded" alt="profile image" />'
                html += '<div class="ml-sm-3 ml-md-0 ml-xl-3 mt-2 mt-sm-0 mt-md-2 mt-xl-0">'
                html+=  '<h6 class="text-success">'+ data[i].user_profile['bismID'] + '</h6>'
                html += '<h6 class="mb-0">' + data[i].user['full_name'] + '</h6>'
                html += '<p class="text-muted mb-1 ph-num">' + data[i].register['mobile_number'] + '</p>'
                html += '<p class="mb-0 text-success font-weight-bold">' + data[i].user_profession['profession'] + '</p>'
                html += '<p class="mb-0 text-success font-weight-bold">' + data[i].user['dob'] + '</p>'
                html += '<p class="mb-0 text-success font-weight-bold">' + data[i].user_location['current_locality'] + '</p>'
                html += '<p id="updateStatus' + data[i].id + '"></p>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                html += '</div>'
                divId.append(html)
            });
        },
       
    });
});



$("#filterUser").keyup(function() {

    // Retrieve the input field text and reset the count to zero
    var filter = $(this).val(),
      count = 0;

    // Loop through the comment list
    $('#RegisteredUsersdiv div').each(function() {


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

// $(document).on('change', '[type=checkbox]', function () {
//     var id = $(this).val();
//     setTimeout(function () {
//         $("#updateStatus" + id).html('verified')
//         verifyUser(id)
//     }, 2000);
//     $("#updateStatus" + $(this).val()).html('verifying...')
// });

// function verifyUser(id) {
//     var csrf_token = $('[name="csrfmiddlewaretoken"]').val();
//     data ={
//         'is_verified':true,
//         csrfmiddlewaretoken:csrf_token
//     }
//     $.ajax({
//         url: "https://keralazawaj.com/official/api/profile/pendingverification/"+id+"/",
//         type: "PUT",
//         data: data,
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization",
//                 "Token " + localStorage.getItem("admin_token")
//             );
//         },

//         statusCode: {
//             200: function() {
//               $("#div"+id).fadeOut();
//             },
//           },

        
//     });
// }