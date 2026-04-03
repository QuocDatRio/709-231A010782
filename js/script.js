/* ===================== TOAST ===================== */
function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.className = "toast-box";

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

/* ===================== DARK MODE ===================== */
const toggleBtn = document.getElementById("darkToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
}


