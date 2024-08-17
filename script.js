const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie_container');
const inputBox = document.getElementById('inputBox');

// Function to fetch Movie Details using OMDB API
const getMovieInfo = async (movie) => {
  const apiKey = "d7ed7920";
  const myUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;
  try {
    const response = await fetch(myUrl);
    const data = await response.json();

    if (data.Response === "True") {
      showMovieDetail(data);
    } else {
      showNoMovieFound(); // Show "No movie found" message
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
    showNoMovieFound(); // Handle errors by showing "No movie found"
  }
  
};

const showNoMovieFound = () => {
  movieContainer.innerHTML = '<p>No movie found. Please try a different search.</p>';
  movieContainer.style.boxShadow = 'none';
};




// Show data function on UI from API
const showMovieDetail = (data) => {
 
  movieContainer.innerHTML="";
  // Using Destructuring for getting selective data from data object
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
  
  // Clear existing content
  movieContainer.innerHTML = ''; // Clear any existing movie details
  // div creation for poster
  const posterElement = document.createElement('div');
  posterElement.classList.add("movie-poster");
  posterElement.innerHTML = ` <img src="${Poster}" alt="${Title}">`
  movieContainer.appendChild(posterElement);

  // div creation for info
  const genres = Genre.split(',').map(genre => `<span class="genre">${genre.trim()}</span>`).join(' ');
  const movieElement = document.createElement('div');
  movieElement.classList.add("movie-des");
  movieElement.innerHTML = `
    <h2>${Title}</h2>
    <p><strong>Rating:&#11088;</strong> ${imdbRating}</p>
    <p>${genres}</p>
    <p><strong>Released:</strong> ${Released}</p>
    <p><strong>Runtime:</strong> ${Runtime}</p>
    <p><strong>Actors:</strong> ${Actors}</p>
    <p><strong>Plot:</strong> ${Plot}</p>
   
  `;
  movieContainer.appendChild(movieElement);

};

// Adding Event Listener to form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page
  const movieName = inputBox.value.trim();
  if (movieName !== '') {
    getMovieInfo(movieName);
  }
});
