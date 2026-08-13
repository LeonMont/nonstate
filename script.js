"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // MENÚ OVERLAY A PANTALLA COMPLETA
  // ==========================================
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const fullscreenMenu = document.getElementById("fullscreen-menu");

  window.addEventListener('scroll', function() {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  // Calcula el porcentaje de scroll completado
  const scrolled = (winScroll / height) * 100;
  
  // Actualiza el ancho de la barra de progreso
  const progressBar = document.getElementById('readingProgressBar');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
});

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

window.addEventListener('scroll', function() {
  const floatingBar = document.getElementById('floatingBar');
  
  if (window.scrollY > 300) {
    floatingBar.classList.add('visible');
  } else {
    floatingBar.classList.remove('visible');
  }
});
  
  // ==========================================
  // 1. CARROUSEL / SLIDER
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
  // 2. BOTÓN SCROLL TO TOP (Optimizado)
  // ==========================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    let isScrolling = false;

    window.addEventListener("scroll", () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
          isScrolling = false;
        });
        isScrolling = true;
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==========================================
  // 3. COPIAR ENLACE DE GIF (SHOUTBOX)
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
  // 4. INICIALIZACIÓN GENERAL
  // ==========================================
  startAutoSlide();
});