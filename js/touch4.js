var next = 0;

var infoGraphics = [
  document.getElementsByClassName("ui-image-group")[0],
  document.getElementsByClassName("ui-image-group")[1],
  document.getElementsByClassName("ui-image-group")[2],
];

var isMobile = { 
  Android: function() { return navigator.userAgent.match(/Android/i); }, 
  BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
  iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
  Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
  Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
  any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) || false }
};

var mobile = isMobile.any();





$(document).ready(function() {
  if(!mobile) {
    $("#browser").attr("value", navigator.userAgent);
  }
  else {
    $("#browser").attr("value", mobile[0]);
  }

  if((navigator.userAgent).search(/msie 9|msie 8|msie 7/i) != -1) {
    alert("You're browser is really old and may not display this page correctly. Consider using Chrome or Firefox!");
  }
});





window.onload = function() {
  $(".container-fluid").css("display", "block");
  setVideoType();
  pageSetup();
  setDownloadType();
  
  setTimeout(function() {
    infoGraphics[next].setAttribute("class", "ui-image-group ui-effect-left-fadeIn");
  }, 400);
};






window.addEventListener("orientationchange", function() {
  pageSetup();
});






//Setup control buttons
$(".control").click(function() {
  infoGraphics[next].setAttribute("class", "ui-image-group ui-effect-left-fadeOut");
  
  if(next == 2) {
    next = 0;
  }
  else {
    ++next;
  }

  infoGraphics[next].setAttribute("class", "ui-image-group ui-effect-left-fadeIn");
});





//Click video to play
function playToggler() {
  var video = document.getElementById("ObrienVideo");
  if(video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
}






function pageSetup() {
  setTimeout(function() {
    var h = $("#smoke-stack").outerHeight() + 50;
    $("div.info-graphics").css("height", h + "px");
  }, 400);
  
  function hoverIn() {
    $(this).css("webkitTransform", "scale3d(1.2, 1.2, 1)");
    $(this).css("transform", "scale3d(1.2, 1.2, 1)");
  }
  
  function hoverOut() {
    $(this).css("webkitTransform", "scale3d(1, 1, 1)");
    $(this).css("transform", "scale3d(1, 1, 1)");
  }
  
  //Check for desktop device
  if(screen.width > 1024) {
    $(".ui-image").hover(hoverIn, hoverOut);
  }
  //Check for phone device in portrait mode
  else if((screen.width <= 736) && (screen.width < screen.height)) {
    $(".ui-image").click(function() {
      scaleImage(this);
    });
  }
  else {
    $(".ui-image").off("click"); //do nothing for devices in landscape mode
  }
}





function scaleImage(image) {
  if(image.scaled == undefined || image.scaled == false) {
    $(image.parentElement.children).css("width", "720px");
    
    image.parentElement.scrollLeft = (720 - innerWidth) / 2;
    
    for(var i = 0; i < image.parentElement.children.length; ++i) {
      image.parentElement.children[i].scaled = true;
    }
  }
  else {
    $(image.parentElement.children).css("width", "90%");
    
    image.parentElement.scrollLeft = 0;
    
    for(var i = 0; i < image.parentElement.children.length; ++i) {
      image.parentElement.children[i].scaled = false;
    }
  }
}





function setDownloadType() {
  if(groupType == "Atty") {
    $("#download").attr("href", "http://s3.amazonaws.com/obrien.com/dl/Asbestos-Related_Diseases_Atty.pdf");
  }
  else if(groupType == "Union") {
    $("#download").attr("href", "http://s3.amazonaws.com/obrien.com/dl/Asbestos-Related_Diseases_Union.pdf");
  }
  else {
    $("#download").attr("href", "http://s3.amazonaws.com/obrien.com/dl/Asbestos-Related_Diseases_Atty.pdf");
  }
}






function setVideoType() {
  if(screen.width > 1024) {
    $("#ObrienVideo").attr("src", "http://s3.amazonaws.com/obrien.com/video/Vingettes_Whatisit.mp4");
  }
  else {
    $("#ObrienVideo").attr("src", "http://s3.amazonaws.com/obrien.com/video/mobile_whatisit.mp4");
  }
}






$("button").click(function() {
  $.ajax({
    url: "http://"+purl+".dontfaceitalone.com/whatisit_download.html",
    async: true,
    context: document,
    crossDomain: true,
    dataType: "text",
    method: "GET",
    success: function(data) { console.log(data); document.getElementById("download").click(); },
    error: function(jqXHR, textStatus, errorThrown) { console.log(errorThrown); }
  });
});




