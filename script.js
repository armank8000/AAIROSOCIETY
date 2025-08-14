// Main JavaScript file for AAIRO website
// This file handles global functionality and animations

console.log("Main script.js loaded")

// API Configuration - Replace with your actual API endpoints
const API_CONFIG = {
  BASE_URL: "https://api.aairo.edu", // Replace with your actual API URL
  ENDPOINTS: {
    NEWS: "/api/news",
    PROJECTS: "/api/projects",
    EVENTS: "/api/events",
    BLOG: "/api/blog",
    MEMBERSHIP: "/api/membership",
    SEARCH: "/api/search",
  },
}

// Sample data - Replace with actual API calls
const SAMPLE_DATA = {
  news: [
  {
    id: 1,
    date: "July 16, 2025",
    title: "AI Appreciation Day Celebrated",
    description:
      "AI Appreciation Day on July 16 celebrates AI's transformative impact in healthcare, business, education, and more, honoring researchers and developers.",
    category: "news",
    isAAIRO: true, // New property to indicate AAIRO-related news
  },
  {
    id: 2,
    date: "July 10, 2025",
    title: "Figure AI's Helix Robot Performs Logistics",
    description:
      "Figure AI's Helix robot performs logistics at near-human speed, with its founder predicting humanoids will soon be ubiquitous.",
    category: "news",
    isAAIRO: false, // Not AAIRO-related
  },
  {
    id: 3,
    date: "July 5, 2025",
    title: "Hexagon's AEON Humanoid Robot Drives Automation",
    description:
      "Hexagon's AEON humanoid robot, powered by advanced AI, drives factory automation as manufacturers boost investments.",
    category: "news",
    isAAIRO: true, // AAIRO-related
  },
],
  projects: [
    {
      id: 1,
      title: "Pick and Place Robot (Past)",
      description:
        "A robotic arm programmed for object identification, gripping, and accurate placement across defined coordinates. This project aimed at demonstrating industrial automation principles and precision control systems.",
      technologies: ["Robotics", "Automation", "Control Systems"],
      status: "completed",
      image: "https://aairosocity.in/pick_and_place_robot", // Example URL
    },
    {
      id: 2,
      title: "Plastic Recycling Machine (Past)",
      description:
        "A semi-automated system capable of shredding plastic waste and processing it for reuse. The initiative focused on sustainability and environmental consciousness through tech-driven solutions.",
      technologies: ["Sustainability", "Automation", "Environmental Tech"],
      status: "completed",
      image: "", // Example URL
    },
    {
      id: 3,
      title: "Fingerprint Sensing Machine (Upcoming)",
      description:
        "A biometric device designed to capture and authenticate user fingerprints using advanced sensors and microcontroller integration. This project emphasizes security and access control.",
      technologies: ["Biometrics", "Sensors", "Microcontrollers"],
      status: "upcoming",
      image: "https://aairosocity.in/fingerprint_recognition", // Example URL
    },
    {
      id: 4,
      title: "Face Recognition System (Upcoming)",
      description:
        "An AI-powered surveillance system that uses machine learning and computer vision for identity detection and verification. Ideal for attendance systems and security automation.",
      technologies: ["AI", "Machine Learning", "Computer Vision"],
      status: "upcoming",
      image: "https://aairosocity.in/face_recognition", // Left empty to demonstrate default image
    },
    {
      id: 5,
      title: "Humanoid Robot (Proposed Future)",
      description:
        "A long-term vision project involving the design and development of a semi-autonomous humanoid capable of basic gesture interaction, mobility, and speech processing. The focus will be on human-robot interaction, AI modeling, and robotic actuation.",
      technologies: ["Humanoids", "AI", "Robotics", "Actuation"],
      status: "proposed",
      image: "https://aairosocity.in/humanoid", // Left empty to demonstrate default image
    },
  ],
  events: [
    {
      id: 1,
      title: "AI & Robotics Symposium 2025",
      description: "Annual symposium featuring keynote speakers from industry and academia",
      date: "2025-01-15",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      type: "conference",
    },
    {
      id: 2,
      title: "Machine Learning Workshop",
      description: "Hands-on workshop covering fundamentals of machine learning",
      date: "2025-01-20",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Lab 1",
      type: "workshop",
    },
    {
      id: 3,
      title: "Robotics Competition",
      description: "Inter-college robotics competition with exciting challenges",
      date: "2025-02-01",
      time: "10:00 AM - 4:00 PM",
      location: "Sports Complex",
      type: "competition",
    },
  ],
  blog: [
    {
      id: 1,
      title: "Artificial Intelligence: Shaping the Future with Smart Solutions",
      excerpt:
        "Artificial Intelligence (AI) is no longer just a concept from science fiction—it is now a driving force behind the digital transformation of our world. From voice assistants to self-driving cars, AI is revolutionizing the way we live, work, and interact. At its core, AI refers to machines that can mimic human intelligence, including learning, reasoning, problem-solving, and decision-making. Through technologies like machine learning, neural networks, and natural language processing, AI systems are able to analyze vast amounts of data, recognize patterns, and make intelligent predictions or actions. In the field of automation and robotics, AI plays a crucial role in enabling machines to adapt to changing environments and perform complex tasks with minimal human intervention. From healthcare diagnostics to smart manufacturing and intelligent security systems, AI is empowering industries with efficiency and innovation. At AAIRO, we aim to explore and apply AI in real-world scenarios through student-led projects and research. By fostering innovation in artificial intelligence, we prepare our members to become future leaders in this transformative field. The future belongs to those who can understand and shape intelligent systems—let's build that future together.",
      author: "AAIRO Team",
      date: "July 17, 2025",
      readTime: "5 min read",
      tags: ["AI", "Future", "Technology"],
      category: "Technology",
    },
    {
      id: 2,
      title: "How AI is Shaping the Future of Healthcare",
      excerpt:
        "Explore the transformative impact of AI in healthcare, from diagnostics to personalized treatment plans.",
      author: "AAIRO Team",
      date: "July 10, 2025",
      readTime: "7 min read",
      tags: ["AI", "Healthcare", "Innovation"],
      category: "Healthcare",
    },
    {
      id: 3,
      title: "ROS vs ROS2 – What's Better for Beginners?",
      excerpt: "A comparison of ROS and ROS2 to help beginners choose the right framework for their robotics projects.",
      author: "AAIRO Tech Team",
      date: "July 5, 2025",
      readTime: "8 min read",
      tags: ["Robotics", "ROS", "Tutorial"],
      category: "Robotics",
    },
    {
      id: 4,
      title: "Journey of Building Our First Humanoid",
      excerpt: "Follow our exciting journey as we design, develop, and bring to life our very first humanoid robot.",
      author: "AAIRO Project Team",
      date: "June 28, 2025",
      readTime: "10 min read",
      tags: ["Humanoid", "Robotics", "Project"],
      category: "Projects",
    },
  ],
}

