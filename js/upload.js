$(function() {
  // Access control: Only allow managers
  const session = JSON.parse(sessionStorage.getItem("deerhub-session") || '{}');
  if (!session.isLoggedIn || session.role !== "manager") {
    window.location.href = "/pages/index.html";
    return;
  }

  // Upload form simulation
  $("#upload-form").on("submit", function(e) {
    e.preventDefault();
    $("#upload-success").addClass("d-none");
    $("#upload-progress").removeClass("d-none");
    $(".progress-bar").css("width", "0%");
    let progress = 0;
    const interval = setInterval(function() {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) progress = 100;
      $(".progress-bar").css("width", progress + "%");
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(function() {
          $("#upload-progress").addClass("d-none");
          $(".progress-bar").css("width", "0%");
          $("#upload-success").removeClass("d-none");
          $("#upload-form")[0].reset();
        }, 500);
      }
    }, 200);
  });
}); 