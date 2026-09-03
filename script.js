// City Mission — SF Chinese Foursquare Church
// Shared behavior for index.html: mobile nav toggle, footer year,
// join-form submission (Web3Forms), and scroll-reveal animation.

document.addEventListener('DOMContentLoaded', () => {

  // --- footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close menu after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- join form (Web3Forms) ---
  const joinForm = document.getElementById('joinForm');
  const joinNote = document.getElementById('joinNote');
  if (joinForm) {
    joinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = joinForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending... 傳送中...'; }
      if (joinNote) { joinNote.textContent = ''; }

      try {
        const formData = new FormData(joinForm);
        const res = await fetch(joinForm.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
        const result = await res.json();

        if (result.success) {
          if (joinNote) joinNote.textContent = "Thanks — we'll be in touch soon! 謝謝，我們會盡快與你聯絡！";
          joinForm.reset();
        } else {
          if (joinNote) joinNote.textContent = 'Something went wrong. Please try again. 傳送失敗，請再試一次。';
        }
      } catch (err) {
        if (joinNote) joinNote.textContent = 'Something went wrong. Please try again. 傳送失敗，請再試一次。';
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
      }
    });
  }

  // --- scroll reveal (progressive enhancement) ---
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  }
});
