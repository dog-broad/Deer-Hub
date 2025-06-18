$(function () {
  // Access control: Only allow managers
  const session = JSON.parse(sessionStorage.getItem("deerhub-session") || '{}');
  if (!session.isLoggedIn) {
    toastManager.warning("Please login to access this page");
    setTimeout(() => {
      window.location.href = "/pages/login.html";
    }, 1500);
    return;
  }
  
  if (session.role !== "manager") {
    toastManager.error("Access denied. Manager privileges required");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
    return;
  }

  // Upload form simulation
  $("#upload-form").on("submit", function (e) {
    e.preventDefault();
    $("#upload-success").addClass("d-none");
    $("#upload-progress").removeClass("d-none");
    $(".progress-bar").css("width", "0%");
    
    const fileTitle = $("#fileTitle").val().trim();
    const fileDesc = $("#fileDesc").val().trim();
    
    if (!fileTitle || !fileDesc) {
      toastManager.warning("Please provide both title and description");
      return;
    }
    
    let progress = 0;
    const interval = setInterval(function () {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) progress = 100;
      $(".progress-bar").css("width", progress + "%");
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(function () {
          $("#upload-progress").addClass("d-none");
          $(".progress-bar").css("width", "0%");
          $("#upload-success").removeClass("d-none");
          $("#upload-form")[0].reset();
          toastManager.success("Document uploaded successfully!");
        }, 500);
      }
    }, 200);
  });
}); 