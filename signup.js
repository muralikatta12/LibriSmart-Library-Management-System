document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const fields = {
    username: document.getElementById("s_username"),
    email: document.getElementById("s_email"),
    password: document.getElementById("s_password"),
    confirmPassword: document.getElementById("s_cnf_password"),
    role: document.getElementById("roles")
  };

  function showError(input, message) {
    let error = input.parentElement.querySelector(".error-msg");
    if (!error) {
      error = document.createElement("small");
      error.className = "text-danger error-msg";
      input.parentElement.appendChild(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    let error = input.parentElement.querySelector(".error-msg");
    if (error) {
      error.remove();
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Real-time validation
  fields.username.addEventListener("input", () => {
    if (!fields.username.value.trim()) {
      showError(fields.username, "Username is required");
    } else {
      clearError(fields.username);
    }
  });

  fields.email.addEventListener("input", () => {
    if (!validateEmail(fields.email.value)) {
      showError(fields.email, "Invalid email format");
    } else {
      clearError(fields.email);
    }
  });

  fields.password.addEventListener("input", () => {
    if (fields.password.value.length < 6) {
      showError(fields.password, "Password must be at least 6 characters");
    } else {
      clearError(fields.password);
    }

    // Re-validate confirm password if user changes main password
    if (fields.confirmPassword.value.length > 0) {
      if (fields.confirmPassword.value !== fields.password.value) {
        showError(fields.confirmPassword, "Passwords do not match");
      } else {
        clearError(fields.confirmPassword);
      }
    }
  });

  fields.confirmPassword.addEventListener("input", () => {
    if (fields.confirmPassword.value !== fields.password.value) {
      showError(fields.confirmPassword, "Passwords do not match");
    } else {
      clearError(fields.confirmPassword);
    }
  });

  fields.role.addEventListener("change", () => {
    if (!fields.role.value) {
      showError(fields.role, "Please select a role");
    } else {
      clearError(fields.role);
    }
  });

  // On submit: full check
  form.addEventListener("submit", function (e) {
    let valid = true;

    if (!fields.username.value.trim()) {
      showError(fields.username, "Username is required");
      valid = false;
    }

    if (!validateEmail(fields.email.value)) {
      showError(fields.email, "Invalid email format");
      valid = false;
    }

    if (fields.password.value.length < 6) {
      showError(fields.password, "Password must be at least 6 characters");
      valid = false;
    }

    if (fields.confirmPassword.value !== fields.password.value) {
      showError(fields.confirmPassword, "Passwords do not match");
      valid = false;
    }

    if (!fields.role.value) {
      showError(fields.role, "Please select a role");
      valid = false;
    }

    if (!valid) e.preventDefault();
  });
});
