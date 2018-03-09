// Create an audio element with JavaScript
var audioElement = document.createElement("audio");

// Set it's source to the location
// of our Captain Planet theme song file.
audioElement.setAttribute("src", "assets/audio/jupiter.mp3");

// Theme Button
$(".theme-button").on("click", function () {
    audioElement.play();
});

// Pause Button
$(".pause-button").on("click", function () {
    audioElement.pause();
});