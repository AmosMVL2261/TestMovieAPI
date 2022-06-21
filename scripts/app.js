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
    imagePath += configData.data.images.poster_sizes[2]; //[2]w185 ó [3]342
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
    console.log(populares.data.results);
    //Imprimir la información por pantalla
    let moviesLength = populares.data.results.length;
    for (let i = 0; i < moviesLength; i++) {
      let element = populares.data.results[i];
      //Obtenemos el titulo de la pelicula
      document.write("<h3>"+element.title.toString()+"</h3>");
      //Obtenemos la imagen de la pelicula
      let completePath = startPath+populares.data.results[i].poster_path; 
      let imapePath = '<img src="'+completePath+'" alt="Movie Poster">';
      document.write(imapePath);
      //Descripcion
      document.write("<p>"+element.overview.toString()+"</p>");
      //Fecha de estreno
      document.write("<p>Fecha de estreno: "+element.release_date.toString()+"</p>");
      //Generos
      document.write("<p>Generos:</p>");
      printMovieGenre(populares,i);
    }
    
  }catch(error){
    console.log(error);
  }

}

//Print Movies Genres
function printMovieGenre(peliculas, i){
  //Los generos se obtienen como un Array
  let generosText = "";
  let genreArrayLength = peliculas.data.results[i].genre_ids.length;
  for (let j = 0; j < genreArrayLength; j++) {
    let genero = genreLinkedList.search(peliculas.data.results[i].genre_ids[j]);
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

peliculasPopulares();