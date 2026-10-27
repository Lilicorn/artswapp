let imgdebug = ["car.jpg", "huh.jpg", "letöltés.jpg"]

function createDemoUsers(count) {
    return Array.from({ length: count }, (_, index) => ({
        displayName: "displaynamethats20__",
        username: `artist${index + 1}_25charactersaaaugh`,
        tags: ["lorem", "ipsum", "dolor", "sit"],
        images: imgdebug.map(image => "../debug/" + image)
    }));
}

function createCardElement(user, variant = "full") {
    let card = document.createElement("app-card");
    card.setAttribute("variant", variant);
    card.user = user;
    card.classList.add("randomizer");
    return card;
}

function generatecards(mainID, elementnum, seemorehref, variant = "full", users = null) {
    let main = document.getElementById(mainID);
    main.innerText = "";
    let cardUsers = users || createDemoUsers(elementnum);

    for (const user of cardUsers) {
        main.appendChild(createCardElement(user, variant));
    }

    if (seemorehref !== "") {
        let more = document.createElement("more");
        let circle = document.createElement("badge");
        let pi = document.createElement("p");
        circle.innerText = ">"
        pi.innerText = "See more..."
        more.appendChild(circle)
        more.appendChild(pi)
        more.addEventListener("click", function () { window.open(seemorehref, "_self") });
        main.appendChild(more)
    }
}
