// --------------------- Modular Navbar & Footer Load ---------------------
$(function () {
  $("#navbar").load("/components/navbar.html", updateNavForSession);
  $("#footer").load("/components/footer.html");
});

// --------------------- Session Utilities ---------------------
function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem("deerhub-session")) || {};
  } catch {
    return {};
  }
}

function updateNavForSession() {
  const session = getSession();

  // Show/hide manager-only links
  if (session.role === "manager") {
    $(".manager-only").removeClass("d-none");
    $("#upload-card").removeClass("d-none");
  } else {
    $(".manager-only").addClass("d-none");
    $("#upload-card").addClass("d-none");
  }

  // Show/hide login/user
  if (session.isLoggedIn) {
    $("#login-link").addClass("d-none");
    $("#user-dropdown").removeClass("d-none");
    $("#user-name").text(session.name || "User");
  } else {
    $("#login-link").removeClass("d-none");
    $("#user-dropdown").addClass("d-none");
  }

  // Logout
  $("#logout-btn").off("click").on("click", function (e) {
    e.preventDefault();
    sessionStorage.removeItem("deerhub-session");
    window.location.href = "/pages/index.html";
  });
}

// --------------------- Signup Form Validation & Handling ---------------------
$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
    const name = $("#registerName").val().trim();
    const email = $("#registerEmail").val().trim();
    const password = $("#registerPassword").val();
    const confirmPassword = $("#confirmPassword").val();
    const role = $("#registerRole").val();
    const errorDiv = document.getElementById("passwordError");

    // Strong Password Regex
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    // Password Validation
    if (!strongPasswordRegex.test(password)) {
      e.preventDefault();
      errorDiv.style.display = "block";
      errorDiv.innerText = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      errorDiv.style.display = "block";
      errorDiv.innerText = "Passwords do not match.";
      return;
    }

    // errorDiv.style.display = "none";

    // Save session
    const sessionData = {
      isLoggedIn: true,
      name: name,
      email: email,
      role: role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/pages/index.html";
  });
});

// --------------------- Login Form Handling ---------------------
$(document).ready(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#loginEmail").val().trim();
    const password = $("#loginPassword").val();
    const role = $("#registerRole").val();

    if (!email || !password || !role) {
      alert("Please fill all fields.");
      return;
    }

    // Create session data (mock)
    const sessionData = {
      isLoggedIn: true,
      name: email.split("@")[0],
      email: email,
      role: role,
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/pages/index.html";
  });
});
