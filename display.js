window.onload = function() {
    let currentTitle = document.title;

    //a weblaphoz animáció
    /*const frames = [
        "icon/0.png", "icon/2.png", "icon/4.png", "icon/6.png", 
        "icon/8.png", "icon/10.png"
    ];*/
    const titles = [
        " ₊ ⊹ ⋆ .˚⋆ ",
        " ⊹ ⋆ .˚⋆ ₊ ",
        " ༝ ⋆ .˚⋆ ₊ ",
        " ⋆ .˚⋆ ₊ ⊹ ",
        " .˚⋆ ₊ ⊹ ⋆ ",
        " ˚⋆ ₊ ⊹ ⋆ ."
    ];
    
    const intro = [
        "ㅤㅤㅤㅤ",
        "ㅤㅤㅤㅤ"+ ".",
        "ㅤㅤㅤ"+ " .˚ ",
        "ㅤㅤ"+ " .˚⋆ ",
        "ㅤ"+ " .˚⋆ ₊ ",
        " .˚⋆ ₊ ⊹ ⋆ ",
        "˚⋆ ₊ ⊹ ⋆ ."
    ]
    const flicker=["♡︎⁠ ","♡︎⁠ ", "♥︎ ","♥︎ "]

    //let i = 0; 
    let j = 1;
    let l = 0;
    for (let k = 0; k < intro.length; k++) {
        setTimeout(() => {
            document.title = "♥︎ " + currentTitle +" "+ intro[k];
        }, k * 300);
    }

    setTimeout(() => {
        setInterval(updateFavicon, 300);
    }, intro.length * 300);

    function updateFavicon() {
        /*let favicon = document.getElementById("icon"); 
        if (favicon) {
            favicon.href = frames[i]; 
            i = (i + 1) % frames.length; 
        }*/
       //nem lenne rossz csak szerintem sok memoriat veszunk el mar igy is x
        document.title = flicker[l]+currentTitle +" "+ titles[j];
        j = (j + 1) % titles.length;
        l = (l + 1) % flicker.length;
    }

    document.getElementById("displaymode").addEventListener('click', displaymode)
    if(document.getElementsByClassName("dark").length===0){
        document.getElementById("modeicon").classList.remove("fa-moon-o");
        document.getElementById("modeicon").classList.add("fa-sun-o");
         document.getElementById("displayhelper").innerHTML="Switch to dark mode";
    }
    else{
        document.getElementById("modeicon").classList.remove("fa-sun-o");
        document.getElementById("modeicon").classList.add("fa-moon-o");
        document.getElementById("displayhelper").innerHTML="Switch to light mode";
    }


    
    const thing = document.getElementById("navitems");
    const one = document.getElementById("desktopview");
    const two = document.getElementById("mobileview");
    const hamburger = document.getElementById("hamburber");

    hamburger.classList="";
    function nav(){
        if (window.innerWidth <= 912) {
            two.appendChild(thing);
        } else {
            one.insertBefore(thing, one.querySelector(".searchbar"));
        }
    }


    nav();
    window.addEventListener("resize", nav);
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("menu-open");
    });
}
    

function displaymode(){
    var element = document.body;
    element.classList.toggle("dark");
    //console.log(document.getElementsByClassName("dark"));
    if(document.getElementsByClassName("dark").length===0){
        document.getElementById("modeicon").classList.remove("fa-moon");
        document.getElementById("modeicon").classList.add("fa-sun");
         document.getElementById("displayhelper").innerHTML="Switch to dark mode";
    }
    else{
        document.getElementById("modeicon").classList.remove("fa-sun");
        document.getElementById("modeicon").classList.add("fa-moon");
        document.getElementById("displayhelper").innerHTML="Switch to light mode";
    }
}
