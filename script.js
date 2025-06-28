// Preloader Logic
window.addEventListener('load', () => {
	initEnhancedPreloader();
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
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
		const subjectInput = document.getElementById('subject');
		const messageInput = document.getElementById('message');

		nameInput.addEventListener('blur', () => validateField(nameInput, 'Name cannot be empty.'));
		emailInput.addEventListener('blur', () => validateEmail(emailInput));
		subjectInput.addEventListener('blur', () => validateField(subjectInput, 'Subject cannot be empty.'));
		messageInput.addEventListener('blur', () => validateField(messageInput, 'Message cannot be empty.'));
	}

	// Project cards hover effect
	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", projectCardHover);
		card.addEventListener("mouseleave", projectCardHover);
	});

	// Temporarily disabled typewriter for translation testing
	// const heroText = document.querySelector(".hero-text h1");
	// if (heroText) typeWriter(heroText, 0);

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
	initEmailJS(); // Initialize EmailJS
	console.log('Initializing language selector...');
	init3DCardEffects();
	initScrollAnimations();
	initPerformanceOptimizations();

	// Enhanced Contact Button Functionality - All Features Combined
	const contactBtn = document.querySelector('.contact-btn');
	if (contactBtn) {
		contactBtn.addEventListener('click', handleContactButtonClick);
		
		// Add hover effects
		contactBtn.addEventListener('mouseenter', () => {
			contactBtn.style.transform = 'scale(1.05)';
			contactBtn.style.boxShadow = '0 8px 32px rgba(171, 137, 255, 0.5)';
		});
		
		contactBtn.addEventListener('mouseleave', () => {
			contactBtn.style.transform = 'scale(1)';
			contactBtn.style.boxShadow = '0 4px 24px #ab89ff33';
		});
	}
	
	initContactModal();
	initResumeDownload();
	initResumeModal();
	initContactAnalytics();
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

// Lazy loading for project images
document.addEventListener("DOMContentLoaded", function() {
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
// function smoothScroll(e) {
// 	e.preventDefault();
// 	const targetId = this.getAttribute("href");
// 	const targetElement = document.querySelector(targetId);
// 	smoothScrollRAF(targetElement, 1000);
// }

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
	const message = window.translationData ? window.translationData[emptyMessage] || emptyMessage : emptyMessage;
	
	if (field.value.trim() === '') {
		showError(field, validationMessage, message);
		return false;
	}
	hideError(field, validationMessage);
	return true;
}

// Specific email validation
function validateEmail(field) {
	const validationMessage = field.parentElement.nextElementSibling;
	const emptyMessage = window.translationData ? window.translationData['validation-email-empty'] : 'Email cannot be empty.';
	const invalidMessage = window.translationData ? window.translationData['validation-email-invalid'] : 'Please enter a valid email address.';
	
	if (field.value.trim() === '') {
		showError(field, validationMessage, emptyMessage);
		return false;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(field.value)) {
		showError(field, validationMessage, invalidMessage);
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
	const subjectInput = document.getElementById('subject');
	const messageInput = document.getElementById('message');
	const submitBtn = document.getElementById('submit-btn');
	const statusMessage = document.getElementById('form-status-message');

	// Get translated messages
	const nameEmptyMsg = window.translationData ? window.translationData['validation-name-empty'] : 'Name cannot be empty.';
	const messageEmptyMsg = window.translationData ? window.translationData['validation-message-empty'] : 'Message cannot be empty.';
	const subjectEmptyMsg = window.translationData ? window.translationData['validation-subject-empty'] : 'Subject cannot be empty.';
	const fixErrorsMsg = window.translationData ? window.translationData['validation-fix-errors'] : 'Please fix the errors above and try again.';
	const sendingMsg = window.translationData ? window.translationData['form-sending'] : 'Sending...';
	const successMsg = window.translationData ? window.translationData['form-success'] : 'Thank you! Your message has been sent successfully.';
	const errorMsg = window.translationData ? window.translationData['form-error'] : 'Sorry, there was an error sending your message. Please try again.';

	// Perform final validation check on all fields
	const isNameValid = validateField(nameInput, 'validation-name-empty');
	const isEmailValid = validateEmail(emailInput);
	const isSubjectValid = validateField(subjectInput, 'validation-subject-empty');
	const isMessageValid = validateField(messageInput, 'validation-message-empty');

	if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
		statusMessage.textContent = fixErrorsMsg;
		statusMessage.className = 'visible error';
		return; // Stop submission if validation fails
	}

	// Show loading state
	submitBtn.disabled = true;
	submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-translate="form-sending">Sending...</span>';
	statusMessage.textContent = sendingMsg;
	statusMessage.className = 'visible success';

	// Prepare template parameters
	const templateParams = {
		from_name: nameInput.value,
		from_email: emailInput.value,
		subject: subjectInput.value,
		message: messageInput.value,
		to_name: 'Shivam Attri',
		reply_to: emailInput.value
	};

	// Send email using EmailJS
	const serviceId = typeof emailjsConfig !== 'undefined' ? emailjsConfig.serviceId : 'service_g6pltzs';
	const templateId = typeof emailjsConfig !== 'undefined' ? emailjsConfig.templateId : 'template_qm8c6yj';
	emailjs.send(serviceId, templateId, templateParams)
		.then(function(response) {
			console.log('SUCCESS!', response.status, response.text);
			
			// Show success message
			statusMessage.textContent = successMsg;
			statusMessage.className = 'visible success';

			// Reset form
			form.reset();
			
			// Remove all error states
			hideError(nameInput, nameInput.parentElement.nextElementSibling);
			hideError(emailInput, emailInput.parentElement.nextElementSibling);
			hideError(subjectInput, subjectInput.parentElement.nextElementSibling);
			hideError(messageInput, messageInput.parentElement.nextElementSibling);

			// Reset button
			submitBtn.disabled = false;
			submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span data-translate="contact-send-btn">Send Message</span>';

			// Hide status message after 5 seconds
			setTimeout(() => {
				statusMessage.className = '';
			}, 5000);

			// Track successful email send
			trackContactClick('email_sent');
		}, function(error) {
			console.log('FAILED...', error);
			
			// Show error message
			statusMessage.textContent = errorMsg;
			statusMessage.className = 'visible error';

			// Reset button
			submitBtn.disabled = false;
			submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span data-translate="contact-send-btn">Send Message</span>';

			// Hide status message after 5 seconds
			setTimeout(() => {
				statusMessage.className = '';
			}, 5000);

			// Track failed email send
			trackContactClick('email_failed');
		});
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", function () {
	console.log('DOMContentLoaded event fired');
	
	const navLinks = document.querySelectorAll(".nav-links a");
	navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

	const contactForm = document.querySelector(".contact-form");
	if (contactForm) contactForm.addEventListener("submit", handleAdvancedFormSubmit);

	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mouseenter", projectCardHover);
		card.addEventListener("mouseleave", projectCardHover);
	});

	// Temporarily disabled typewriter for translation testing
	// const heroText = document.querySelector(".hero-text h1");
	// if (heroText) typeWriter(heroText, 0);

	lazyLoadImages();
	initAdvancedThemeToggle();
	initProjectModals();
	initEmailJS(); // Initialize EmailJS
	console.log('Initializing language selector...');
	init3DCardEffects();
	initScrollAnimations();
	initPerformanceOptimizations();

	// Enhanced Contact Button Functionality - All Features Combined
	const contactBtn = document.querySelector('.contact-btn');
	if (contactBtn) {
		contactBtn.addEventListener('click', handleContactButtonClick);
		
		// Add hover effects
		contactBtn.addEventListener('mouseenter', () => {
			contactBtn.style.transform = 'scale(1.05)';
			contactBtn.style.boxShadow = '0 8px 32px rgba(171, 137, 255, 0.5)';
		});
		
		contactBtn.addEventListener('mouseleave', () => {
			contactBtn.style.transform = 'scale(1)';
			contactBtn.style.boxShadow = '0 4px 24px #ab89ff33';
		});
	}
	
	initContactModal();
	initResumeDownload();
	initResumeModal();
	initContactAnalytics();
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

