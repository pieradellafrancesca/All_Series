const qS = (type) => document.querySelector(type);
const qSA = (type) => document.querySelectorAll(type);
const cE = (element) => document.createElement(element);

// CREAZIONE CARD HOMEPAGE
const cardGen = (data) => {
  const cardEl = cE("div");
  const imgEl = cE("img");

  cardEl.className = "card";
  cardEl.setAttribute("id", data.id);
  if (data.poster_path) {
    imgEl.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    );
  } else {
    imgEl.setAttribute("src", "https://via.placeholder.com/200x304");
  }
  imgEl.setAttribute("alt", data.name);

  cardEl.appendChild(imgEl);

  return cardEl;
};

// CREAZIONE CARD CON DETTAGLIO SERIE SELEZIONATA con PULSANTE 'torna indietro'
const infoCard = (data) => {
  const infoTvEl = cE("div");
  const heroEl = cE("div");
  const overlayEl = cE("div");
  const imgEl = cE("img");
  const wrapperTextEl = cE("div");
  const nameEl = cE("h2");
  const overviewEl = cE("p");
  const genresEl = cE("div");

  const btnEl = cE("button");

  infoTvEl.className = "tv-info";
  heroEl.className = "hero";
  overlayEl.className = "overlay";
  if (data.backdrop_path) {
    imgEl.src = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
  } else {
    imgEl.src = "https://via.placeholder.com/1000x500";
  }
  imgEl.alt = data.name;
  wrapperTextEl.className = "wrapper-text";
  nameEl.textContent = data.name.toUpperCase();
  overviewEl.textContent = data.overview;
  genresEl.className = "genres";
  data.genres.forEach((element) => {
    const tagEl = cE("p");
    tagEl.textContent = element.name;
    genresEl.append(tagEl);
  });

  btnEl.className = "btn-back";
  btnEl.textContent = "Home";
  btnEl.addEventListener("click", () => {
    history.go(-1);
  });

  wrapperTextEl.append(btnEl, nameEl, genresEl, overviewEl);
  heroEl.append(imgEl, overlayEl, wrapperTextEl);
  infoTvEl.appendChild(heroEl);

  return infoTvEl;
};

// FUNZIONE RIMUOVI CARD
const cardDelete = () => {
  const tvEls = qSA(".card");
  tvEls.forEach((tv) => tv.remove());
};

// CREAZIONE OPTION PER FILTRO DI GENERE
const getOptionsGen = (data) => {
  const optionGenEl = cE("option");
  optionGenEl.className = "genre";
  optionGenEl.value = data.id;
  optionGenEl.textContent = data.name;
  return optionGenEl;
};

export { qS, qSA, cE, cardGen, infoCard, cardDelete, getOptionsGen };
