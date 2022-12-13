function scrolltop(){
    $('html, body').animate({
        scrollTop: $("#formDiv").offset().top
    }, 10);
}

$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "https://keralazawaj.com/official/api/profile/testimonial/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Token " + localStorage.getItem("admin_token")
            );
        },
        success: function (response) {
            console.log(response)
            drawTable(response);

            function drawTable(data) {
                for (var i = 0; i < data.length; i++) {
                    drawRow(data[i]);
                }

            }

            function drawRow(rowData) {
                var row = $("<tr />")
                $("#successStoriesTable").append(row);
                row.append($("<td>" + rowData["name"] + "</td>"));
                row.append($("<td>" + rowData["description"] + "</td>"));
                row.append($("<td>" + '<img src="' + rowData.image["small_square_crop"] + '">' + "</td>"));
                row.append($("<td>" + '<button id="btnEdit" class="btn" value="' + rowData["id"] + '"><i class="fas fa-pencil-alt"></i></button>' + "</td>"));
                row.append($("<td>" + '<button id="btnDelete" class="btn" value="' + rowData["id"] + '"><i class="far fa-trash-alt"></i></button>' + "</td>"));

            }
        }
    });
});

$(document).ready(function () {
    $("#successStoriesForm").submit(function (e) {
        var formData = new FormData(e.target);
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "https://keralazawaj.com/official/api/profile/testimonial/"+id+"/",
                type: "PUT",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
                    );
                },
                // error:function(jqXHR,responseText){
                //     alert(jqXHR,responseText)
                // },
                statusCode: {
                    201: function (response) {
                        
                        $("#alertDivId").show();
                        $("#alertDivId").append('Updated Successfully.')
                        $("#editId").val(0)
                      
                    },

                },
            });
            return tableUpdate()
        }
        else {
            $.ajax({
                url: "https://keralazawaj.com/official/api/profile/testimonial/",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Token " + localStorage.getItem("admin_token")
                    );
                },
                error:function(jqXHR,responseText){
                    alert(jqXHR,responseText)
                },
                statusCode: {
                    201: function (response) {
                        $("#alertDivId").show();
                        $("#alertDivId").append('Saved Successfully.')
                        var row = $("<tr />")
                        $("#successStoriesTable").append(row);
                        row.append($("<td>" + response["name"] + "</td>"));
                        row.append($("<td>" + response["description"] + "</td>"));
                        row.append($("<td>" + '<img src="' + response.image["small_square_crop"] + '">' + "</td>"));
                        row.append($("<td>" + '<button id="btnEdit" value="' + response["id"] + '">edit</button>' + "</td>"));
                        row.append($("<td>" + '<button id="btnDelete" value="' + response["id"] + '">delete</button>' + "</td>"));
                        setTimeout(function () {
                            $("#alertDivId").append('');
                            $("#alertDivId").hide();
                        }, 1500);
                    },
                },
            });


        }
    });
   
    
});


$("#btnReset").click(function () {
    $('#successStoriesForm')[0].reset();
});


$(document).on('click', '#btnDelete', function () {
    var id = $(this).val();
    $(this).closest('tr').remove ();
    $.ajax({
        url: "https://keralazawaj.com/official/api/profile/testimonial/"+id+"/",
        type: "DELETE",
        contentType: false,
        processData: false,
        cache: false,
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



$(document).on('click', '#btnEdit', function () {
    var thisProp = $(this)
    var name = $(this).closest('tr').find("td:eq(0)").html();
    var description = $(this).closest('tr').find("td:eq(1)").html();
    var id = $(this).val();
    $('input[name=name]').val(name);
    $('input[name=description]').val(description);
    $("#editId").val(id);
    return scrolltop();

});

function tableUpdate(){
    location.reload();
}