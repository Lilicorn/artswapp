let imgdebug = ["car.jpg", "huh.jpg", "letöltés.jpg"]

function generatecards(mainID, elementnum, seemorehref, variant = "compact") {
    let main = document.getElementById(mainID);
    main.innerText = "";
    for (let i = 0; i < elementnum; i++) {
        let card = document.createElement("art-card");
        card.setAttribute("variant", variant);
        card.setAttribute("username", "displayname");
        card.setAttribute("tags", "lorem, ipsum");
        card.setAttribute("images", imgdebug.map(image => "../debug/" + image).join(" "));
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
