document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const userNameInput = document.getElementById("user-name-input");

  startBtn.addEventListener("click", () => {
    const name = userNameInput.value.trim();

    if (!name) {
      alert("Te rog să introduci un nume.");
      userNameInput.focus();
      return;
    }

    // Salvăm numele în localStorage
    localStorage.setItem("userName", name);

    // Redirecționează către dashboard
    window.location.href = "dashboard.html";
  });

  // Optional: Enter key to submit form
  userNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      startBtn.click();
    }
  });
});