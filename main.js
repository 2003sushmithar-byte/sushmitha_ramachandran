/* ==========================================
   AuraCare Hospital - Custom JS Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAboutTabs();
  initModals();
  initFormValidation();
  initScrollAnimations();
  initScrollToTop();
  initWhatsAppGreet();
});

/* ==========================================
   Navigation Handler
   ========================================== */
function initNavigation() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // Active link highlight based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   About Us Tab Switcher
   ========================================== */
function initAboutTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to current button and content
      button.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ==========================================
   Modals (Booking & Service Details)
   ========================================== */
// Service details content repository
const servicesDetails = {
  cardiology: {
    title: 'Advanced Cardiology Care',
    content: `
      <p>Our Cardiology Department offers comprehensive diagnostic and therapeutic services for patients with cardiovascular disease. Backed by state-of-the-art labs and imaging centers, our cardiologists treat complex heart conditions with precision and care.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">Key Treatments & Procedures:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Electrocardiogram (ECG) and Stress Tests</li>
        <li>Cardiac Catheterization and Angioplasty</li>
        <li>Pacemaker and ICD Implantation</li>
        <li>Management of Heart Failure and Coronary Artery Disease</li>
      </ul>
      <p>We focus on preventative cardiology, offering tailored lifestyle modification advice, regular screenings, and cardiovascular rehabilitation plans to keep your heart strong.</p>
    `
  },
  pediatrics: {
    title: 'Compassionate Pediatrics',
    content: `
      <p>At AuraCare, our pediatric experts provide child-friendly healthcare services for infants, children, and adolescents. We aim to ensure a warm, comfortable experience to make pediatric visits stress-free.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">Services Include:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Newborn Care and Well-child Examinations</li>
        <li>Immunization and Vaccination Schedules</li>
        <li>Childhood Development Assessments</li>
        <li>Treatment of Acute and Chronic Pediatric Illnesses</li>
      </ul>
      <p>We collaborate closely with parents to guide them through their children's physical, emotional, and social development phases.</p>
    `
  },
  neurology: {
    title: 'Expert Neurology Solutions',
    content: `
      <p>Our Neurological Clinic treats disorders of the central and peripheral nervous systems. With specialized specialists, we focus on restoring function and improving the quality of life for our patients.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">We Diagnose and Treat:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Migraines and Chronic Headaches</li>
        <li>Epilepsy and Seizure Disorders</li>
        <li>Stroke Diagnosis and Rehabilitation</li>
        <li>Movement Disorders, including Parkinson's Disease</li>
      </ul>
      <p>Our neurodiagnostic lab utilizes high-resolution EEG and EMG systems for precise clinical assessments.</p>
    `
  },
  orthopedics: {
    title: 'Comprehensive Orthopedics',
    content: `
      <p>The Orthopedic Center is dedicated to restoring mobility, rebuilding joints, and relieving pain. We offer orthopedic surgeries, sports medicine treatments, and structured rehabilitation.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">Core Specializations:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Total Hip and Knee Replacements</li>
        <li>Arthroscopic Surgery for Sports Injuries</li>
        <li>Fracture and Complex Trauma Management</li>
        <li>Spinal Care and Physical Therapy Programs</li>
      </ul>
      <p>Our teams leverage minimally invasive surgical techniques, speeding up healing and minimizing post-operative discomfort.</p>
    `
  },
  medicine: {
    title: 'General Internal Medicine',
    content: `
      <p>Our Internal Medicine department serves as the first point of contact for adult healthcare. We manage general wellness, preventative checks, and chronic diseases.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">Care Areas:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Annual Comprehensive Physical Examinations</li>
        <li>Hypertension and Diabetes Management</li>
        <li>Cholesterol and Cardiovascular Risk Screenings</li>
        <li>Geriatric Health and Multi-system Chronic Illnesses</li>
      </ul>
      <p>We design custom health check-ups and advocate for preventive medicine through early diagnostic tests.</p>
    `
  },
  emergency: {
    title: '24/7 Emergency Medical Services',
    content: `
      <p>AuraCare's emergency unit is fully staffed 24/7 by trauma surgeons, emergency physicians, and nurses who specialize in rapid-response critical care.</p>
      <h5 style="margin: 1rem 0 0.5rem 0; color: var(--primary);">Immediate Capabilities:</h5>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem;">
        <li>Acute Trauma and Burn Stabilization</li>
        <li>Cardiac Arrest and Stroke Intervention protocols</li>
        <li>Advanced Life Support (ALS) Ambulances</li>
        <li>Fully-equipped Critical Care & Trauma Rooms</li>
      </ul>
      <p><strong>Emergency Contact:</strong> If you are experiencing a life-threatening emergency, call our direct line at (555) 019-9000 immediately.</p>
    `
  }
};

