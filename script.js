// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    
    if (hamburger.classList.contains('open')) {
      mobileMenu.style.transform = 'translateX(0)';
    } else {
      mobileMenu.style.transform = 'translateX(100%)';
    }
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('open');
      mobileMenu.style.transform = 'translateX(100%)';
    });
  });
  
  // Scroll Animation for Sections
  const fadeElements = document.querySelectorAll('.section-fade-in');
  
  function checkFade() {
    fadeElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('appear');
      }
    });
  }
  
  // Initial check on page load
  checkFade();
  window.addEventListener('scroll', checkFade);
  
  // Menu Filtering
  const menuFilters = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      menuFilters.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide menu items based on filter
      menuItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Gallery Filtering (same structure as menu filtering)
  const galleryFilters = document.querySelectorAll('.gallery .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      galleryFilters.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide gallery items based on filter
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Gallery Lightbox
  const galleryModal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.getElementById('close-modal');
  const prevImage = document.getElementById('prev-image');
  const nextImage = document.getElementById('next-image');
  let currentImageIndex = 0;
  let visibleImages = [];
  
  // Setup gallery lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      // Get all currently visible images based on active filter
      visibleImages = [];
      galleryItems.forEach(img => {
        if (img.style.display !== 'none') {
          visibleImages.push(img);
        }
      });
      
      // Get index of clicked image in visible images array
      currentImageIndex = visibleImages.indexOf(item);
      
      // Show modal with clicked image
      const imgSrc = item.querySelector('img').src;
      modalImage.src = imgSrc;
      galleryModal.style.display = 'flex';
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
    galleryModal.style.display = 'none';
  });
  
  // Navigate to previous image
  prevImage.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    modalImage.src = visibleImages[currentImageIndex].querySelector('img').src;
  });
  
  // Navigate to next image
  nextImage.addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    modalImage.src = visibleImages[currentImageIndex].querySelector('img').src;
  });
  
  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      galleryModal.style.display = 'none';
    }
  });
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-btn.prev-btn');
  const nextBtn = document.querySelector('.testimonial-btn.next-btn');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let currentSlide = 0;
  
  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.add('hidden'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialSlides[index].classList.remove('hidden');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  prevBtn.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
  });
  
  nextBtn.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
    });
  });
  
  // Auto slide testimonials
  setInterval(function() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }, 8000);
  
  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simulate form submission
      setTimeout(function() {
        contactForm.reset();
        formSuccess.style.display = 'block';
        setTimeout(function() {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }
  
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simulate form submission
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
