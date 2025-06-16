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