/* HausPower — main.js
 * GSAP rule: never set opacity:0 in CSS for animated elements.
 * GSAP.set() owns the initial state.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Header scroll behavior ──────────────────────────────────
  const header = document.getElementById('site-header');
  const logo = document.getElementById('header-logo');

  if (header) {
    // Header stays dark always — frosted glass on scroll, transparent at top.
    // Logo always stays as the light (white) version. No swap needed.
    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load
  }

  // ── Mobile menu ──────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  const openMenu = () => {
    mobileMenu && mobileMenu.classList.add('open');
    mobileOverlay && mobileOverlay.classList.add('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu && mobileMenu.classList.remove('open');
    mobileOverlay && mobileOverlay.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger && hamburger.addEventListener('click', openMenu);
  mobileClose && mobileClose.addEventListener('click', closeMenu);
  mobileOverlay && mobileOverlay.addEventListener('click', closeMenu);

  // Close on nav link click
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ── FAQ accordion ────────────────────────────────────────────
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const body = btn.nextElementSibling;

      // Close all
      document.querySelectorAll('.faq-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const bBody = b.nextElementSibling;
        if (bBody) bBody.style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isOpen && body) {
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ── GSAP scroll animations ──────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial state FIRST — GSAP owns opacity, not CSS
    gsap.set('.fade-up', { opacity: 0, y: 40 });

    // Animate each element as it enters viewport
    gsap.utils.toArray('.fade-up').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          });
        },
      });
    });
  }

});
