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

  // Quote form submission handling
  const quoteForms = document.querySelectorAll(".quote-form")
  quoteForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}

      // Convert FormData to object
      for (const [key, value] of formData.entries()) {
        formObject[key] = value
      }

      // Validate required fields
      const requiredFields = this.querySelectorAll("[required]")
      let isValid = true

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = "#e74c3c"
          isValid = false
        } else {
          field.style.borderColor = "#e9ecef"
        }
      })

      if (!isValid) {
        alert("Please fill in all required fields.")
        return
      }

      // Show success message
      showQuoteSuccessMessage(formObject)
    })
  })

  // Form reset functionality
  const resetBtns = document.querySelectorAll(".reset-btn")
  resetBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const form = this.closest("form")
      if (form) {
        form.reset()
        // Reset border colors
        const inputs = form.querySelectorAll("input, select, textarea")
        inputs.forEach((input) => {
          input.style.borderColor = "#e9ecef"
        })
      }
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

function showQuoteSuccessMessage(formData) {
  const productType = getProductTypeFromForm()

  const message = `
    Thank you for your quote request!
    
    Product: ${productType}
    Name: ${formData.firstName} ${formData.lastName}
    Email: ${formData.email}
    Phone: ${formData.phone}
    
    We will contact you within 24 hours with a detailed quote.
    
    For immediate assistance, please call:
    01530 273365
    
    Or email us at:
    sales@doorempire.com
  `

  alert(message)

  // Optional: Reset form after successful submission
  setTimeout(() => {
    const form = document.querySelector(".quote-form")
    if (form) {
      form.reset()
    }
  }, 1000)
}

function getProductTypeFromForm() {
  const url = window.location.pathname
  const filename = url.substring(url.lastIndexOf("/") + 1)

  const productTypes = {
    "quote-composite-doors.html": "Composite Doors",
    "quote-upvc-doors.html": "UPVC Doors",
    "quote-french-doors.html": "French Doors",
    "quote-patio-doors.html": "Patio Doors",
    "quote-bifold-doors.html": "Bifold Doors",
    "quote-upvc-windows.html": "UPVC Windows",
    "quote-aluminium-windows.html": "Aluminium Windows",
    "quote-roof-lanterns.html": "Roof Lanterns",
  }

  return productTypes[filename] || "Door/Window Product"
}

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Real-time validation for form fields
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".quote-form")

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input[required], select[required]")

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.style.borderColor === "rgb(231, 76, 60)") {
          validateField(this)
        }
      })
    })
  })
})

function validateField(field) {
  if (field.hasAttribute("required") && !field.value.trim()) {
    field.style.borderColor = "#e74c3c"
    return false
  } else if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(field.value)) {
      field.style.borderColor = "#e74c3c"
      return false
    }
  } else if (field.type === "tel" && field.value) {
    const phoneRegex = /^[\d\s\-+$$$$]+$/
    if (!phoneRegex.test(field.value)) {
      field.style.borderColor = "#e74c3c"
      return false
    }
  }

  field.style.borderColor = "#28a745"
  return true
}
