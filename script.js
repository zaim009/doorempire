// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })
  }

  // Category tabs functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const productGrids = document.querySelectorAll(".product-grid")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all tabs
      tabBtns.forEach((tab) => tab.classList.remove("active"))
      // Add active class to clicked tab
      this.classList.add("active")

      // Hide all product grids
      productGrids.forEach((grid) => (grid.style.display = "none"))

      // Show selected category grid
      const category = this.getAttribute("data-category")
      const targetGrid = document.getElementById(category)
      if (targetGrid) {
        targetGrid.style.display = "grid"
      }
    })
  })

  // Quote button functionality
  const quoteBtns = document.querySelectorAll(".quote-btn, .cta-btn")
  quoteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert(
        "Thank you for your interest! Please call 01530 273365 or email sales@doorempire.com for a personalized quote.",
      )
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})
