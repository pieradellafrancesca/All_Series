import { GET, GET2, GET3 } from "./api.js";
import { qS, qSA, cardGen, cardDelete, getOptionsGen } from "./utils.js";

const popularEl = qS(".popular");
let page = 1;
let isPageLoad = true;
const voteAvgEl = qS("#avg");
const genresEl = qS("#gen");
const inputEl = qS(".input-search");
let inputValue = "";

// AL CLICK SULLA CARD RECUPERO ID, LO SALVO IN LOCAL STORAGE E APRO NUOVA PAGINA
const getInfo = () => {
  const tvEls = qSA(".card");
  tvEls.forEach((tv) =>
    tv.addEventListener("click", () => {
      GET(tv.id).then(() => {
        localStorage.setItem("tv.id", tv.id);
        window.location = "tv-serie.html";
      });
    })
  );
};

const getLastUserEl = () => qS(".popular > .card:last-child");

const infScrollCallback = (entries, observer) => {
  // console.log(entries);
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  page++;
  loadCards(page);
  observer.unobserve(entry.target);
};

const infScrollObserver = new IntersectionObserver(infScrollCallback, {});

const observeLastUser = () => {
  infScrollObserver.observe(getLastUserEl());
};

// INFINITE SCROLLING
const loadCards = (page) => {
  GET("popular", page)
    .then((data) => {
      data.results.map((tv) => popularEl.appendChild(cardGen(tv)));
      if (isPageLoad) {
        observeLastUser();
        isPageLoad = false;
      }
    })
    .then(() => {
      getInfo();
      observeLastUser();
    });
};

loadCards(page);

// FILTRO PER VOTO MEDIO - Attenzione: filtra solo le card di page 1...
voteAvgEl.addEventListener("change", () => {
  cardDelete();
  GET("popular")
    .then((data) => {
      data.results.map((tv) => {
        if (voteAvgEl.value === "All") {
          popularEl.appendChild(cardGen(tv));
        } else if (voteAvgEl.value === "Great" && tv.vote_average >= 8.5) {
          console.log(tv.vote_average);
          popularEl.appendChild(cardGen(tv));
        } else if (
          voteAvgEl.value === "Good" &&
          tv.vote_average < 8.5 &&
          tv.vote_average >= 7
        ) {
          console.log(tv.vote_average);
          popularEl.appendChild(cardGen(tv));
        } else if (
          voteAvgEl.value === "Sufficient" &&
          tv.vote_average < 7 &&
          tv.vote_average > 5.9
        ) {
          console.log(tv.vote_average);
          popularEl.appendChild(cardGen(tv));
        } else if (voteAvgEl.value === "Poor" && tv.vote_average <= 5.9) {
          console.log(tv.vote_average);
          popularEl.appendChild(cardGen(tv));
        }
      });
    })
    .then(() => {
      getInfo();
    });
});

//RECUPERO I GENERI E APPENDO LE OPTION
GET2().then((data) => {
  data.genres.map((genre) => {
    genresEl.appendChild(getOptionsGen(genre));
  });
});

//FILTRO PER GENERE - Attenzione: filtra solo le card di page 1...
genresEl.addEventListener("change", () => {
  console.log(genresEl.value);
  cardDelete();
  GET("popular")
    .then((data) => {
      data.results.map((tv) => {
        if (genresEl.value === "All") popularEl.appendChild(cardGen(tv));
        const optionsGenreEl = qSA(".genre");
        optionsGenreEl.forEach((gen) => {
          const gv = Number(gen.value);
          if (tv.genre_ids.includes(gv) && genresEl.value === gen.value) {
            popularEl.appendChild(cardGen(tv));
          }
        });
      });
    })
    .then(() => {
      getInfo();
    });
});

// INPUT PER RICERCA (non richiesto)
inputEl.addEventListener("input", (e) => {
  e.preventDefault();
  cardDelete();
  inputValue = e.target.value;
  GET3(inputValue)
    .then((data) => {
      data.results.map((tv) => {
        if (tv.name.toLowerCase().includes(inputValue))
          popularEl.appendChild(cardGen(tv));
      });
    })
    .then(() => {
      getInfo();
    });
});
