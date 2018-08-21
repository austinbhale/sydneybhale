$(document).ready(function() {
      $("#arrDown").css("margin-right", (-($("#arrDown").width())/2));
      $("#arrUp").css("margin-right", (-($("#arrUp").width())/2));
      $("#arrLeft").css("margin-bottom", (-($("#arrLeft").width())/2));
      $("#arrRight").css("margin-bottom", (-($("#arrRight").width())/2));
      $("#hdrDown").css("margin-right", ((-($("#hdrDown").width())/2)));
      $("#hdrUp").css("margin-right", ((-($("#hdrUp").width())/2)));
      $("#hdrLeft").css("margin-bottom", ((-($("#hdrLeft").width())/2)-5));
      $("#hdrRight").css("margin-bottom", ((-($("#hdrRight").width())/2)));

      $('#indexPage h3[id^="nameHdr"]').css({"animation-duration": "0.2s", "-vendor-animation-duration": "0.3s"});
      
      $("#nameHdr0").css("visibility", "visible");
        $("#nameHdr0").animateCss('rotateInDownRight', function() {
          $("#nameHdr1").css("visibility", "visible");
          $("#nameHdr1").animateCss('rotateInDownRight', function() {
            $("#nameHdr2").css("visibility", "visible");
            $("#nameHdr2").animateCss('rotateInDownRight', function() {
              $("#nameHdr3").css("visibility", "visible");
              $("#nameHdr3").animateCss('rotateInDownRight', function() {
                $("#nameHdr4").css("visibility", "visible");
                $("#nameHdr4").animateCss('rotateInDownRight', function() {
                  $("#nameHdr5").css("visibility", "visible");
                  $("#nameHdr5").animateCss('rotateInDownRight', function() {
                    $("#nameHdr6").css("visibility", "visible");
                    $("#nameHdr6").animateCss('rotateInDownRight', function() {
                      $("#nameHdr7").css("visibility", "visible");
                      $("#nameHdr7").animateCss('rotateInDownRight', function() {
                        $("#nameHdr8").css("visibility", "visible");
                        $("#nameHdr8").animateCss('rotateInDownRight', function() {
                          $("#nameHdr9").css("visibility", "visible");
                          $("#nameHdr9").animateCss('rotateInDownRight');
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });

        if (document.documentMode || /Edge/.test(navigator.userAgent)) {
          $('#bg').css("max-height", window.innerHeight+"px");
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

var video; var back = false;
var rightClicked = false; var leftClicked = false;
var upClicked = false; var downClicked = false;
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

window.onload = getUserArrowChoice;
function getUserArrowChoice() {
  document.getElementById("arrows").onclick = setArrowChoice;
  video = document.getElementById("myVideo");
}

function setArrowChoice(e) {
  if (e.target.tagName == 'BUTTON') {

    var x = document.getElementById("indexPage");


    switch (e.target.id) {
      case ("arrRight"):
        if (back) {
          $('#slideshow').animateCss('fadeOut', function() {
            $('#slideshow').css("display", "none");
          });
          $('#indexPage').animateCss('slideInRight', function() {helper();});
        } else {
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
        $('#p-container').animateCss('fadeOut', function() {
          $('#p-container').css("display", "none");
        });
        $('#indexPage').animateCss('slideInLeft', function() {helper();});
      } else {
        removeArrows();
        $('#indexPage').animateCss('slideOutRight', function() {
          x.style.visibility = "hidden";
          $('#arrRight').css("visibility", "visible");
          $('#arrRight').animateCss('fadeIn');
          $('#slideshow').css("display", "block");
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
  $('#indexPage h3[id^="nameHdr"]').css("visibility", "visible");
  $('#arrows button[class^="arr"]').animateCss('fadeIn');
  $('#arrows h5[id^="hdr"]').animateCss('fadeIn'); 
  $('#indexPage h3[id^="nameHdr"]').animateCss('fadeIn');
}

function removeArrows() {
            $('#arrows button[class^="arr"]').css("visibility", "hidden");
            $('#arrows h5[id^="hdr"]').css("visibility", "hidden");
            $('#indexPage h3[id^="nameHdr"]').css("visibility", "hidden");
}

// Removes autoplay attribute for safari with a width below 800 pixels. 
$(document).ready(function(){
  var screenWidth = $(window).width();
    if (screenWidth < 800 && isSafari) {
        $("#myVideo").attr("autoplay");
        $('html, body').css('overflowY', 'auto');
    } else {
      $("#myVideo").removeAttr("autoplay");
    }
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
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides[slideIndex-1] !== null) {
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
}
