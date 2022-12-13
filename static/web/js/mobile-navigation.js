$(document).ready(function(){
$('#phoneMenu').hide()
});

$('#mob-show-dropdown').click(function(){
    
    if ($(window).width() < 991) { 
        $('#phoneMenu').fadeIn()
}


});
$('#close-navId').click(function(){
    $('#phoneMenu').fadeOut()
});