// DOM Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const buzzGrid = document.getElementById("buzzGrid")
const projectsGrid = document.getElementById("projectsGrid")
const eventsGrid = document.getElementById("eventsGrid")
const blogGrid = document.getElementById("blogGrid")
const contactForm = document.getElementById("contactForm")
const loadingSpinner = document.getElementById("loadingSpinner")

/* 
========================================
HEAVY ANIMATIONS JAVASCRIPT - START
========================================
*/

// Matrix Rain Effect



  

// Enhanced Floating Components Animation
function enhanceFloatingComponents() {
  const components = document.querySelectorAll(".floating-components .component")

  components.forEach((component, index) => {
    // Add random delay to animations
    component.style.animationDelay = `${Math.random() * 5}s`

    // Add mouse interaction
    component.addEventListener("mouseenter", () => {
      component.style.transform = "scale(1.5) rotate(180deg)"
      component.style.filter = "drop-shadow(0 0 20px #3b82f6)"
    })

    component.addEventListener("mouseleave", () => {
      component.style.transform = ""
      component.style.filter = ""
    })
  })
}





// Check for reduced motion preference
function checkReducedMotion() {
  if (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    document.body.classList.add("reduced-animations")
  } else {
    document.body.classList.remove("reduced-animations")
  }
}

// Initialize all heavy animations
function initHeavyAnimations() {
  try {
    enhanceFloatingComponents()

    checkReducedMotion()

    console.log("Heavy animations initialized successfully")
  } catch (error) {
    console.error("Error initializing animations:", error)
  }
}

