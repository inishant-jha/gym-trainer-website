 
   // Scroll Indicator
        const scrollIndicator = document.getElementById('scrollIndicator');
       window.addEventListener('scroll', () => {
   window.requestAnimationFrame(() => {
       const scrolled = window.scrollY;
       const maxScroll = document.body.scrollHeight - window.innerHeight;
       const width = (scrolled / maxScroll) * 100;
       scrollIndicator.style.width = width + "%";
   });
});
 
 //Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

    }

});

        
        // Testimonial slider
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            testimonials[index].classList.add('active');
            currentTestimonial = index;
        }
        
        prevBtn.addEventListener('click', () => {
            let index = currentTestimonial - 1;
            if (index < 0) index = testimonials.length - 1;
            showTestimonial(index);
        });
        
        nextBtn.addEventListener('click', () => {
            let index = currentTestimonial + 1;
            if (index >= testimonials.length) index = 0;
            showTestimonial(index);
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            let index = currentTestimonial + 1;
            if (index >= testimonials.length) index = 0;
            showTestimonial(index);
        }, 5000);
        
        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                // Toggle current FAQ
                answer.classList.toggle('active');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
                
                // Close other FAQs
                document.querySelectorAll('.faq-question').forEach(otherQuestion => {
                    if (otherQuestion !== question) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        
                        otherAnswer.classList.remove('active');
                        otherIcon.classList.remove('fa-chevron-up');
                        otherIcon.classList.add('fa-chevron-down');
                    }
                });
            });
        });
        
        // Form submission
        
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  fetch("https://script.google.com/macros/s/AKfycbwwzoin9EY8oLn_aTK9wQCGr91j_wk_LwmBhNsEyxapQ0rHGoCmhLRrRR7vFQgvRGmf/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNo: document.getElementById("phone").value,
      goal: document.getElementById("goal").value,
      message: document.getElementById("message").value,
    }),
  })
    .then(() => {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(() => {
      alert("❌ Something went wrong. Try again!");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    });
});


        // Fade-in animation on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFade() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Check on load and scroll
        window.addEventListener('load', checkFade);
        window.addEventListener('scroll', checkFade);
        
        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Transformation Slider Functionality
        class TransformationSlider {
            constructor(containerId) {
                this.container = document.getElementById(containerId);
                this.beforeImage = this.container.querySelector('.transformation-slider-before');
                this.handle = this.container.querySelector('.transformation-slider-handle');
                this.isDragging = false;
                
                this.init();
            }
            
            init() {
                // Set initial position
                this.updateSliderPosition(50);
                
                // Mouse events
                this.container.addEventListener('mousedown', this.startDrag.bind(this));
                document.addEventListener('mousemove', this.drag.bind(this));
                document.addEventListener('mouseup', this.stopDrag.bind(this));
                
                // Touch events for mobile
                this.container.addEventListener('touchstart', this.startDrag.bind(this));
                document.addEventListener('touchmove', this.drag.bind(this));
                document.addEventListener('touchend', this.stopDrag.bind(this));
                
                // Click to move
                this.container.addEventListener('click', this.clickToMove.bind(this));
            }
            
            startDrag(e) {
                e.preventDefault();
                this.isDragging = true;
                this.container.classList.add('dragging');
            }
            
            drag(e) {
                if (!this.isDragging) return;
                
                e.preventDefault();
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                if (!clientX) return;
                
                const rect = this.container.getBoundingClientRect();
                const x = clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                
                this.updateSliderPosition(percentage);
            }
            
            stopDrag() {
                this.isDragging = false;
                this.container.classList.remove('dragging');
            }
            
            clickToMove(e) {
                const rect = this.container.getBoundingClientRect();
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                if (!clientX) return;
                
                const x = clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                
                this.updateSliderPosition(percentage);
            }
            
            updateSliderPosition(percentage) {
                // Constrain percentage between 0 and 100
                percentage = Math.max(0, Math.min(100, percentage));
                
                // Update before image width and handle position
                this.beforeImage.style.width = `${percentage}%`;
                this.handle.style.left = `${percentage}%`;
            }
        }
        
        // Initialize transformation sliders when page loads
        window.addEventListener('DOMContentLoaded', () => {
            // Create sliders for each transformation card
            const slider1 = new TransformationSlider('slider1');
            const slider2 = new TransformationSlider('slider2');
            const slider3 = new TransformationSlider('slider3');
            
            console.log('Transformation sliders initialized');
        });