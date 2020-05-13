var favCount = 0;
var errorCount = 0;
var queries = [];

/* global d3 */

document.querySelector('#player').addEventListener('click', function() {
    document.querySelector('table').remove();
    document.querySelector('.table-box').appendChild(document.createElement('table'));
    fetchPlayerData('Player');
});

document.querySelector('#team').addEventListener('click', function() {
    document.querySelector('table').remove();
    document.querySelector('.table-box').appendChild(document.createElement('table'));
    fetchPlayerData('Team');
});

function fetchPlayerData(selected) {
    let path = 'data/' + selected + '-Stats-2020.csv';
    d3.csv(path).then(function(data) {
        let table = document.querySelector('table');
        let stats = Object.keys(data[0]);
        let string = stats[0];
        let split = string.split(',');
        genTable(table, data);
        genTableHead(table, split);
        return data;
    });
}

// code modified from https://www.valentinog.com/blog/html-table/
function genTableHead (table, stats) {
    let theadElem = table.createTHead();
    let rowElem = theadElem.insertRow();
    for (let elem of stats) {
        let thead = document.createElement('th');
        let textElem = document.createTextNode(elem);
        thead.appendChild(textElem);
        rowElem.appendChild(thead);
    }
}

// code modified from https://www.valentinog.com/blog/html-table/
function genTable (table, stats) {
    for (let elem of stats) {
        let rowElem = table.insertRow();
        for (let key in elem) {
            let split = elem[key].split(',');
            for (let i = 0; i < split.length; i++) {
                let cellElem = rowElem.insertCell();
                let textElem = document.createTextNode(split[i]);
                cellElem.appendChild(textElem);
            }
        }
    }
}

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