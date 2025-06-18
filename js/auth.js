// --------------------- Signup Form Validation & Handling ---------------------
$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
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
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.style.display = "block";
      errorDiv.innerText = "Passwords do not match.";
      return;
    }

    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem("deerhub-users")) || [];
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      alert("User with this email already exists.");
      return;
    }

    const newUser = { name, email, password, role };
    existingUsers.push(newUser);
    localStorage.setItem("deerhub-users", JSON.stringify(existingUsers));

    const sessionData = {
      isLoggedIn: true,
      name: name,
      email: email,
      role: role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/index.html";
  });
});

// --------------------- Login Form Handling ---------------------
$(document).ready(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("deerhub-users")) || [];
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
      alert("Invalid credentials or user not found.");
      return;
    }

    const sessionData = {
      isLoggedIn: true,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/index.html";
  });
});
