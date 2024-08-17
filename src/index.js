import './styles/main.css'
import renderCarousel from './components/carousel';


  const carouselDragArea = document.querySelector('.carousel-drag-area');
  const carousel = document.querySelector("#carousel");

  let startX, offsetX, translateX;
  let xStart = 0;

  const mouseDown = (e) => {
    carouselDragArea.style.cursor = 'grabbing';
    e.stopPropagation();
    e.preventDefault();
    startX = e.clientX;
    addDocumentListeners();
  }

  const touchStart = (e) => {
    startX = e.touches[0].clientX;
    addMobileListeners()
  }

  const addDocumentListeners = () => {
    document.addEventListener('mousemove', carouselDrag);
    document.addEventListener('mouseup', carouselStopDrag);
  }

  const addMobileListeners = () => {
    document.addEventListener('touchmove', carouselDrag);
    document.addEventListener('touchend', carouselStopDrag);
  }

  const carouselDrag = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX) {
      const carouselWidth = carousel.children[0].offsetWidth * carousel.children.length;
      offsetX = clientX - startX;
      if (!(xStart + offsetX > 0) && ((carouselWidth - document.documentElement.clientWidth) + (xStart + offsetX)) >= 0) {
        translateX = xStart + offsetX;
        carousel.style.transform = `translateX(${translateX}px)`;
      }
    }
  };

  const carouselStopDrag = () => {
    carouselDragArea.style.cursor = 'grab';
    xStart = translateX;
    document.removeEventListener('mousemove', carouselDrag);
    document.removeEventListener('mouseup', carouselStopDrag);
    document.removeEventListener('touchmove', carouselDrag);
    document.removeEventListener('touchend', carouselStopDrag);
  }

  carouselDragArea.addEventListener('mousedown', mouseDown);
  carouselDragArea.addEventListener('touchstart', touchStart);

  document.addEventListener('mouseup', (e) => {
    document.removeEventListener('mousemove', carouselDrag);
  });

  document.addEventListener('touchend', (e) => {
    document.removeEventListener('touchend', carouselDrag);
  });

  document.addEventListener("DOMContentLoaded", (event) => {
    renderCarousel();
  });