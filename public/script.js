// Hamburger izvēlne
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Modālais logs
const modal = document.getElementById("modal");
const openBtns = document.querySelectorAll(".open-modal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modal-title");
const modalInfo = document.getElementById("modal-info");

openBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.getAttribute("data-title");
    modalInfo.textContent = btn.getAttribute("data-info");
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
});


// Formas validācija
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formMsg.textContent = "Lūdzu aizpildi visus laukus!";
    formMsg.className = "error";
    return;
  }

  if (!emailRegex.test(email)) {
    formMsg.textContent = "Lūdzu ievadi derīgu e-pastu!";
    formMsg.className = "error";
    return;
  }

  formMsg.textContent = "Forma veiksmīgi iesniegta! ✅";
  formMsg.className = "success";

  form.reset();
});

// Meklēšanas/filtra funkcija
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
});



