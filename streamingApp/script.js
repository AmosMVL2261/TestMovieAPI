let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
// --------------------------------------------------------------------------------------------------
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


var swiper = new Swiper(".popular-content", {
  slidesPerView:1,
  spaceBetween: 10,
  autoplay: {
    delay: 755500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:{
    280:{
      slidesPerView:1,
      spaceBetween:10,
    },
    320:{
      slidesPerView:2,
      spaceBetween:10,
    },
    540:{
      slidesPerView:2,
      spaceBetween:10,
    },
    758:{
      slidesPerView:3,
      spaceBetween:15,
    },
    900:{
      slidesPerView:4,
      spaceBetween:20,
    },
  }
});
//-------------------------------------------------------------------
/*var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

*/




//Linked list to store movies genres

class Node {
  constructor(id, data) {
    this.id = id;
    this.data = data;
    this.next = null;
  }
}

class LinkedList {

  constructor() {
    this.head = null;
    this.currentSize = 0;
  }

  add(id, data) {
    const node = new Node(id, data);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.currentSize++;
  }

  remove(id) {
    if (this.head === null) {
      return null;
    }

    let current = this.head;
    let prev = null;
    while (current.id !== id) {
      prev = current;
      current = current.next;
    }

    if (prev === null) {
      this.head = current.next;
    } else {
      prev.next = current.next;
    }
    this.currentSize--;
  }

  size() {
    return this.currentSize;
  }

  print() {
    if (this.head === null) {
      return null;
    }

    let current = this.head;
    while (current) {
      console.log(current.id);
      console.log(current.data);
      current = current.next;
    }
  }

  isEmpty() {
    return this.currentSize === 0;
  }

  clear() {
    this.head = null;
    this.currentSize = 0;
  }

  getFirst() {
    return this.head;
  }

  getLast(){
    if(this.head === null) {
      return null;
    }

    let current = this.head;
    while (current.next){
      current = current.next;
    }
    return current;
  }

  search (id){
    if (this.head === null){
      return null;
    }

    let current = this.head;

    while (current != null){
      if (current.id === id){
          // Data found
          return current;
      }else{
        current = current.next;
      }
    }
    // Data not found
    console.log("Not found");
    return false;
  }
}

//transform genres list to linked list
let genreLinkedList = new LinkedList();

function createLinkedList(genre){
  for (let i = 0; i < genre.length; i++) {
    genreLinkedList.add(genre[i].id, genre[i].name);
  }
}

//get genres
async function getGenre() {
  try{
    let generos = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea",
        language: "es-MX"
      }
    })
    createLinkedList(generos.data.genres);
    //genreLinkedList.print();
    //genreLinkedList.search(37);
    //genreLinkedList.search(-37);
  }catch(error){
    console.log(error);
  }
}

getGenre();

//Get Movies Images configuration (path)
async function getMoviesImagesConf() {
  try{
    //Petición de las peliculas populares
    let configData = await axios.get('https://api.themoviedb.org/3/configuration', {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea"
      }
    })
    let imagePath = "";
    imagePath += configData.data.images.secure_base_url;
    imagePath += configData.data.images.poster_sizes[4]; //[2]w185 ó [3]342 o [4]w500
    return imagePath;
  }catch(error){
    console.log(error);
  }

}

async function getMoviesImagesConf2() {
  try{
    //Petición de las peliculas populares
    let configData = await axios.get('https://api.themoviedb.org/3/configuration', {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea"
      }
    })
    let imagePath = "";
    imagePath += configData.data.images.secure_base_url;
    imagePath += configData.data.images.poster_sizes[5]; //[2]w185 ó [3]342 o [4]w500
    return imagePath;
  }catch(error){
    console.log(error);
  }

}


