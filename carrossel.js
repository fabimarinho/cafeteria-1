document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.createElement('ul');
  dotsContainer.classList.add('dots');

  // Adiciona os pontos de navegação
  slides.forEach((slide, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  document.querySelector('.carousel').appendChild(dotsContainer);

  let currentSlide = 0;
  let slideIntervalId;

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    slides[index].classList.add('active');
    document.querySelector('.dot.active').classList.remove('active');
    document.querySelectorAll('.dot')[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startCarousel() {
    slideIntervalId = setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
  }

  startCarousel();

  document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(slideIntervalId));
  document.querySelector('.carousel').addEventListener('mouseleave', startCarousel);
});