function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const closeModalBtn = document.getElementById('close-modal');

  // Helper to open modal
  const openModal = (title, contentHTML) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHTML;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent scrolling
  };

  // Helper to close modal
  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // If we closed the booking modal, reset the booking form inside if any
    const bookingForm = document.getElementById('appointment-booking-form');
    if (bookingForm && modalBody.contains(bookingForm)) {
      bookingForm.reset();
      clearFormErrors(bookingForm);
    }
  };

  // Attach close events
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Esc key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Wire up "Read More" links on Service Cards
  const serviceLinks = document.querySelectorAll('.service-link');
  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const serviceId = link.getAttribute('data-service');
      const details = servicesDetails[serviceId];
      if (details) {
        openModal(details.title, details.content);
      }
    });
  });

  // Wire up "Book Appointment" buttons
  const bookingButtons = document.querySelectorAll('.book-apt-btn');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Inject appointment form template
      const formHTML = `
        <form id="appointment-booking-form" noValidate>
          <div class="form-group">
            <label for="apt-name">Patient Name *</label>
            <input type="text" id="apt-name" class="form-control" placeholder="Enter patient full name">
            <div class="error-msg">Please enter patient name</div>
          </div>
          <div class="form-group-row" style="margin-bottom: 0;">
            <div class="form-group">
              <label for="apt-email">Email Address *</label>
              <input type="email" id="apt-email" class="form-control" placeholder="example@email.com">
              <div class="error-msg">Enter a valid email address</div>
            </div>
            <div class="form-group">
              <label for="apt-phone">Phone Number *</label>
              <input type="tel" id="apt-phone" class="form-control" placeholder="e.g. 5550199">
              <div class="error-msg">Enter a valid phone number</div>
            </div>
          </div>
          <div class="form-group-row" style="margin-bottom: 0;">
            <div class="form-group">
              <label for="apt-dept">Select Department *</label>
              <select id="apt-dept" class="form-control">
                <option value="">-- Choose Department --</option>
                <option value="cardiology">Cardiology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="general">General Medicine</option>
              </select>
              <div class="error-msg">Select a medical specialty</div>
            </div>
            <div class="form-group">
              <label for="apt-date">Preferred Date *</label>
              <input type="date" id="apt-date" class="form-control">
              <div class="error-msg">Select a preferred appointment date</div>
            </div>
          </div>
          <div class="form-group">
            <label for="apt-notes">Symptom Brief / Special Instructions</label>
            <textarea id="apt-notes" class="form-control" placeholder="Briefly describe symptoms or questions..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Confirm Booking Request</button>
        </form>
      `;
      openModal('Book Your Appointment', formHTML);

      // Re-attach submit handler for the dynamic booking form
      const bookingForm = document.getElementById('appointment-booking-form');
      if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (validateForm(bookingForm)) {
            closeModal();
            showToast('Appointment booking request submitted! We will contact you shortly.');
          }
        });
      }
    });
  });
}

/* ==========================================
   Form Input Validations
   ========================================== */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(contactForm)) {
        contactForm.reset();
        showToast('Message sent successfully! Our administrative desk will reach out soon.');
      }
    });
  }
}

function validateForm(formElement) {
  let isValid = true;
  const inputs = formElement.querySelectorAll('.form-control[id]');
  
  inputs.forEach(input => {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    let fieldValid = true;

    // Check validation criteria based on IDs or Types
    if (input.id.includes('name') && value === '') {
      fieldValid = false;
    } else if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        fieldValid = false;
      }
    } else if (input.type === 'tel') {
      const phoneRegex = /^[0-9\-\+\s]{7,15}$/;
      if (!phoneRegex.test(value)) {
        fieldValid = false;
      }
    } else if (input.tagName === 'SELECT' && value === '') {
      fieldValid = false;
    } else if (input.id.includes('date') && value === '') {
      fieldValid = false;
    } else if (input.id.includes('message') && value === '') {
      fieldValid = false;
    }

    if (!fieldValid) {
      formGroup.classList.add('has-error');
      isValid = false;
    } else {
      formGroup.classList.remove('has-error');
    }
  });

  return isValid;
}

function clearFormErrors(formElement) {
  const groups = formElement.querySelectorAll('.form-group');
  groups.forEach(g => g.classList.remove('has-error'));
}

/* ==========================================
   Toast Notification System
   ========================================== */
function showToast(message) {
  // Create toast element dynamically if it doesn't exist
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      <span id="toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const toastText = document.getElementById('toast-text');
  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================
   Scroll Animations
   ========================================== */
function initScrollAnimations() {
  // Set up custom class styles for scroll animations dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-on-scroll.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Apply reveal class to sections, cards and headers
  const elementsToAnimate = [
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.service-card'),
    ...document.querySelectorAll('.about-grid > div'),
    ...document.querySelectorAll('.contact-grid > div'),
    ...document.querySelectorAll('.stat-item')
  ];

  elementsToAnimate.forEach(el => el.classList.add('reveal-on-scroll'));

  // Intersection observer to trigger animation
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    elementsToAnimate.forEach(el => el.classList.add('animate'));
  }
}

/* ==========================================
   Scroll To Top Handler
   ========================================== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   WhatsApp Widget Greet Message Builder
   ========================================== */
function initWhatsAppGreet() {
  const waLink = document.getElementById('whatsapp-link');
  if (!waLink) return;

  // Custom greeting message URL encoded
  const phone = '15550199000'; // Demo number
  const text = 'Hello AuraCare Hospital, I would like to schedule an inquiry or request information regarding your medical services.';
  const encodedText = encodeURIComponent(text);
  
  waLink.setAttribute('href', `https://wa.me/${phone}?text=${encodedText}`);
}