//Get Movies by popularity
async function peliculasPopulares() {
  try{
    //Petición de las peliculas populares
    let populares = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea",
        language: "es-MX"
      }
    })
    //Peticion de la configuracion de las imagenes
    let startPath = await getMoviesImagesConf();
    let startPathBig = await getMoviesImagesConf2();
    console.log(populares.data.results);
    //Imprimir la información por pantalla
    let moviesLength = populares.data.results.length;
    /*for (let i = 0; i < moviesLength; i++) {
      let element = populares.data.results[i];
      //Obtenemos el titulo de la pelicula
      document.write("<h3>"+element.title.toString()+"</h3>");
      //Obtenemos la imagen de la pelicula
      let completePath = startPath+element.poster_path; 
      let imapePath = '<img src="'+completePath+'" alt="Movie Poster">';
      document.write(imapePath);
      //Descripcion
      document.write("<p>"+element.overview.toString()+"</p>");
      //Fecha de estreno
      document.write("<p>Fecha de estreno: "+element.release_date.toString()+"</p>");
      //Generos
      document.write("<p>Generos:</p>");
      printMovieGenre(element);
      //Cast
      document.write("<p>Cast:</p>");
      await movieCast(element);
    }*/
    for (let i = 0; i < 8; i++) {
      let element = populares.data.results[i];
      let idNuevo = "img-pop-" + (i+1).toString();
      let completePath = startPath+element.poster_path;
      let peliculaSeleccionada= document.getElementById(idNuevo);
      peliculaSeleccionada.setAttribute("src", completePath);
    }

    for (let i = 0; i < 3; i++) {
      let element = populares.data.results[i];
      let idNuevo = "img-big-" + (i+1).toString();
      let completePath = startPathBig+element.poster_path;
      let peliculaSeleccionada= document.getElementById(idNuevo);
      peliculaSeleccionada.setAttribute("src", completePath);
    }
    for (let i = 0; i < 8; i++) {
      var arrayMoviesPop=[];
      let element = populares.data.results[i];
      arrayMoviesPop.push(element.id.toString())
      let idNuevo = "pop-name-" + (i+1).toString();
      let peliculaSeleccionada= document.getElementById(idNuevo);
      peliculaSeleccionada.innerText= element.title.toString();
    }
    for (let i = 0; i < 8; i++) {
      let element = populares.data.results[i];
      let idNuevo = "pop-gen-" + (i+1).toString();
      let peliculaSeleccionada= document.getElementById(idNuevo);
      peliculaSeleccionada.innerText= printMovieGenre(element) ;
    }


  }catch(error){
    console.log(error);
  }

}

//Print Movies Genres
function printMovieGenre(element){
  //Los generos se obtienen como un Array
  let generosText = "";
  let genreArrayLength = element.genre_ids.length;
  for (let j = 0; j < genreArrayLength; j++) {
    let genero = genreLinkedList.search(element.genre_ids[j]);
    //Si es el ultimo genero del array no se agrega la ","
    if(j==genreArrayLength-1){
      generosText+=genero.data.toString();  
      break;
    }else{
      generosText+=genero.data.toString()+", ";
    }
  }
  //generosText+="</p>";
  return generosText;
}

//Print Movies Genres by searching function
function printMovieGenreBySearching(element){
  //Los generos se obtienen como un Array
  let generosText = "";
  let genreArrayLength = element.genres.length;
  for (let j = 0; j < genreArrayLength; j++) {
    let genero = genreLinkedList.search(element.genres[j].id);
    //Si es el ultimo genero del array no se agrega la ","
    if(j==genreArrayLength-1){
      generosText+=genero.data.toString();  
      break;
    }else{
      generosText+=genero.data.toString()+", ";
    }
  }
  generosText+="</p>";
  document.write(generosText);
}


//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=15dd6e9ec0fffe546ae26db0b789e2ea&language=es-MX
//Get Movies cast
async function movieCast(element) {
  try{
    //Petición de las peliculas populares
    let direccion = "https://api.themoviedb.org/3/movie/"+element.id.toString()+"/credits";
    let cast = await axios.get(direccion, {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea",
        language: "es-MX"
      }
    })
    moviePeople = cast.data.cast;
    let castList;
    for (let i = 0; i < 3; i++) {
      let actor = moviePeople[i];
      let character = actor.character;
      let realPerson = actor.name;
      castList="Character: "+character.toString()+", Actor: "+realPerson;
      document.write("<p>"+castList+"</p>");
    }
    
  }catch(error){
    console.log(error);
  }
}

