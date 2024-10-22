// get this url from razor pay
// Log in and create an account
// Use test products and build a custom payment page
// Generate url and add it here
const RAZOR_PAY_URL = 'https://rzp.io/rzp/3hnbVQz';

(function ($) {
    "use strict";
    $('.sakura-falling').sakura();
})(jQuery);

// Play audio when the page is clicked
$(document).on('click', function () {
    var audioElement = document.getElementById("my_audio");
    if (audioElement) {
        audioElement.play();
        console.log('Shaadi me zaroor aana');
    }
});

// Dates for the countdowns for each event
var countdownDates = {
    'engagement': new Date("Dec 2, 2024 00:00:00").getTime(),
    'wedding': new Date("Dec 6, 2024 00:00:00").getTime()
};

// Initialize countdown
var countDownDate = countdownDates['engagement'];
var x; // Timer interval reference

function setCountdown(date) {
    clearInterval(x); // Clear any existing interval

    // Set the countdown to the provided date
    countDownDate = new Date(date).getTime();

    x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Ensure the time div exists before attempting to update it
        var timeDiv = document.getElementById("time");
        if (timeDiv) {
            timeDiv.innerHTML =
                "<div class='container'>" +
                "<div class='days block'>" + days + "<br>Days</div>" +
                "<div class='hours block'>" + hours + "<br>Hours</div>" +
                "<div class='minutes block'>" + minutes + "<br>Minutes</div>" +
                "<div class='seconds block'>" + seconds + "<br>Seconds</div>" +
                "</div>";
        }

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(x);
            if (timeDiv) {
                timeDiv.innerHTML = "The event has started!";
            }
        }
    }, 1000);
}

function setPaymentsGateway() {
    var giftButton = document.getElementById('gift-btn');
    giftButton.onclick = function() {
        window.location.href = RAZOR_PAY_URL;
    };
}
// Start countdown on page load for engagement
window.onload = function () {
    var engagementAudio = document.getElementById('engagement-audio');
    if (engagementAudio) {
        engagementAudio.play();
    }
    setCountdown(countdownDates['engagement']);
    setPaymentsGateway();
};

// Function to handle tab switching
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
    var tabContent = document.getElementById(tabName);
    if (tabContent) {
        tabContent.classList.add("active");
    }
    event.currentTarget.classList.add("active");

    // Stop all audio
    var engagementAudio = document.getElementById('engagement-audio');
    var weddingAudio = document.getElementById('wedding-audio');

    if (engagementAudio) {
        engagementAudio.pause();
        engagementAudio.currentTime = 0;
    }
    if (weddingAudio) {
        weddingAudio.pause();
        weddingAudio.currentTime = 0;
    }

    // Play the correct audio and start the corresponding countdown
    if (tabName === 'engagement' && engagementAudio) {
        engagementAudio.play();
        setCountdown(countdownDates['engagement']);
    } else if (tabName === 'wedding' && weddingAudio) {
        weddingAudio.play();
        setCountdown(countdownDates['wedding']);
    }
}
