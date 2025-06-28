# Personal Portfolio Website

A modern, responsive portfolio website featuring glassmorphism design, interactive animations, multi-language support, and a comprehensive feature set.

## 📁 Project Structure

```
/ (project root)
│
├── index.html          # Main HTML file
├── style.css           # All styles (imported in HTML)
├── script.js           # All JavaScript logic
├── config.js           # EmailJS configuration (if needed)
├── README.md           # This file
├── hero.jpg            # Hero background image
├── img.avif            # Project image(s)
├── shiv.png            # Profile image
├── about-me.png        # About section image
├── Style=Default.svg   # Logo SVG
├── resume.pdf          # Resume file for download
└── ...                 # Any other images/assets
```

## 🚀 Features

### 🌍 **Multi-Language Support**
- **6 Languages**: English, Spanish, French, German, Hindi, Japanese
- **Dynamic Translation**: Real-time language switching without page reload
- **Persistent Language**: Remembers user's language preference
- **Complete Translation**: All UI elements, forms, and content translated
- **Language Feedback**: Visual confirmation when language is changed
- **Modern Language Selector**: Glassmorphic dropdown with smooth animations

### 📧 **Real Email Functionality**
- **EmailJS Integration**: Real email sending capability
- **Form Validation**: Comprehensive client-side validation with translated messages
- **Success/Error Handling**: User-friendly feedback for form submissions
- **Template System**: Professional email templates for contact form
- **Spam Protection**: Built-in protection against spam submissions

### 🎨 **Theme System**
- **Dark/Light Mode Toggle**: Switch between themes with smooth transitions
- **System Preference Detection**: Automatically matches user's OS theme preference
- **Theme Persistence**: Remembers user's choice across sessions
- **Full Theme Integration**: All components adapt to both light and dark modes
- **Particles.js Theme Sync**: Background particles change color with theme

### ✨ **Enhanced Animations & Effects**
- **3D Card Tilt Effects**: Interactive mouse-following tilt on project and skill cards
- **Custom Animated Cursor**: Dot and outline that follows mouse with hover effects
- **Enhanced Preloader**: Progress bar with dynamic loading messages and animated logo
- **Skeleton Loading**: Shimmer effect for project cards during loading
- **Micro-Interactions**: Button ripples, social icon shines, and smooth transitions
- **Staggered Animations**: Sequential loading of elements for polished feel
- **Scroll Animations**: Elements animate in as they come into view

### 🎯 **Interactive Elements**
- **Project Modal System**: Detailed project views with images, descriptions, and links
- **Resume Modal**: Professional resume preview with download option
- **Contact Modal**: Multiple contact options (email, LinkedIn, GitHub, copy email)
- **Live Form Validation**: Real-time validation with custom error messages
- **Smooth Scrolling**: Enhanced navigation with easing effects
- **Active Navigation**: Visual indicators for current section
- **Back to Top Button**: Smooth scroll-to-top functionality

### 🎨 **Design System**
- **Glassmorphism**: Translucent backgrounds with blur effects throughout
- **Responsive Grid Layouts**: Adaptive grids for skills and projects
- **Color Accent System**: Purple theme with proper contrast ratios
- **Typography Hierarchy**: Clear content prioritization and readability
- **Modern Language Switcher**: Glassmorphic design with hover effects

### 📱 **Performance & Accessibility**
- **Lazy Loading**: Images load only when needed for better performance
- **Optimized Animations**: RequestAnimationFrame for smooth performance
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: Proper semantic HTML and ARIA labels
- **Reduced Motion Support**: Respects user's motion preferences
- **Mobile Optimization**: Touch-friendly interactions and responsive design
- **Performance Optimizations**: Debounced events and efficient DOM updates

## 🚦 How to Use / Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Open `index.html` in your browser.**
   - No build step required—just open the file!

## 🌐 How to Deploy (GitHub Pages)

1. **Push your code to a GitHub repository.**
2. **Go to Settings > Pages.**
3. **Set Source to `main` branch and `/ (root)` folder.**
4. **Visit:**  
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## ✨ Customization

### **Content Updates**
- **Change images:** Replace `hero.jpg`, `shiv.png`, `img.avif`, etc. with your own
- **Edit content:** Update text, links, and project details in `index.html`
- **Add projects:** Duplicate project cards and update their data attributes
- **Modify skills:** Update skill cards with your own technologies and proficiency levels
- **Update translations:** Modify the `translations` object in `script.js` for new languages

