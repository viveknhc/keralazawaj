
$(document).ready(function() {
  
  $('#btnPass').removeClass('del-iconred');
  $('#btnPass').addClass('del-icon');
  $(".loader").delay(1000).fadeOut("slow");
  $("#overlayer").delay(1000).fadeOut("slow");
});

$(document).ready(function () {
 
  PageLoadandUrl("https://keralazawaj.com/api/user/collectprofiles/");
});

function PageLoadandUrl(url) {
  $.ajax({
    url: url,
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    success: function (response1) {

      $.ajax({
        url: 'https://keralazawaj.com/api/user/user-pass-like/',
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        success: function (response) {
        var userDatas = [];
        var ViewedProfiles=[]
        ViewedProfiles =[response];
        userDatas = [response1];
        userDatas = userDatas.filter(function(val) {
          return ViewedProfiles.indexOf(val) == -1;
        });
        PageSelect(userDatas);
        },
        error: function (jqXHR) {
        },
      });
    },
    error: function (jqXHR) {
      if (jqXHR.startPageIndextus == 404) {
      } else {
      }
    },
  });
}

function PageSelect(userDatas) {
  
  
  var dashBoard = $("#dashBoard");
  dashBoard.empty();
  var max_size = userDatas[0].length;
  var startPageIndex = 0;
  var elements_per_page = 1;
  var limit = elements_per_page;
  changePage(startPageIndex, limit);
  function changePage(startPageIndex, limit) {
    for (var i = startPageIndex; i < limit; i++) {
      age = calculateAge(userDatas[0][i].user["dob"]);
      $("#userProfileIdHid").val(userDatas[0][i].user_profile['id'])
      var $nr = $(
        "<div class='row p-3 d-lg-flex anim d-md-none d-sm-none d-none'>\
                                  <div class='col-4 p-user-details '>\
                                     <a href='/view-profile/"+ userDatas[0][i].id + "/'><h5 class='u-name-id'>" + userDatas[0][i].user['full_name'] + "</h5></a>\
                                      <a href='/view-profile/"+ userDatas[0][i].id + "/'><h5 class='u-bismi-id'>" + userDatas[0][i].user_profile['bismID'] + "</h5></a>\
                                      <span class='dt'>"+ age + "<sup> <i class='fas fa-heart'></i></sup> </span>\
                                      <span class='dt'>"+ userDatas[0][i].user_profile['status'] + "<sup> <i class='fas fa-heart'></i></sup> </span>\
                                      <span class='dt'>"+ userDatas[0][i].user_location['native_city'] + "</span>\
                                  </div>\
                                  <div class='col-4'>\
                                      <div class='text-center'>\
                                          <button id='btnChat'  type='button' class='btn like-btn passedButton2' onclick=ChatWithUser("+ userDatas[0][i].user['id'] + ")><i class=''>\
                                          </i> <img src='/static/web/images/icons/Chat 49x51.png' class='chat-icon-desk' >Chat</button>\
                                      </div>\
                                  </div>\
                                  <div id='likeDivLi' class='col-lg-4 col-sm-12 col-4 '>\
                                      <button id='btnPass'  onclick=(passProfile("+ userDatas[0][i].user_profile['id'] + ")) type='button' class='btn pass-btn passedButton'><i class='fas fa-times-circle close-btn-desktop'></i>Pass</button>\
                                  </div>\
                              </div>\
          <div class='row justify-content-around'>\
          <div class='col-lg-4 col-md-12 col-sm-12 col-12 py-2 anim image-box'>\
              <div class='card profile-box'>\
              <a class='mx-auto' href='/view-profile/"+ userDatas[0][i].id + "/'><img class='card-img-top mx-auto prof-view' src=" +
        userDatas[0][i].image_one["medium_square_crop"] +
        " alt='No Image'></a>\
              </div>\
              <div class='col-12 p-user-details d-lg-none d-md-block d-sm-block d-block mob-dash-prof-view'>\
              <a href='/view-profile/"+ userDatas[0][i].id + "/'><h5 class='u-name-id'>" + userDatas[0][i].user['full_name'] + "</h5></a>\
              <a href='/view-profile/"+ userDatas[0][i].id + "/'><h5 class='u-bismi-id'>" + userDatas[0][i].user_profile['bismID'] + "</h5></a>\
                  <span class='dt'>"+ age + "<sup> <i class='fas fa-heart'></i></sup> </span>\
                  <span class='dt'> "+ userDatas[0][i].user_profile['status'] + " <sup> <i class='fas fa-heart'></i></sup> </span>\
                  <span class='dt'>"+ userDatas[0][i].user_location['native_city'] + "</span>\
              </div>\
          </div>\
          <div class='col-lg-4 col-sm-12 col-4 py-2 anim d-lg-block d-md-none d-sm-none d-none image-box'>\
              <div class='card profile-box'>\
              <a href='/view-profile/"+ userDatas[0][i].id + "/'><img class='card-img-top mx-auto d-block prof-view' src=" +
        userDatas[0][i].image_two["medium_square_crop"] +
        " \
                      alt='No Image'></a>\
              </div>\
          </div>\
          <div class='col-lg-4 col-sm-12 col-4 py-2 anim d-lg-block d-md-none d-sm-none d-none image-box'>\
              <div class='card profile-box'>\
              <a href='/view-profile/"+ userDatas[0][i].id + "/'><img class='card-img-top mx-auto d-block prof-view'src=" +
        userDatas[0][i].image_three["medium_square_crop"] +
        " \
                      alt='No Image'></a>\
              </div>\
          </div>\
      </div>\
      <div class='row'>\
          <div class='col-lg-7 col-md-12 col-sm-12 col-12 py-2'>\
              <h3 class='dash-abt'>About</h3>\
              <p class='dash-abt-desc'>"+ userDatas[0][i].user_location["about"] + "</p>\
          </div>\
          <div class='col-lg-5 col-md-12 col-sm-12 col-12 d-lg-none d-md-block d-sm-block d-block mob-prof-like-part'>\
              <div class='mob-swipe-prof text-center '>\
                  <a onclick=viewProfile("+ userDatas[0][i].id + ")>Click to see full profile</a>\
              </div>\
              <div class='mob-llps-btn p-3 text-center'>\
              <ul class='d-flex justify-content-center'>\
              <li class='btns-mob-li'>\
              <a id='btnPass'onclick=(passProfile("+ userDatas[0][i].user_profile['id'] + "))><i class='fas fa-times-circle del-icon'></i></a>\
              </li>\
              <li class='btns-mob-li'>\
              <a id='btnLike' onclick=(likeprofile("+ userDatas[0][i].user_profile['id'] + "))><i class='fas fa-heart-circle lk-icon'></i></a>\
              </li>\
              <li class='btns-mob-li'>\
              <a id='btnChat' onclick=ChatWithUser("+ userDatas[0][i].user['id'] + ")><img src='/static/web/images/icons/Chat 49x51.png' alt='missing'></a>\
              </li>\
              </ul>\
              <div class='text-center plc-text'><h6>Pass, <span></span> Like or  <span></span> Chat</h6></div>\
              </div>\
          </div>\
      </div>\
      <div class='premium-btn-box text-center d-lg-block d-md-none d-sm-none d-none'>\
  <a href='/subscription-plans-view/' class='btn premium-btn get-premium-2 '> Get Premium</a>\
  <p class='p-4 premium-description'>See everyone who likes you with <span\
          class='bismi-title'>Kerala Zawaj</span> Premium.</p>\
</div>\
");
      dashBoard.append($nr);
      if (userDatas[0][i].is_liked == true) {
        $('.mob-prof-like-part .lk-icon').css('color', '#bc1758');
        $("#likeDivLi").append("<button id='btnLike' type='button' class='btn like-btn ' onclick=(likeprofile(" + userDatas[0][i].user_profile['id'] + "))> <i class='fas fa-heart-circle hover-active'></i>Liked</button>")
      }
      else {
        $("#likeDivLi").append("<button id='btnLike' type='button' class='btn like-btn' onclick=likeprofile(" + userDatas[0][i].user_profile['id'] + ")> <i class='fas fa-heart-circle'></i>Like</button>")
      }
    }
  }
  $(document).on('click', "#btnLike", function () {
    setTimeout(function () {
    var next = limit;
    if (max_size > next) {
      limit = limit + elements_per_page;
      dashBoard.empty();
      changePage(next, limit);
    } else {
      $.ajax({
        url: 'https://keralazawaj.com/api/user/refreshviewed/',
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        success: function (response) {
        },
        error: function (jqXHR) {
        },
      });
      location.reload();
    }
  },1000);
  });

  $(document).on('click', "#btnPass", function () {
    setTimeout(function () {
    var next = limit;
    if (max_size > next) {
      limit = limit + elements_per_page;
      dashBoard.empty();
      changePage(next, limit);
    } else {
      $.ajax({
      url: 'https://keralazawaj.com/api/user/refreshviewed/',
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Token " + localStorage.getItem("token")
        );
      },
      success: function (response) {
      },
      error: function (jqXHR) {
      },
    });
    location.reload();
    }
  },500);
  });

  $(document).on('click', "#btnPass1", function () {
    var next = limit;
    if (max_size > next) {
      limit = limit + elements_per_page;
      dashBoard.empty();
      changePage(next, limit);
    } else {
      $.ajax({
        url: 'https://keralazawaj.com/api/user/refreshviewed/',
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        success: function (response) {
        },
        error: function (jqXHR) {
        },
      });
      $.ajax({
        url: 'https://keralazawaj.com/api/user/refreshviewed/',
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Token " + localStorage.getItem("token")
          );
        },
        success: function (response) {
        },
        error: function (jqXHR) {
        },
      });
      location.reload();
    }
  });
}
