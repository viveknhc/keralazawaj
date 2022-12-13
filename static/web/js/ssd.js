

$(document).ready(function () {
  $.ajax({
    url: "https://keralazawaj.com/api/user/collectprofiles/",
    type: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Token " + localStorage.getItem("token")
      );
    },
    success: function (response) {
      var userDatas = [];
      var dashBoard = $("#dashBoard");
      userDatas = [response];
      var max_size = userDatas.length;
      var startPageIndex = 0;
      var elements_per_page = 1;
      var limit = elements_per_page;
      changePage(startPageIndex, limit);
      function changePage(startPageIndex, limit) {
        for (var i = startPageIndex; i < limit; i++) {
          var $nr = $(
            "<div class='row py-4 d-lg-flex d-md-none d-sm-none d-none'>\
                                    <div class='col-4 p-user-details '>\
                                        <h5 class='u-name-id'>Username / Matrimony ID</h5>\
                                        <span class='dt'>22<sup> <i class='fas fa-heart'></i></sup> </span>\
                                        <span class='dt'> Unmarried <sup> <i class='fas fa-heart'></i></sup> </span>\
                                        <span class='dt'>Calicut</span>\
                                    </div>\
                                    <div class='col-4'>\
                                        <div class=''>\
                                            <a href='{% url 'web:view_profile_premium' %}' class='view-profile-btn'>View Profile <i class='far fa-greater-than'></i>\
                                            </a>\
                                        </div>\
                                    </div>\
                                    <div class='col-lg-4 col-sm-12 col-4 '>\
                                        <button id='btnPass'  type='button' class='btn pass-btn'><i class='fas fa-times-circle'></i>Pass</button>\
                                        <button id='btnLike' type='button' class='btn like-btn'> <i class='fas fa-heart-circle'></i>Like</button>\
                                    </div>\
                                </div>\
            <div class='row'>\
            <div class='col-lg-4 col-md-12 col-sm-12 col-12 py-2'>\
                <div class='card profile-box'>\
                    <img class='card-img-top mx-auto prof-view' src=" +
              userDatas[0][i].image_one["medium_square_crop"] +
              " alt='Card image cap'>\
                </div>\
                <div class='col-12 p-user-details d-lg-none d-md-block d-sm-block d-block mob-dash-prof-view'>\
                    <h5 class='u-name-id'>Username / Matrimony ID</h5>\
                    <span class='dt'>22<sup> <i class='fas fa-heart'></i></sup> </span>\
                    <span class='dt'> Unmarried <sup> <i class='fas fa-heart'></i></sup> </span>\
                    <span class='dt'>Calicut</span>\
                </div>\
            </div>\
            <div class='col-lg-4 col-sm-12 col-4 py-2 d-lg-block d-md-none d-sm-none d-none'>\
                <div class='card profile-box'>\
                    <img class='card-img-top mx-auto d-block prof-view' src=" +
              userDatas[0][i].image_two["medium_square_crop"] +
              " \
                        alt='Card image cap'>\
                </div>\
            </div>\
            <div class='col-lg-4 col-sm-12 col-4 py-2 d-lg-block d-md-none d-sm-none d-none'>\
                <div class='card profile-box'>\
                    <img class='card-img-top mx-auto d-block prof-view'src=" +
              userDatas[0][i].image_three["medium_square_crop"] +
              " \
                        alt='Card image cap'>\
                </div>\
            </div>\
        </div>\
        <div class='row'>\
            <div class='col-lg-7 col-md-12 col-sm-12 col-12 py-2'>\
                <h3 class='dash-abt'>About</h3>\
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada condimentum pretium\
                    augue nunc, ut volutpat a etiam</p>\
            </div>\
            <div class='col-lg-5 col-md-12 col-sm-12 col-12 d-lg-none d-md-block d-sm-block d-block mob-prof-like-part'>\
                <div class='mob-swipe-prof text-center'>\
                    <i class='fas fa-chevron-up d-block'></i>\
                    <a href=''>Swipe up to see full profile</a>\
                </div>\
                <div class='mob-llps-btn p-3 text-center'>\
                    <a href=''>\
                        <i class='fas fa-times-circle del-icon'>\
                        </i>\
                    </a>\
                    <a href=''><i class='fas fa-heart-circle lk-icon'></i></a>\
                </div>\
            </div>\
        </div>\
        <div class='premium-btn-box text-center d-lg-block d-md-none d-sm-none d-none'>\
    <a href='{% url 'web:view_profile_premium' %}' class='btn premium-btn'> Get Premium</a>\
    <p class='p-4 premium-description'>See everyone who likes you with <span\
            class='bismi-title'>Kerala Zawaj</span> Premium.</p>\
</div>\
"
          );
          dashBoard.append($nr);
        }
      }
      $("#btnLike").click(function () {
        var next = limit;
        if (max_size >= next) {
          limit = limit + elements_per_page;
          dashBoard.empty();
          changePage(next, limit);
        }
      });
      $("#btnPass").click(function () {
        var next = limit;
        if (max_size >= next) {
          limit = limit + elements_per_page;
          dashBoard.empty();
          changePage(next, limit);
        }
      });
    },
    error: function (jqXHR) {
      if (jqXHR.startPageIndextus == 404) {
      } else {
      }
    },
  });
  function Changepage(){
      function cac(){
          
      }
  }


});
