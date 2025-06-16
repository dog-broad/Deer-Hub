$(function () {
  // Load navbar and footer modularly
  $("#navbar").load("/components/navbar.html", function () {
    updateNavForSession();
  });

  $("#footer").load("/components/footer.html", function () {
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

  // Manager-only links
  if (session.role === "manager") {
    $(".manager-only").removeClass("d-none");
    $("#upload-card").removeClass("d-none");
  } else {
    $(".manager-only").addClass("d-none");
    $("#upload-card").addClass("d-none");
  }

  // User login state
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

document.addEventListener("DOMContentLoaded", function () {
  const leaveForm = document.getElementById("leaveForm");

  if (leaveForm) {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const durationText = document.getElementById("durationText");

    // Prevent selecting past dates
    const today = new Date().toISOString().split("T")[0];
    if (startDateInput && endDateInput) {
      startDateInput.setAttribute("min", today);
      endDateInput.setAttribute("min", today);

      startDateInput.addEventListener("change", () => {
        endDateInput.setAttribute("min", startDateInput.value);
        updateDuration();
      });

      endDateInput.addEventListener("change", updateDuration);
    }

    function updateDuration() {
      const start = new Date(startDateInput.value);
      const end = new Date(endDateInput.value);

      if (startDateInput.value && endDateInput.value && end >= start) {
        const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        durationText.textContent = `You have selected ${days} day(s) of leave.`;
      } else {
        durationText.textContent = "Select dates to calculate duration.";
      }
    }

    // Save form data to localStorage on submit
    leaveForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        employeeName: document.getElementById("employeeName").value,
        employeeId: document.getElementById("employeeId").value,
        department: document.getElementById("department").value,
        contactEmail: document.getElementById("contactEmail").value,
        leaveType: document.getElementById("leaveType").value,
        priority: document.getElementById("priority").value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        reason: document.getElementById("reason").value,
        documentName: document.getElementById("documents").files[0]?.name || "No file uploaded",
        submittedAt: new Date().toISOString()
      };

      localStorage.setItem("leaveFormData", JSON.stringify(formData));
      alert("Form data saved to local storage!");
      leaveForm.reset();
      durationText.textContent = "Select dates to calculate duration.";
    });

    // Reset form and clear duration on reset button (if exists)
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        durationText.textContent = "Select dates to calculate duration.";
      });
    }
  }
});
