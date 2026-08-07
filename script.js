"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. CARROUSEL / SLIDER
  // ==========================================
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const btnNext = document.querySelector(".btn-next");
  const btnPrev = document.querySelector(".btn-prev");

  let currentIndex = 0;
  let autoSlideInterval;

  // Lógica principal de renderizado
  function showSlide(index) {
    if (slides.length === 0) return; // Evita errores si no hay carrousel en la página

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

  // Navegación
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Control de reproducción automática
  function startAutoSlide() {
    if (slides.length > 0) {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Event Listeners del Carrousel
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
  // 2. BOTÓN SCROLL TO TOP
  // ==========================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    // Mostrar u ocultar botón según el scroll
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Volver al inicio con scroll suave
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
        // Ubica la tarjeta contenedora y extrae la ruta de la imagen
        const card = btn.closest('.shoutbox-card');
        if (!card) return; // Prevención si el botón no está dentro de una tarjeta

        const gifImg = card.querySelector('.shoutbox-gif');
        if (!gifImg) return;

        // Obtiene la URL absoluta del GIF (ej: https://tusitio.com/assets/posts/shoutbox/gif1.gif)
        const gifUrl = gifImg.src;

        try {
          await navigator.clipboard.writeText(gifUrl);

          // Feedback temporal al usuario
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