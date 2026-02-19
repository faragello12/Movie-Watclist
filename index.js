const searchBtn = document.getElementById('search-btn')
const searchResults = document.querySelector('.search-results')
const watchlistContainer = document.getElementById('watchlist-container')

searchBtn.addEventListener('click', function() {
    searchResults.innerHTML = ''
    const searchInput = document.getElementById('search-input').value
    console.log(searchInput)
    document.querySelector('.movie-container').classList.add('disable')
    fetch(`https://www.omdbapi.com/?apikey=60d56123&s=${searchInput}`)
        .then(response => response.json())
        .then(searchData => {
            console.log(searchData)
            if (searchData.Response === 'False') {
                document.getElementById('empty-results').style.display = 'block'
                return
            } else if (searchData.Response === 'True') {
                document.getElementById('empty-results').style.display = 'none'
            }
            for (let index = 0; index < searchData.Search.length; index++) {
                fetch(`https://www.omdbapi.com/?apikey=60d56123&i=${searchData.Search[index].imdbID}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    searchResults.innerHTML += `
                    <div class="movies-container" id="movies-container">
                    <img src="${data.Poster}" alt="movie poster">
                    <div class="movie-info" id="movie-info">
                        <div class="coloumn1" id="coloumn1">
                            <h2 id="movie-title">${data.Title}</h2>
                            <img id="star-icon" src="images/star.svg" alt="star icon">
                            <h4 id="movie-rating">${data.imdbRating}</h4>
                        </div>
                        <div class="coloumn2" id="coloumn2">
                            <h4 id="movie-runtime">${data.Runtime}</h4>
                            <h4 id="movie-type">${data.Genre}</h4>
                        </div>
                        <div class="coloumn3" id="coloumn3">
                            <p id="movie-description">${data.Plot}</p>
                        </div>
                        <div class="coloumn4" id="coloumn4">
                            <img id="add-btn" src="images/add.svg" alt="add to watchlist icon">
                            <h4 id="watchlist-text">Add to Watchlist</h4>
                        </div>    
                    </div>    
                </div>
                `
            })
        }
    })
})

addEventListener('click', function(event) {
    if (event.target.id === 'coloumn4' || event.target.id === 'add-btn' || event.target.id === 'watchlist-text') {
        const movieTitle = event.target.parentElement.parentElement.querySelector('#movie-title').textContent
        const movieRating = event.target.parentElement.parentElement.querySelector('#movie-rating').textContent
        const movieRuntime = event.target.parentElement.parentElement.querySelector('#movie-runtime').textContent
        const movieType = event.target.parentElement.parentElement.querySelector('#movie-type').textContent
        const movieDescription = event.target.parentElement.parentElement.querySelector('#movie-description').textContent
        const moviePoster = event.target.parentElement.parentElement.parentElement.querySelector('img').src
        const movie = {
            title: movieTitle,
            rating: movieRating,
            runtime: movieRuntime,
            type: movieType,
            description: movieDescription,
            poster: moviePoster
        }
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
        watchlist.push(movie)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        

        console.log(watchlist)
    }
}) 

