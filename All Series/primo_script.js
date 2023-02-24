import { GET } from "./api.js";
import { qS, qSA, cE, cardGen, infoGen } from "./utils.js";

GET("549").then((x) => console.log(x));

const popularEl = qS(".popular");
const topRatedEl = qS(".top-rated");
const onTheAirEl = qS(".on-the-air");

const infoEl = qS(".info-card");

// GET("popular").then((data) =>
//   data.results.map((tv) => popularEl.appendChild(cardGen(tv)))
// );

// GET("top_rated").then((data) =>
//   data.results.map((tv) => topRatedEl.appendChild(cardGen(tv)))
// );

// GET("on_the_air").then((data) =>
//   data.results.map((tv) => onTheAirEl.appendChild(cardGen(tv)))
// );

Promise.all([GET("popular"), GET("top_rated"), GET("on_the_air")])
  .then((data) => {
    data[0].results.map((tv) => popularEl.appendChild(cardGen(tv)));
    data[1].results.map((tv) => topRatedEl.appendChild(cardGen(tv)));
    data[2].results.map((tv) => onTheAirEl.appendChild(cardGen(tv)));
  })
  .then(() => {
    const tvEls = qSA(".card");
    tvEls.forEach((tv) =>
      tv.addEventListener("click", () => {
        GET(tv.id).then((selectedTv) => {
          //   infoEl.appendChild(infoGen(selectedTv));
          localStorage.setItem("tv.id", tv.id);
          const myLocalData = localStorage.getItem("tv.id");
          console.log(myLocalData);
        });
      })
    );
  });

// const obj = {
//   id: 549,
//   name: "Law & Order",
//   number_of_seasons: 22,
//   overview:
//     "In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
//   poster_path: "/77OPlbsvX3pzoFbyfpcE3GXMCod.jpg",
//   vote_average: 7.575,
// };

// infoEl.appendChild(infoGen(obj));
