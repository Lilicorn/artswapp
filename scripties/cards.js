let imgdebug = ["car.jpg", "huh.jpg", "letöltés.jpg"]

function generatecards(mainID, elementnum, seemorehref, variant = "compact", users = null) {
    let main = document.getElementById(mainID);
    main.innerText = "";
    let cardUsers = users || Array.from({ length: elementnum }, (_, index) => ({
        displayName: "displayname",
        username: `artist${index + 1}`,
        tags: ["lorem", "ipsum"],
        images: imgdebug.map(image => "../debug/" + image)
    }));

    for (const user of cardUsers) {
        let card = document.createElement("art-card");
        card.setAttribute("variant", variant);
        card.user = user;
        card.classList.add("randomizer");
        main.appendChild(card);
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
