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

/* ===================== PRODUCTS ===================== */
const products = [
  { name: "iPhone", price: 20000 },
  { name: "Samsung", price: 15000 },
  { name: "Oppo", price: 9000 },
  { name: "Xiaomi", price: 10000 },
  { name: "Nokia", price: 8000 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  list.forEach((p, index) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card p-3 mb-3">
          <h5>${p.name}</h5>
          <p>${p.price} VND</p>
          <button class="btn btn-success" onclick="addToCart(${index})">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    `;
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("🛒 Đã thêm vào giỏ hàng!");
}

/* SEARCH + HISTORY */
const searchInput = document.getElementById("search");

if (searchInput) {
  renderProducts(products);

  searchInput.addEventListener("input", function () {
    let value = this.value.toLowerCase().trim();

    value = value.replace(/[^a-z0-9\s]/gi, "");

    const result = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    localStorage.setItem("searchHistory", value);

    renderProducts(result);

    if (result.length === 0) {
      document.getElementById("error").innerText = "Không tìm thấy";
    } else {
      document.getElementById("error").innerText = "";
    }
  });

  // load lại search cũ
  let old = localStorage.getItem("searchHistory");
  if (old) {
    searchInput.value = old;
  }
}

/* ===================== FORM ===================== */
const form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value.trim();
    let agree = document.getElementById("agree").checked;

    let msg = document.getElementById("msg");

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!name || !email || !pass) {
      msg.innerText = "Vui lòng nhập đầy đủ";
      return;
    }

    if (!emailRegex.test(email)) {
      msg.innerText = "Email sai";
      return;
    }

    if (!passRegex.test(pass)) {
      msg.innerText = "Mật khẩu yếu";
      return;
    }

    if (!agree) {
      msg.innerText = "Chưa đồng ý điều khoản";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email }));

    msg.innerText = "Đăng ký thành công!";
    msg.style.color = "green";

    showToast("🎉 Đăng ký thành công!");

    form.reset();
  });
}

/* ===================== COUNTDOWN ===================== */
const timeEl = document.getElementById("time");

if (timeEl) {
  let time = 600;

  let interval = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;

    timeEl.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;

    if (time <= 60) timeEl.classList.add("warning");

    if (time <= 0) {
      clearInterval(interval);
      showToast("⏰ Hết giờ!");
    }

    time--;
  }, 1000);
}