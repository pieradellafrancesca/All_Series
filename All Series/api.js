const API_KEY = "fd328e114a7184f554f1780d6df12c35";
const BASE_URL = "https://api.themoviedb.org/3/tv/";

const GET = async (resource, page = 1) => {
  const res = await fetch(
    `${BASE_URL}${resource}?api_key=${API_KEY}&page=${page}`
  );
  const data = await res.json();
  return data;
};

const GET2 = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data;
};

const GET3 = async (search) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`
  );
  const data = await res.json();
  return data;
};

export { GET, GET2, GET3 };
