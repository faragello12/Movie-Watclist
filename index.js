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
                        <div class="coloumn4">
                            <button class="add-btn">
                                <img src="images/add.svg" alt="add to watchlist icon">
                                <span>Add to Watchlist</span>
                            </button>
                        </div>    
                    </div>    
                </div>
                `
            })
        }
    })
})

document.addEventListener('click', function(event) {
    if (event.target.closest('.add-btn')) {
        const btn = event.target.closest('.add-btn')
        const movieInfo = btn.parentElement.parentElement
        const movieTitle = movieInfo.querySelector('#movie-title').textContent
        const movieRating = movieInfo.querySelector('#movie-rating').textContent
        const movieRuntime = movieInfo.querySelector('#movie-runtime').textContent
        const movieType = movieInfo.querySelector('#movie-type').textContent
        const movieDescription = movieInfo.querySelector('#movie-description').textContent
        const moviePoster = movieInfo.parentElement.querySelector('img').src
        const movie = {
            title: movieTitle,
            rating: movieRating,
            runtime: movieRuntime,
            type: movieType,
            description: movieDescription,
            poster: moviePoster
        }
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
        // Check if movie already exists
        const exists = watchlist.some(item => item.title === movie.title)
        if (!exists) {
            watchlist.push(movie)
            localStorage.setItem('watchlist', JSON.stringify(watchlist))
            // Change button style
            btn.classList.add('added')
            btn.querySelector('span').textContent = 'Added'
            btn.disabled = true
        } else {
            // Already in watchlist, just update button
            btn.classList.add('added')
            btn.querySelector('span').textContent = 'Added'
            btn.disabled = true
        }
    }
})



