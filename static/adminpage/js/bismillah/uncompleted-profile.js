$(document).ready(function(){
    $.ajax({
        url: "https://keralazawaj.com/official/api/uncompleted-profiles/",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("admin_token")
          );
        },
        success: function (response) {
          drawTable(response);

          function drawTable(data) {
              for (var i = 0; i < data.length; i++) {
                  drawRow(data[i]);
              }

          }

          function drawRow(rowData) {
              var row = $("<tr />")
              $("#unCompletedUserstable").append(row);
              row.append($("<td>" + rowData["email"] + "</td>"));
              row.append($("<td>" + rowData["full_name"] + "</td>"));
              row.append($("<td>" + rowData.register["mobile_number"]  + "</td>"));
              row.append($("<td>" + rowData["dob"] + "</td>"));
              if(rowData["user_profile"] != true){
                row.append($("<td>" + '<p style="color:red";>Not Completed</p>' + "</td>"));
              }
              else{
                row.append($("<td>" + '<p>Completed</p>' + "</td>"));
              }
              if(rowData["user_profession"] != true){
                row.append($("<td>" + '<p style="color:red";>Not Completed</p>' + "</td>"));
              }
              else{
                row.append($("<td>" + '<p>Completed</p>' + "</td>"));
              }
              if(rowData["user_family"] != true){
                row.append($("<td>" + '<p style="color:red";>Not Completed</p>' + "</td>"));
              }
              else{
                row.append($("<td>" + '<p>Completed</p>' + "</td>"));
              }if(rowData["user_location"] != true){
                row.append($("<td>" + '<p style="color:red";>Not Completed</p>' + "</td>"));
              }
              else{
                row.append($("<td>" + '<p>Completed</p>' + "</td>"));
              }
  
              if(rowData["user_image"] != true){
                row.append($("<td>" + '<p style="color:red";>Not Completed</p>' + "</td>"));
              }
              else{
                row.append($("<td>" + '<p>Completed</p>' + "</td>"));
              }
              row.append($("<td>" + '<button id="btnDelete" class="btn" value="' + rowData["id"] + '"><i class="far fa-trash-alt"></i></button>' + "</td>"));

          }
          
        },
        error: function (jqXHR, responseText) {
          if (jqXHR.status == 403) {
    
          } else {
          }
        },
      });  
});

$(document).on('click', '#btnDelete', function () {
  var id = $(this).val();
  data = {
    'id':id
  }
  $(this).closest('tr').remove ();
  $.ajax({
      url: "https://keralazawaj.com/official/api/uncompleted-profiles/",
      type: "DELETE",
      data:data,
      beforeSend: function (xhr) {
          xhr.setRequestHeader(
              "Authorization",
              "Token " + localStorage.getItem("admin_token")
          );
      },
      statusCode: {
          204: function (response) {
              
          }
      }
  })
});

$("#table-search-input").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#unCompletedUserstable tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

