let imgdebug = ["car.jpg", "huh.jpg", "letöltés.jpg"]

function createDemoUsers(count) {
    return Array.from({ length: count }, (_, index) => ({
        displayName: "displaynamethats20__",
        username: `artist${index + 1}_25charactersaaaugh`,
        profileImage: null,
        tags: ["lorem", "ipsum", "dolor", "sit"],
        images: imgdebug.map(image => "../debug/" + image),
        profileHref: "../pages/profile.html" + "?embed=1",
        
    }));
}

function createDemoUsers2(count) {
    return Array.from({ length: count }, (_, index) => ({
        displayName: "displayname",
        username: `artist${index + 1}_user`,
        profileImage: null,
        tags: ["lorem", "ipsum", "dolor", "sit"],
        images: imgdebug.map(image => "../debug/" + image),
        profileHref: "../pages/profile.html" + "?embed=1",
        auction: {
            endsAt: Date.now() + 1000 * 60 * 45 // pl. 45 perc múlva jár le
        }
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
    
    let cardUsers = users || 
        mainID == "recommendedauctions" 
        ? createDemoUsers2(elementnum) 
        : createDemoUsers(elementnum);

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

// iframe silliness
function openOverlayFrame({ url, title, color }) {
  if (!url) return;

  const frame = document.createElement("app-iframe");
  frame.setAttribute("src", url);
  frame.setAttribute("title", title);
  if (color) {
    frame.setAttribute("framecolor", color);
  }
  document.body.appendChild(frame);
}

document.body.addEventListener("open-a-profile", (event) => {
  openOverlayFrame({
    url: event.detail.url,
    title: `${event.detail.name}'s profile`,
    color: event.detail.color
  });
});

document.body.addEventListener("open-an-auction", (event) => {
  openOverlayFrame({
    url: event.detail.url,
    title: `${event.detail.name}'s auction`,
    color: event.detail.color
  });
});