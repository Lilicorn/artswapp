let prev = -1;
function colorrandomizer(){
    var colors = ["#ff4a6f", "#ff924a", "#7fd01c", "#4acfff", "#ad2dcd", "#ff69b4"];
    
    
    const everyone = document.querySelectorAll('.randomizer');
    for(const e of everyone){
        let random;
        do {
        random = Math.floor(Math.random() * colors.length);
    } while (random === prev);
        prev = random;

        
    e.style.setProperty("--accent-color", colors[random]);
    }

    let bi = Math.floor(Math.random() * colors.length);
    document.body.style.setProperty("--accent-color", colors[bi]);
}


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

    const thing = document.getElementById("navitems");
    const one = document.getElementById("desktopview");
    const two = document.getElementById("mobileview");
    const hamburger = document.getElementById("hamburber");

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
        two.classList.toggle("menu-open");
    });

    document.querySelector(".nav-pfp").addEventListener("click", () => {
        document.querySelector("#profile-dropdown-menu").classList.toggle("menu-open");
    });

const clip = document.createElement("div");
clip.className = "clip";
clip.setAttribute("aria-hidden", "true");
const clipContent = document.createElement("div");
clipContent.className = "clip-content";
clip.append(clipContent);
document.body.append(clip);

const themeVariables = [
    "--accent-color",
    "--background-color",
    "--complementary",
    "--text-color",
    "--transition",
];
let transitionRunning = false;

function setModeIcon(isDark, target = document) {
    const icon = target.querySelector("#modeicon");
    if (!icon) return;

    icon.classList.toggle("fa-moon", isDark);
    icon.classList.toggle("fa-sun", !isDark);
}

setModeIcon(document.body.classList.contains("dark"));
document.getElementById("displaymode").addEventListener("click", (event) => {
    event.preventDefault();
    if (transitionRunning) return;
    transitionRunning = true;

    const body = document.body;
    const wasDark = body.classList.contains("dark");
    const willBeDark = !wasDark;
    const toggle = event.currentTarget;

    colorrandomizer();
    for (const child of body.children) {
        if (child !== clip) clipContent.append(child.cloneNode(true));
    }

    body.classList.toggle("dark", willBeDark);
    const targetStyles = getComputedStyle(body);
    for (const variable of themeVariables) {
        clipContent.style.setProperty(variable, targetStyles.getPropertyValue(variable));
    }
    body.classList.toggle("dark", wasDark);
    setModeIcon(willBeDark, clipContent);

    const toggleBounds = toggle.getBoundingClientRect();
    clip.style.setProperty("--origin-x", `${toggleBounds.left + toggleBounds.width / 2}px`);
    clip.style.setProperty("--origin-y", `${toggleBounds.top + toggleBounds.height / 2}px`);
    clipContent.scrollTop = window.scrollY;

    const onAnimationEnd = (animationEvent) => {
        if (animationEvent.target !== clip) return;
        clip.removeEventListener("animationend", onAnimationEnd);
        body.classList.toggle("dark", willBeDark);
        setModeIcon(willBeDark);

        window.setTimeout(() => {
            clipContent.replaceChildren();
            clipContent.removeAttribute("style");
            clip.style.removeProperty("--origin-x");
            clip.style.removeProperty("--origin-y");
            clip.classList.remove("anim");
            transitionRunning = false;
        }, 150);
    };

    clip.addEventListener("animationend", onAnimationEnd);
    clip.classList.add("anim");
});