// =================================
// ENHANCED LANGUAGE SELECTOR
// =================================
function initLanguageSelector() {
	const languageBtn = document.getElementById('language-btn');
	const languageDropdown = document.getElementById('language-dropdown');
	const dropdownItems = document.querySelectorAll('.dropdown-item');
	const currentLang = document.querySelector('.current-lang');
	
	if (!languageBtn || !languageDropdown) {
		console.warn('Language selector elements not found');
		return;
	}
	
	// Toggle dropdown with proper event handling
	languageBtn.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		console.log('Language button clicked!'); // Debug log
		
		// Toggle active state
		const isActive = languageBtn.classList.contains('active');
		
		console.log('Is active:', isActive); // Debug log
		
		if (isActive) {
			// Close dropdown
			languageBtn.classList.remove('active');
			languageDropdown.classList.remove('visible');
			console.log('Closing dropdown'); // Debug log
		} else {
			// Open dropdown
			languageBtn.classList.add('active');
			languageDropdown.classList.add('visible');
			console.log('Opening dropdown'); // Debug log
			console.log('Dropdown classes:', languageDropdown.className); // Debug log
		}
		
		// Add ripple effect
		addRippleEffect(e, languageBtn);
	});
	
	// Handle language selection
	dropdownItems.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			
			const lang = item.dataset.lang;
			const langText = item.querySelector('span').textContent;
			
			// Update current language display
			currentLang.textContent = lang.toUpperCase();
			
			// Update selected state
			updateSelectedLanguage(item, dropdownItems);
			
			// Close dropdown
			closeDropdown(languageBtn, languageDropdown);
			
			// Save language preference
			localStorage.setItem('language', lang);
			
			// Translate the website
			translateWebsite(lang);
			
			// Show success feedback
			showLanguageChangeFeedback(langText);
		});
	});
	
	// Close dropdown when clicking outside
	document.addEventListener('click', (e) => {
		if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
			closeDropdown(languageBtn, languageDropdown);
		}
	});
	
	// Close dropdown on escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && languageDropdown.classList.contains('visible')) {
			closeDropdown(languageBtn, languageDropdown);
		}
	});
	
	// Load saved language preference
	loadSavedLanguage(currentLang, dropdownItems);
}

// Helper functions for language selector
function addRippleEffect(e, button) {
	const ripple = document.createElement('div');
	ripple.className = 'ripple';
	
	const rect = button.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const x = e.clientX - rect.left - size / 2;
	const y = e.clientY - rect.top - size / 2;
	
	ripple.style.width = ripple.style.height = size + 'px';
	ripple.style.left = x + 'px';
	ripple.style.top = y + 'px';
	
	button.appendChild(ripple);
	
	setTimeout(() => {
		ripple.remove();
	}, 600);
}

function updateSelectedLanguage(selectedItem, allItems) {
	allItems.forEach(item => {
		item.classList.remove('selected');
		const indicator = item.querySelector('.selected-indicator');
		if (indicator) indicator.style.opacity = '0';
	});
	
	selectedItem.classList.add('selected');
	const selectedIndicator = selectedItem.querySelector('.selected-indicator');
	if (selectedIndicator) selectedIndicator.style.opacity = '1';
}

function closeDropdown(button, dropdown) {
	button.classList.remove('active');
	dropdown.classList.remove('visible');
}

function loadSavedLanguage(currentLangElement, dropdownItems) {
	const savedLang = localStorage.getItem('language') || 'en';
	const savedItem = document.querySelector(`[data-lang="${savedLang}"]`);
	
	if (savedItem) {
		currentLangElement.textContent = savedLang.toUpperCase();
		updateSelectedLanguage(savedItem, dropdownItems);
		
		// Translate website to saved language after a short delay
		setTimeout(() => {
			translateWebsite(savedLang);
		}, 100);
	}
}

