function fetchPlayerData() {
    d3.csv('data/Player-Stats-2020.csv').then(function(data) {
        let table = document.querySelector('table');
        let stats = Object.keys(data[0]);
        let string = stats[0];
        let split = string.split(',');
        genTable(table, data);
        genTableHead(table, split);
        return data;
    });
}

// code from https://www.valentinog.com/blog/html-table/
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

// code from https://www.valentinog.com/blog/html-table/
function genTable (table, stats) {
    for (let elem of stats) {
        let rowElem = table.insertRow();
        for (key in elem) {
            let split = elem[key].split(',');
            for (let i = 0; i < split.length; i++) {
                let cellElem = rowElem.insertCell();
                let textElem = document.createTextNode(split[i]);
                cellElem.appendChild(textElem);
            }
        }
    }
}

fetchPlayerData();