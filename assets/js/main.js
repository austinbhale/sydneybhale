var back = false; var ready = false;

var rightClicked = false; var leftClicked = false;
var upClicked = false; var downClicked = false;

var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
var slide_num = 0; 
var video;

$(document).ready(function() {
  
  // Separate compatible font for ios devices.
  if (iOS && isSafari) {
    // $('#vidcontainer > video').css("top", "48%");
  }

  $("#arrDown").css("margin-right", (-($("#arrDown").width())/2));
  $("#arrUp").css("margin-right", (-($("#arrUp").width())/2));
  $("#arrLeft").css("margin-bottom", (-($("#arrLeft").width())/2));
  $("#arrRight").css("margin-bottom", (-($("#arrRight").width())/2));
  $("#hdrDown").css("margin-right", ((-($("#hdrDown").width())/2)));

  for (var i=0; i<12; i++) {
    $("#slide-pic"+i).css({"animation-duration": "2s" , "-vendor-animation-duration" : "2s"});
  }

  $("#nameHdr").css("visibility", "visible");
  $("#nameHdr").animateCss('zoomIn', function() {
    $("#descr1").css("visibility", "visible");
    $("#descr1").animateCss('fadeInUp', function() {
      $("#descr2").css("visibility", "visible");
      $("#descr2").animateCss('fadeInUp', function() {
        $("#descr3").css("visibility", "visible");
        $("#descr3").animateCss('fadeInUp', function() {
            for (var i=1; i<=3; i++) {
              $("#descrBar"+i).css("visibility", "visible");
              $("#descrBar"+i).animateCss('fadeIn');
            }             
            $("#arrRight").css("visibility", "visible");
            $("#arrDown").css("visibility", "visible");
            $("#arrLeft").css("visibility", "visible");
            $('#arrows h4[id^="hdr"]').css("visibility", "visible");
            $("#arrows").animateCss('fadeIn', function() {ready = true;});
          });
      });
    });
  });
    // Microsoft Edge only - needed for background image to fit properly.
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      $('#bg').css("max-height", window.innerHeight+"px");
      $('#bg1').css("max-height", window.innerHeight+"px");
      $('#bg2').css("max-height", window.innerHeight+"px");
      $('#bg3').css("max-height", window.innerHeight+"px");
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

window.onload = getUserArrowChoice;
function getUserArrowChoice() {
  document.getElementById("arrows").onclick = setArrowChoice;
  video = document.getElementById("myVideo");
}

function setArrowChoice(e) {
  if (e.target.tagName == 'BUTTON' && ready) {

    var x = document.getElementById("indexPage");

    // Change header animation duration back to 1.5s.
    $('#nameHdr').css("animation-duration", "1.5s");
    $('#nameHdr').css("-vendor-animation-duration", "1.5s");

    switch (e.target.id) {
      case ("arrRight"):
        if (back) {
          $('#slideshow').animateCss('fadeOut', function() {
            $('#slideshow').css("display", "none");
            $('#indexPage').animateCss('slideInRight', function() {helper();});
          });   
        } else {
          $('#wrapper').css("background-color", "black");
          removeArrows();
          $('#indexPage').animateCss('slideOutLeft', function() {
            x.style.visibility = "hidden";
            $('#arrLeft').css("visibility", "visible");
            $('#arrLeft').animateCss('fadeIn');
            $('#vidcontainer').css("display", "inline-flex");
            $('#vidcontainer').animateCss('fadeIn');
            video.play();
          });
          back = true; home_return = false;
        }
      break;
      case ("arrLeft"):
      if (back) {
        video.pause();
        $('#vidcontainer').animateCss('fadeOut', function() {
          $('#vidcontainer').css("display", "none");
        });
        $('#indexPage').animateCss('slideInLeft', function() {
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
        }
        break;
      default: break;
    }

  }
}

function helper() {
  back = false; home_return = true;
  document.getElementById("indexPage").style.visibility = "visible";
  $('#arrRight').css("visibility", "visible");
  $("#arrLeft").css("visibility", "visible");
  $("#arrDown").css("visibility", "visible");
  $("#arrUp").css("visibility", "hidden");
  $('#arrows h4[id^="hdr"]').css("visibility", "visible");
  $('#nameHdr').css("visibility", "visible");
  $('#descr h5[id^="descr"]').css("visibility", "visible");
  $('#arrows button[class^="arr"]').animateCss('fadeIn');
  $('#arrows h4[id^="hdr"]').animateCss('fadeIn'); 
  $('#nameHdr').animateCss('fadeIn');
  $('#descr h5[id^="descr"]').animateCss('fadeIn');

}

function removeArrows() {
            $('#arrows button[class^="arr"]').css("visibility", "hidden");
            $('#arrows h4[id^="hdr"]').css("visibility", "hidden");
            $('#nameHdr').css("visibility", "hidden");
            $('#descr h5[id^="descr"]').css("visibility", "hidden");
}

// Removes autoplay attribute for safari with a width below 800 pixels. 
$(document).ready(function(){
  
  setInterval(function() {
    if (!back) {
      if (slide_num == 0) { 

        $('#bg').animateCss('fadeOut', function() {
          $('#bg').css("display", "none");
          $('#bg1').css("display", "block");
          $('#bg1').animateCss('fadeIn');
        });
        slide_num = 1;
      } else if (slide_num == 1) {
        $('#bg1').animateCss('fadeOut', function() {
          $('#bg1').css("display", "none");
          $('#bg2').css("display", "block");
          $('#bg2').animateCss('fadeIn');
        });
        slide_num = 2;
      } else if (slide_num == 2) {
        $('#bg2').animateCss('fadeOut', function() {
          $('#bg2').css("display", "none");
          $('#bg3').css("display", "block");
          $('#bg3').animateCss('fadeIn');
        });
        slide_num = 3;
      } else {
        $('#bg3').animateCss('fadeOut', function() {
          $('#bg3').css("display", "none");
          $('#bg').css("display", "block");
          $('#bg').animateCss('fadeIn');
        });
        slide_num = 0;
      } 
    }
  }, 7000);

  var screenWidth = $(window).width();
  (screenWidth < 800 && isSafari) ? $("#myVideo").attr("autoplay") : $("#myVideo").removeAttr("autoplay");
});

if (document.documentMode || /Edge/.test(navigator.userAgent)) {
  $('#bg').css("max-height", ""+window.innerHeight);
}

var slideIndex = 1; var animation = false;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  animation = true;
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  animation = false;
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
    if (back) {
      $("#slide-pic"+(slideIndex-1)).animateCss('fadeIn');
    }

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