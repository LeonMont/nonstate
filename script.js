"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // SELECTORES PRINCIPALES
  // ==========================================
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const fullscreenMenu = document.getElementById("fullscreen-menu");
  const progressBar = document.getElementById('readingProgressBar');
  const floatingBar = document.getElementById('floatingBar');
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // ==========================================
  // 1. MENÚ OVERLAY A PANTALLA COMPLETA
  // ==========================================
  if (menuBtn && fullscreenMenu && closeBtn) {
    menuBtn.addEventListener("click", () => {
      fullscreenMenu.classList.add("is-active");
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      fullscreenMenu.classList.remove("is-active");
      document.body.style.overflow = "auto";
    });
  }

  // JavaScript para duplicar el contenido y asegurar el bucle perfecto
  window.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('marqueeTrack');
    const content = track.innerHTML;
    // Duplicamos el contenido para rellenar la pista
    track.innerHTML = content + content;
  });

  // ==========================================
  // 2. CONTROLADOR UNIFICADO DE SCROLL (Rendimiento optimizado)
  // ==========================================
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        // A. Barra de progreso de lectura
        if (progressBar) {
          const scrolled = (winScroll / height) * 100;
          progressBar.style.width = scrolled + '%';
        }

        // B. Barra flotante
        if (floatingBar) {
          if (winScroll > 300) {
            floatingBar.classList.add('visible');
          } else {
            floatingBar.classList.remove('visible');
          }
        }

        // C. Botón "Scroll To Top"
        if (scrollTopBtn) {
          scrollTopBtn.style.display = winScroll > 300 ? "block" : "none";
        }

        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Funcionalidad de click para volver arriba
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  
  // ==========================================
  // 3. CARROUSEL / SLIDER
  // ==========================================
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");

  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    if (slides.length === 0) return; 

    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    if (slides.length > 0) {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (btnNext && btnPrev) {
    btnNext.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    btnPrev.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        resetAutoSlide();
      });
    });
  }

  // ==========================================
  // 4. COPIAR ENLACE DE GIF (SHOUTBOX)
  // ==========================================
  const copyButtons = document.querySelectorAll('.btn-copy');

  if (copyButtons.length > 0) {
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const card = btn.closest('.shoutbox-card');
        if (!card) return; 

        const gifImg = card.querySelector('.shoutbox-gif');
        if (!gifImg) return;

        const gifUrl = gifImg.src;

        try {
          await navigator.clipboard.writeText(gifUrl);

          const statusSpan = btn.querySelector('.copy-status');
          
          if (statusSpan) {
            const originalText = statusSpan.textContent;
            
            btn.classList.add('copied');
            statusSpan.textContent = 'Copiado';

            setTimeout(() => {
              btn.classList.remove('copied');
              statusSpan.textContent = originalText;
            }, 2000);
          }
        } catch (err) {
          console.error('Error al copiar el enlace: ', err);
        }
      });
    });
  }

  // ==========================================
  // 5. ANIMACIÓN DE ENTRADA (SERVICES GRID)
  // ==========================================
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length > 0) {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    serviceCards.forEach(card => observer.observe(card));
  }

  // ==========================================
  // 6. INICIALIZACIÓN GENERAL
  // ==========================================
  startAutoSlide();
});