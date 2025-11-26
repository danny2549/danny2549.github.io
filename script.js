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

  if (!form) return;

  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector("textarea[name='message'], textarea");

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.textContent = message || "";
    statusEl.className = "form-status" + (isError ? " error" : "");
  }

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
