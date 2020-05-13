var favCount = 0;
var errorCount = 0;
var queries = [];

function addFavorite(query) {
    if (favCount >= 5) {
        if (errorCount < 1) {
            let col3 = document.querySelector('.column3');
            let pElem = document.createElement('p');
            pElem.classList.add('error')
            pElem.innerHTML = "Sorry, you have too many favorites!";
            col3.appendChild(pElem);
            errorCount++;
        }
    } else {
        if (!queries.includes(query)) {
            let pElem = document.createElement('p');
            pElem.innerHTML = query;
            pElem.classList.add('fav');
            let favElem = document.querySelector('.favorites');
            favElem.appendChild(pElem);
            favCount++;
            queries.push(query);
        }
    }
}

function removeFavorites() {
    let favorites = document.querySelectorAll('.fav');
    for (let i = 0; i < favorites.length; i++) {
        favorites[i].remove();
    }
    favCount = 0;
    errorCount = 0;
    queries = [];
}

document.querySelector('.fav-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addFavorite(document.querySelector('#search').value);
});

document.querySelector('#clear').addEventListener('click', function() {
    removeFavorites();
    let pElem = document.querySelector('.error');
    pElem.remove();
});