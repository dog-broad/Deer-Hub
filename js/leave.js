document.addEventListener("DOMContentLoaded", function () {
  // If user is not logged in, redirect to login page
  const session = JSON.parse(sessionStorage.getItem("deerhub-session") || '{}');
  if (!session.isLoggedIn) {
    toastManager.warning("Please login to access this page");
    setTimeout(() => {
      window.location.href = "/pages/login.html";
    }, 1500);
    return;
  }
  
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

    // Save form data to localStorage only if valid
    leaveForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!leaveForm.checkValidity()) {
        leaveForm.classList.add("was-validated");
        toastManager.warning("Please fill all required fields correctly");
        return; // Stop if form is invalid
      }

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
      toastManager.success("Leave request submitted successfully!");

      leaveForm.reset();
      leaveForm.classList.remove("was-validated");
      durationText.textContent = "Select dates to calculate duration.";
    });

    // Reset form and clear duration on reset button
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        durationText.textContent = "Select dates to calculate duration.";
        leaveForm.classList.remove("was-validated");
        toastManager.info("Form has been reset");
      });
    }
  }
});

/*
$(function () {
  // Optional duplicate logic to ensure jQuery fallback support for leave form
  const leaveForm = document.getElementById("leaveForm");
  if (leaveForm) {
    leaveForm.addEventListener("submit", function (event) {
      const start = document.getElementById("startDate").value;
      const end = document.getElementById("endDate").value;

      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        if (duration > 0) {
          document.getElementById("durationText").innerText = `Leave Duration: ${duration} day(s)`;
        } else {
          document.getElementById("durationText").innerText = `Invalid date range.`;
          toastManager.warning("Please select a valid date range");
        }
      }
    });
  }
});
*/