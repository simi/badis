// var params = { allowScriptAccess: "always" };
// var atts = { id: "myytplayer", wmode: "direct" };
// swfobject.embedSWF("http://www.youtube.com/v/wz31LPDgkuI?enablejsapi=1&playerapiid=ytplayer&version=3&modestbranding=0&autohide=1&showinfo=0&controls=0;", "ytapiplayer", "425", "356", "8", null, null, params, atts);
//
window.timeout = null;
window.video = null;
function playVideo(playerId) {
  ytplayer = document.getElementById(playerId);
  ytplayer.addEventListener("onStateChange", "changeState");
  console.log("playing " + playerId);
  window.video = ytplayer;
  ytplayer.playVideo();
}

function changeState(state){
  if(state === 0) changeSlide();
};


function changeSlide() {
  Reveal.next();
}

function onYouTubePlayerReady(playerId) {
  if(playerId == 'player-0') start();
};

//Reveal.addEventListener("ready", start);
Reveal.addEventListener("slidechanged", start);

function start (event) {
  if(window.timeout) clearTimeout(window.timeout);
  if(window.video) window.video.stopVideo();
  if(event == undefined) {
    playVideo('video-0');
  } else {
    if(event.currentSlide.dataset.type == "time") {
      window.timeout = setTimeout(changeSlide, 10000);
    } else if(event.currentSlide.dataset.type == "video") {
      var playerId = $('[id^="video-"]', Reveal.getCurrentSlide()).attr('id');
      playVideo(playerId);
    }
  }
};

$(document).ready(function() {

  $('[data-youtube-video-id]').each(function(index, element) {
    var el = $(element);

    // set ids
    el.attr('id', 'video-' + index);

    var id = 'video-' + index;
    var playerId = 'player-' + index;
    var videoId = el.data('youtube-video-id');

    var params = { allowScriptAccess: "always" };
    var atts = { id: id, wmode: "direct" };
    swfobject.embedSWF("http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=" + playerId + "&version=3&modestbranding=0&autohide=1&showinfo=0&controls=0;",
                       id, "425", "356", "8", null, null, params, atts);
  });

  function updateTime() {
    var now = new Date();
    var timeString = ('0' + now.getHours()).slice(-2) + ':'
    + ('0' + (now.getMinutes())).slice(-2) + ':'
    + ('0' + (now.getSeconds())).slice(-2);
    $('[data-type="time"] .update-time').html(timeString);
  }
  setInterval(updateTime, 500);
});
