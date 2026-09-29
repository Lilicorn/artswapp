let imgdebug = ["car.jpg", "huh.jpg", "letöltés.jpg"]

function generatecards(mainID, elementnum, seemorehref) {
    let main = document.getElementById(mainID);
    main.innerText = "";
    for (let i = 0; i < elementnum; i++) {
        let card = document.createElement("section");
        card.className = "card";
        let image = document.createElement("div");
        image.className = "cardimage";

        let caption = document.createElement("div");
        caption.className = "cardcaption";
        let username = document.createElement("username");
        username.innerText = "user"
        let tags = document.createElement("tags")
        tags.innerHTML = "Because you're interested in:<br> tags";
        let pfp = document.createElement("div");
        pfp.className = "cardpfp";
        let button = document.createElement("button");
        button.innerText = "View Profile"

        for (let i = 0; i < 3; i++) {
            let im = document.createElement("img");
            im.src = "../debug/" + imgdebug[i];
            im.alt = "#";
            image.appendChild(im);
        }
        card.appendChild(image);

        caption.appendChild(username);
        caption.appendChild(tags);
        caption.appendChild(pfp);
        card.appendChild(caption);

        card.appendChild(button);

        card.classList.add("randomizer")

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
