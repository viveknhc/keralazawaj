function scrolltop(){
    $('html, body').animate({
        scrollTop: $("#formDiv").offset().top
    }, 10);
}

$(document).ready(function () {
    $("#alertDivId").hide();
    $.ajax({
        url: "/official/api/profile/subscriptionplans-view/",
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
                $("#subscriptionTable").append(row);
                row.append($("<td>" + rowData["plan_title"] + "</td>"));
                row.append($("<td>" + rowData["duration_type"] + "</td>"));
                row.append($("<td>" + rowData["duration"] + "</td>"));
                row.append($("<td>" + rowData["price"] + "</td>"));
                row.append($("<td>" + rowData["content"] + "</td>"));
                row.append($("<td>" + '<button id="btnEdit" class="btn" value="' + rowData["id"] + '"><i class="fas fa-pencil-alt"></i></button>' + "</td>"));
                row.append($("<td>" + '<button id="btnDelete" class="btn" value="' + rowData["id"] + '"><i class="far fa-trash-alt"></i></button>' + "</td>"));

            }
        }
    });
});

$(document).ready(function () {
    $("#subscriptionplanForm").submit(function (e) {
        var formData = new FormData(e.target);
        console.log(formData)
        e.preventDefault();
        if ($("#editId").val() != 0) {
            var id = $("#editId").val();
            $.ajax({
                url: "/official/api/profile/subscriptionplans-view/"+id+"/",
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
                error:function(jqXHR,responseText){
                    alert(jqXHR,responseText)
                },
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
                url: "/official/api/profile/subscriptionplans-view/",
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
                        row.append($("<td>" + response["plan_title"] + "</td>"));
                        row.append($("<td>" + response["duration_type"] + "</td>"));
                        row.append($("<td>" + response["duration"] + "</td>"));
                        row.append($("<td>" + response["price"] + "</td>"));
                        row.append($("<td>" + response["content"] + "</td>"));
                        
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
        url: "/official/api/profile/subscriptionplans-view/"+id+"/",
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
    var id = $(this).val();
    $('input[name=name]').val(name);
    $("#editId").val(id)
    return scrolltop();

});

function tableUpdate(){
    location.reload();
}

