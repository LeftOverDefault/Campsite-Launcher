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
        const gameWindowContainer = document.querySelector(".game-window-container");
        const browseLink = document.getElementById("browse-item");
        const libraryLink = document.getElementById("library-item");
        const navbarOptions = document.getElementById("game-group");

        const browseWindow = document.querySelector(".browse");
        const libraryWindow = document.querySelector(".library");
        const gameWindow = document.createElement("div");

        let name = link["name"];
        let description = link["description"];
        let libraryImage = document.createElement("img");
        let libraryItem = document.createElement("div");
        gameWindow.setAttribute("class", "game-window");
        gameWindow.setAttribute("id", "game-window-" + index);
        gameWindowContainer.appendChild(gameWindow);
        const gamePlay = document.getElementById("game-play");
        const gameAbout = document.getElementById("game-about");
        const gameSettings = document.getElementById("game-settings");
        const gameInstallation = document.getElementById("game-installation");

        const gamePlayContainer = document.createElement("div");
        const gameAboutContainer = document.createElement("div");
        const gameSettingsContainer = document.createElement("div");
        const gameInstallationContainer = document.createElement("div");

        gamePlayContainer.setAttribute("class", "game-play-container");
        gameAboutContainer.setAttribute("class", "game-about-container");
        gameSettingsContainer.setAttribute("class", "game-settings-container");
        gameInstallationContainer.setAttribute("class", "game-installation-container");

        gameWindow.appendChild(gamePlayContainer);
        gameWindow.appendChild(gameAboutContainer);
        gameWindow.appendChild(gameSettingsContainer);
        gameWindow.appendChild(gameInstallationContainer);

        const gameBackgroundContainer = document.createElement("div");
        const gameBackgroundImage = document.createElement("img");
        const gamePlaySection = document.createElement("div");
        const gamePlayButton = document.createElement("button");
        const gamePlayButtonSecondary1 = document.createElement("button");
        const gamePlayButtonSecondary2 = document.createElement("button");

        gameBackgroundContainer.setAttribute("class", "background");
        gameBackgroundImage.setAttribute("src", link["url"] + "banner.png?raw=true");
        gamePlaySection.setAttribute("class", "game-play-section");

        gamePlayButton.setAttribute("class", "button");
        gamePlayButtonSecondary1.setAttribute("class", "button-secondary");
        gamePlayButtonSecondary2.setAttribute("class", "button-secondary");
        gamePlaySection.appendChild(gamePlayButtonSecondary1);
        gamePlaySection.appendChild(gamePlayButton);
        gamePlaySection.appendChild(gamePlayButtonSecondary2);

        let shareButton = document.createElement("i");
        let playButton = document.createElement("i");
        let storeButton = document.createElement("i");
        shareButton.setAttribute("class", "fa-solid fa-share-from-square");
        playButton.setAttribute("class", "fa-solid fa-play");
        storeButton.setAttribute("class", "fa-solid fa-store");
        gamePlayButtonSecondary1.appendChild(shareButton);
        gamePlayButton.appendChild(playButton);
        gamePlayButtonSecondary2.appendChild(storeButton);

        gamePlayContainer.appendChild(gameBackgroundContainer);
        gameBackgroundContainer.appendChild(gameBackgroundImage);
        gamePlayContainer.appendChild(gamePlaySection);

        libraryImage.setAttribute("src", link["url"] + "poster.png?raw=true");
        libraryItem.setAttribute("class", "library-item");
        libraryItem.setAttribute("id", "library-item-" + index);
        libraryItem.appendChild(libraryImage);
        group.appendChild(libraryItem);
        libraryItem.addEventListener("click", () => {
            gamePlay.classList.add("active");
            gameAbout.classList.remove("active");
            gameSettings.classList.remove("active");
            gameInstallation.classList.remove("active");

            gamePlayContainer.classList.add("active");
            gameAboutContainer.classList.remove("active");
            gameSettingsContainer.classList.remove("active");
            gameInstallationContainer.classList.remove("active");
            gamePlay.classList.add("active");
            browseLink.classList.remove("active");
            libraryLink.classList.remove("active");
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

            browseLink.addEventListener("click", () => {
                browseLink.classList.add("active");
                libraryLink.classList.remove("active");
                browseWindow.classList.add("active");
                libraryWindow.classList.remove("active");
                navbarOptions.classList.remove("active");
                gameWindow.classList.remove("active");
            });

            libraryLink.addEventListener("click", () => {
                browseLink.classList.remove("active");
                libraryLink.classList.add("active");
                browseWindow.classList.remove("active");
                libraryWindow.classList.add("active");
                navbarOptions.classList.remove("active");
                gameWindow.classList.remove("active");
            });
        });

        browseLink.addEventListener("click", () => {
            browseLink.classList.add("active");
            libraryLink.classList.remove("active");
            browseWindow.classList.add("active");
            libraryWindow.classList.remove("active");
            navbarOptions.classList.remove("active");
            gameWindow.classList.remove("active");
        });

        libraryLink.addEventListener("click", () => {
            browseLink.classList.remove("active");
            libraryLink.classList.add("active");
            browseWindow.classList.remove("active");
            libraryWindow.classList.add("active");
            navbarOptions.classList.remove("active");
            gameWindow.classList.remove("active");
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


            libraryIconItem.addEventListener("click", () => {
                gamePlay.classList.add("active");
                gameAbout.classList.remove("active");
                gameSettings.classList.remove("active");
                gameInstallation.classList.remove("active");

                gamePlayContainer.classList.add("active");
                gameAboutContainer.classList.remove("active");
                gameSettingsContainer.classList.remove("active");
                gameInstallationContainer.classList.remove("active");

                gamePlay.classList.add("active");
                browseLink.classList.remove("active");
                libraryLink.classList.remove("active");
                navbarOptions.classList.add("active");
                browseWindow.classList.remove("active");
                libraryWindow.classList.remove("active");
                for (let k = 0; k < gameWindowContainer.childElementCount; k++) {
                    let gameWindowId = document.getElementById("game-window-" + k.toString())
                    if (gameWindowId.classList.contains("active")) {
                        gameWindowId.classList.remove("active");
                    }
                }
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

                browseLink.addEventListener("click", () => {
                    browseLink.classList.add("active");
                    libraryLink.classList.remove("active");
                    browseWindow.classList.add("active");
                    libraryWindow.classList.remove("active");
                    navbarOptions.classList.remove("active");
                    gameWindow.classList.remove("active");
                });

                libraryLink.addEventListener("click", () => {
                    browseLink.classList.remove("active");
                    libraryLink.classList.add("active");
                    browseWindow.classList.remove("active");
                    libraryWindow.classList.add("active");
                    navbarOptions.classList.remove("active");
                    gameWindow.classList.remove("active");
                });
            });
        }
    }
}

loadFromUrl()