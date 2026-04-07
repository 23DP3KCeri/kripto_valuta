const newsBtn = document.getElementById("searchNews");
const newsInput = document.getElementById("newsInput");
const newsResults = document.getElementById("newsResults");
const newsError = document.getElementById("newsError");
const newsHistoryList = document.getElementById("newsHistoryList");

const API_KEY = "93a758d0426e44a4a88b4c91f1d73ab9"; // <<< ieliec savu NewsAPI key

let newsHistory = JSON.parse(localStorage.getItem("newsHistory")) || [];
updateNewsHistory();

newsBtn.addEventListener("click", () => {
  const query = newsInput.value.trim();
  if (!query) {
    showNewsError("Lūdzu ievadi meklējamo tēmu!");
    return;
  }
  fetchNews(query);
});

function fetchNews(query) {
  newsError.textContent = "";
  newsResults.innerHTML = "Ielādē ziņas...";

  fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=6&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        showNewsError("Netika atrastas ziņas pēc šīs tēmas!");
        return;
      }

      showNews(data.articles);
      saveNewsHistory(query);
    })
    .catch(() => showNewsError("Neizdevās sazināties ar API!"));
}

function showNews(articles) {
  newsResults.innerHTML = "";

  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("card", "news-card");

    card.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300'}">
      <h2>${article.title}</h2>
      <p>${article.description || "Nav apraksta."}</p>
      <a href="${article.url}" target="_blank">
        <button>Lasīt vairāk</button>
      </a>
    `;

    newsResults.appendChild(card);
  });
}

function showNewsError(msg) {
  newsError.textContent = msg;
  newsResults.innerHTML = "";
}

function saveNewsHistory(query) {
  newsHistory.unshift(query);
  newsHistory = newsHistory.slice(0, 5);
  localStorage.setItem("newsHistory", JSON.stringify(newsHistory));
  updateNewsHistory();
}

function updateNewsHistory() {
  newsHistoryList.innerHTML = "";
  newsHistory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => fetchNews(item);
    newsHistoryList.appendChild(li);
  });
}