/* 
========================================
HEAVY ANIMATIONS JAVASCRIPT - END
========================================
*/

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing main application...")
  initializeApp()
  setupEventListeners()
  initHeavyAnimations()

  // Listen for changes in reduced motion preference
  window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener("change", checkReducedMotion)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation link highlighting (for single-page sections)
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7, // Adjust as needed
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href").includes(entry.target.id)) {
            link.classList.add("active")
          }
        })
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Special handling for the "Home" link if it's not tied to a section ID
  const homeLink = document.querySelector('.nav-link[href="index.html"]')
  if (homeLink) {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 100) {
        // Adjust threshold as needed
        navLinks.forEach((link) => link.classList.remove("active"))
        homeLink.classList.add("active")
      }
    })
  }

  // Intersection Observer for fade-in animations
  const fadeInElements = document.querySelectorAll(".fade-in")

  const observerOptionsFadeIn = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% of the element must be visible
  }

  const observerFadeIn = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target) // Stop observing once visible
      }
    })
  }, observerOptionsFadeIn)

  fadeInElements.forEach((el) => {
    observerFadeIn.observe(el)
  })
})

// Initialize the application
function initializeApp() {
  loadNews()
  loadProjects()
  loadEvents()
  loadBlog()
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) {
        mobileMenu.style.display = "none"
      }
    })
  })

  // Contact form submission (for other pages)
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmission)
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu && mobileMenuBtn && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.style.display = "none"
    }
  })
}

// Toggle mobile menu
function toggleMobileMenu() {
  if (!mobileMenu) return
  const isVisible = mobileMenu.style.display === "flex"
  mobileMenu.style.display = isVisible ? "none" : "flex"
}

// Load news data
async function loadNews() {
  try {
    showLoading()
    const news = SAMPLE_DATA.news
    renderNews(news)
    hideLoading()
  } catch (error) {
    console.error("Error loading news:", error)
    hideLoading()
    showError("Failed to load news")
  }
}

// Render news
function renderNews(news) {
  if (!buzzGrid) return;
  buzzGrid.innerHTML = news
    .map(
      (item) => `
    <div class="buzz-card fade-in ${item.isAAIRO ? 'AAIRO-NEWS' : ''}">
      <div class="buzz-date">${item.date}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      ${item.isAAIRO ? '<span class="aairo-tag">AAIRO</span>' : ''}
    </div>
  `
    )
    .join("");
}

// Load projects data
async function loadProjects() {
  try {
    showLoading()
    const projects = SAMPLE_DATA.projects
    renderProjects(projects)
    hideLoading()
  } catch (error) {
    console.error("Error loading projects:", error)
    hideLoading()
    showError("Failed to load projects")
  }
}

