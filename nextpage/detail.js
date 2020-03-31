const xhr = new XMLHttpRequest();
let vOneLS = localStorage.getItem("vOneLocalStorage");
let movie_id = vOneLS;
let details = "";

function start(){
  const newPoint= `https://api.themoviedb.org/3/movie/${movie_id}?api_key=036078b1ff2ac8506deb98a9ba28accf`;
  xhr.open("GET",newPoint);
  xhr.send();
  xhr.addEventListener("readystatechange",populateDetail);
}

function populateDetail(){
  if(xhr.readyState==4){
    const jsonResponse = JSON.parse(xhr.responseText);
    populateHeader(jsonResponse);
    fetchCast();
  }
}

function fetchCast(){
  url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=036078b1ff2ac8506deb98a9ba28accf`;
  fetch(url)
  .then(errorHandler)
  .then(parseJSON)
  .then(populateCast)
  .catch(printError);
}

function errorHandler(req){
  if(!req.ok){
    throw Error(err);
  }
  return req;
}

function parseJSON(res){
  return res.json();
}

function printError(err){
  alert(err);
}

function populateHeader(details){
  document.querySelector("#header").style.backgroundImage = `url("https://image.tmdb.org/t/p/w1400_and_h450_face${details.backdrop_path}")`;
  document.querySelector(".card-img").src = `https://image.tmdb.org/t/p/w300_and_h450_face${details.poster_path}`;
  document.querySelector("#title").innerHTML = details.original_title;
  document.querySelector("#description").innerHTML = details.overview;
  document.querySelector("#release_date").innerHTML = `Release Date: ${details.release_date}`;
}

function populateCast(details){
  for(i = 0; i < 6; i++){
    createCastCard(details.cast[i]);
  }
}

function createCastCard(cast){
  //Create Card Elements
  let card = document.createElement("div");
  let cardBody = document.createElement("div");
  let image = document.createElement("img");
  let castName = document.createElement("p");
  let character = document.createElement("p");

  //Element class
  card.className = "card cast-card";
  cardBody.className = "card-body"
  image.className = "card-img-top";
  castName.className = "card-text";
  character.className = "card-text";

  //Element ids
  card.id = cast.cast_id;

  //Element values
  image.src = "https://image.tmdb.org/t/p/w138_and_h175_face" + cast.profile_path;
  castName.innerHTML = "<strong>" + cast.name + "</strong>"
  character.innerHTML = cast.character;

  //Append node childs to node
  document.querySelector("#cast-row").appendChild(card);
  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(castName);
  cardBody.appendChild(character);
}

start();