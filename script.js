// Preloader Logic
window.addEventListener('load', () => {
	initEnhancedPreloader();
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize Particles.js
	if (document.getElementById('particles-js')) {
			particlesJS('particles-js', {
				"particles": {
					"number": {
						"value": 80,
						"density": {
							"enable": true,
							"value_area": 800
						}
					},
					"color": {
						"value": "#ab89ff"
					},
					"shape": {
						"type": "circle",
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
					},
					"opacity": {
						"value": 0.5,
						"random": true,
						"anim": {
							"enable": true,
							"speed": 1,
							"opacity_min": 0.1,
							"sync": false
						}
					},
					"size": {
						"value": 3,
						"random": true,
						"anim": {
							"enable": false
						}
					},
					"line_linked": {
						"enable": true,
						"distance": 150,
						"color": "#ffffff",
						"opacity": 0.1,
						"width": 1
					},
					"move": {
						"enable": true,
						"speed": 2,
						"direction": "none",
						"random": false,
						"straight": false,
						"out_mode": "out",
						"bounce": false,
						"attract": {
							"enable": false
						}
					}
				},
				"interactivity": {
					"detect_on": "canvas",
					"events": {
						"onhover": {
							"enable": true,
							"mode": "grab"
						},
						"onclick": {
							"enable": true,
							"mode": "push"
						},
						"resize": true
					},
					"modes": {
						"grab": {
							"distance": 140,
							"line_linked": {
								"opacity": 0.2
							}
						},
						"push": {
							"particles_nb": 4
						}
					}
				},
				"retina_detect": true
			});
	}
	
	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll(".nav-links a");
	navLinks.forEach((link) => {
		link.addEventListener("click", smoothScroll);
        checkProjectImages();
        
	});

	// Highlight active navigation link
	window.addEventListener("scroll", highlightActiveNavLink);

	// Form submission handling
	const contactForm = document.querySelector(".contact-form");
	if (contactForm) {
		contactForm.addEventListener("submit", handleAdvancedFormSubmit);

		// Add live validation
		const nameInput = document.getElementById('name');
		const emailInput = document.getElementById('email');
		const messageInput = document.getElementById('message');

		nameInput.addEventListener('blur', () => validateField(nameInput, 'Name cannot be empty.'));
		emailInput.addEventListener('blur', () => validateEmail(emailInput));
		messageInput.addEventListener('blur', () => validateField(messageInput, 'Message cannot be empty.'));
	}

	// Project cards hover effect
	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", projectCardHover);
		card.addEventListener("mouseleave", projectCardHover);
	});

	// Typing effect for hero text
	const heroText = document.querySelector(".hero-text h1");
	if (heroText) {
		typeWriter(heroText, 0);
	}

	// Set footer year automatically
	const yearSpan = document.getElementById("footer-year");
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();

	// Custom animated cursor
	const cursorDot = document.createElement("div");
	cursorDot.className = "cursor-dot";
	document.body.appendChild(cursorDot);

	const cursorOutline = document.createElement("div");
	cursorOutline.className = "cursor-outline";
	document.body.appendChild(cursorOutline);

	let mouseX = 0, mouseY = 0;
	let dotX = 0, dotY = 0;
	let outlineX = 0, outlineY = 0;

	// Track mouse movement
	window.addEventListener("mousemove", (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Animate the cursor with a slight delay for the outline
	const animateCursor = () => {
		// Dot follows the mouse directly
		dotX = mouseX;
		dotY = mouseY;
		cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

		// Outline has a easing/delay effect
		const outlineDelay = 0.1;
		outlineX += (mouseX - outlineX) * outlineDelay;
		outlineY += (mouseY - outlineY) * outlineDelay;
		cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

		requestAnimationFrame(animateCursor);
	};
	
	animateCursor();

	// Add hover effect for interactive elements
	const interactiveElements = document.querySelectorAll('a, button');
	interactiveElements.forEach((el) => {
		el.addEventListener('mouseenter', () => {
			document.body.classList.add('cursor-hover');
		});
		el.addEventListener('mouseleave', () => {
			document.body.classList.remove('cursor-hover');
		});
	});

	// Initialize all new features
	lazyLoadImages();
	initAdvancedThemeToggle();
	initProjectModals();
	init3DCardEffects();
	initParallaxEffects();
	initMicroInteractions();
	initScrollAnimations();
	initPerformanceOptimizations();
});

