'use strict';

// --- CONFIGURATION ---
// Change CORRECT_PASSWORD to set the site password.
// Change EVENT_DATE to match the actual event date and time.
var CORRECT_PASSWORD = 'poker2025';
var EVENT_DATE = new Date('2025-08-02T20:00:00');

// --- PASSWORD GATE ---
function checkPassword() {
    var input = document.getElementById('password-input');
    var error = document.getElementById('password-error');

    if (input.value === CORRECT_PASSWORD) {
        var overlay = document.getElementById('password-overlay');
        var main = document.getElementById('main-content');
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
        main.classList.remove('hidden');
        // Move focus into main content for keyboard users
        main.setAttribute('tabindex', '-1');
        main.focus();
        startCountdown();
    } else {
        error.classList.remove('hidden');
        input.value = '';
        input.focus();
    }
}

// --- MUSIC TOGGLE ---
var isPlaying = false;

function toggleMusic() {
    var audio = document.getElementById('bg-music');
    var btn = document.getElementById('music-toggle');
    var text = document.getElementById('music-text');

    if (isPlaying) {
        audio.pause();
        text.textContent = 'Play Music';
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'Play background music');
    } else {
        audio.play().catch(function () {
            // No audio source — toggle state still reflects intent
        });
        text.textContent = 'Pause Music';
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'Pause background music');
    }
    isPlaying = !isPlaying;
}

// --- COUNTDOWN TIMER ---
function startCountdown() {
    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateCountdown() {
        var now = new Date();
        var diff = EVENT_DATE - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent    = pad(days);
        document.getElementById('hours').textContent   = pad(hours);
        document.getElementById('minutes').textContent = pad(minutes);
        document.getElementById('seconds').textContent = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// --- RSVP FORM ---
function handleRsvpSubmit(event) {
    event.preventDefault();
    var name       = document.getElementById('rsvp-name').value.trim();
    var attendance = document.getElementById('rsvp-attendance').value;

    if (!name || !attendance) {
        return;
    }

    document.getElementById('rsvp-form').classList.add('hidden');
    var confirmation = document.getElementById('confirmation-msg');
    confirmation.classList.remove('hidden');
    confirmation.setAttribute('tabindex', '-1');
    confirmation.focus();
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function () {
    // Password gate
    document.getElementById('enter-btn').addEventListener('click', checkPassword);
    document.getElementById('password-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Auto-focus the password input on load
    document.getElementById('password-input').focus();

    // Music toggle
    document.getElementById('music-toggle').addEventListener('click', toggleMusic);

    // RSVP form
    document.getElementById('rsvp-form').addEventListener('submit', handleRsvpSubmit);
});
