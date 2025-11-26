// Set current year in any element with id="year" or data-year attribute
(function () {
  const year = new Date().getFullYear();
  const yearEls = document.querySelectorAll("#year, [data-year]");
  yearEls.forEach(function (el) {
    el.textContent = year;
  });
})();

// Contact form handling
(function () {
  const form = document.querySelector("#contact form");
  const statusEl = document.getElementById("form-status");
  const contactCard = document.querySelector("#contact .contact-card");
  const contactLinks = document.querySelectorAll('a[href="#contact"]');

  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector("textarea[name='message'], textarea");

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.className = "form-status" + (isError ? " error" : "");
  }

  function highlightContact() {
    if (!contactCard) return;
    contactCard.classList.add("is-highlighted");
    if (nameInput) {
      nameInput.focus({ preventScroll: true });
    }
    setTimeout(function () {
      contactCard.classList.remove("is-highlighted");
    }, 1700);
  }

  contactLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(highlightContact, 300);
      }
    });
  });

  function isValidEmail(value) {
    if (!value) return false;
    // Lightweight email pattern, good enough for front-end validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  form.addEventListener("submit", function (e) {
    let hasError = false;

    const emailVal = emailInput ? emailInput.value.trim() : "";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    if (!emailVal || !isValidEmail(emailVal)) {
      hasError = true;
    }

    if (!messageVal || messageVal.length < 5) {
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      setStatus(
        "Please include a valid email and a short message before sending.",
        true
      );
      return;
    }

    setStatus("Sending…", false);
    // For mailto forms the browser will handle the actual send dialog
  });

  // Clear status when user starts editing again
  [emailInput, messageInput].forEach(function (field) {
    if (!field) return;
    field.addEventListener("input", function () {
      setStatus("", false);
    });
  });
})();
