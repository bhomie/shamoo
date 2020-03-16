
$( document ).ready(function() {
$("#menu-item-1653").click(function () { //Work
    $("#container").addClass('reveal');
    $("#contact-content").removeClass('reveal');
    $("#about-content").removeClass('reveal');
    $("#work-content").addClass('reveal');
});
$("#menu-item-331").click(function () { //About
    $("#container").addClass('reveal');
    $("#contact-content").removeClass('reveal');
    $("#work-content").removeClass('reveal');
    $("#about-content").addClass('reveal');
});
$("#menu-item-330").click(function () { //Contact
    $("#container").addClass('reveal');
    $("#about-content").removeClass('reveal');
    $("#work-content").removeClass('reveal');
    $("#contact-content").addClass('reveal');
});
$(".btnBack").click(function () { //Close Button
    $("#container").removeClass('reveal');
    $("#contact-content").removeClass('reveal');
    $("#about-content").removeClass('reveal');
    $("#work-content").removeClass('reveal');
    $("#menu-content").find("a.active").removeClass("active");
});
$("#menu-content a").click(function () {
    $("#menu-content").find("a.active").removeClass("active");
    $(this).addClass("active");
});
});
