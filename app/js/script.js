function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("../app/data/games.json", function (text) {
    var data = JSON.parse(text);
    for (let i = 0; i < Object.keys(data).length; i++) {
        createLibraryImage(i, data[i]);
    }
});

function createLibraryImage(index, link) {
    let libraryImage = document.createElement("img");
    let libraryItem = document.getElementById("library-item-" + index);
    libraryImage.setAttribute("src", link + "poster.png?raw=true");
    libraryItem.appendChild(libraryImage);
}