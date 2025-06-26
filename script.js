// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
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
});