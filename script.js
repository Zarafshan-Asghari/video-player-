"use strict";
// selecting elements
const videoEl = document.querySelector("video");
const player = document.querySelector(".player"); //FIXME
const progressRange = document.getElementById("progress-range");
const progressBar = document.getElementById("progress-bar");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const volumeEl = document.getElementById("volume");
const volumeRange = document.getElementById("volume-range");
const volumeBar = document.getElementById("volume-bar");
const currentTime = document.getElementById("time-elapsed");
const duration = document.getElementById("time-duration");
const fullscreenBtn = document.getElementById("full-screen");
const speeds = document.getElementById("player-speed");

// play & pause ----------------------------------
function togglePlay() {
  // paused method checks if video is paused or not
  if (videoEl.paused) {
    videoEl.play();
    pauseBtn.classList.remove("hidden");
    playBtn.classList.add("hidden");
  } else {
    videoEl.pause();
    showPlay();
  }
}
function showPlay() {
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// progress bar ----------------------------------
function updateProgress() {
  // currenttime property return the current playback position of video or audio in (seconds).
  // * duration property returns the lenght of audio or video .
  progressBar.style.width = `${
    (videoEl.currentTime / videoEl.duration) * 100
  }%`;
  currentTime.textContent = `${updateTime(videoEl.currentTime)}/`;
  duration.textContent = `${updateTime(videoEl.duration)}`;
}

// update time
function updateTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// * function for clickable functionality for progress bar.
function setProgress(event) {
  // * total width of progress range
  const newTime = event.offsetX / progressRange.offsetWidth;
  console.log(newTime);
  progressBar.style.width = `${newTime}%`;
  videoEl.currentTime = newTime * videoEl.duration;
}

// volume  ---------------------------------------
let lastVoluem = 1;
function changeVoluem(e) {
  let voluem = e.offsetX / volumeRange.offsetWidth;

  if (voluem > 0.9) {
    voluem = 1;
  }
  if (voluem < 0.1) {
    voluem = 0;
  }

  volumeBar.style.width = `${voluem * 100}%`;
  videoEl.volume = voluem;
  // voluem icons depend on voluems I used ionicons to change (name attributes) .

  if (voluem > 0.7) {
    volumeEl.setAttribute("name", "volume-high");
  } else if (voluem < 0.7 && voluem > 0) {
    volumeEl.setAttribute("name", "volume-low");
  } else if (voluem === 0) {
    volumeEl.setAttribute("name", "volume-mute");
  }
  lastVoluem = voluem;
}

// function for mute or unmute video when we click to voluem icon
function toggleMute() {
  // if video had voluem
  if (videoEl.volume) {
    lastVoluem = videoEl.volume;
    videoEl.volume = 0;
    volumeBar.style.width = 0;
  } else {
    videoEl.volume = lastVoluem;
    volumeBar.style.width = `${lastVoluem * 100}%`;
  }
}

// play speeds  ----------------------------------
function changeSpeed() {
  //  by default playbackRate is 100%. playbackRate sets or return the speed of video or audio.
  videoEl.playbackRate = speeds.value;
}
// full screen  ----------------------------------
// openfullscreen
function openFullscreen(element) {
  if (element.reqestFullscreen) {
    element.reqestFullscreen();
  } else if (element.mozRequestFullScreen) {
    //firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    // chrome ,safari
    element.webkitRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
  videoEl.classList.add("video-fullScreen");
  videoEl.classList.add("relative", "top-[50%]");
}
// close fullscreen
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    //for firefox browser
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullScreen) {
    // chrome ,safari,opera
    document.webkitExitFullScreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen(); //Edge & IE
  }
  videoEl.classList.remove("video-fullScreen");
}

let fullscreen = false;
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// * event listeners *----------------------------
playBtn.addEventListener("click", togglePlay);
pauseBtn.addEventListener("click", togglePlay);
videoEl.addEventListener("click", togglePlay);
// if video ended we want to remove pause icon and add play icon
videoEl.addEventListener("ended", showPlay);
// * timeupdate event : هنگامی اتفاق می افتد که موقعیت فعلی پخش تغییر کند
videoEl.addEventListener("timeupdate", updateProgress);
// * canplay event : fires when the browser can start playing the video or audio.
videoEl.addEventListener("canplay", updateProgress);
// * clickable functionality to progress bar.
progressRange.addEventListener("click", setProgress);
// voluem
volumeRange.addEventListener("click", changeVoluem);
// mute & unmute
volumeEl.addEventListener("click", toggleMute);
// speed
speeds.addEventListener("change", changeSpeed);
// full screen
fullscreenBtn.addEventListener("click", toggleFullscreen);