async function moviesByGenre(genre_id) {

  try{
    //Petición de las peliculas populares
    let direccion = "https://api.themoviedb.org/3/discover/movie";
    let peliculasGenero = await axios.get(direccion, {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea",
        language: "es-MX",
        with_genres:genre_id,
        page:1
      }
    })
    movies = peliculasGenero.data.results;
    console.log(movies);
    //Peticion de la configuracion de las imagenes
    let startPath = await getMoviesImagesConf();
    //Imprimir la información por pantalla
    let moviesLength = movies.length;
    /*for (let i = 0; i < moviesLength; i++) {
      let element = movies[i];
      //Obtenemos el titulo de la pelicula
      document.write("<h3>"+element.title.toString()+"</h3>");
      //Obtenemos la imagen de la pelicula
      let completePath = startPath+element.poster_path; 
      let imagePath = '<img src="'+completePath+'" alt="Movie Poster">';
      document.write(imagePath);
      //Descripcion
      document.write("<p>"+element.overview.toString()+"</p>");
      //Fecha de estreno
      document.write("<p>Fecha de estreno: "+element.release_date.toString()+"</p>");
      //Generos
      document.write("<p>Generos:</p>");
      printMovieGenre(element);
      //Cast
      document.write("<p>Cast:</p>");
      await movieCast(element);
    }*/
    if(genre_id===35){
      for (let i = 0; i < 8; i++) {
        let element = peliculasGenero.data.results[i];
        let idNuevo = "img-comedy-" + (i+1).toString();
        let completePath = startPath+element.poster_path;
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.setAttribute("src", completePath);
      }
      for (let i = 0; i < 8; i++) {
        var arrayMoviesPop=[];
        let element = peliculasGenero.data.results[i];
        arrayMoviesPop.push(element.id.toString())
        let idNuevo = "comedy-n-" + (i+1).toString();
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.innerText= element.title.toString();
      }
      for (let i = 0; i < 8; i++) {
        let element = peliculasGenero.data.results[i];
        let idNuevo = "comedy-g-" + (i+1).toString();
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.innerText= printMovieGenre(element) ;
      }

    }
    if(genre_id===28){
      for (let i = 0; i < 8; i++) {
        let element = peliculasGenero.data.results[i];
        let idNuevo = "img-action-" + (i+1).toString();
        let completePath = startPath+element.poster_path;
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.setAttribute("src", completePath);
      }

            for (let i = 0; i < 8; i++) {
        var arrayMoviesPop=[];
        let element = peliculasGenero.data.results[i];
        arrayMoviesPop.push(element.id.toString())
        let idNuevo = "comedy-n-" + (i+1).toString();
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.innerText= element.title.toString();
      }
      for (let i = 0; i < 8; i++) {
        let element = peliculasGenero.data.results[i];
        let idNuevo = "comedy-g-" + (i+1).toString();
        let peliculaSeleccionada= document.getElementById(idNuevo);
        peliculaSeleccionada.innerText= printMovieGenre(element) ;
      }
    }


  }catch(error){
    console.log(error);
  }
}


async function searchMovieByID(imdb_id) {
  try{
    //Petición de las peliculas populares
    let direccion = "https://api.themoviedb.org/3/movie/"+imdb_id.toString();
    let pelicula_busqueda = await axios.get(direccion, {
      params: {
        api_key: "15dd6e9ec0fffe546ae26db0b789e2ea",
        language: "es-MX"
      }
    })
    pelicula = pelicula_busqueda.data;
    /*console.log(pelicula_busqueda);
    //Obtenemos el titulo de la pelicula
    document.write("<h3>"+pelicula.title.toString()+"</h3>");
    //Peticion de la configuracion de las imagenes
    let startPath = await getMoviesImagesConf();
    //Obtenemos la imagen de la pelicula
    let completePath = startPath+pelicula.poster_path; 
    let imagePath = '<img src="'+completePath+'" alt="Movie Poster">';
    document.write(imagePath);
    //Descripcion
    document.write("<p>"+pelicula.overview.toString()+"</p>");
    //Fecha de estreno
    document.write("<p>Fecha de estreno: "+pelicula.release_date.toString()+"</p>");
    //Generos
    document.write("<p>Generos:</p>");
    printMovieGenreBySearching(pelicula);
    //Cast
    document.write("<p>Cast:</p>");
    await movieCast(pelicula);*/

      let peliculaSeleccionada= document.getElementById("movie-shown-Play");
      peliculaSeleccionada.innerText= pelicula.title.toString();


  }catch(error){
    console.log(error);
  }
}


function clickInfo(){
  var el = document.getElementById("bt-pop-1");
  el.addEventListener("click", ()=>searchMovieByID(508947));
}





//Ejecuta las funciones necesarias en el orden adecuado
function master(){
  peliculasPopulares();
  //878 = Ciencia ficción
  moviesByGenre(35);
  moviesByGenre(28);

  //searchMovieByID(508947);
}
master();




var moviesObj= [
   { "name": "La gran estafa", "year": 2015, "popl":9892},
    {"name": "Planes", "year": 2005, "popl":9592},
    {"name": "Ruin", "year": 1998, "popl":9897,}
]


moviesObj.sort((mov1, mov2) => Number(mov1.popl)-Number(mov2.popl));

moviesObj.forEach(element => {
    console.log(`${element.name} ${element.year} ${element.popl}`);
});
console.log(moviesObj.sort((mov1, mov2) => mov2.pop-mov1.pop));