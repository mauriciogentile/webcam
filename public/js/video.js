var video = document.querySelector("#vid");
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;
var $frame = $("#frame");
var $video = $("#vid");
var $canvas = $("#canvas");
var $shotBtn = $("#shotBtn");
var $showVideoBtn = $("#showVideoBtn");
var $videoContainer = $("#videoContainer");
var $top = $("#top");
var $bottom = $("#bottom");
var $left = $("#left");
var $right = $("#right");

var onCameraFail = function (e) {
    e.preventDefault();
    alert("Camera didn't work!");
};

var showVideo = function() {
    $(".snapshot").hide();
    $(".video").show();
}

var showSnapshot = function() {
    $(".video").hide();
    $(".snapshot").show();
}

var refreshFocus = function() {
    var videoTop = $videoContainer.position().top;
    var videoLeft = $videoContainer.position().left;
    var videoWidth = $videoContainer.width();
    var videoHeight = $videoContainer.height();
    var frameTop = $frame.position().top;
    var frameLeft = $frame.position().left;
    var frameHeight = $frame.height();
    var frameWidth = $frame.width();
    
    setPosition($top, videoLeft, videoTop);
    setSize($top, videoWidth, frameTop - videoTop);
    setPosition($bottom, videoLeft, frameTop + frameHeight);
    setSize($bottom, videoWidth, videoHeight - $top.height() - frameHeight);
    setPosition($left, videoLeft, frameTop);
    setSize($left, frameLeft - videoLeft, frameHeight);
    setPosition($right, frameLeft + frameWidth, frameTop);
    setSize($right, videoWidth - $left.width() - frameWidth, frameHeight);
}

var setPosition = function($ele, left, top) {
    $ele.css({ left: left + "px", top: top + "px" });
}

var setSize = function($ele, width, height) {
    $ele.css({ width: width + "px", height: height + "px" });
}

$shotBtn.click(function() {
    if (localMediaStream) {
        var sourceX = $frame.offset().left - $video.position().left;
        var sourceY = $frame.offset().top - $video.position().top;
        var sourceWidth = $frame.width();
        var sourceHeight = $frame.height();
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
        showSnapshot();
    }
});

$showVideoBtn.click(showVideo);

$(function() {
    showVideo();
    $frame.draggable({ containment: "#videoContainer", scroll: false, drag: refreshFocus });
    var x = $frame.width() / 2;
    var y = $frame.height() / 2;
    setPosition($frame, $videoContainer.position().left + x, $videoContainer.position().top + y);
    refreshFocus();
});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

navigator.getUserMedia({ video: true }, function (stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
}, onCameraFail);