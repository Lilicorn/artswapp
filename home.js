let imgdebug = ["car.jpg", "huh.png","letöltés.png"]

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
        let username = document.createElement("username");
        username.innerHTML="user"
        let badges = document.createElement("badge") //idk
        badges.innerHTML="badge ".repeat(3)
        let tags = document.createElement("tags")
        tags.innerHTML="Because you're interested in:<br> tags";
        let pfp = document.createElement("div");
        pfp.className="cardpfp";
        let button = document.createElement("button");
        button.innerHTML="View Profile"

         for(let i=0;i<3;i++){
            let im = document.createElement("img");
            im.src="debug/"+imgdebug[i];
            im.alt="#";
            image.appendChild(im);
        }
        card.appendChild(image);
        
        username.appendChild(badges)
        caption.appendChild(username);
        caption.appendChild(tags);
        caption.appendChild(pfp);
        card.appendChild(caption);
        
        card.appendChild(button);

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