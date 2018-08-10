$(document).ready(function() {
      $("#arrDown").css("margin-right", (-($("#arrDown").width())/2));
      $("#arrUp").css("margin-right", (-($("#arrUp").width())/2));
      $("#arrLeft").css("margin-bottom", (-($("#arrLeft").width())/2));
      $("#arrRight").css("margin-bottom", (-($("#arrRight").width())/2));
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

// Adapted from Animate.CSS
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

var back = false;
var rightClicked = false;
var leftClicked = false;
var upClicked = false;
var downClicked = false;
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
var video;

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
        });
        back = true; home_return = false;
      }
      break;
      case("arrUp"): 
        if (back) {
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
  $('#arrows button[class^="arr"]').animateCss('fadeIn'); 
}

function removeArrows() {
            $("#arrDown").css("visibility", "hidden");
            $("#arrLeft").css("visibility", "hidden");
            $("#arrUp").css("visibility", "hidden");
            $("#arrRight").css("visibility", "hidden");
}

// Removes autoplay attribute for safari with a width below 800 pixels. 
$(document).ready(function(){
  var screenWidth = $(window).width();
    if (isSafari && screenWidth < 800) {
      $("#myVideo").attr("autoplay");
    } else {
      $("#myVideo").removeAttr("autoplay");
    }
});

// if (isSafari && window.matchMedia("(orientation: portrait)").matches) {
// }
