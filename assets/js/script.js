(function ($) {
    "use strict";
    $('.sakura-falling').sakura();
})(jQuery);

/**
 * Play audio when the page is clicked
 */
$(document).on('click', function () {
    document.getElementById("my_audio").play();
    console.log('Shaadi me zaroor aana');
});

// Dates for the countdowns for each event
var countdownDates = {
    'engagement': new Date("Dec 2, 2024 00:00:00").getTime(),
    'wedding': new Date("Dec 6, 2024 00:00:00").getTime()
};

// Initialize countdown with the engagement date as default
var countDownDate = countdownDates['engagement'];

// Function to start the countdown
function startCountdown() {
    clearInterval(x); // Clear any previous countdown interval
    x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the countdown date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="time"
        document.getElementById("time").innerHTML =
            "<div class='container'>" +
            "<div class='days block'>" + days + "<br>Days</div>" +
            "<div class='hours block'>" + hours + "<br>Hours</div>" +
            "<div class='minutes block'>" + minutes + "<br>Minutes</div>" +
            "<div class='seconds block'>" + seconds + "<br>Seconds</div>" +
            "</div>";

        // If the countdown is over, display a message
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerHTML = "Bless the married couple for a happy life!";
        }
    }, 1000);
}

// Call countdown initially for engagement
var x; // Define x globally for clearInterval
startCountdown();

// Function to handle tab switching
// Function to switch between tabs and play the correct audio
function openTab(event, tabName) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // Remove the active class from all tabs
    var tabLinks = document.getElementsByClassName("tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the current tab and set it as active
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");

    // Stop all audio
    document.getElementById('engagement-audio').pause();
    document.getElementById('engagement-audio').currentTime = 0;
    document.getElementById('wedding-audio').pause();
    document.getElementById('wedding-audio').currentTime = 0;

    // Play the correct audio for the selected tab
    if (tabName === 'engagement') {
        document.getElementById('engagement-audio').play();
    } else if (tabName === 'wedding') {
        document.getElementById('wedding-audio').play();
    }
}

// Automatically play the engagement song on page load
window.onload = function() {
    document.getElementById('engagement-audio').play();
}