// Show language change feedback
function showLanguageChangeFeedback(langName) {
	const feedback = document.createElement('div');
	feedback.className = 'language-feedback';
	
	feedback.innerHTML = `
		<i class="fas fa-check-circle"></i>
		<span>Language changed to ${langName}</span>
	`;
	feedback.style.cssText = `
		position: fixed;
		top: 100px;
		right: 20px;
		background: rgba(101, 255, 204, 0.9);
		color: #1a1a1a;
		padding: 12px 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		z-index: 10000;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 16px rgba(101, 255, 204, 0.3);
	`;
	
	document.body.appendChild(feedback);
	
	// Animate in
	setTimeout(() => {
		feedback.style.transform = 'translateX(0)';
	}, 100);
	
	// Remove after 3 seconds
	setTimeout(() => {
		feedback.style.transform = 'translateX(100%)';
		setTimeout(() => {
			feedback.remove();
		}, 300);
	}, 3000);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
	
	.language-feedback {
		animation: slideInRight 0.3s ease;
	}
	
	@keyframes slideInRight {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
`;
document.head.appendChild(rippleStyle);

// =================================
// EFFICIENT TRANSLATION SYSTEM
// =================================
const translations = {
	en: {
		// Navigation
		'nav-home': 'home',
		'nav-works': 'works',
		'nav-about': 'about-me',
		'nav-contacts': 'contacts',
		
		// Hero Section
		'hero-greeting': "Hi, I'm",
		'hero-title': 'Frontend Developer & Cloud Enthusiast',
		'hero-subtitle': 'I craft responsive websites where technology meets creativity.',
		'hero-contact-btn': 'Contact me!!',
		'hero-current-project': 'Currently working on',
		
		// Projects Section
		'projects-title': 'Projects',
		'project-coming-soon': 'Coming Soon',
		'project-exciting': 'Exciting project on the way. Stay tuned!',
		'project-another': 'Another awesome project is coming soon!',
		'project-stay-tuned': 'Stay tuned for more updates!',
		'project-view-details': 'View Details',
		'portfolio-title': 'Portfolio Website - Ghost',
		'portfolio-description': 'A modern, responsive portfolio website showcasing my skills and projects. Features include dark/light mode toggle, custom animated cursor, particles.js background, multi-language support (5 languages), real email functionality with EmailJS, interactive project modals, 3D card effects, parallax scrolling, and smooth animations. Built with vanilla HTML, CSS, and JavaScript for optimal performance.',
		'portfolio-overlay-title': 'Portfolio Website',
		'portfolio-overlay-desc': 'Modern portfolio with real email functionality, multi-language support, and interactive features',
		
		// Skills Section
		'skills-title': 'Skills',
		'skills-languages': 'Languages',
		'skills-databases': 'Databases',
		'skills-tools': 'Tools',
		'skills-other': 'Other',
		'skills-frameworks': 'Frameworks',
		
		// About Section
		'about-title': 'About Me',
		'about-hello': "Hello, I'm",
		'about-ghost': 'Ghost',
		'about-description': "I'm a self-taught frontend developer and cloud enthusiast. I develop responsive websites from scratch and turn them into modern, user-friendly web experiences.",
		'about-fact-1': 'Passionate about UI/UX',
		'about-fact-2': 'Cloud Computing Explorer',
		'about-fact-3': 'Always learning new tech',
		'about-resume-btn': 'Download Resume',
		
		// Contact Section
		'contact-title': 'Contact',
		'contact-subtitle': 'Get in touch with me',
		'contact-name-placeholder': 'Your Name',
		'contact-email-placeholder': 'Your Email',
		'contact-subject-placeholder': 'Subject',
		'contact-message-placeholder': 'Your Message',
		'contact-send-btn': 'Send Message',
		
		// Contact Modal
		'contact-modal-title': 'Get In Touch',
		'contact-option-form': 'Contact Form',
		'contact-option-form-desc': 'Send me a message',
		'contact-option-email': 'Email',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'LinkedIn',
		'contact-option-linkedin-desc': 'Professional profile',
		'contact-option-github': 'GitHub',
		'contact-option-github-desc': 'View my projects',
		'contact-option-copy': 'Copy Email',
		'contact-option-copy-desc': 'Copy to clipboard',
		'contact-option-smart': 'Smart Contact',
		'contact-option-smart-desc': 'Best option for your device',
		
		// Footer
		'footer-copyright': 'All Rights Reserved.',
		'footer-home': 'Home',
		'footer-about': 'About',
		'footer-skills': 'Skills',
		'footer-projects': 'Projects',
		'footer-contact': 'Contact',
		
		// Form Validation
		'validation-name-empty': 'Name cannot be empty.',
		'validation-email-empty': 'Email cannot be empty.',
		'validation-email-invalid': 'Please enter a valid email address.',
		'validation-subject-empty': 'Subject cannot be empty.',
		'validation-message-empty': 'Message cannot be empty.',
		'validation-fix-errors': 'Please fix the errors above and try again.',
		'form-sending': 'Sending...',
		'form-success': 'Thank you! Your message has been sent successfully.',
		'form-error': 'Sorry, there was an error sending your message. Please try again.',
		
		// Language Feedback
		'lang-changed': 'Language changed to',
		
		// Resume Modal
		'resume-modal-title': 'Resume Preview',
		'resume-name': 'Shivam Attri',
		'resume-title': 'Frontend Developer & Cloud Enthusiast',
		'resume-skills-title': 'Key Skills',
		'resume-download-btn': 'Download Full Resume',
		'resume-close-btn': 'Close'
	},
	
	es: {
		'nav-home': 'inicio',
		'nav-works': 'trabajos',
		'nav-about': 'sobre-mi',
		'nav-contacts': 'contactos',
		'hero-greeting': 'Hola, soy',
		'hero-title': 'Desarrollador Frontend y Entusiasta de la Nube',
		'hero-subtitle': 'Creo sitios web responsivos donde la tecnología se encuentra con la creatividad.',
		'hero-contact-btn': '¡Contáctame!',
		'hero-current-project': 'Actualmente trabajando en',
		'projects-title': 'Proyectos',
		'project-coming-soon': 'Próximamente',
		'project-exciting': '¡Proyecto emocionante en camino. ¡Mantente atento!',
		'project-another': '¡Otro proyecto increíble está por venir!',
		'project-stay-tuned': '¡Mantente atento para más actualizaciones!',
		'project-view-details': 'Ver Detalles',
		'portfolio-title': 'Sitio Web de Portafolio - Ghost',
		'portfolio-description': 'Un sitio web de portafolio moderno y responsivo que muestra mis habilidades y proyectos.',
		'portfolio-overlay-title': 'Sitio Web de Portafolio',
		'portfolio-overlay-desc': 'Portafolio moderno con funcionalidad de email real',
		'skills-title': 'Habilidades',
		'skills-languages': 'Lenguajes',
		'skills-databases': 'Bases de Datos',
		'skills-tools': 'Herramientas',
		'skills-other': 'Otros',
		'skills-frameworks': 'Frameworks',
		'about-title': 'Sobre Mí',
		'about-hello': 'Hola, soy',
		'about-ghost': 'Ghost',
		'about-description': 'Soy un desarrollador frontend autodidacta y entusiasta de la nube. Desarrollo sitios web responsivos desde cero y los convierto en experiencias web modernas y fáciles de usar.',
		'about-fact-1': 'Apasionado por UI/UX',
		'about-fact-2': 'Explorador de Computación en la Nube',
		'about-fact-3': 'Siempre aprendiendo nuevas tecnologías',
		'about-resume-btn': 'Descargar CV',
		'contact-title': 'Contacto',
		'contact-subtitle': 'Ponte en contacto conmigo',
		'contact-name-placeholder': 'Tu Nombre',
		'contact-email-placeholder': 'Tu Email',
		'contact-subject-placeholder': 'Asunto',
		'contact-message-placeholder': 'Tu Mensaje',
		'contact-send-btn': 'Enviar Mensaje',
		'contact-modal-title': 'Ponte en Contacto',
		'contact-option-form': 'Formulario de Contacto',
		'contact-option-form-desc': 'Envíame un mensaje',
		'contact-option-email': 'Email',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'LinkedIn',
		'contact-option-linkedin-desc': 'Perfil profesional',
		'contact-option-github': 'GitHub',
		'contact-option-github-desc': 'Ver mis proyectos',
		'contact-option-copy': 'Copiar Email',
		'contact-option-copy-desc': 'Copiar al portapapeles',
		'contact-option-smart': 'Contacto Inteligente',
		'contact-option-smart-desc': 'Mejor opción para tu dispositivo',
		'footer-copyright': 'Todos los Derechos Reservados.',
		'footer-home': 'Inicio',
		'footer-about': 'Sobre Mí',
		'footer-skills': 'Habilidades',
		'footer-projects': 'Proyectos',
		'footer-contact': 'Contacto',
		'validation-name-empty': 'El nombre no puede estar vacío.',
		'validation-email-empty': 'El email no puede estar vacío.',
		'validation-email-invalid': 'Por favor ingresa un email válido.',
		'validation-subject-empty': 'El asunto no puede estar vacío.',
		'validation-message-empty': 'El mensaje no puede estar vacío.',
		'validation-fix-errors': 'Por favor corrige los errores arriba e intenta de nuevo.',
		'form-sending': 'Enviando...',
		'form-success': '¡Gracias! Tu mensaje ha sido enviado exitosamente.',
		'lang-changed': 'Idioma cambiado a',
		'resume-modal-title': 'Vista Previa del CV',
		'resume-name': 'Shivam Attri',
		'resume-title': 'Desarrollador Frontend y Entusiasta de la Nube',
		'resume-skills-title': 'Habilidades Clave',
		'resume-download-btn': 'Descargar CV Completo',
		'resume-close-btn': 'Cerrar'
	},
	
	fr: {
		'nav-home': 'accueil',
		'nav-works': 'travaux',
		'nav-about': 'à-propos',
		'nav-contacts': 'contacts',
		'hero-greeting': 'Bonjour, je suis',
		'hero-title': 'Développeur Frontend et Passionné du Cloud',
		'hero-subtitle': 'Je crée des sites web responsifs où la technologie rencontre la créativité.',
		'hero-contact-btn': 'Contactez-moi !',
		'hero-current-project': 'Actuellement en train de travailler sur',
		'projects-title': 'Projets',
		'project-coming-soon': 'Bientôt Disponible',
		'project-exciting': 'Projet passionnant en cours. Restez à l\'écoute !',
		'project-another': 'Un autre projet incroyable arrive bientôt !',
		'project-stay-tuned': 'Restez à l\'écoute pour plus de mises à jour !',
		'project-view-details': 'Voir les Détails',
		'skills-title': 'Compétences',
		'skills-languages': 'Langages',
		'skills-databases': 'Bases de Données',
		'skills-tools': 'Outils',
		'skills-other': 'Autres',
		'skills-frameworks': 'Frameworks',
		'about-title': 'À Propos',
		'about-hello': 'Bonjour, je suis',
		'about-ghost': 'Ghost',
		'about-description': 'Je suis un développeur frontend autodidacte et passionné du cloud. Je développe des sites web responsifs à partir de zéro et les transforme en expériences web modernes et conviviales.',
		'about-fact-1': 'Passionné par l\'UI/UX',
		'about-fact-2': 'Explorateur du Cloud Computing',
		'about-fact-3': 'Toujours en train d\'apprendre de nouvelles technologies',
		'about-resume-btn': 'Télécharger le CV',
		'contact-title': 'Contact',
		'contact-subtitle': 'Entrez en contact avec moi',
		'contact-name-placeholder': 'Votre Nom',
		'contact-email-placeholder': 'Votre Email',
		'contact-subject-placeholder': 'Sujet',
		'contact-message-placeholder': 'Votre Message',
		'contact-send-btn': 'Envoyer le Message',
		'contact-modal-title': 'Entrez en Contact',
		'contact-option-form': 'Formulaire de Contact',
		'contact-option-form-desc': 'Envoyez-moi un message',
		'contact-option-email': 'Email',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'LinkedIn',
		'contact-option-linkedin-desc': 'Profil professionnel',
		'contact-option-github': 'GitHub',
		'contact-option-github-desc': 'Voir mes projets',
		'contact-option-copy': 'Copier Email',
		'contact-option-copy-desc': 'Copier dans le presse-papiers',
		'contact-option-smart': 'Contact Intelligent',
		'contact-option-smart-desc': 'Meilleure option pour votre appareil',
		'footer-copyright': 'Tous Droits Réservés.',
		'footer-home': 'Accueil',
		'footer-about': 'À Propos',
		'footer-skills': 'Compétences',
		'footer-projects': 'Projets',
		'footer-contact': 'Contact',
		'validation-name-empty': 'Le nom ne peut pas être vide.',
		'validation-email-empty': 'L\'email ne peut pas être vide.',
		'validation-email-invalid': 'Veuillez entrer une adresse email valide.',
		'validation-subject-empty': 'Le sujet ne peut pas être vide.',
		'validation-message-empty': 'Le message ne peut pas être vide.',
		'validation-fix-errors': 'Veuillez corriger les erreurs ci-dessus et réessayer.',
		'form-sending': 'Envoi en cours...',
		'form-success': 'Merci ! Votre message a été envoyé avec succès.',
		'lang-changed': 'Langue changée vers',
		'resume-modal-title': 'Aperçu du CV',
		'resume-name': 'Shivam Attri',
		'resume-title': 'Développeur Frontend et Passionné du Cloud',
		'resume-skills-title': 'Compétences Clés',
		'resume-download-btn': 'Télécharger le CV complet',
		'resume-close-btn': 'Fermer'
	},
	
	de: {
		'nav-home': 'startseite',
		'nav-works': 'arbeiten',
		'nav-about': 'über-mich',
		'nav-contacts': 'kontakte',
		'hero-greeting': 'Hallo, ich bin',
		'hero-title': 'Frontend-Entwickler und Cloud-Enthusiast',
		'hero-subtitle': 'Ich erstelle responsive Websites, wo Technologie auf Kreativität trifft.',
		'hero-contact-btn': 'Kontaktiere mich!',
		'hero-current-project': 'Aktuell arbeite ich an',
		'projects-title': 'Projekte',
		'project-coming-soon': 'Demnächst Verfügbar',
		'project-exciting': 'Spannendes Projekt in Arbeit. Bleib dran!',
		'project-another': 'Ein weiteres großartiges Projekt kommt bald!',
		'project-stay-tuned': 'Bleib dran für weitere Updates!',
		'project-view-details': 'Details Anzeigen',
		'skills-title': 'Fähigkeiten',
		'skills-languages': 'Sprachen',
		'skills-databases': 'Datenbanken',
		'skills-tools': 'Werkzeuge',
		'skills-other': 'Andere',
		'skills-frameworks': 'Frameworks',
		'about-title': 'Über Mich',
		'about-hello': 'Hallo, ich bin',
		'about-ghost': 'Ghost',
		'about-description': 'Ich bin ein autodidaktischer Frontend-Entwickler und Cloud-Enthusiast. Ich entwickle responsive Websites von Grund auf und verwandle sie in moderne, benutzerfreundliche Web-Erlebnisse.',
		'about-fact-1': 'Leidenschaft für UI/UX',
		'about-fact-2': 'Cloud Computing Explorer',
		'about-fact-3': 'Lerne immer neue Technologien',
		'about-resume-btn': 'Lebenslauf Herunterladen',
		'contact-title': 'Kontakt',
		'contact-subtitle': 'Kontaktiere mich',
		'contact-name-placeholder': 'Dein Name',
		'contact-email-placeholder': 'Deine Email',
		'contact-subject-placeholder': 'Betreff',
		'contact-message-placeholder': 'Deine Nachricht',
		'contact-send-btn': 'Nachricht Senden',
		'contact-modal-title': 'Kontaktiere Mich',
		'contact-option-form': 'Kontaktformular',
		'contact-option-form-desc': 'Sende mir eine Nachricht',
		'contact-option-email': 'Email',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'LinkedIn',
		'contact-option-linkedin-desc': 'Professionelles Profil',
		'contact-option-github': 'GitHub',
		'contact-option-github-desc': 'Meine Projekte ansehen',
		'contact-option-copy': 'Email Kopieren',
		'contact-option-copy-desc': 'In Zwischenablage kopieren',
		'contact-option-smart': 'Intelligenter Kontakt',
		'contact-option-smart-desc': 'Beste Option für dein Gerät',
		'footer-copyright': 'Alle Rechte Vorbehalten.',
		'footer-home': 'Startseite',
		'footer-about': 'Über Mich',
		'footer-skills': 'Fähigkeiten',
		'footer-projects': 'Projekte',
		'footer-contact': 'Kontakt',
		'validation-name-empty': 'Der Name darf nicht leer sein.',
		'validation-email-empty': 'Die Email darf nicht leer sein.',
		'validation-email-invalid': 'Bitte geben Sie eine gültige Email-Adresse ein.',
		'validation-subject-empty': 'Das Betreff darf nicht leer sein.',
		'validation-message-empty': 'Die Nachricht darf nicht leer sein.',
		'validation-fix-errors': 'Bitte beheben Sie die Fehler oben und versuchen Sie es erneut.',
		'form-sending': 'Wird gesendet...',
		'form-success': 'Danke! Ihre Nachricht wurde erfolgreich gesendet.',
		'lang-changed': 'Sprache geändert zu',
		'resume-modal-title': 'Lebenslauf Vorschau',
		'resume-name': 'Shivam Attri',
		'resume-title': 'Frontend-Entwickler und Cloud-Enthusiast',
		'resume-skills-title': 'Schlüsselkompetenzen',
		'resume-download-btn': 'Lebenslauf vollständig herunterladen',
		'resume-close-btn': 'Schließen'
	},
	
	hi: {
		'nav-home': 'होम',
		'nav-works': 'कार्य',
		'nav-about': 'मेरे-बारे-में',
		'nav-contacts': 'संपर्क',
		'hero-greeting': 'नमस्ते, मैं हूं',
		'hero-title': 'फ्रंटएंड डेवलपर और क्लाउड उत्साही',
		'hero-subtitle': 'मैं रेस्पॉन्सिव वेबसाइट बनाता हूं जहां तकनीक रचनात्मकता से मिलती है।',
		'hero-contact-btn': 'मुझसे संपर्क करें!',
		'hero-current-project': 'वर्तमान में काम कर रहा हूं',
		'projects-title': 'प्रोजेक्ट्स',
		'project-coming-soon': 'जल्द आ रहा है',
		'project-exciting': 'रोमांचक प्रोजेक्ट आ रहा है। बने रहें!',
		'project-another': 'एक और अद्भुत प्रोजेक्ट जल्द आ रहा है!',
		'project-stay-tuned': 'अधिक अपडेट के लिए बने रहें!',
		'project-view-details': 'विवरण देखें',
		'skills-title': 'कौशल',
		'skills-languages': 'भाषाएं',
		'skills-databases': 'डेटाबेस',
		'skills-tools': 'उपकरण',
		'skills-other': 'अन्य',
		'skills-frameworks': 'फ्रेमवर्क',
		'about-title': 'मेरे बारे में',
		'about-hello': 'नमस्ते, मैं हूं',
		'about-ghost': 'घोस्ट',
		'about-description': 'मैं एक स्व-शिक्षित फ्रंटएंड डेवलपर और क्लाउड उत्साही हूं। मैं शुरू से रेस्पॉन्सिव वेबसाइट विकसित करता हूं और उन्हें आधुनिक, उपयोगकर्ता-अनुकूल वेब अनुभवों में बदल देता हूं।',
		'about-fact-1': 'UI/UX के लिए जुनून',
		'about-fact-2': 'क्लाउड कंप्यूटिंग एक्सप्लोरर',
		'about-fact-3': 'हमेशा नई तकनीक सीख रहा हूं',
		'about-resume-btn': 'रिज्यूमे डाउनलोड करें',
		'contact-title': 'संपर्क',
		'contact-subtitle': 'मुझसे संपर्क करें',
		'contact-name-placeholder': 'आपका नाम',
		'contact-email-placeholder': 'आपका ईमेल',
		'contact-subject-placeholder': 'विषय',
		'contact-message-placeholder': 'आपका संदेश',
		'contact-send-btn': 'संदेश भेजें',
		'contact-modal-title': 'संपर्क करें',
		'contact-option-form': 'संपर्क फॉर्म',
		'contact-option-form-desc': 'मुझे संदेश भेजें',
		'contact-option-email': 'ईमेल',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'लिंक्डइन',
		'contact-option-linkedin-desc': 'पेशेवर प्रोफाइल',
		'contact-option-github': 'गिटहब',
		'contact-option-github-desc': 'मेरे प्रोजेक्ट देखें',
		'contact-option-copy': 'ईमेल कॉपी करें',
		'contact-option-copy-desc': 'क्लिपबोर्ड पर कॉपी करें',
		'contact-option-smart': 'स्मार्ट संपर्क',
		'contact-option-smart-desc': 'आपके डिवाइस के लिए सर्वोत्तम विकल्प',
		'footer-copyright': 'सर्वाधिकार सुरक्षित।',
		'footer-home': 'होम',
		'footer-about': 'मेरे बारे में',
		'footer-skills': 'कौशल',
		'footer-projects': 'प्रोजेक्ट्स',
		'footer-contact': 'संपर्क',
		'validation-name-empty': 'नाम खाली नहीं हो सकता।',
		'validation-email-empty': 'ईमेल खाली नहीं हो सकता।',
		'validation-email-invalid': 'कृपया एक वैध ईमेल पता दर्ज करें।',
		'validation-subject-empty': 'विषय खाली नहीं हो सकता।',
		'validation-message-empty': 'संदेश खाली नहीं हो सकता।',
		'validation-fix-errors': 'कृपया ऊपर की त्रुटियों को ठीक करें और पुनः प्रयास करें।',
		'form-sending': 'भेज रहा है...',
		'form-success': 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।',
		'lang-changed': 'भाषा बदली गई',
		'resume-modal-title': 'रिज्यूमे व्यूप्रोजेक्ट',
		'resume-name': 'शिवम अट्ट्री',
		'resume-title': 'फ्रंटएंड डेवलपर और क्लाउड उत्साही',
		'resume-skills-title': 'कुंजी कौशल',
		'resume-download-btn': 'रिज्यूमे वुल डाउनलोड करें',
		'resume-close-btn': 'बंद करें'
	},
	
	ja: {
		'nav-home': 'ホーム',
		'nav-works': '作品',
		'nav-about': '私について',
		'nav-contacts': 'お問い合わせ',
		'hero-greeting': 'こんにちは、私は',
		'hero-title': 'フロントエンド開発者＆クラウド愛好家',
		'hero-subtitle': 'テクノロジーとクリエイティビティが融合するレスポンシブウェブサイトを作成しています。',
		'hero-contact-btn': 'お問い合わせ！',
		'hero-current-project': '現在取り組んでいる',
		'projects-title': 'プロジェクト',
		'project-coming-soon': '近日公開',
		'project-exciting': 'エキサイティングなプロジェクトが進行中。お楽しみに！',
		'project-another': 'もう一つの素晴らしいプロジェクトが間もなく登場！',
		'project-stay-tuned': 'さらなる更新をお楽しみに！',
		'project-view-details': '詳細を見る',
		'skills-title': 'スキル',
		'skills-languages': 'プログラミング言語',
		'skills-databases': 'データベース',
		'skills-tools': 'ツール',
		'skills-other': 'その他',
		'skills-frameworks': 'フレームワーク',
		'about-title': '私について',
		'about-hello': 'こんにちは、私は',
		'about-ghost': 'ゴースト',
		'about-description': '私は独学のフロントエンド開発者でクラウド愛好家です。ゼロからレスポンシブウェブサイトを開発し、モダンでユーザーフレンドリーなウェブ体験に変えています。',
		'about-fact-1': 'UI/UXへの情熱',
		'about-fact-2': 'クラウドコンピューティング探検家',
		'about-fact-3': '常に新しい技術を学んでいます',
		'about-resume-btn': '履歴書をダウンロード',
		'contact-title': 'お問い合わせ',
		'contact-subtitle': 'お気軽にお問い合わせください',
		'contact-name-placeholder': 'お名前',
		'contact-email-placeholder': 'メールアドレス',
		'contact-subject-placeholder': '件名',
		'contact-message-placeholder': 'メッセージ',
		'contact-send-btn': 'メッセージを送信',
		'contact-modal-title': 'お問い合わせ',
		'contact-option-form': 'お問い合わせフォーム',
		'contact-option-form-desc': 'メッセージを送信',
		'contact-option-email': 'メール',
		'contact-option-email-desc': 'shivamattri2335@gmail.com',
		'contact-option-linkedin': 'LinkedIn',
		'contact-option-linkedin-desc': 'プロフェッショナルプロフィール',
		'contact-option-github': 'GitHub',
		'contact-option-github-desc': 'プロジェクトを見る',
		'contact-option-copy': 'メールをコピー',
		'contact-option-copy-desc': 'クリップボードにコピー',
		'contact-option-smart': 'スマート連絡',
		'contact-option-smart-desc': 'デバイスに最適なオプション',
		'footer-copyright': '全著作権所有。',
		'footer-home': 'ホーム',
		'footer-about': '私について',
		'footer-skills': 'スキル',
		'footer-projects': 'プロジェクト',
		'footer-contact': 'お問い合わせ',
		'validation-name-empty': '名前は必須です。',
		'validation-email-empty': 'メールアドレスは必須です。',
		'validation-email-invalid': '有効なメールアドレスを入力してください。',
		'validation-subject-empty': '件名は必須です。',
		'validation-message-empty': 'メッセージは必須です。',
		'validation-fix-errors': '上記のエラーを修正して再試行してください。',
		'form-sending': '送信中...',
		'form-success': 'ありがとうございます！メッセージが正常に送信されました。',
		'lang-changed': '言語が変更されました',
		'resume-modal-title': '履歴書プレビュー',
		'resume-name': 'シヴァム・アットリ',
		'resume-title': 'フロントエンド開発者＆クラウド愛好家',
		'resume-skills-title': '主要スキル',
		'resume-download-btn': '履歴書をダウンロード',
		'resume-close-btn': '閉じる'
	}
};

// Make translations globally accessible
window.translationData = translations;

// Efficient translation function using data attributes
function translateWebsite(lang) {
	const langData = translations[lang];
	if (!langData) {
		console.warn(`Translation data not found for language: ${lang}`);
		return;
	}
	
	try {
		// Find all elements with data-translate attribute
		const translatableElements = document.querySelectorAll('[data-translate]');
		
		// Batch DOM updates for better performance
		const updates = [];
		
		translatableElements.forEach(element => {
			const key = element.getAttribute('data-translate');
			const translation = langData[key];
			
			if (translation) {
				updates.push(() => {
					// Handle different element types
					if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
						element.placeholder = translation;
					} else {
						element.textContent = translation;
					}
				});
			}
		});
		
		// Execute all updates in a single batch
		requestAnimationFrame(() => {
			updates.forEach(update => update());
		});
		
		console.log(`Website translated to ${lang}`);
		
	} catch (error) {
		console.error('Error during translation:', error);
	}
}

// Show language change feedback
function showLanguageChangeFeedback(langName) {
	const feedback = document.createElement('div');
	feedback.className = 'language-feedback';
	
	feedback.innerHTML = `
		<i class="fas fa-check-circle"></i>
		<span>Language changed to ${langName}</span>
	`;
	feedback.style.cssText = `
		position: fixed;
		top: 100px;
		right: 20px;
		background: rgba(101, 255, 204, 0.9);
		color: #1a1a1a;
		padding: 12px 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		z-index: 10000;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 16px rgba(101, 255, 204, 0.3);
	`;
	
	document.body.appendChild(feedback);
	
	// Animate in
	setTimeout(() => {
		feedback.style.transform = 'translateX(0)';
	}, 100);
	
	// Remove after 3 seconds
	setTimeout(() => {
		feedback.style.transform = 'translateX(100%)';
		setTimeout(() => {
			feedback.remove();
		}, 300);
	}, 3000);
}

// =================================
// EMAILJS INTEGRATION FOR REAL EMAIL FUNCTIONALITY
// =================================
function initEmailJS() {
	// Initialize EmailJS with your public key
	// For GitHub Pages: Use direct initialization
	// For local development: Use config file
	const publicKey = typeof emailjsConfig !== 'undefined' ? emailjsConfig.publicKey : 'gihs10Ar5NImUZ272';
	emailjs.init(publicKey);
}

// Language Switcher Functionality
(function() {
  const langBtn = document.getElementById('language-btn');
  const langDropdown = document.getElementById('language-dropdown');
  const langItems = document.querySelectorAll('.language-dropdown .dropdown-item');
  const currentLang = document.getElementById('current-lang');
  let isOpen = false;

  // Load saved language
  const savedLang = localStorage.getItem('language') || 'en';
  if (currentLang) {
    currentLang.textContent = savedLang.toUpperCase();
    langItems.forEach(item => {
      item.classList.toggle('selected', item.dataset.lang === savedLang);
    });
    
    // Apply saved translation after a short delay to ensure DOM is ready
    setTimeout(() => {
      translateWebsite(savedLang);
    }, 100);
  }

  // Toggle dropdown
  langBtn && langBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isOpen = !isOpen;
    langBtn.classList.toggle('active', isOpen);
    langDropdown.classList.toggle('visible', isOpen);
  });

  // Select language
  langItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const lang = this.dataset.lang;
      currentLang.textContent = lang.toUpperCase();
      langItems.forEach(i => i.classList.remove('selected'));
      this.classList.add('selected');
      localStorage.setItem('language', lang);
      isOpen = false;
      langBtn.classList.remove('active');
      langDropdown.classList.remove('visible');
      
      // Apply translation
      translateWebsite(lang);
      
      // Show feedback
      showLanguageChangeFeedback(lang.toUpperCase());
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', function(e) {
    if (isOpen && !langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
      isOpen = false;
      langBtn.classList.remove('active');
      langDropdown.classList.remove('visible');
    }
  });

  // Close dropdown on Escape
  document.addEventListener('keydown', function(e) {
    if (isOpen && e.key === 'Escape') {
      isOpen = false;
      langBtn.classList.remove('active');
      langDropdown.classList.remove('visible');
    }
  });
})();

// =================================
// RESUME MODAL FUNCTIONALITY
// =================================
function initResumeModal() {
	const resumeModalOverlay = document.getElementById('resume-modal-overlay');
	const resumeModalClose = document.getElementById('resume-modal-close');
	const modalResumeDownload = document.getElementById('modal-resume-download');
	
	if (!resumeModalOverlay) {
		console.warn('Resume modal overlay not found');
		return;
	}
	
	// Close modal when clicking the close button
	if (resumeModalClose) {
		resumeModalClose.addEventListener('click', hideResumeModal);
	}
	
	// Close modal when clicking the overlay
	resumeModalOverlay.addEventListener('click', (e) => {
		if (e.target === resumeModalOverlay) {
			hideResumeModal();
		}
	});
	
	// Close modal with Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && resumeModalOverlay.classList.contains('visible')) {
			hideResumeModal();
		}
	});
	
	// Handle download button click
	if (modalResumeDownload) {
		modalResumeDownload.addEventListener('click', () => {
			// Create a temporary link to download the resume
			const link = document.createElement('a');
			link.href = 'resume.pdf';
			link.download = 'Shivam_Attri_Resume.pdf';
			link.target = '_blank';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			
			// Close the modal after download
			setTimeout(() => {
				hideResumeModal();
			}, 500);
			
			// Show success feedback
			showDownloadSuccess();
		});
	}
}

function showResumeModal() {
	const resumeModalOverlay = document.getElementById('resume-modal-overlay');
	if (resumeModalOverlay) {
		resumeModalOverlay.classList.add('visible');
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}
}

function hideResumeModal() {
	const resumeModalOverlay = document.getElementById('resume-modal-overlay');
	if (resumeModalOverlay) {
		resumeModalOverlay.classList.remove('visible');
		document.body.style.overflow = ''; // Restore scrolling
	}
}

function showDownloadSuccess() {
	const feedback = document.createElement('div');
	feedback.className = 'download-feedback';
	
	feedback.innerHTML = `
		<i class="fas fa-download"></i>
		<span>Resume download started!</span>
	`;
	feedback.style.cssText = `
		position: fixed;
		top: 100px;
		right: 20px;
		background: rgba(101, 255, 204, 0.9);
		color: #1a1a1a;
		padding: 12px 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		z-index: 10000;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 16px rgba(101, 255, 204, 0.3);
	`;
	
	document.body.appendChild(feedback);
	
	// Animate in
	setTimeout(() => {
		feedback.style.transform = 'translateX(0)';
	}, 100);
	
	// Remove after 3 seconds
	setTimeout(() => {
		feedback.style.transform = 'translateX(100%)';
		setTimeout(() => {
			feedback.remove();
		}, 300);
	}, 3000);
}

// =================================
// CONTACT MODAL FUNCTIONALITY
// =================================
function initContactModal() {
	const contactModalOverlay = document.getElementById('contact-modal-overlay');
	const contactModalClose = document.getElementById('contact-modal-close');
	const contactOptions = document.querySelectorAll('.contact-option');
	
	if (!contactModalOverlay) {
		console.warn('Contact modal overlay not found');
		return;
	}
	
	// Close modal when clicking the close button
	if (contactModalClose) {
		contactModalClose.addEventListener('click', hideContactModal);
	}
	
	// Close modal when clicking the overlay
	contactModalOverlay.addEventListener('click', (e) => {
		if (e.target === contactModalOverlay) {
			hideContactModal();
		}
	});
	
	// Close modal with Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && contactModalOverlay.classList.contains('visible')) {
			hideContactModal();
		}
	});
	
	// Handle contact option clicks
	contactOptions.forEach(option => {
		option.addEventListener('click', () => {
			const action = option.dataset.action;
			handleContactAction(action);
		});
	});
}

function showContactModal() {
	const contactModalOverlay = document.getElementById('contact-modal-overlay');
	if (contactModalOverlay) {
		contactModalOverlay.classList.add('visible');
		document.body.style.overflow = 'hidden';
	}
}

function hideContactModal() {
	const contactModalOverlay = document.getElementById('contact-modal-overlay');
	if (contactModalOverlay) {
		contactModalOverlay.classList.remove('visible');
		document.body.style.overflow = '';
	}
}

function handleContactAction(action) {
	switch (action) {
		case 'scroll':
			hideContactModal();
			// Scroll to contact form
			const contactSection = document.getElementById('contact');
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth' });
			}
			break;
		case 'email':
			window.open('mailto:shivamattri2335@gmail.com', '_blank');
			hideContactModal();
			break;
		case 'linkedin':
			window.open('https://linkedin.com/in/shivam-attri23', '_blank');
			hideContactModal();
			break;
		case 'github':
			window.open('https://github.com/Shivam8286', '_blank');
			hideContactModal();
			break;
		case 'copy-email':
			navigator.clipboard.writeText('shivamattri2335@gmail.com').then(() => {
				showCopySuccess();
				hideContactModal();
			});
			break;
		case 'smart':
			// Smart contact - detect device and choose best option
			if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				// Mobile device - try to open email app
				window.open('mailto:shivamattri2335@gmail.com', '_blank');
			} else {
				// Desktop - copy email
				navigator.clipboard.writeText('shivamattri2335@gmail.com').then(() => {
					showCopySuccess();
				});
			}
			hideContactModal();
			break;
	}
}

function showCopySuccess() {
	const feedback = document.createElement('div');
	feedback.className = 'copy-feedback';
	
	feedback.innerHTML = `
		<i class="fas fa-check-circle"></i>
		<span>Email copied to clipboard!</span>
	`;
	feedback.style.cssText = `
		position: fixed;
		top: 100px;
		right: 20px;
		background: rgba(101, 255, 204, 0.9);
		color: #1a1a1a;
		padding: 12px 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		z-index: 10000;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		backdrop-filter: blur(10px);
		box-shadow: 0 4px 16px rgba(101, 255, 204, 0.3);
	`;
	
	document.body.appendChild(feedback);
	
	// Animate in
	setTimeout(() => {
		feedback.style.transform = 'translateX(0)';
	}, 100);
	
	// Remove after 3 seconds
	setTimeout(() => {
		feedback.style.transform = 'translateX(100%)';
		setTimeout(() => {
			feedback.remove();
		}, 300);
	}, 3000);
}

// =================================
// ENHANCED CONTACT BUTTON HANDLER
// =================================
function handleContactButtonClick() {
	showContactModal();
}

// =================================
// RESUME DOWNLOAD HANDLER
// =================================
function initResumeDownload() {
	const resumeDownloadBtn = document.getElementById('resume-download-btn');
	if (resumeDownloadBtn) {
		// Remove the href and target attributes to prevent direct download
		resumeDownloadBtn.removeAttribute('href');
		resumeDownloadBtn.removeAttribute('target');
		
		// Add click handler to show modal instead
		resumeDownloadBtn.addEventListener('click', (e) => {
			e.preventDefault();
			showResumeModal();
		});
	}
}

// =================================
// CONTACT ANALYTICS
// =================================
function initContactAnalytics() {
	// Track contact button clicks
	const contactBtn = document.querySelector('.contact-btn');
	if (contactBtn) {
		contactBtn.addEventListener('click', () => {
			trackContactClick('contact_button');
		});
	}
	
	// Track resume button clicks
	const resumeBtn = document.getElementById('resume-download-btn');
	if (resumeBtn) {
		resumeBtn.addEventListener('click', () => {
			trackContactClick('resume_button');
		});
	}
}

function trackContactClick(action) {
	// You can add analytics tracking here
	console.log(`Contact action tracked: ${action}`);
	// Example: gtag('event', 'contact_click', { 'action': action });
}

// Language Switcher Functionality