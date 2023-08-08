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
        let i = 0;
        let library = document.querySelector(".library");
        for (let j = 0; j < Object.keys(data["library"]).length; j++) {
            if (j % 5 == 0) {
                libraryGroup = createLibraryGroup(library, i);
                createLibraryImage(j, data["library"][j], libraryGroup);
                i++;
            } else {
                createLibraryImage(j, data["library"][j], libraryGroup);
            }
        }
    });

    function createGameScreen(index) { }

    function createLibraryGroup(library, index) {
        let libraryGroup = document.createElement("div");
        libraryGroup.setAttribute("class", "library-group");
        libraryGroup.setAttribute("id", "library-group-" + index.toString());
        library.appendChild(libraryGroup);
        return libraryGroup;
    }

    function createBrowseImage(index, link) {
        let browseImage = document.createElement("img");
        let browseItem = document.getElementById("browse-item-" + index);
        browseImage.setAttribute("src", link + "banner.png?raw=true");
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
        let name = link["name"];
        let description = link["description"];
        let libraryImage = document.createElement("img");
        let libraryItem = document.createElement("div");
        const gamePlay = document.getElementById("game-play");
        const gameAbout = document.getElementById("game-about");
        const gameSettings = document.getElementById("game-settings");
        const gameInstallation = document.getElementById("game-installation");
        const gamePlayContainer = document.querySelector(".game-play-container");
        const gameAboutContainer = document.querySelector(".game-about-container");
        const gameSettingsContainer = document.querySelector(".game-settings-container");
        const gameInstallationContainer = document.querySelector(".game-installation-container");

        libraryImage.setAttribute("src", link["url"] + "poster.png?raw=true");
        libraryItem.setAttribute("class", "library-item");
        libraryItem.setAttribute("id", "library-item-" + index);
        libraryItem.appendChild(libraryImage);
        group.appendChild(libraryItem);
        libraryItem.addEventListener("click", () => {
            const browseItem = document.getElementById("browse-item");
            const libraryItem = document.getElementById("library-item");
            const navbarOptions = document.getElementById("game-group");
            const gameWindow = document.getElementById("game-window-" + index);
            const browseWindow = document.querySelector(".browse");
            const libraryWindow = document.querySelector(".library");
            gamePlay.classList.add("active");
            gameAbout.classList.remove("active");
            gameSettings.classList.remove("active");
            gameInstallation.classList.remove("active");

            gamePlayContainer.classList.add("active");
            gameAboutContainer.classList.remove("active");
            gameSettingsContainer.classList.remove("active");
            gameInstallationContainer.classList.remove("active");
            gamePlay.classList.add("active");
            browseItem.classList.remove("active");
            libraryItem.classList.remove("active");
            navbarOptions.classList.add("active");
            browseWindow.classList.remove("active");
            libraryWindow.classList.remove("active");
            gameWindow.classList.add("active");
            gamePlayContainer.classList.add("active");

            gamePlay.addEventListener("click", () => {
                gamePlay.classList.add("active");
                gameAbout.classList.remove("active");
                gameSettings.classList.remove("active");
                gameInstallation.classList.remove("active");

                gamePlayContainer.classList.add("active");
                gameAboutContainer.classList.remove("active");
                gameSettingsContainer.classList.remove("active");
                gameInstallationContainer.classList.remove("active");
            });

            gameAbout.addEventListener("click", () => {
                gamePlay.classList.remove("active");
                gameAbout.classList.add("active");
                gameSettings.classList.remove("active");
                gameInstallation.classList.remove("active");

                gamePlayContainer.classList.remove("active");
                gameAboutContainer.classList.add("active");
                gameSettingsContainer.classList.remove("active");
                gameInstallationContainer.classList.remove("active");
            });

            gameSettings.addEventListener("click", () => {
                gamePlay.classList.remove("active");
                gameAbout.classList.remove("active");
                gameSettings.classList.add("active");
                gameInstallation.classList.remove("active");

                gamePlayContainer.classList.remove("active");
                gameAboutContainer.classList.remove("active");
                gameSettingsContainer.classList.add("active");
                gameInstallationContainer.classList.remove("active");
            });

            gameInstallation.addEventListener("click", () => {
                gamePlay.classList.remove("active");
                gameAbout.classList.remove("active");
                gameSettings.classList.remove("active");
                gameInstallation.classList.add("active");

                gamePlayContainer.classList.remove("active");
                gameAboutContainer.classList.remove("active");
                gameSettingsContainer.classList.remove("active");
                gameInstallationContainer.classList.add("active");
            });
        });

        if (document.getElementById("sidenav-group-0").childElementCount != 9) {
            let libraryIcon = document.createElement("img");
            let libraryTooltip = document.createElement("span");
            let libraryIconItem = document.createElement("div");
            libraryIconItem.setAttribute("class", "sidenav-item");
            let sidenavGroup = document.getElementById("sidenav-group-0");
            libraryIconItem.setAttribute("id", "sidenav-item-" + index);
            sidenavGroup.appendChild(libraryIconItem);
            libraryIcon.setAttribute("src", link["url"] + "icon.png?raw=true");
            libraryIcon.setAttribute("class", "sidenav-icon");
            libraryIconItem.appendChild(libraryIcon);
            libraryTooltip.setAttribute("class", "sidenav-tooltip");
            libraryTooltip.textContent = name;
            libraryIconItem.appendChild(libraryTooltip);

            libraryIcon.addEventListener("click", () => {
                const browseItem = document.getElementById("browse-item");
                const libraryItem = document.getElementById("library-item");
                const navbarOptions = document.getElementById("game-group");
                const gameWindow = document.getElementById("game-window-" + index);
                const gamePlayContainer = document.querySelector(".game-play-container");
                const gameAboutContainer = document.querySelector(".game-about-container");
                const gameSettingsContainer = document.querySelector(".game-settings-container");
                const gameInstallationContainer = document.querySelector(".game-installation-container");
                const browseWindow = document.querySelector(".browse");
                const libraryWindow = document.querySelector(".library");
                gamePlay.classList.add("active");
                gameAbout.classList.remove("active");
                gameSettings.classList.remove("active");
                gameInstallation.classList.remove("active");

                gamePlayContainer.classList.add("active");
                gameAboutContainer.classList.remove("active");
                gameSettingsContainer.classList.remove("active");
                gameInstallationContainer.classList.remove("active");

                gamePlay.classList.add("active");
                browseItem.classList.remove("active");
                libraryItem.classList.remove("active");
                navbarOptions.classList.add("active");
                browseWindow.classList.remove("active");
                libraryWindow.classList.remove("active");
                gameWindow.classList.add("active");
                gamePlayContainer.classList.add("active");

                gamePlay.addEventListener("click", () => {
                    gamePlay.classList.add("active");
                    gameAbout.classList.remove("active");
                    gameSettings.classList.remove("active");
                    gameInstallation.classList.remove("active");

                    gamePlayContainer.classList.add("active");
                    gameAboutContainer.classList.remove("active");
                    gameSettingsContainer.classList.remove("active");
                    gameInstallationContainer.classList.remove("active");
                });

                gameAbout.addEventListener("click", () => {
                    gamePlay.classList.remove("active");
                    gameAbout.classList.add("active");
                    gameSettings.classList.remove("active");
                    gameInstallation.classList.remove("active");

                    gamePlayContainer.classList.remove("active");
                    gameAboutContainer.classList.add("active");
                    gameSettingsContainer.classList.remove("active");
                    gameInstallationContainer.classList.remove("active");
                });

                gameSettings.addEventListener("click", () => {
                    gamePlay.classList.remove("active");
                    gameAbout.classList.remove("active");
                    gameSettings.classList.add("active");
                    gameInstallation.classList.remove("active");

                    gamePlayContainer.classList.remove("active");
                    gameAboutContainer.classList.remove("active");
                    gameSettingsContainer.classList.add("active");
                    gameInstallationContainer.classList.remove("active");
                });

                gameInstallation.addEventListener("click", () => {
                    gamePlay.classList.remove("active");
                    gameAbout.classList.remove("active");
                    gameSettings.classList.remove("active");
                    gameInstallation.classList.add("active");

                    gamePlayContainer.classList.remove("active");
                    gameAboutContainer.classList.remove("active");
                    gameSettingsContainer.classList.remove("active");
                    gameInstallationContainer.classList.add("active");
                });
            });
        }
    }
}

loadFromUrl()

const browseItem = document.getElementById("browse-item");
const libraryItem = document.getElementById("library-item");
const navbarOptions = document.getElementById("game-group");
const browseWindow = document.querySelector(".browse");
const libraryWindow = document.querySelector(".library");
const gameWindow = document.querySelector(".game-window");

browseItem.addEventListener("click", () => {
    browseItem.classList.add("active");
    libraryItem.classList.remove("active");
    browseWindow.classList.add("active");
    libraryWindow.classList.remove("active");
    navbarOptions.classList.remove("active");
    gameWindow.classList.remove("active");
});

libraryItem.addEventListener("click", () => {
    browseItem.classList.remove("active");
    libraryItem.classList.add("active");
    browseWindow.classList.remove("active");
    libraryWindow.classList.add("active");
    navbarOptions.classList.remove("active");
    gameWindow.classList.remove("active");
});