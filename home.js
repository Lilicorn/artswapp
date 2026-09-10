function generatecards (mainID, elementnum){
    let main = document.getElementById(mainID);
    main.innerHTML="";
    for(let i = 0; i<elementnum; i++){
        let card = document.createElement("div");
        card.className="card";
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
    generatecards("donatorleaderboard", 5);
}

window.addEventListener("load", loadingstuff);
window.addEventListener("resize", loadingstuff);