// Smooth scrolling function
function smoothScroll(e) {
	e.preventDefault();
	const targetId = this.getAttribute("href");
	const targetElement = document.querySelector(targetId);
	window.scrollTo({
		top: targetElement.offsetTop - 60,
		behavior: "smooth",
	});
}

// Highlight active navigation link
function highlightActiveNavLink() {
	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll(".nav-links a");

	let current = "";

	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		if (pageYOffset >= sectionTop - 60) {
			current = section.getAttribute("id");
		}
	});

	navLinks.forEach((link) => {
		link.classList.remove("active");
		if (link.getAttribute("href").substring(1) === current) {
			link.classList.add("active");
		}
	});
}

// Handle form submission
function handleFormSubmit(e) {
	e.preventDefault();
	// For now, we'll just log it to the console and show a success message.
	// In a real app, you'd use a service like Formspree or a backend.
	const formData = new FormData(e.target);
	const statusMessage = document.getElementById('form-status-message');

	// Simulate a network request
	statusMessage.textContent = 'Sending...';
	statusMessage.className = 'visible success'; // Use 'success' for styling pending state too

	setTimeout(() => {
		console.log("Form submitted with data:", Object.fromEntries(formData));
		
		statusMessage.textContent = 'Thank you! Your message has been sent.';
		statusMessage.className = 'visible success';

		e.target.reset(); // Clear the form
		
		// Hide the message after a few seconds
		setTimeout(() => {
			statusMessage.className = '';
		}, 5000);

	}, 1500);
}

// Project card hover effect
function projectCardHover(e) {
	if (e.type === "mouseenter") {
		this.style.transform = "scale(1.05)";
		this.style.transition = "transform 0.3s ease";
	} else {
		this.style.transform = "scale(1)";
	}
}

// Typing effect for hero text
function typeWriter(element, index) {
	const text = element.textContent;
	element.innerHTML = "";
	function type() {
		if (index < text.length) {
			element.innerHTML += text.charAt(index);
			index++;
			setTimeout(type, 50);
		}
	}
	type();
}

// Lazy loading for project images
document.addEventListener("DOMContentLoaded", function () {
	const images = document.querySelectorAll(".project-card img");
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.add("fade-in");
				imageObserver.unobserve(img);
			}
		});
	}, options);

	images.forEach((img) => {
		imageObserver.observe(img);
	});
});

// this function to check if images are present for project cards
const checkProjectImages = () => {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    const img = card.querySelector("img");
    if (img) {
      console.log(`Project card ${index + 1} image:`, img.src);
    } else {
      console.log(`Project card ${index + 1} has no image`);
    }
  });
};

// =================================
// THEME TOGGLE FUNCTIONALITY
// =================================
function initThemeToggle() {
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = themeToggle.querySelector('i');
	
	// Check for saved theme preference or default to dark mode
	const savedTheme = localStorage.getItem('theme') || 'dark';
	document.body.classList.toggle('light-mode', savedTheme === 'light');
	updateThemeIcon(themeIcon, savedTheme === 'light');
	
	// Theme toggle click handler
	themeToggle.addEventListener('click', () => {
		const isLightMode = document.body.classList.toggle('light-mode');
		const newTheme = isLightMode ? 'light' : 'dark';
		
		// Update icon with smooth transition
		updateThemeIcon(themeIcon, isLightMode);
		
		// Save preference
		localStorage.setItem('theme', newTheme);
		
		// Add a subtle animation effect
		themeToggle.style.transform = 'scale(0.9)';
		setTimeout(() => {
			themeToggle.style.transform = '';
		}, 150);
		
		// Update particles color if they exist
		updateParticlesTheme(newTheme);
	});
}

