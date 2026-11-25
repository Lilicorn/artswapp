
const wrap = document.querySelector("#wrap");
const section = wrap.querySelector("section");

function updateSectionHeight() {
    if (!wrap || !section) return;

    wrap.style.setProperty(
        "--section-height",
        `${Math.ceil(section.getBoundingClientRect().height)}px`
    );
}

if (wrap && section) {
    const observer = new ResizeObserver(updateSectionHeight);
    observer.observe(section);
    observer.observe(section.querySelector("img") ?? section);
    updateSectionHeight();
}


// simulation

if(Math.random() > 0.5){
    const aside = document.querySelector("aside");
    const ref = document.querySelector("aside>.timer");
    const autobuy = document.createElement("button");
    autobuy.innerHTML = "Auto-Buy";
    autobuy.classList.add("randomizer")
    aside.insertBefore(autobuy, ref);
}

let r = Math.random()*20;
const bidList = document.querySelector("#bids");
if(r >= 1){
    for(let i = 1; i < r; i++){
    bidList.innerHTML += '<div><img class="nav-pfp"></img><app-username>user1</app-username><span>15 EUR</span></div>';
    document.querySelector("tags").innerHTML += '<tag class="randomizer">cooltag</tag>';
    }
}
else{
    bidList.innerHTML += '<div style="color:grey;"><app-username><i>No bids yet.</i></app-username><span>-</span></div>';
    document.querySelector("tags").innerHTML += '<tag class="randomizer">cooltag</tag>';

}

/* !!!!! */
colorrandomizer(); 