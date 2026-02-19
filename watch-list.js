// Get the watchlist from localStorage and render it in the watchlist-container
document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.getElementById('watchlist-container');

    function renderWatchlist() {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (watchlist.length === 0) {
            document.getElementById('movie-container-watchlist').innerHTML = `
                    <h3>Your watchlist is looking a little empty...</h3>
                    <img src="images/add.svg" alt="exoloring" width="20" height="20">
                    <a href="index.html">Let's add some movies!</a>`;
        }
        let html = '';
        watchlist.forEach((movie, idx) => {
            html += `
            <div class="movies-container" id="movies-container">
                    <img src="${movie.poster}" alt="movie poster">
                    <div class="movie-info" id="movie-info">
                        <div class="coloumn1" id="coloumn1">
                            <h2 id="movie-title">${movie.title}</h2>
                            <img id="star-icon" src="images/star.svg" alt="star icon">
                            <h4 id="movie-rating">${movie.rating}</h4>
                        </div>
                        <div class="coloumn2" id="coloumn2">
                            <h4 id="movie-runtime">${movie.runtime}</h4>
                            <h4 id="movie-type">${movie.type}</h4>
                        </div>
                        <div class="coloumn3" id="coloumn3">
                            <p id="movie-description">${movie.description}</p>
                        </div>
                        <div class="remove-coloumn4" id="remove-coloumn4">
                            <img id="remove-btn" src="images/remove.svg" alt="remove from watchlist icon">
                            <h4 id="watchlist-text">Remove From Watchlist</h4>
                        </div>    
                    </div>    
        </div>
            `;
        });
        watchlistContainer.innerHTML = html;
    }

    renderWatchlist();

    // Event delegation for remove button
    watchlistContainer.addEventListener('click', function(e) {
        // Check if remove-coloumn4 or its child was clicked
        let removeDiv = e.target.closest('.remove-coloumn4');
        if (removeDiv) {
            // Find the movie title from the closest parent .movies-container
            const movieContainer = removeDiv.closest('.movies-container');
            if (movieContainer) {
                const titleElem = movieContainer.querySelector('#movie-title');
                if (titleElem) {
                    const title = titleElem.textContent;
                    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
                    watchlist = watchlist.filter(movie => movie.title !== title);
                    localStorage.setItem('watchlist', JSON.stringify(watchlist));
                    renderWatchlist();
                }
            }
        }
    });
});
