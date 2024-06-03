const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".inputBox");

//function to fetch movie details using api
const getMovieInfo = async (movie) => {
   try{
   const myApiKey = "a454662";
   const url = `https://www.omdbapi.com/?apikey=a454662&t=${movie}`;


   const response = await fetch(url);

if(!response.ok){
   throw new Error("unable to fetch movie data")
}

   const data = await response.json();

   showMovieData(data);
}
catch (error){
   showErrorMessage("No Movie Found!!!");
}
}

//function to Show movie data on screen
const showMovieData = (data) => {
   movieContainer.innerHTML = "";
   movieContainer.classList.remove("noBackground");
   const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

   const movieElement = document.createElement('div');
   movieElement.classList.add("movie-info");
   movieElement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>`;


    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add("movie-genre");

    Genre.split(",").forEach(element => {
      const p =document.createElement("p");
      p.innerText =element;
      movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strog>Released Date: </strong> ${Released}</p>
                                <p><strog>Duration: </strong> ${Runtime}</p>
                              <p><strog>Cast: </strong> ${Actors}</p>
                              <p><strog>Plot: </strong> ${Plot}</p>`;


        const moviePosterElement = document.createElement("div");
        moviePosterElement.classList.add("movie-poster");
        moviePosterElement.innerHTML = `<img src = "${Poster}"/>`;               

movieContainer.appendChild(moviePosterElement)
      movieContainer.appendChild(movieElement);                    
}


//function to display error message
const showErrorMessage = (message) => {
   movieContainer.innerHTML = `<h2>${message}</h2>`
   movieContainer.classList.add("noBackground");
}


//function to handle form submission
const handleFormSubmission =(e)=>{
   e.preventDefault();
   const movieName = inputBox.value.trim();
   if (movieName !== "") {
      showErrorMessage("Fetching Movie Information....")
      getMovieInfo(movieName);
   }
   else{
     showErrorMessage("Enter movie name to get movie information.....");
   }
}


//adding event listener to search form
searchForm.addEventListener("submit", handleFormSubmission) 