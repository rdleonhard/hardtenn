// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
  } else {
    navbar.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");

function highlightActiveSection() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);

// Toast Notification System
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type} show`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.textContent = "";
      toast.className = "toast";
    }, 300);
  }, 4000);
}

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  if (!phone) return true; // Phone is optional
  const re = /^[\d\s\-\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.borderColor = "#ef4444";
  }
}

function clearFieldError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.borderColor = "";
  }
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  // Real-time validation
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const messageField = document.getElementById("message");

  if (nameField) {
    nameField.addEventListener("blur", () => {
      if (!nameField.value.trim()) {
        showFieldError("name", "Name is required");
      } else {
        clearFieldError("name");
      }
    });
  }

  if (emailField) {
    emailField.addEventListener("blur", () => {
      if (!emailField.value.trim()) {
        showFieldError("email", "Email is required");
      } else if (!validateEmail(emailField.value)) {
        showFieldError("email", "Please enter a valid email address");
      } else {
        clearFieldError("email");
      }
    });
  }

  if (phoneField) {
    phoneField.addEventListener("blur", () => {
      if (phoneField.value && !validatePhone(phoneField.value)) {
        showFieldError("phone", "Please enter a valid phone number");
      } else {
        clearFieldError("phone");
      }
    });
  }

  if (messageField) {
    messageField.addEventListener("blur", () => {
      if (!messageField.value.trim()) {
        showFieldError("message", "Message is required");
      } else {
        clearFieldError("message");
      }
    });
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous errors
    ["name", "email", "phone", "message"].forEach((field) => {
      clearFieldError(field);
    });

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate
    let isValid = true;

    if (!data.name || !data.name.trim()) {
      showFieldError("name", "Name is required");
      isValid = false;
    }

    if (!data.email || !data.email.trim()) {
      showFieldError("email", "Email is required");
      isValid = false;
    } else if (!validateEmail(data.email)) {
      showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    if (data.phone && !validatePhone(data.phone)) {
      showFieldError("phone", "Please enter a valid phone number");
      isValid = false;
    }

    if (!data.message || !data.message.trim()) {
      showFieldError("message", "Message is required");
      isValid = false;
    }

    if (!isValid) {
      showToast("Please correct the errors in the form", "error");
      return;
    }

    // Disable submit button and show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoader = submitBtn.querySelector(".btn-loader");
      if (btnText) btnText.style.display = "none";
      if (btnLoader) btnLoader.style.display = "inline-block";
    }

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      console.log("Form submitted:", data);

      // Show success message
      showToast("Thank you for your message! We will get back to you soon.", "success");

      // Reset form
      contactForm.reset();
    } catch (error) {
      showToast("Something went wrong. Please try again later.", "error");
      console.error("Form submission error:", error);
    } finally {
      // Re-enable submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoader = submitBtn.querySelector(".btn-loader");
        if (btnText) btnText.style.display = "inline-block";
        if (btnLoader) btnLoader.style.display = "none";
      }
    }
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe service cards and project cards
document.querySelectorAll(".service-card, .project-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
