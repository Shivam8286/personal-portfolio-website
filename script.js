// Preloader Logic
window.addEventListener('load', () => {
	const preloader = document.querySelector('.preloader');
	// Add a minimum delay to ensure the loader is visible
	setTimeout(() => {
		preloader.classList.add('hidden');
	}, 500);
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
		contactForm.addEventListener("submit", handleFormSubmit);
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

	lazyLoadImages();
	themeToggle();
	initProjectModals();
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
	// Here you would typically send the form data to a server
	// For now, we'll just log it to the console
	const formData = new FormData(e.target);
	console.log("Form submitted with data:", Object.fromEntries(formData));
	alert("Thank you for your message! We will get back to you soon.");
	e.target.reset();
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
// Dark/Light mode toggle
const toggleButton = document.createElement("button");
toggleButton.textContent = "🌓";
toggleButton.classList.add("theme-toggle");
document.body.appendChild(toggleButton);

toggleButton.addEventListener("click", () => {
	document.body.classList.toggle("light-mode");
	localStorage.setItem(
		"theme",
		document.body.classList.contains("light-mode") ? "light" : "dark"
	);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
	document.body.classList.add("light-mode");
}
// ... existing code ...

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

// ... existing code ...

// Optimize theme toggle
const themeToggle = () => {
  const toggleButton = document.querySelector(".theme-toggle");
  if (!toggleButton) return;

  const toggleTheme = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
  };

  toggleButton.addEventListener("click", toggleTheme);

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
};

// Initialize all functions
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => link.addEventListener("click", smoothScroll));

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) contactForm.addEventListener("submit", handleFormSubmit);

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", projectCardHover);
    card.addEventListener("mouseleave", projectCardHover);
  });

  const heroText = document.querySelector(".hero-text h1");
  if (heroText) typeWriter(heroText, 0);

  lazyLoadImages();
  themeToggle();
  initProjectModals();
});

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