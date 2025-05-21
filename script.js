document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll(".section")
  const navLinks = document.querySelectorAll("nav a")

  // Create an observer for animations
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    },
    { threshold: 0.1 },
  )

  // Create an observer for navigation highlighting
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Get the id of the section that is currently visible
          const id = entry.target.getAttribute("id")

          // Remove active class from all links
          navLinks.forEach((link) => {
            link.classList.remove("text-purple-600", "dark:text-purple-400", "font-medium")
            link.classList.add(
              "text-gray-600",
              "dark:text-gray-300",
              "hover:text-purple-600",
              "dark:hover:text-purple-400",
            )
          })

          // Add active class to the corresponding link
          const activeLink = document.querySelector(`nav a[href="#${id}"]`)
          if (activeLink) {
            activeLink.classList.remove(
              "text-gray-600",
              "dark:text-gray-300",
              "hover:text-purple-600",
              "dark:hover:text-purple-400",
            )
            activeLink.classList.add("text-purple-600", "dark:text-purple-400", "font-medium")
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  // Observe all sections
  sections.forEach((section) => {
    animationObserver.observe(section)
    navObserver.observe(section)
  })

  // Mobile menu toggle
  const menuButton = document.querySelector("nav button")
  const menuItems = document.querySelector("nav ul")

  if (menuButton && menuItems) {
    menuButton.addEventListener("click", () => {
      menuItems.classList.toggle("hidden")
      menuItems.classList.toggle("flex")
      menuItems.classList.toggle("flex-col")
      menuItems.classList.toggle("absolute")
      menuItems.classList.toggle("top-16")
      menuItems.classList.toggle("right-4")
      menuItems.classList.toggle("bg-white")
      menuItems.classList.toggle("dark:bg-gray-900")
      menuItems.classList.toggle("p-4")
      menuItems.classList.toggle("rounded-lg")
      menuItems.classList.toggle("shadow-lg")
    })
  }

  // Form submission
  const contactForm = document.querySelector("#contact form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields")
        return
      }

      // Here you would normally send the form data to a server
      // For this example, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`)

      // Reset the form
      contactForm.reset()
    })
  }

  // Initialize animations for the first visible section
  document.querySelector("#home").classList.add("animate-in")
})