function updateThemeIcon(icon, isLightMode) {
	// Smooth icon transition
	icon.style.transform = 'rotate(180deg) scale(0.8)';
	
	setTimeout(() => {
		icon.className = isLightMode ? 'fas fa-sun' : 'fas fa-moon';
		icon.style.transform = 'rotate(0deg) scale(1)';
	}, 150);
}

function updateParticlesTheme(theme) {
	// Update particles.js colors based on theme
	if (window.pJSDom && window.pJSDom[0]) {
		const particles = window.pJSDom[0].pJS.particles;
		const color = theme === 'light' ? '#2c3e50' : '#ab89ff';
		
		// Update particle colors
		particles.color.value = color;
		particles.line_linked.color = theme === 'light' ? '#5a6c7d' : '#ffffff';
		
		// Refresh particles
		window.pJSDom[0].pJS.fn.particlesRefresh();
	}
}

// =================================
// ENHANCED THEME TOGGLE WITH SYSTEM PREFERENCE
// =================================
function initAdvancedThemeToggle() {
	const themeToggle = document.getElementById('theme-toggle');
	const themeIcon = themeToggle.querySelector('i');
	
	// Check for system preference
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
	
	// Get saved theme or use system preference
	let savedTheme = localStorage.getItem('theme');
	if (!savedTheme) {
		savedTheme = prefersDarkScheme.matches ? 'dark' : 'light';
	}
	
	// Apply theme
	document.body.classList.toggle('light-mode', savedTheme === 'light');
	updateThemeIcon(themeIcon, savedTheme === 'light');
	
	// Listen for system theme changes
	prefersDarkScheme.addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			const newTheme = e.matches ? 'dark' : 'light';
			document.body.classList.toggle('light-mode', newTheme === 'light');
			updateThemeIcon(themeIcon, newTheme === 'light');
			updateParticlesTheme(newTheme);
		}
	});
	
	// Theme toggle click handler
	themeToggle.addEventListener('click', () => {
		const isLightMode = document.body.classList.toggle('light-mode');
		const newTheme = isLightMode ? 'light' : 'dark';
		
		// Update icon with smooth transition
		updateThemeIcon(themeIcon, isLightMode);
		
		// Save preference
		localStorage.setItem('theme', newTheme);
		
		// Add a subtle animation effect
		themeToggle.style.transform = 'scale(0.9)';
		setTimeout(() => {
			themeToggle.style.transform = '';
		}, 150);
		
		// Update particles color
		updateParticlesTheme(newTheme);
		
		// Add a subtle page transition effect
		document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
		setTimeout(() => {
			document.body.style.transition = '';
		}, 300);
	});
}

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimize scroll event listener
const optimizedHighlightActiveNavLink = debounce(highlightActiveNavLink);
window.addEventListener("scroll", optimizedHighlightActiveNavLink);

// Optimize lazy loading and ensure project backgrounds are visible
const lazyLoadImages = () => {
  const projectCards = document.querySelectorAll(".project-card");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const projectCard = entry.target;
        const img = projectCard.querySelector('img');
        if (img && img.dataset.src) {
          const tempImage = new Image();
          tempImage.src = img.dataset.src;
          tempImage.onload = () => {
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            img.removeAttribute('data-src');
            projectCard.style.backgroundImage = `url(${img.src})`;
            projectCard.style.backgroundSize = 'cover';
            projectCard.style.backgroundPosition = 'center';
            projectCard.style.backgroundRepeat = 'no-repeat';
            projectCard.style.opacity = '1'; // Ensure the card is visible
            imageObserver.unobserve(projectCard);
          };
          tempImage.onerror = () => {
            console.error(`Failed to load image: ${img.dataset.src}`);
            projectCard.style.backgroundColor = '#f0f0f0'; // Fallback background color
            imageObserver.unobserve(projectCard);
          };
        } else {
          console.warn('Project card has no image or data-src attribute');
          projectCard.style.backgroundColor = '#f0f0f0'; // Fallback background color
          imageObserver.unobserve(projectCard);
        }
      }
    });
  }, { rootMargin: "0px 0px 200px 0px", threshold: 0.1 });

  projectCards.forEach((card) => {
    imageObserver.observe(card);
  });
};

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Use requestAnimationFrame for smoother animations
function smoothScrollRAF(targetElement, duration) {
  const start = window.pageYOffset;
  const target = targetElement.offsetTop - 60;
  const distance = target - start;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, start, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Update smooth scroll function
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  smoothScrollRAF(targetElement, 1000);
}

