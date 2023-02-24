import { GET } from "./api.js";
import { qS, infoCard, cE } from "./utils.js";

const infoEl = qS(".info-card");
let tvId = localStorage.getItem("tv.id");

// APPENDO CARD CON I DETTAGLI
function getInfo() {
  GET(tvId).then((selectedTv) => {
    infoEl.appendChild(infoCard(selectedTv));
    console.log(selectedTv);
  });
}

// INSERISCO VIDEO TRAILER
function getTrailer() {
  GET(tvId + "/videos").then((selectedTv) => {
    const trailer = selectedTv.results.find((vid) => vid.type === "Trailer");
    console.log(selectedTv, trailer, selectedTv.results);
    const videoWrapperEl = cE("div");
    const videoEl = cE("iframe");

    videoWrapperEl.className = "video-wrapper";
    if (trailer) {
      videoEl.setAttribute(
        "src",
        `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
      );
      videoEl.setAttribute("allow", "autoplay");
      videoEl.setAttribute("allowFullScreen", "true");
    } else {
      videoEl.setAttribute(
        "src",
        `https://www.youtube.com/embed/Y-x0efG1seA?autoplay=1&mute=1`
      );
      videoEl.setAttribute("allow", "autoplay");
      videoEl.setAttribute("allowFullScreen", "true");
    }
    videoWrapperEl.appendChild(videoEl);
    infoEl.appendChild(videoWrapperEl);

    return videoEl;
  });
}

getInfo();
getTrailer();
