document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      statusEl.textContent = "Please add an email and a short message before sending.";
      statusEl.className = "form-status error";
    } else {
      statusEl.textContent = "Sending…";
      statusEl.className = "form-status";
      // Formspree handles the submission
    }
  });
}