// Navbar shadow and background on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Initialize project modals
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  if (!modalOverlay) return;

  const modalContent = document.getElementById('project-modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card-glass');

  // Modal content elements
  const modalImg = modalContent.querySelector('.modal-img');
  const modalTitle = modalContent.querySelector('.modal-title');
  const modalTagsContainer = modalContent.querySelector('.modal-tags');
  const modalDescription = modalContent.querySelector('.modal-description');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      // 1. Get data from the clicked card's data attributes
      const title = card.dataset.title;
      const description = card.dataset.description;
      const imgSrc = card.dataset.imageSrc;
      const tags = card.dataset.tags.split(',');
      const status = card.dataset.status;
      const liveLink = card.dataset.liveLink || '#';
      const codeLink = card.dataset.codeLink || '#';

      // 2. Populate the modal with the data
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImg.src = imgSrc;

      // Create tag elements
      modalTagsContainer.innerHTML = '';
      tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag.trim();
        modalTagsContainer.appendChild(tagElement);
      });
      
      // 3. Handle link states (live, coming-soon, etc.)
      modalLiveLink.href = liveLink;
      modalCodeLink.href = codeLink;

      if (status === 'coming-soon') {
        modalLiveLink.classList.add('disabled');
        modalCodeLink.classList.add('disabled');
      } else {
        modalLiveLink.classList.remove('disabled');
        modalCodeLink.classList.remove('disabled');
      }

      // 4. Show the modal
      modalOverlay.classList.add('visible');
    });
  });

  // Function to close the modal
  const closeModal = () => {
    modalOverlay.classList.remove('visible');
  };

  // Close modal when clicking the close button or the overlay
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with the Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) {
      closeModal();
    }
  });
}

// --- Advanced Form Validation and Submission ---

// Generic field validation
function validateField(field, emptyMessage) {
  const validationMessage = field.parentElement.nextElementSibling;
  if (field.value.trim() === '') {
    showError(field, validationMessage, emptyMessage);
    return false;
  }
  hideError(field, validationMessage);
  return true;
}

// Specific email validation
function validateEmail(field) {
  const validationMessage = field.parentElement.nextElementSibling;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (field.value.trim() === '') {
    showError(field, validationMessage, 'Email cannot be empty.');
    return false;
  }
  if (!emailRegex.test(field.value)) {
    showError(field, validationMessage, 'Please enter a valid email address.');
    return false;
  }
  hideError(field, validationMessage);
  return true;
}

function showError(field, messageElement, message) {
  field.parentElement.classList.add('error');
  messageElement.textContent = message;
  messageElement.classList.add('visible');
}

function hideError(field, messageElement) {
  field.parentElement.classList.remove('error');
  messageElement.classList.remove('visible');
}

