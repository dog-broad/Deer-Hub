// --------------------- Password Hashing Helper ---------------------
function hashPassword(password) {
  // Simple SHA-256 hashing using SubtleCrypto (returns a Promise)
  const encoder = new TextEncoder();
  return window.crypto.subtle.digest('SHA-256', encoder.encode(password))
    .then(hashBuffer => {
      // Convert ArrayBuffer to hex string
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    });
}

// --------------------- Session Check ---------------------
$(document).ready(function () {
  const session = JSON.parse(sessionStorage.getItem("deerhub-session") || '{}');
  if (session.isLoggedIn) {
    toastManager.info("You are already logged in");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
    return;
  }
});

// --------------------- Signup Form Validation & Handling ---------------------
$(document).ready(function () {
  $("#registerForm").on("submit", async function (e) {
    e.preventDefault();

    const name = $("#registerName").val().trim();
    const email = $("#registerEmail").val().trim();
    const password = $("#registerPassword").val();
    const confirmPassword = $("#confirmPassword").val();
    const role = $("#registerRole").val();
    const errorDiv = document.getElementById("passwordError");

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      errorDiv.style.display = "block";
      errorDiv.innerText = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
      toastManager.error("Password must meet security requirements");
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.style.display = "block";
      errorDiv.innerText = "Passwords do not match.";
      toastManager.error("Passwords do not match");
      return;
    }

    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("deerhub-users")) || [];
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      toastManager.error("User with this email already exists");
      return;
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);

    const newUser = { name, email, password: hashedPassword, role };
    existingUsers.push(newUser);
    localStorage.setItem("deerhub-users", JSON.stringify(existingUsers));

    const sessionData = {
      isLoggedIn: true,
      name: name,
      email: email,
      role: role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    toastManager.success("Account created successfully!");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  });
});

// --------------------- Login Form Handling ---------------------
$(document).ready(function () {
  $("#loginForm").on("submit", async function (e) {
    e.preventDefault();

    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val();

    if (!email || !password) {
      toastManager.warning("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("deerhub-users")) || [];
    // Hash the entered password for comparison
    const hashedPassword = await hashPassword(password);
    const foundUser = users.find(user => user.email === email && user.password === hashedPassword);

    if (!foundUser) {
      toastManager.error("Invalid credentials or user not found");
      return;
    }

    const sessionData = {
      isLoggedIn: true,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    toastManager.success("Welcome back, " + foundUser.name + "!");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  });
});
