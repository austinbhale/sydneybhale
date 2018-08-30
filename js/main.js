var back = false; var ready = false;

$(document).ready(function() {
      $("#arrDown").css("margin-right", (-($("#arrDown").width())/2));
      $("#arrUp").css("margin-right", (-($("#arrUp").width())/2));
      $("#arrLeft").css("margin-bottom", (-($("#arrLeft").width())/2));
      $("#arrRight").css("margin-bottom", (-($("#arrRight").width())/2));
      $("#hdrDown").css("margin-right", ((-($("#hdrDown").width())/2)));
      $("#hdrUp").css("margin-right", ((-($("#hdrUp").width())/2)));

      $("#nameHdr").css("visibility", "visible");
        $("#nameHdr").animateCss('zoomIn', function() {
          ready = true;
        });
        
        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
          $('#bg').css("max-height", window.innerHeight+"px");
          $('#bg1').css("max-height", window.innerHeight+"px");
        }
});

$(window).on("orientationchange", fixIOSPlaceholderBug);
var change = false; var home_return = false;
// Reload if mobile user changes orientation on content, returns to home, and
// changes orientation once again. (IOS Safari compatibility)
function fixIOSPlaceholderBug () {
    change = true;
    if (change && home_return) {
      location.reload();
      change = false; home_return = false;
    }
}

var video;
var rightClicked = false; var leftClicked = false;
var upClicked = false; var downClicked = false;
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
var slide_num = 0;

window.onload = getUserArrowChoice;
function getUserArrowChoice() {
  document.getElementById("arrows").onclick = setArrowChoice;
  video = document.getElementById("myVideo");
}

function setArrowChoice(e) {
  if (e.target.tagName == 'BUTTON' && ready) {

    var x = document.getElementById("indexPage");


    switch (e.target.id) {
      case ("arrRight"):
        if (back) {
          $('#slideshow').animateCss('fadeOut', function() {
            $('#slideshow').css("display", "none");
            $('#indexPage').animateCss('slideInRight', function() {helper();});
          });   
        } else {
          $('#wrapper').css("background-color", "#c9dfd3");
          removeArrows();
          $('#indexPage').animateCss('slideOutLeft', function() {
            x.style.visibility = "hidden";
            $('#arrLeft').css("visibility", "visible");
            $('#arrLeft').animateCss('fadeIn');
            $('#p-container').css("display", "inline-flex");
            $('#p-container').animateCss('fadeIn');
          });
          back = true; home_return = false;
        }
      break;
      case ("arrLeft"):
      if (back) {
        $('#indexPage').animateCss('slideInLeft', function() {
          $('#p-container').css("display", "none");
          helper();
        });
      } else {
        $('#wrapper').css("background-color", "black");
        removeArrows();
        $('#indexPage').animateCss('slideOutRight', function() {
          x.style.visibility = "hidden";
          $('#arrRight').css("visibility", "visible");
          $('#arrRight').animateCss('fadeIn');
          $('#slideshow').css("display", "block");
          resizeCol();          
          $('#slideshow').animateCss('fadeIn');
        });

        back = true; home_return = false;
      }
      break;
      case ("arrDown"):        
      if (back) {
        video.pause();
        $('#vidcontainer').animateCss('fadeOut', function() {
          $('#vidcontainer').css("display", "none");
        });
        $('#indexPage').animateCss('slideInUp', function() {
          helper();   
        });
      } else {
        $('#wrapper').css("background-color", "#c9dfd3");
        removeArrows();
        $('#indexPage').animateCss('slideOutUp', function() {
          x.style.visibility = "hidden";
          $('#arrUp').css("visibility", "visible");
          $('#arrUp').animateCss('fadeIn'); 
          $('#bio-page').css("display", "block");
          $('#bio-page').animateCss('fadeIn');
        });
        back = true; home_return = false;
      }
      break;
      case("arrUp"): 
        if (back) {
          $('#bio-page').animateCss('fadeOut', function() {
            $('#bio-page').css("display", "none");
          });
          $('#indexPage').animateCss('slideInDown', function() {helper();});
        } else {
          $('#wrapper').css("background-color", "black");
            removeArrows();
            $('#indexPage').animateCss('slideOutDown', function() {    
                x.style.visibility = "hidden";
                $('#arrDown').css("visibility", "visible");
                $('#arrDown').animateCss('fadeIn')
                $('#vidcontainer').css("display", "block");
                $('#vidcontainer').animateCss('fadeIn');
                video.play();
            });
          back = true; home_return = false;
        }
        break;
      default: break;
    }

  }
}

function helper() {
  back = false; home_return = true;
  document.getElementById("indexPage").style.visibility = "visible";
  $('#arrows button[class^="arr"]').css("visibility", "visible");
  $('#arrows h5[id^="hdr"]').css("visibility", "visible");
  $('#nameHdr').css("visibility", "visible");
  $('#arrows button[class^="arr"]').animateCss('fadeIn');
  $('#arrows h5[id^="hdr"]').animateCss('fadeIn'); 
  $('#nameHdr').animateCss('fadeIn');
}

function removeArrows() {
            $('#arrows button[class^="arr"]').css("visibility", "hidden");
            $('#arrows h5[id^="hdr"]').css("visibility", "hidden");
            $('#nameHdr').css("visibility", "hidden");
}

// Removes autoplay attribute for safari with a width below 800 pixels. 
$(document).ready(function(){
  
  setInterval(function() {
    if (!back) {
      if (slide_num == 0) { 
        
        $('#bg').animateCss('rotateOutUpLeft', function() {
          $('#bg').css("display", "none");
          $('#bg1').css("display", "block");
          // rotateInUpLeft animation is not compatible with Microsoft Edge browser.
          (document.documentMode || /Edge/.test(navigator.userAgent)) ? $('#bg1').animateCss('fadeIn') : $('#bg1').animateCss('rotateInUpLeft');
        });
        slide_num = 1;
      } else {
        $('#bg1').animateCss('rotateOutUpLeft', function() {
          $('#bg1').css("display", "none");
          $('#bg').css("display", "block");
          // rotateInUpLeft animation is not compatible with Microsoft Edge browser.
          (document.documentMode || /Edge/.test(navigator.userAgent)) ? $('#bg').animateCss('fadeIn') : $('#bg').animateCss('rotateInUpLeft');
        });
        slide_num = 0;
      } 
    }
  }, 7000);

  var screenWidth = $(window).width();
  (screenWidth < 800 && isSafari) ? $("#myVideo").attr("autoplay") : $("#myVideo").removeAttr("autoplay");
});

// if (isSafari && window.matchMedia("(orientation: portrait)").matches)
if (document.documentMode || /Edge/.test(navigator.userAgent)) {
  $('#bg').css("max-height", ""+window.innerHeight);
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";  
}

// Crop column height based on screen size change.
$(window).on('resize', function(){
  resizeCol();
});
  
function resizeCol() {
  var crop = $("#base-img").height();
  var dimensions = $(window).height() / $(window).width();
  var thumbnail = 84+(5.35*(dimensions-1));
  for (var i=0; i<12; i++) {
    $("#column"+i).css('height',crop+'px');
    $("#slide"+i).css('height',thumbnail+"%");
  } 
}