// Handle advanced form submission
function handleAdvancedFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusMessage = document.getElementById('form-status-message');

  // Perform final validation check on all fields
  const isNameValid = validateField(nameInput, 'Name cannot be empty.');
  const isEmailValid = validateEmail(emailInput);
  const isMessageValid = validateField(messageInput, 'Message cannot be empty.');

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    statusMessage.textContent = 'Please fix the errors above and try again.';
    statusMessage.className = 'visible error';
    return; // Stop submission if validation fails
  }

  // If all valid, proceed with submission
  statusMessage.textContent = 'Sending...';
  statusMessage.className = 'visible success'; // Style as success while sending

  // Simulate a network request with setTimeout
  // In a real application, you would replace this with a `fetch` call to a service like Formspree
  setTimeout(() => {
    console.log("Form submitted successfully:", Object.fromEntries(new FormData(form)));
    statusMessage.textContent = 'Thank you! Your message has been sent successfully.';
    statusMessage.className = 'visible success';

    form.reset(); // Clear the form fields
    // Remove all error states
    hideError(nameInput, nameInput.parentElement.nextElementSibling);
    hideError(emailInput, emailInput.parentElement.nextElementSibling);
    hideError(messageInput, messageInput.parentElement.nextElementSibling);

    // Hide the status message after a few seconds
    setTimeout(() => {
      statusMessage.className = '';
    }, 5000);
  }, 1500);
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) contactForm.addEventListener("submit", handleAdvancedFormSubmit);

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", projectCardHover);
    card.addEventListener("mouseleave", projectCardHover);
  });

  const heroText = document.querySelector(".hero-text h1");
  if (heroText) typeWriter(heroText, 0);

  lazyLoadImages();
  initAdvancedThemeToggle();
  initProjectModals();
});

// Fallback theme initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdvancedThemeToggle);
} else {
  initAdvancedThemeToggle();
}

// =================================
// ENHANCED PRELOADER & LOADING ANIMATIONS
// =================================
function initEnhancedPreloader() {
	const preloader = document.querySelector('.preloader');
	const progressFill = document.querySelector('.progress-fill');
	const loadingText = document.querySelector('.loading-text');
	
	if (!preloader) return;
	
	// Simulate loading progress
	let progress = 0;
	const progressInterval = setInterval(() => {
		progress += Math.random() * 15;
		if (progress >= 100) {
			progress = 100;
			clearInterval(progressInterval);
			
			// Hide preloader after completion
			setTimeout(() => {
				preloader.classList.add('hidden');
				initSkeletonLoading();
			}, 500);
		}
		
		progressFill.style.width = `${progress}%`;
	}, 100);
	
	// Update loading text
	const loadingMessages = [
		'Loading your experience...',
		'Preparing amazing content...',
		'Almost there...',
		'Welcome to my portfolio!'
	];
	
	let messageIndex = 0;
	const textInterval = setInterval(() => {
		if (progress >= 100) {
			clearInterval(textInterval);
			return;
		}
		
		loadingText.style.opacity = '0';
		setTimeout(() => {
			loadingText.textContent = loadingMessages[messageIndex];
			loadingText.style.opacity = '1';
			messageIndex = (messageIndex + 1) % loadingMessages.length;
		}, 200);
	}, 800);
}

// =================================
// SKELETON LOADING SYSTEM
// =================================
function initSkeletonLoading() {
	const skeletons = document.querySelectorAll('.project-skeleton');
	const projectCards = document.querySelectorAll('.project-card-glass');
	
	// Show skeletons first
	skeletons.forEach((skeleton, index) => {
		setTimeout(() => {
			skeleton.style.display = 'flex';
		}, index * 200);
	});
	
	// Replace skeletons with actual content
	setTimeout(() => {
		skeletons.forEach((skeleton, index) => {
			skeleton.style.opacity = '0';
			skeleton.style.transform = 'translateY(20px)';
			
			setTimeout(() => {
				skeleton.style.display = 'none';
				if (projectCards[index]) {
					projectCards[index].style.opacity = '0';
					projectCards[index].style.transform = 'translateY(20px)';
					projectCards[index].style.display = 'flex';
					
					setTimeout(() => {
						projectCards[index].style.opacity = '1';
						projectCards[index].style.transform = 'translateY(0)';
					}, 100);
				}
			}, 300);
		});
	}, 1500);
}

