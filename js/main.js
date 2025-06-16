// Load navbar and footer modularly
$(function() {
  $("#navbar").load("/components/navbar.html", function() {
    updateNavForSession();
  });
  $("#footer").load("/components/footer.html", function() {
    updateNavForSession();
  });
});

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
  // Show user dropdown if logged in
  if (session.isLoggedIn) {
    $("#login-link").addClass("d-none");
    $("#user-dropdown").removeClass("d-none");
    $("#user-name").text(session.name || "User");
  } else {
    $("#login-link").removeClass("d-none");
    $("#user-dropdown").addClass("d-none");
  }
  // Logout handler
  $("#logout-btn").off("click").on("click", function(e) {
    e.preventDefault();
    sessionStorage.removeItem("deerhub-session");
    window.location.href = "/pages/index.html";
  });
  
} 

// Signup form handling
$(document).ready(function () {
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#registerName").val().trim();
    const email = $("#registerEmail").val().trim();
    const password = $("#registerPassword").val(); // Store hashed in production
    const confirmPassword = $("#confirmPassword").val();
    const role = $("#registerRole").val();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const sessionData = {
      isLoggedIn: true,
      name: name,
      email: email,
      role: role
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/pages/index.html"; // Or dashboard.html
  });
});

// Login form handling
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

    // In production, validate credentials via API/server here

    const sessionData = {
      isLoggedIn: true,
      name: email.split("@")[0], // Fallback name
      email: email,
      role: role
    };

    sessionStorage.setItem("deerhub-session", JSON.stringify(sessionData));
    window.location.href = "/pages/index.html";
  });
});
