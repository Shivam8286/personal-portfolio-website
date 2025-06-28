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
	initLanguageSelector();
	initScrollAnimations();
	initPerformanceOptimizations();

	// Enhanced Contact Button Functionality
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
	const messageInput = document.getElementById('message');
	const statusMessage = document.getElementById('form-status-message');

	// Get translated messages
	const nameEmptyMsg = window.translationData ? window.translationData['validation-name-empty'] : 'Name cannot be empty.';
	const messageEmptyMsg = window.translationData ? window.translationData['validation-message-empty'] : 'Message cannot be empty.';
	const fixErrorsMsg = window.translationData ? window.translationData['validation-fix-errors'] : 'Please fix the errors above and try again.';
	const sendingMsg = window.translationData ? window.translationData['form-sending'] : 'Sending...';
	const successMsg = window.translationData ? window.translationData['form-success'] : 'Thank you! Your message has been sent successfully.';

	// Perform final validation check on all fields
	const isNameValid = validateField(nameInput, 'validation-name-empty');
	const isEmailValid = validateEmail(emailInput);
	const isMessageValid = validateField(messageInput, 'validation-message-empty');

	if (!isNameValid || !isEmailValid || !isMessageValid) {
		statusMessage.textContent = fixErrorsMsg;
		statusMessage.className = 'visible error';
		return; // Stop submission if validation fails
	}

	// If all valid, proceed with submission
	statusMessage.textContent = sendingMsg;
	statusMessage.className = 'visible success'; // Style as success while sending

	// Simulate a network request with setTimeout
	// In a real application, you would replace this with a `fetch` call to a service like Formspree
	setTimeout(() => {
		console.log("Form submitted successfully:", Object.fromEntries(new FormData(form)));
		statusMessage.textContent = successMsg;
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
	
	// Toggle dropdown
	languageBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		languageBtn.classList.toggle('active');
		languageDropdown.classList.toggle('visible');
		
		// Add ripple effect
		const ripple = document.createElement('div');
		ripple.className = 'ripple';
		ripple.style.cssText = `
			position: absolute;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.3);
			transform: scale(0);
			animation: ripple 0.6s linear;
			pointer-events: none;
		`;
		
		const rect = languageBtn.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;
		
		ripple.style.width = ripple.style.height = size + 'px';
		ripple.style.left = x + 'px';
		ripple.style.top = y + 'px';
		
		languageBtn.appendChild(ripple);
		
		setTimeout(() => {
			ripple.remove();
		}, 600);
	});
	
	// Handle language selection
	dropdownItems.forEach(item => {
		item.addEventListener('click', () => {
			const lang = item.dataset.lang;
			const langText = item.querySelector('span').textContent;
			
			// Update current language display
			currentLang.textContent = lang.toUpperCase();
			
			// Update selected state
			dropdownItems.forEach(di => {
				di.classList.remove('selected');
				const indicator = di.querySelector('.selected-indicator');
				if (indicator) indicator.style.opacity = '0';
			});
			item.classList.add('selected');
			const selectedIndicator = item.querySelector('.selected-indicator');
			if (selectedIndicator) selectedIndicator.style.opacity = '1';
			
			// Close dropdown
			languageBtn.classList.remove('active');
			languageDropdown.classList.remove('visible');
			
			// Save language preference
			localStorage.setItem('language', lang);
			
			// Actually translate the website
			translateWebsite(lang);
			
			// Add success feedback
			showLanguageChangeFeedback(langText);
		});
	});
	
	// Close dropdown when clicking outside
	document.addEventListener('click', (e) => {
		if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
			languageBtn.classList.remove('active');
			languageDropdown.classList.remove('visible');
		}
	});
	
	// Close dropdown on escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && languageDropdown.classList.contains('visible')) {
			languageBtn.classList.remove('active');
			languageDropdown.classList.remove('visible');
		}
	});
	
	// Load saved language preference
	const savedLang = localStorage.getItem('language') || 'en';
	const savedItem = document.querySelector(`[data-lang="${savedLang}"]`);
	if (savedItem) {
		currentLang.textContent = savedLang.toUpperCase();
		dropdownItems.forEach(di => di.classList.remove('selected'));
		savedItem.classList.add('selected');
		const savedIndicator = savedItem.querySelector('.selected-indicator');
		if (savedIndicator) savedIndicator.style.opacity = '1';
		
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
	
	const langChangedText = window.translationData ? window.translationData['lang-changed'] : 'Language changed to';
	
	feedback.innerHTML = `
		<i class="fas fa-check-circle"></i>
		<span>${langChangedText} ${langName}</span>
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
		'contact-message-placeholder': 'Your Message',
		'contact-send-btn': 'Send Message',
		
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
		'validation-message-empty': 'Message cannot be empty.',
		'validation-fix-errors': 'Please fix the errors above and try again.',
		'form-sending': 'Sending...',
		'form-success': 'Thank you! Your message has been sent successfully.',
		
		// Language Feedback
		'lang-changed': 'Language changed to'
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
		'contact-message-placeholder': 'Tu Mensaje',
		'contact-send-btn': 'Enviar Mensaje',
		'footer-copyright': 'Todos los Derechos Reservados.',
		'footer-home': 'Inicio',
		'footer-about': 'Sobre Mí',
		'footer-skills': 'Habilidades',
		'footer-projects': 'Proyectos',
		'footer-contact': 'Contacto',
		'validation-name-empty': 'El nombre no puede estar vacío.',
		'validation-email-empty': 'El email no puede estar vacío.',
		'validation-email-invalid': 'Por favor ingresa un email válido.',
		'validation-message-empty': 'El mensaje no puede estar vacío.',
		'validation-fix-errors': 'Por favor corrige los errores arriba e intenta de nuevo.',
		'form-sending': 'Enviando...',
		'form-success': '¡Gracias! Tu mensaje ha sido enviado exitosamente.',
		'lang-changed': 'Idioma cambiado a'
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
		'contact-message-placeholder': 'Votre Message',
		'contact-send-btn': 'Envoyer le Message',
		'footer-copyright': 'Tous Droits Réservés.',
		'footer-home': 'Accueil',
		'footer-about': 'À Propos',
		'footer-skills': 'Compétences',
		'footer-projects': 'Projets',
		'footer-contact': 'Contact',
		'validation-name-empty': 'Le nom ne peut pas être vide.',
		'validation-email-empty': 'L\'email ne peut pas être vide.',
		'validation-email-invalid': 'Veuillez entrer une adresse email valide.',
		'validation-message-empty': 'Le message ne peut pas être vide.',
		'validation-fix-errors': 'Veuillez corriger les erreurs ci-dessus et réessayer.',
		'form-sending': 'Envoi en cours...',
		'form-success': 'Merci ! Votre message a été envoyé avec succès.',
		'lang-changed': 'Langue changée vers'
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
		'contact-message-placeholder': 'Deine Nachricht',
		'contact-send-btn': 'Nachricht Senden',
		'footer-copyright': 'Alle Rechte Vorbehalten.',
		'footer-home': 'Startseite',
		'footer-about': 'Über Mich',
		'footer-skills': 'Fähigkeiten',
		'footer-projects': 'Projekte',
		'footer-contact': 'Kontakt',
		'validation-name-empty': 'Der Name darf nicht leer sein.',
		'validation-email-empty': 'Die Email darf nicht leer sein.',
		'validation-email-invalid': 'Bitte geben Sie eine gültige Email-Adresse ein.',
		'validation-message-empty': 'Die Nachricht darf nicht leer sein.',
		'validation-fix-errors': 'Bitte beheben Sie die Fehler oben und versuchen Sie es erneut.',
		'form-sending': 'Wird gesendet...',
		'form-success': 'Danke! Ihre Nachricht wurde erfolgreich gesendet.',
		'lang-changed': 'Sprache geändert zu'
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
		'contact-message-placeholder': 'आपका संदेश',
		'contact-send-btn': 'संदेश भेजें',
		'footer-copyright': 'सर्वाधिकार सुरक्षित।',
		'footer-home': 'होम',
		'footer-about': 'मेरे बारे में',
		'footer-skills': 'कौशल',
		'footer-projects': 'प्रोजेक्ट्स',
		'footer-contact': 'संपर्क',
		'validation-name-empty': 'नाम खाली नहीं हो सकता।',
		'validation-email-empty': 'ईमेल खाली नहीं हो सकता।',
		'validation-email-invalid': 'कृपया एक वैध ईमेल पता दर्ज करें।',
		'validation-message-empty': 'संदेश खाली नहीं हो सकता।',
		'validation-fix-errors': 'कृपया ऊपर की त्रुटियों को ठीक करें और पुनः प्रयास करें।',
		'form-sending': 'भेज रहा है...',
		'form-success': 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।',
		'lang-changed': 'भाषा बदली गई'
	}
};

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
		
		// Update form validation messages
		window.translationData = langData;
		
		console.log(`Website translated to ${lang} successfully`);
		
	} catch (error) {
		console.error('Error during translation:', error);
	}
}

// Contact button click handler
function handleContactButtonClick() {
	const contactBtn = document.querySelector('.contact-btn');
	
	// Add loading state
	const originalText = contactBtn.textContent;
	contactBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
	contactBtn.disabled = true;
	
	// Simulate loading for better UX
	setTimeout(() => {
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			// Smooth scroll to contact section
			contactSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
			
			// Add success feedback
			contactBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
			contactBtn.style.background = 'linear-gradient(90deg, #65ffcc, #4CAF50)';
			
			// Reset button after 2 seconds
			setTimeout(() => {
				contactBtn.innerHTML = originalText;
				contactBtn.style.background = 'linear-gradient(90deg, #ab89ff 60%, #cc65ff 100%)';
				contactBtn.disabled = false;
			}, 2000);
			
			// Focus on the name input after scrolling
			setTimeout(() => {
				const nameInput = document.getElementById('name');
				if (nameInput) {
					nameInput.focus();
					// Add highlight effect to the contact section
					contactSection.style.boxShadow = '0 0 50px rgba(171, 137, 255, 0.3)';
					setTimeout(() => {
						contactSection.style.boxShadow = '';
					}, 3000);
				}
			}, 1000);
		}
	}, 500);
}