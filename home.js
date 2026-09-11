function generatecards (mainID, elementnum){
    let main = document.getElementById(mainID);
    main.innerHTML="";
    for(let i = 0; i<elementnum; i++){
        let card = document.createElement("section");
        card.className="card";
        let image = document.createElement("div");
        image.className="cardimage";
        let caption = document.createElement("div");
        caption.className="cardcaption";
        let pfp = document.createElement("div");
        pfp.className="cardpfp";
        card.appendChild(image);
        card.appendChild(caption);
        caption.appendChild(pfp);
        main.appendChild(card);
    }
    // termeszetesen ezt majd tovabb kell 
    // spirazni az alapjan melyik sor es miylen
    //  content megy bele uyge
    //lehet hogy egy fgv nem is eleg :( de megprobaltam
}

function loadingstuff(){
    let en = window.innerWidth <= 768 ? 5 : 10;
    generatecards("recommendedusers", en);
    generatecards("recommendedauctions", en);
    generatecards("donatorleaderboard", en);
}

window.addEventListener("load", loadingstuff);
window.addEventListener("resize", loadingstuff);