// Render projects
function renderProjects(projects) {
  console.log("Rendering projects:", projects); // Log the projects being rendered
  if (!projectsGrid) return;
  const defaultImage = "https://aairosocity.in/project"; // Default image URL
  projectsGrid.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card fade-in">
      <div class="project-image">
        <img src="${project.image || defaultImage}" 
             alt="${project.title}" 
             onerror="this.onerror=null; this.src='${defaultImage}'">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
        </div>
        <div class="project-status">
          <span class="status-badge ${project.status}">${project.status.toUpperCase()}</span>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Load events data
async function loadEvents() {
  try {
    showLoading()
    const events = SAMPLE_DATA.events
    renderEvents(events)
    hideLoading()
  } catch (error) {
    console.error("Error loading events:", error)
    hideLoading()
    showError("Failed to load events")
  }
}

// Render events
function renderEvents(events) {
  if (!eventsGrid) return

  eventsGrid.innerHTML = events
    .map((event) => {
      const eventDate = new Date(event.date)
      const day = eventDate.getDate()
      const month = eventDate.toLocaleDateString("en-US", { month: "short" })

      return `
      <div class="event-card fade-in">
        <div class="event-date">
          <div class="event-day">${day}</div>
          <div class="event-month">${month}</div>
        </div>
        <div class="event-content">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <div class="event-meta">
            <span><i class="fas fa-clock"></i> ${event.time}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
          </div>
        </div>
      </div>
    `
    })
    .join("")
}

// Load blog data
async function loadBlog() {
  try {
    showLoading()
    const blog = SAMPLE_DATA.blog
    renderBlog(blog)
    hideLoading()
  } catch (error) {
    console.error("Error loading blog:", error)
    hideLoading()
    showError("Failed to load blog")
  }
}

// Render blog previews on index.html
function renderBlog(blog) {
  if (!blogGrid) return

  // Display only the first 3 blog posts for preview
  const previewBlogs = blog.slice(0, 3)

  blogGrid.innerHTML = previewBlogs
    .map(
      (post) => `
    <a href="blog?id=${post.id}" class="blog-card fade-in">
      <div class="blog-image">
        <i class="fas fa-newspaper"></i>
      </div>
      <div class="blog-content">
        <div class="blog-meta">
          <span><i class="fas fa-user"></i> ${post.author}</span>
          <span><i class="fas fa-calendar"></i> ${post.date}</span>
          <span><i class="fas fa-clock"></i> ${post.readTime}</span>
        </div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt.substring(0, 150)}...</p>
        <div class="blog-tags">
          ${post.tags.map((tag) => `<span class="blog-tag">${tag}</span>`).join("")}
        </div>
      </div>
    </a>
  `,
    )
    .join("")
}

// Handle contact form submission
async function handleContactFormSubmission(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const contactData = Object.fromEntries(formData.entries())

  try {
    showLoading()
    // Mock success response
    await new Promise((resolve) => setTimeout(resolve, 2000))
    hideLoading()
    showSuccess("Message sent successfully!")
    e.target.reset()
  } catch (error) {
    console.error("Error submitting contact form:", error)
    hideLoading()
    showError("Failed to send message")
  }
}

// Navigation functions
function joinUs() {
  window.location.href = "membership"
}

function viewProjects() {
  const projectsSection = document.getElementById("projects")
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function navigateToSection(section) {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    })
  } else {
    console.log(`Navigating to ${section} section`)
    showInfo(`${section.charAt(0).toUpperCase() + section.slice(1)} section coming soon!`)
  }
}

function loadMoreNews() {
  showInfo("Loading more news...")
}

function loadMoreBlogs() {
  window.location.href = "blog" // Navigate to the full blog page
}

// Utility Functions
function showLoading() {
  if (loadingSpinner) {
    loadingSpinner.style.display = "flex"
  }
}

function hideLoading() {
  if (loadingSpinner) {
    loadingSpinner.style.display = "none"
  }
}

function showError(message) {
  createToast(message, "error")
}

function showSuccess(message) {
  createToast(message, "success")
}

function showInfo(message) {
  createToast(message, "info")
}

function createToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  // Add toast styles
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "error" ? "#ef4444" : type === "success" ? "#10b981" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `

  document.body.appendChild(toast)

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all animation elements
  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
    observer.observe(el)
  })
}

// Add CSS for toast animations (if not already in global CSS)
const style = document.createElement("style")
style.textContent = `
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

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Export functions for external use (make them globally available)
window.AAIROApp = {
  joinUs,
  viewProjects,
  navigateToSection,
  loadMoreNews,
  loadMoreBlogs,
  showLoading,
  hideLoading,
  showError,
  showSuccess,
  showInfo,
  initHeavyAnimations,
}

console.log("Main script.js fully loaded and initialized")


