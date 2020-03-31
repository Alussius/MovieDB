const xhr = new XMLHttpRequest();
let movie_id;

function start(){
  const endPoint= `https://api.themoviedb.org/3/movie/now_playing?api_key=036078b1ff2ac8506deb98a9ba28accf&language=en-US&page=1`;
  xhr.open("GET",endPoint);
  xhr.send();
  xhr.addEventListener("readystatechange", populateMovie);
}

function nextPage(){
  const newPoint= `https://api.themoviedb.org/3/movie/${movie_id}?api_key=036078b1ff2ac8506deb98a9ba28accf`;
  xhr.open("GET",newPoint);
  xhr.send();
  xhr.addEventListener("readystatechange", populateDetails);
}

function populateDetails(){
  if(xhr.readyState==4){
    const detailResponse = JSON.parse(xhr.responseText);
  alert("next page");
    document.querySelector("#backdrop").setAttribute("src",`https://image.tmdb.org/t/p/w1400_and_h450_face${jsonResponse.backdrop_path}`);
  }
}

function populateMovie(){
  if(xhr.readyState==4){
    const jsonResponse = JSON.parse(xhr.responseText);
    for(i = 0; i < jsonResponse.results.length; i++){
      createCard(i, jsonResponse);
    }
  }
}

function createCard(i, jsonResponse){
  let a = document.createElement("a");
  let card = document.createElement("div");
  let info = document.createElement("div");
  let row = document.createElement("div");
  let body = document.createElement("div");
  let imageDiv = document.createElement("div");
  let image = document.createElement("img");
  let title = document.createElement("h4");
  let overview = document.createElement("p");
  let date = document.createElement("h6");
  let ratingContainer = document.createElement("div");
  let ratingHeader = document.createElement("p");
  let rating = document.createElement("p");

  let releaseDate = new Date(`${jsonResponse.results[i].release_date}`);

  a.id = jsonResponse.results[i].id;
  a.href = "html/details.html";
  info.className = "card-body";
  row.className = "row";
  //row.classList.add("no-gutters");
  imageDiv.className = "col-4";
  body.className = "col-8";
  
  card.className = "card";
  card.classList.add("mb-4");
  card.classList.add("myCard");

  date.className = "card-date";
  date.innerHTML = "Release: " + releaseDate.toDateString();

  title.className = "card-title";
  overview.className = "card-text";

  image.setAttribute("src",`https://image.tmdb.org/t/p/w185_and_h278_bestv2${jsonResponse.results[i].poster_path}`);
  if(jsonResponse.results[i].title.length < 17){
    title.innerHTML = "<div></div>" + jsonResponse.results[i].title;
  }
  else
    title.innerHTML = jsonResponse.results[i].title.substring(0, 17) + "...";
  if(jsonResponse.results[i].overview.length < 100){
    overview.innerHTML = jsonResponse.results[i].overview;
  }
  else
    overview.innerHTML = jsonResponse.results[i].overview.substring(0, 100) + "...";
  
  card.appendChild(row);
  row.appendChild(imageDiv);
  row.appendChild(body);
  imageDiv.appendChild(image);
  info.appendChild(title);
  info.appendChild(date);
  info.appendChild(overview);
  body.appendChild(info);
  a.appendChild(card);
  body.style.width = "480px";
  document.querySelector(".grid-container").appendChild(a);
  a.onclick = getId;
  a.href = "nextpage/details.html";
}

function getId(){
  movie_id=this.id;
  localStorage.setItem("vOneLocalStorage", `${movie_id}`)
}

start();