// =================================
// 3D CARD TILT EFFECTS
// =================================
function init3DCardEffects() {
	const cards = document.querySelectorAll('.project-card-glass, .glass-card');
	
	cards.forEach(card => {
		const tiltMax = parseInt(card.dataset.tiltMax) || 10;
		const tiltScale = parseFloat(card.dataset.tiltScale) || 1.05;
		
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = (y - centerY) / centerY * -tiltMax;
			const rotateY = (x - centerX) / centerX * tiltMax;
			
			card.style.setProperty('--tilt-x', `${rotateX}deg`);
			card.style.setProperty('--tilt-y', `${rotateY}deg`);
			card.classList.add('tilted');
		});
		
		card.addEventListener('mouseleave', () => {
			card.classList.remove('tilted');
			card.style.setProperty('--tilt-x', '0deg');
			card.style.setProperty('--tilt-y', '0deg');
		});
	});
}

// =================================
// PARALLAX SCROLLING EFFECTS
// =================================
function initParallaxEffects() {
	const parallaxElements = document.querySelectorAll('[data-parallax]');
	let ticking = false;
	
	function updateParallax() {
		const scrolled = window.pageYOffset;
		const rate = scrolled * -0.5;
		
		parallaxElements.forEach(element => {
			const speed = parseFloat(element.dataset.parallax) || 0.5;
			const yPos = -(scrolled * speed);
			
			// Apply parallax transform
			element.style.transform = `translateY(${yPos}px)`;
		});
		
		ticking = false;
	}
	
	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(updateParallax);
			ticking = true;
		}
	}
	
	window.addEventListener('scroll', requestTick);
	window.addEventListener('resize', requestTick);
	
	// Initial call
	updateParallax();
}

// =================================
// MICRO-INTERACTIONS & ANIMATIONS
// =================================
function initMicroInteractions() {
	// Staggered animation for skills cards
	const skillCards = document.querySelectorAll('.glass-card');
	skillCards.forEach((card, index) => {
		card.style.animationDelay = `${index * 0.1}s`;
	});
	
	// Typing effect for hero text
	const typewriterElement = document.querySelector('.typewriter');
	if (typewriterElement) {
		const text = typewriterElement.textContent;
		typewriterElement.textContent = '';
		
		let i = 0;
		const typeInterval = setInterval(() => {
			if (i < text.length) {
				typewriterElement.textContent += text.charAt(i);
				i++;
			} else {
				clearInterval(typeInterval);
			}
		}, 100);
	}
	
	// Progress bar animations
	const progressBars = document.querySelectorAll('.progress');
	progressBars.forEach(bar => {
		const width = bar.style.width;
		bar.style.width = '0%';
		
		setTimeout(() => {
			bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
			bar.style.width = width;
		}, 500);
	});
	
	// Floating animation for hero image
	const heroImage = document.querySelector('.hero-image');
	if (heroImage) {
		heroImage.style.animation = 'float 6s ease-in-out infinite';
	}
}

// =================================
// ENHANCED SCROLL ANIMATIONS
// =================================
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('animate-in');
			}
		});
	}, observerOptions);
	
	// Observe elements for scroll animations
	const animateElements = document.querySelectorAll('.glass-card, .project-card-glass, .about-glass-card, .contact-glass-card');
	animateElements.forEach(el => {
		observer.observe(el);
	});
}

// =================================
// PERFORMANCE OPTIMIZED ANIMATIONS
// =================================
function initPerformanceOptimizations() {
	// Use requestAnimationFrame for smooth animations
	let animationId;
	
	function smoothScroll() {
		// Optimize scroll performance
		animationId = requestAnimationFrame(smoothScroll);
	}
	
	// Pause animations when tab is not visible
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			cancelAnimationFrame(animationId);
		} else {
			animationId = requestAnimationFrame(smoothScroll);
		}
	});
	
	// Reduce motion for users who prefer it
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		document.body.classList.add('reduced-motion');
	}
}