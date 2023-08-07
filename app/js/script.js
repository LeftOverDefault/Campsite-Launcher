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

function loadFromUrl() {
    readTextFile("../app/data/games.json", function (text) {
        let data = JSON.parse(text);
        for (let i = 0; i < Object.keys(data["browse"]).length; i++) {
            createBrowseImage(i, data["browse"][i]["url"]);
            createBrowseName(i, data["browse"][i]["name"]);
            createBrowseDescription(i, data["browse"][i]["description"]);
        }
        for (let i = 0; i < Object.keys(data["library"]).length; i++) {
            createLibraryIcon(i, data["library"][i], document.getElementById("sidenav-group-0"))
            let j = 0;
            if (document.getElementById("library-group-" + j.toString()).childElementCount == 5) {
                console.log("element full");
                j++;
                createLibraryImage(i, data["library"][i], document.getElementById("library-group-" + j.toString()));
            } else {
                let group = document.getElementById("library-group-" + j.toString());
                console.log(group)
                createLibraryImage(i, data["library"][i], document.getElementById("library-group-" + j.toString()));
            }
        }
    });

    function createLibraryIcon(index, link, group) {
        let libraryIcon = document.createElement("img");
        let libraryTooltip = document.createElement("span");
        // let libraryItem = document.getElementById("sidenav-item-" + index);
        let libraryItem = document.createElement("div");
        libraryItem.setAttribute("class", "sidenav-item");
        libraryItem.setAttribute("id", "sidenav-item-" + index);
        group.appendChild(libraryItem);
        libraryIcon.setAttribute("src", link["url"] + "icon.png?raw=true");
        libraryIcon.setAttribute("class", "sidenav-icon");
        libraryItem.appendChild(libraryIcon);
        libraryTooltip.setAttribute("class", "sidenav-tooltip");
        libraryTooltip.textContent = link["name"];
        libraryItem.appendChild(libraryTooltip);
    }

    function createBrowseImage(index, link) {
        let browseImage = document.createElement("img");
        let browseItem = document.getElementById("browse-item-" + index);
        browseImage.setAttribute("src", link + "poster.png?raw=true");
        browseItem.appendChild(browseImage);
    }

    function createBrowseName(index, link) {
        let browseName = document.createElement("a");
        let browseItem = document.getElementById("browse-item-about-name-" + index);
        browseName.setAttribute("class", "browse-item-about-name");
        browseName.setAttribute("href", "#");
        browseName.textContent = link;
        browseItem.appendChild(browseName);
    }

    function createBrowseDescription(index, link) {
        let browseDescription = document.createElement("a");
        let browseItem = document.getElementById("browse-item-about-description-" + index);
        browseDescription.setAttribute("class", "browse-item-about-description");
        browseDescription.setAttribute("href", "#");
        browseDescription.textContent = link;
        browseItem.appendChild(browseDescription);
    }

    function createLibraryImage(index, link, group) {
        let libraryImage = document.createElement("img");
        libraryImage.setAttribute("src", link["url"] + "poster.png?raw=true");
        let libraryItem = document.createElement("div");
        libraryItem.setAttribute("class", "library-item");
        libraryItem.setAttribute("id", "library-item-" + index);
        libraryItem.appendChild(libraryImage);
        group.appendChild(libraryItem);
    }
}

loadFromUrl()

const browseItem = document.getElementById("browse-item");
const libraryItem = document.getElementById("library-item");
const browseWindow = document.querySelector(".browse");
const libraryWindow = document.querySelector(".library");

browseItem.addEventListener("click", () => {
    browseItem.classList.add("active");
    libraryItem.classList.remove("active");
    browseWindow.classList.add("active");
    libraryWindow.classList.remove("active");
});

libraryItem.addEventListener("click", () => {
    browseItem.classList.remove("active");
    libraryItem.classList.add("active");
    browseWindow.classList.remove("active");
    libraryWindow.classList.add("active");
});