### **Styling Customization**
- **Change colors:** Edit CSS custom properties in `style.css`
- **Modify fonts:** Update font-family declarations
- **Adjust spacing:** Modify grid gaps and padding values
- **Theme colors:** Customize light/dark mode color schemes
- **Language switcher:** Customize the language selector appearance

### **Feature Configuration**
- **Particles.js**: Adjust particle count, colors, and behavior in `script.js`
- **Animation speeds**: Modify transition durations and easing functions
- **3D effects**: Adjust tilt sensitivity and scale values
- **Form handling**: Configure validation rules and EmailJS settings
- **Language settings**: Add or modify supported languages

## 💡 Notable Features & Effects

### **Visual Effects**
- **Glassmorphism Design**: Modern frosted-glass aesthetic throughout
- **3D Card Interactions**: Mouse-following tilt effects with depth perception
- **Particles.js Background**: Interactive particles in hero section
- **Smooth Transitions**: Enhanced hover states and page transitions
- **Loading Animations**: Progressive content loading with skeleton screens
- **Language Switcher**: Modern dropdown with glassmorphic design

### **Interactive Features**
- **Multi-Language Support**: 6 languages with seamless switching
- **Theme Toggle**: One-click theme switching with icon animations
- **Project Modals**: Detailed project information in elegant popups
- **Resume Modal**: Professional resume preview and download
- **Contact Modal**: Multiple contact options with smart detection
- **Form Validation**: Real-time feedback with translated error messages
- **Custom Cursor**: Animated cursor that reacts to interactive elements
- **Smooth Scrolling**: Enhanced navigation with easing effects
- **Real Email Sending**: Functional contact form with EmailJS

### **Performance Features**
- **Lazy Loading**: Optimized image loading for better performance
- **Debounced Events**: Efficient scroll and resize handling
- **Animation Optimization**: Hardware-accelerated animations
- **Mobile Optimization**: Touch-friendly interactions and responsive design
- **Language Persistence**: Efficient language switching without page reload

## 🧩 External Libraries

- [Font Awesome](https://fontawesome.com/) - Icons and social media icons
- [Particles.js](https://vincentgarreau.com/particles.js/) - Interactive background particles
- [EmailJS](https://www.emailjs.com/) - Real email functionality for contact form

## 🎯 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: CSS Grid, Flexbox, CSS Custom Properties, ES6+ JavaScript

## 📱 Responsive Design

- **Desktop**: Full-featured experience with all animations and effects
- **Tablet**: Optimized layout with touch-friendly interactions
- **Mobile**: Streamlined design with essential features and performance optimizations

## 🔧 Technical Details

### **CSS Features Used**
- CSS Grid and Flexbox for layouts
- CSS Custom Properties for theming
- CSS Transforms and Transitions for animations
- Backdrop-filter for glassmorphism effects
- Media queries for responsive design
- Advanced selectors for language switcher styling

### **JavaScript Features Used**
- ES6+ syntax and features
- Intersection Observer API for lazy loading
- RequestAnimationFrame for smooth animations
- Local Storage for theme and language persistence
- Event delegation for performance
- Dynamic DOM manipulation for translations
- EmailJS integration for real email functionality

### **Translation System**
- Efficient translation lookup using data attributes
- Batch DOM updates for performance
- Fallback to English for missing translations
- Language preference persistence
- Real-time language switching without page reload

## 📣 Credits

- **Design & Development:** Shivam Attri
- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Particles:** [Particles.js](https://vincentgarreau.com/particles.js/)
- **Email Service:** [EmailJS](https://www.emailjs.com/)
- **Inspiration:** Modern web design trends and best practices

## 📬 Contact

- **Email:** shivamattri2335@gmail.com
- **LinkedIn:** [shivam-attri23](https://linkedin.com/in/shivam-attri23)
- **GitHub:** [Shivam8286](https://github.com/Shivam8286)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

> **Feel free to fork, customize, and use this portfolio as your own!**

---

**Last Updated:** December 2024  
**Version:** 3.0.0 - Enhanced with multi-language support, real email functionality, and advanced modals
